import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { otpEmailTemplate } from '../templates/otp-email.template';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: Transporter | null;

  constructor() {
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      this.logger.warn('SMTP is not configured. OTP will only be logged to console.');
      this.transporter = null;
      return;
    }

    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);

    this.transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendVerificationOtp(email: string, otp: string, fullName?: string): Promise<void> {
    const content = otpEmailTemplate(otp, fullName);

    if (!this.transporter) {
      this.logger.log(`OTP for ${email}: ${otp}`);
      return;
    }

    await this.transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME || 'Dashboard XP'} <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: content.subject,
      html: content.html,
      text: content.text,
    });
  }
}
