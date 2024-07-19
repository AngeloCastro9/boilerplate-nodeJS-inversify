import { IncomingWebhook } from '@slack/webhook';

import { getEnv } from '@core/constants';

import LoggerManager from '@shared/log/manager';
import { ISlackAttachment, ISlackMessage, ISlackService } from '@shared/mechanisms/slack/interfaces';

class SlackService implements ISlackService {
  private client: IncomingWebhook;

  constructor () {
    this.client = new IncomingWebhook(getEnv().slack.webhookUrl);
  }

  async sendMessage (message: ISlackMessage): Promise<void> {
    if (!getEnv().slack.enabled) return;

    this.client
      .send({
        text: message.text,
        icon_emoji: message.emoji,
        channel: message.channel,
        username: message.username,
      })
      .catch((err) => {
        LoggerManager.log('application', {
          origin: 'slack',
          method: 'send-message',
          type: 'err',
          err,
        });
      });
  }

  async sendAttachments (attachments: ISlackAttachment[]): Promise<void> {
    if (!getEnv().slack.enabled) return;

    this.client
      .send({ attachments })
      .catch((err) => {
        LoggerManager.log('application', {
          origin: 'slack',
          method: 'send-attachments',
          type: 'err',
          err,
        });
      });
  }
}

export default new SlackService();