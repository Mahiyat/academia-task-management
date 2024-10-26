import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const config = {
  app: { port: 5000 },
  // eslint-disable-next-line camelcase
  mongo_uri: process.env.MONGO_URI,
  cors:
    process.env.NODE_ENV === 'development'
      ? {
        origin: 'http://localhost:3000',
      }
      : {},
};

export default config;
