import { Response } from 'express';
import crypto from 'crypto';

export const sendSuccess = (
  res: Response,
  statusCode: number = 200,
  message: string = 'Success',
  data: any = null,
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};
