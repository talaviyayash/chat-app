import { Router } from 'express';
import {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
} from '../controllers/auth.controller';
import { validateRequest } from '../utils/validateRequest';
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendVerificationSchema,
} from '../validators/auth.validator';

const authRouter = Router();

authRouter.post('/register', validateRequest(registerSchema), registerUser);

authRouter.post('/login', validateRequest(loginSchema), loginUser);

authRouter.get(
  '/verify-email/:token',
  validateRequest(verifyEmailSchema, 'params'),
  verifyEmail,
);

authRouter.post(
  '/resend-verification',
  validateRequest(resendVerificationSchema),
  resendVerificationEmail,
);

export default authRouter;
