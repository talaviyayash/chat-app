import nodemailer from 'nodemailer';
import { env } from './envConfig';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    pass: env.NODEMAILER_EMAIL_PASS,
    user: env.NODEMAILER_EMAIL_USER,
  },
});

export default transporter;
