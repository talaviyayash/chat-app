import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name must not exceed 50 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .min(6)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password must not exceed 128 characters',
      'string.pattern.base':
        'Password must contain at least one lowercase letter, one uppercase letter, and one number',
      'any.required': 'Password is required',
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
});

const resendVerificationSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
});

const verifyEmailSchema = Joi.object({
  token: Joi.string().min(10).max(4096).required().messages({
    'string.empty': 'Verification token is required',
    'string.min': 'Invalid verification token',
    'any.required': 'Verification token is required',
  }),
});

const authValidation = {
  verifyEmailSchema,
  resendVerificationSchema,
  loginSchema,
  registerSchema,
};

export default authValidation;
