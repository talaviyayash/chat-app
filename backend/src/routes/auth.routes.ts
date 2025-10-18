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

const router = Router();

router.post('/register', validateRequest(registerSchema), registerUser);

router.post('/login', validateRequest(loginSchema), loginUser);

router.get(
  '/verify-email/:token',
  validateRequest(verifyEmailSchema, 'params'),
  verifyEmail,
);

router.post(
  '/resend-verification',
  validateRequest(resendVerificationSchema),
  resendVerificationEmail,
);

export default router;
