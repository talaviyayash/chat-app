// sendEmail.ts

import { env } from '../config/envConfig';
import transporter from '../config/mailer';
import { AppError } from './AppError';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: EmailOptions): Promise<void> => {
  try {
    await transporter.sendMail({
      from: `"Your App" <${env.NODEMAILER_EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new AppError('Failed to send email', 500);
  }
};
