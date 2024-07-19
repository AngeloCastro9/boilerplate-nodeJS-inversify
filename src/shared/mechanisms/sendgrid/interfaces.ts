import { Dictionary } from '@core/models/dictionary';

export interface ISendgridSendMailParams {
  to: string;
  from: string;
  subject?: string;
  text?: string;
  html?: string;
  template?: string;
  substitutions?: Dictionary<string>;
  attachments?: ISendgridAttachment[];
}

export interface ISendgridAttachment {
  content: string;
  filename: string;
  type?: string;
  disposition?: string;
}

export interface ISendgridService {
  send(mail: ISendgridSendMailParams): Promise<void>;
}