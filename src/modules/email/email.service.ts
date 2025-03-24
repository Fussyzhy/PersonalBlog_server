import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import mailConfig from './email.config';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport(mailConfig);

  async sendVerificationEmail(to: string, code: string) {
    const mailOptions = {
      from: `"Personal_Blog App" <${mailConfig.auth.user}>`,
      to,
      subject: '注册验证码',
      text: `您的验证码是：${code}，有效期5分钟，请尽快使用。`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}