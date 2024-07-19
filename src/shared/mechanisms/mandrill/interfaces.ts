export interface IMandrillMessage {
  html?: string;
  text?: string;
  subject?: string;
  from_email?: string;
  from_name?: string;
  to?: {
    email: string;
    name?: string;
    type?: 'to' | 'cc' | 'bcc';
  };
  headers?: Record<string, unknown>;
  important?: boolean;
  track_opens?: boolean;
  track_clicks?: boolean;
  auto_text?: boolean;
  auto_html?: boolean;
  inline_css?: boolean;
  url_strip_qs?: boolean;
  preserve_recipients?: boolean;
  view_content_link?: boolean;
  bcc_address?: string;
  signing_domain?: string;
  return_path_domain?: string;
  merge?: boolean;
  merge_language?: string;
  global_merge_vars?: {
    name: string;
    content: string;
  }[];
  merge_vars?: {
    rcpt: string;
    vars: {
      name: string;
      content: string;
    }[];
  }[];
  tags?: string[];
  subaccount?: string;
  google_analytics_domains?: string[];
  google_analytics_campaign?: string;
  metadata?: {
    website: string;
  };
  recipient_metadata?: {
    rcpt: string;
    values: {
      user_id: string;
    };
  }[];
  attachments?: {
    type: string;
    name: string;
    content: string;
  }[];
  images?: {
    type: string;
    name: string;
    content: string;
  }[];
}

export interface IMandrillMail {
  message: IMandrillMessage;
  async?: boolean;
  ip_pool?: string;
  send_at?: string;
  template_name?: string;
  template_content?: {
    name: string;
    content: string;
  }[];
}