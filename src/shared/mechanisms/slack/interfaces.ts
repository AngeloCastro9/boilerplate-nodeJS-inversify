export interface ISlackMessage {
  text: string;
  emoji?: string;
  channel?: string;
  username?: string;
}

export interface ISlackAttachment {
  color: string;
  fields: {
    title: string;
    value: string;
    short?: boolean;
  }[];
}

export interface ISlackService {
  sendMessage(message: ISlackMessage): Promise<void>;
  sendAttachments(attachments: ISlackAttachment[]): Promise<void>;
}