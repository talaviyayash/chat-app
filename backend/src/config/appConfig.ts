import rateLimit from 'express-rate-limit';

const corsOptions = {
  origin: true,
  credentials: true,
};

const globalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const appConfig = {
  globalLimiter,
  corsOptions,
};

export default appConfig;
