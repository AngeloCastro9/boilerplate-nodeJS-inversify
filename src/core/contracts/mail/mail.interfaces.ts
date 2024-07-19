import { ISendTemplateMailDTO, ISendTextMailDTO } from '@core/contracts/mail/mail.dto';

export interface IMailContract {
  send(params: ISendTextMailDTO): Promise<void>;
  sendWithTemplate(params: ISendTemplateMailDTO): Promise<void>;
}