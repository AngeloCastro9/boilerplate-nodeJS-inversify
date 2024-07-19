import mjml from 'mjml';
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import { join } from 'path';

import { getEnv } from '@core/constants';
import { Dictionary } from '@core/models/dictionary';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';
import { ISMTPTemplateMail, ISMTPTextMail } from '@shared/mechanisms/smtp/interfaces';
import { readTemplate, stringReplace } from '@shared/utils';

class SMTPService {
  static getTransporter (): Transporter {
    const { host, auth, port, secure } = getEnv().mailing.smtp;

    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth,
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  static async send (params: ISMTPTextMail): Promise<void> {
    const transporter = SMTPService.getTransporter();

    const options: SendMailOptions = {
      from: {
        name: params.from.name,
        address: params.from.address,
      },
      to: params.to,
      subject: params.subject,
      text: params.text,
    };

    await transporter.sendMail(options);
    transporter.close();
  }

  static async sendWithTemplate (params: ISMTPTemplateMail): Promise<void> {
    const transporter = SMTPService.getTransporter();

    const options: SendMailOptions = {
      from: {
        name: params.from.name,
        address: params.from.address,
      },
      to: params.to,
      subject: params.subject,
      html: params.template,
      attachments: params.attachments,
    };

    await transporter.sendMail(options);
    transporter.close();
  }

  static async getTemplate (filename: string, options?: Dictionary<string | number>) {
    let template = null;

    const path = join(__dirname, `./templates/${filename}`);

    try {
      template = await readTemplate(path, 'utf8');

      if (!template) throw new BusinessError(BusinessErrorCodes.TEMPLATE_NOT_FOUND);

    } catch (err) {
      throw new BusinessError(BusinessErrorCodes.TEMPLATE_NOT_FOUND);
    }

    if (options) {
      template = stringReplace(template, options);
    }

    if (filename.includes('.mjml')) {
      const { html, errors } = mjml(template);

      if (errors && errors.length) {
        throw new BusinessError(BusinessErrorCodes.TEMPLATE_NOT_FOUND);
      }

      template = html;
    }

    return template;
  }
}

export default SMTPService;