import { Dictionary } from '@core/models/dictionary';

export interface ISMTPTextMail {
  from: {
    address?: string;
    name?: string;
  };
  to: string;
  subject: string;
  text?: string;
}

export interface ISMTPTemplateMail {
  from: {
    address?: string;
    name?: string;
  };
  to: string;
  subject: string;
  template?: string;
  options?: Dictionary<string | number>;
  attachments?: ISMTPMailAttachment[];
}

export interface ISMTPMailAttachment {
  filename: string;
  content: Buffer;
}