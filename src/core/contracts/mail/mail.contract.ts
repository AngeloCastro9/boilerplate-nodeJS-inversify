import { injectable } from 'inversify';

import { getEnv } from '@core/constants';
import { ISendTemplateMailDTO, ISendTextMailDTO } from '@core/contracts/mail/mail.dto';
import { IMailContract } from '@core/contracts/mail/mail.interfaces';
import { MailMapper } from '@core/contracts/mail/mail.mappers';

import { MailProvider } from '@shared/enumerators';
import MandrillService from '@shared/mechanisms/mandrill/service';
import SendgridService from '@shared/mechanisms/sendgrid/service';
import SMTPService from '@shared/mechanisms/smtp/service';

@injectable()
export class MailContract implements IMailContract {
  async send (params: ISendTextMailDTO): Promise<void> {
    const { provider } = getEnv().mailing;

    if (provider === MailProvider.MANDRILL) {
      await this.sendWithMandrill(params);
      return;
    }

    if (provider === MailProvider.SENDGRID) {
      await this.sendWithSendgrid(params);
      return;
    }

    if (provider === MailProvider.SMTP) {
      await this.sendWithSMTP(params);
    }
  }

  async sendWithTemplate (params: ISendTemplateMailDTO): Promise<void> {
    const { provider } = getEnv().mailing;

    if (provider === MailProvider.MANDRILL) {
      await this.sendTemplateWithMandrill(params);
      return;
    }

    if (provider === MailProvider.SENDGRID) {
      await this.sendTemplateWithSendgrid(params);
      return;
    }

    if (provider === MailProvider.SMTP) {
      await this.sendTemplateWithSMTP(params);
    }
  }

  private async sendWithMandrill (params: ISendTextMailDTO): Promise<void> {
    const dto = MailMapper.mapMandrillSendByText(params);

    await MandrillService.send(dto);
  }

  private async sendTemplateWithMandrill (params: ISendTemplateMailDTO): Promise<void> {
    const dto = MailMapper.mapMandrillSendByTemplate(params);

    await MandrillService.sendTemplate(dto);
  }

  private async sendWithSendgrid (params: ISendTextMailDTO): Promise<void> {
    const dto = MailMapper.mapSendgridSendByText(params);

    await SendgridService.send(dto);
  }

  private async sendTemplateWithSendgrid (params: ISendTemplateMailDTO): Promise<void> {
    const dto = MailMapper.mapSendgridSendByTemplate(params);

    await SendgridService.send(dto);
  }

  private async sendWithSMTP (params: ISendTemplateMailDTO): Promise<void> {
    const dto = MailMapper.mapSMTPSendByTemplate(params);

    await SMTPService.send(dto);
  }

  private async sendTemplateWithSMTP (params: ISendTemplateMailDTO): Promise<void> {
    const dto = MailMapper.mapSMTPSendByTemplate(params);

    await SMTPService.sendWithTemplate(dto);
  }
}