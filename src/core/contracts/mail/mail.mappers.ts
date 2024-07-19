import { getEnv } from '@core/constants';
import { ISendTemplateMailDTO, ISendTextMailDTO } from '@core/contracts/mail/mail.dto';

import { IMandrillMail } from '@shared/mechanisms/mandrill/interfaces';
import { ISendgridSendMailParams } from '@shared/mechanisms/sendgrid/interfaces';
import { ISMTPTemplateMail, ISMTPTextMail } from '@shared/mechanisms/smtp/interfaces';

export class MailMapper {
  static mapMandrillSendByText (params: ISendTextMailDTO): IMandrillMail {
    return {
      message: {
        from_email: getEnv().mailing.mandrill.from.address,
        from_name: getEnv().mailing.mandrill.from.name,
        text: params.text,
        subject: params.subject,
        important: params.important,
        to: params.to.map((email: string) => ({ email })) as unknown as IMandrillMail['message']['to'],
      },
    };
  }

  static mapMandrillSendByTemplate (params: ISendTemplateMailDTO): IMandrillMail {
    return {
      template_name: params.template,
      template_content: [],
      message: {
        from_email: getEnv().mailing.mandrill.from.address,
        from_name: getEnv().mailing.mandrill.from.name,
        global_merge_vars: params.content ?? [],
        to: params.to.map((email: string) => ({ email })) as unknown as IMandrillMail['message']['to'],
      },
    };
  }

  static mapSendgridSendByText (params: ISendTextMailDTO): ISendgridSendMailParams {
    return {
      subject: params.subject,
      from: getEnv().mailing.sendgrid.from.address,
      to: params.to.join(','),
      text: params.text,
    };
  }

  static mapSendgridSendByTemplate (params: ISendTemplateMailDTO): ISendgridSendMailParams {
    return {
      subject: params.subject,
      from: getEnv().mailing.sendgrid.from.address,
      to: params.to.join(','),
      template: params.template,
    };
  }

  static mapSMTPSendByText (params: ISendTextMailDTO): ISMTPTextMail {
    return {
      from: {
        name: getEnv().mailing.smtp.from.name,
        address: getEnv().mailing.smtp.from.address,
      },
      subject: params.subject,
      to: params.to.join(','),
      text: params.text,
    };
  }

  static mapSMTPSendByTemplate (params: ISendTemplateMailDTO): ISMTPTemplateMail {
    return {
      from: {
        name: getEnv().mailing.smtp.from.name,
        address: getEnv().mailing.smtp.from.address,
      },
      subject: params.subject,
      to: params.to.join(','),
      attachments: params.attachments,
      template: params.template,
    };
  }
}