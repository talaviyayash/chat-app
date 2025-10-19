import './config/envConfig';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { env } from './config/envConfig';
import './config/db';
import authRouter from './routes/auth.routes';

const corsOptions = {
  origin: true,
  credentials: true,
};
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms '),
);

app.use('/api/auth', authRouter);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Running on ${env.PORT}`);
});
