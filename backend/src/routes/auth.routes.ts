import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { validateRequest } from '../utils/validateRequest';
import authValidation from '../validators/auth.validator';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(authValidation.registerSchema),
  authController.registerUser,
);

authRouter.post(
  '/login',
  validateRequest(authValidation.loginSchema),
  authController.loginUser,
);

authRouter.get(
  '/verify-email/:token',
  validateRequest(authValidation.verifyEmailSchema, 'params'),
  authController.verifyEmail,
);

authRouter.post(
  '/resend-verification',
  validateRequest(authValidation.resendVerificationSchema),
  authController.resendVerificationEmail,
);

export default authRouter;
