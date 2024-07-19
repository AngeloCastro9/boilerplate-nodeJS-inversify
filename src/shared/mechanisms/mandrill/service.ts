import { getInstance } from '@shared/mechanisms/mandrill/instance';
import { IMandrillMail } from '@shared/mechanisms/mandrill/interfaces';

class MandrillService {
  async send (mail: IMandrillMail): Promise<void> {
    const instance = getInstance();

    await instance.post('/messages/send', mail);
  }

  async sendTemplate (mail: IMandrillMail): Promise<void> {
    const instance = getInstance();

    await instance.post('/messages/send-template', mail);
  }
}

export default new MandrillService();