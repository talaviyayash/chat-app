import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { sendSuccess } from '../utils/customeFunc';
import { AppError } from '../utils/AppError';
import { sendEmail } from '../utils/sendEmail';
import { env } from '../config/envConfig';
import { verificationTemplate } from '../template/email/verification';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) throw new AppError('Email already registered', 400);

  const verificationJwt = jwt.sign(
    { sub: 'temp_id', type: 'email_verify' },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '24h' },
  );

  const user = await UserModel.create({
    name,
    email,
    password,
    verification: {
      isVerified: false,
      token: verificationJwt,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  const finalVerificationJwt = jwt.sign(
    { sub: String(user._id), type: 'email_verify' },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '24h' },
  );

  user.verification.token = finalVerificationJwt;
  await user.save();

  const verificationUrl = `${env.FRONTEND_URL}/verify-email?token=${finalVerificationJwt}`;

  await sendEmail({
    to: email,
    subject: 'Verify Your Email Address - Chat App',
    html: verificationTemplate(verificationUrl, name),
  });

  return sendSuccess(
    res,
    201,
    'User registered successfully. Please check your email to verify your account.',
    {
      name: user.name,
      email: user.email,
      _id: user._id,
    },
  );
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) throw new AppError('Invalid email or password', 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError('Invalid email or password', 401);

  if (!user.verification.isVerified)
    throw new AppError('User email is not verified', 403);

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '7d' },
  );

  user.lastSeen = new Date();
  await user.save();

  const filteredUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage || '',
  };

  return sendSuccess(res, 200, 'Login successful', {
    user: filteredUser,
    token,
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  let userId: string | null = null;
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret',
    ) as { sub?: string; type?: string };
    if (decoded.type !== 'email_verify' || !decoded.sub)
      throw new Error('Invalid token');
    userId = decoded.sub;
  } catch (_err) {
    throw new AppError('Invalid or expired verification token', 400);
  }

  const user = await UserModel.findById(userId);
  if (!user) throw new AppError('User not found', 404);

  if (user.verification.token !== token)
    throw new AppError('Invalid verification token', 400);

  if (user.verification.expires && user.verification.expires < new Date())
    throw new AppError('Verification token has expired', 400);

  if (user.verification.isVerified)
    return sendSuccess(res, 200, 'Email already verified');

  user.verification.isVerified = true;
  user.verification.token = null;
  user.verification.expires = null;
  await user.save();

  return sendSuccess(res, 200, 'Email verified successfully');
};

export const resendVerificationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) throw new AppError('User not found', 404);

  if (user.verification.isVerified) {
    return sendSuccess(res, 200, 'Email already verified');
  }

  const verificationJwt = jwt.sign(
    { sub: String(user._id), type: 'email_verify' },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '24h' },
  );

  user.verification.token = verificationJwt;
  user.verification.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save();

  const verificationUrl = `${env.FRONTEND_URL}/verify-email?token=${verificationJwt}`;

  await sendEmail({
    to: email,
    subject: 'Verify Your Email Address - Chat App',
    html: verificationTemplate(verificationUrl, user.name),
  });

  return sendSuccess(res, 200, 'Verification email sent successfully');
};
