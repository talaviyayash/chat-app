import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT,
  KAFKA_BROKER: process.env.KAFKA_BROKER || 'localhost:29092',
};
