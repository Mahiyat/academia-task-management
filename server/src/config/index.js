module.exports = {
  app: { port: 5000 },
  mongo_uri: process.env.MONGO_URI,
  cors:
    process.env.NODE_ENV === 'development'
      ? {
          origin: 'http://localhost:3000',
        }
      : {},
};
