import mongoose from 'mongoose';
import config from './config/index.js';

const DB_URI = config.mongo_uri;

async function connectMongoDB() {
  try {
    await mongoose.connect(DB_URI);
    console.log('mongodb connection successful');
  } catch (error) {
    console.error('failed to connect to mongodb', error);
  }
}

export { connectMongoDB };
