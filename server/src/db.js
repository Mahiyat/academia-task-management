const mongoose = require('mongoose');
const config = require('./config');

const DB_URI = config.mongo_uri;

async function connectMongoDB() {
  try {
    await mongoose.connect(DB_URI);
    console.log('mongodb connection successful');
  } catch (error) {
    console.error('failed to connect to mongodb', error);
  }
}

module.exports = {
  connectMongoDB,
};