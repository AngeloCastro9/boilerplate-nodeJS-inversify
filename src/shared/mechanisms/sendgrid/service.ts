import instance from '@sendgrid/mail';

import { getEnv } from '@core/constants';

import LoggerManager from '@shared/log/manager';
import { ISendgridSendMailParams, ISendgridService } from '@shared/mechanisms/sendgrid/interfaces';

class SendgridService implements ISendgridService {

  async send (mail: ISendgridSendMailParams): Promise<void> {
    instance.setApiKey(getEnv().mailing.sendgrid.apiKey);

    try {
      await instance.send({
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        templateId: mail.template,
        attachments: mail.attachments,
        substitutions: mail.substitutions,
      });
    } catch (err) {
      LoggerManager.log('application-errors', {
        origin: 'sendgrid',
        type: 'error',
        err: err as Error,
      });
    }
  }
}

export default new SendgridService();