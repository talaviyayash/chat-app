import dotenv from 'dotenv';
dotenv.config({});

export const env = {
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  NODEMAILER_EMAIL_PASS: process.env.NODEMAILER_EMAIL_PASS,
  NODEMAILER_EMAIL_USER: process.env.NODEMAILER_EMAIL_USER,
};
