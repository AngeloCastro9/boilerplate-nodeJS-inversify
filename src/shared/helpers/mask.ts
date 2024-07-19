export class MaskHelper {
  static maskText (input: string, pattern: string): string {
    if (!input || !pattern) return '--';

    let index = 0;
    return pattern.replace(/#/g, () => input[index++]).replace(/undefined/g, '');
  }

  static maskPhone (phone: string): string {
    return MaskHelper.maskText(phone, '### (##) ####-####');
  }

  static maskPersonalDocument (cpf: string): string {
    return MaskHelper.maskText(cpf, '###.###.###-##');
  }

  static maskCPNJ (cnpj: string): string {
    return MaskHelper.maskText(cnpj, '##.###.###/####-##');
  }

  static hideEmail (email: string): string {
    if (!email.includes('@')) return '****';

    const [ username, domain ] = email.split('@');

    const firstChars = username.substring(0, 4);
    const hiddenChars = Array(username[0].length - 4)
      .fill('*')
      .join('');

    return firstChars.concat(hiddenChars, '@', domain);
  }

  static hideCellphone (cellphone: string): string {
    const hiddenChars = Array(cellphone.length - 4)
      .fill('*')
      .join('');
    const lastChars = cellphone.substring(cellphone.length - 4, cellphone.length);

    return hiddenChars.concat(lastChars);
  }
}