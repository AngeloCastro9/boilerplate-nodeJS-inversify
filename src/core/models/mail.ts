export interface ISendTextMail {
  text: string;
  to: string[];
  subject?: string;
  important?: boolean;
}

export interface ISendTemplateMailContent {
  name: string;
  content: string;
}

export interface ISendTemplateMail {
  to: string[];
  subject?: string;
  important?: boolean;
  template?: string
  content?: ISendTemplateMailContent[];
}