export interface ISendTextMailDTO {
  text: string;
  to: string[];
  subject?: string;
  important?: boolean;
  attachments?: ISendlAttachment[];
}

export interface ISendTemplateMailContentDTO {
  name: string;
  content: string;
}

export interface ISendTemplateMailDTO {
  to: string[];
  subject?: string;
  important?: boolean;
  template?: string;
  content?: ISendTemplateMailContentDTO[];
  attachments?: ISendlAttachment[];
}

export interface ISendlAttachment {
  filename: string;
  content: Buffer;
}