import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import config from './config/index.js';

import { connectMongoDB } from './db.js';

import { userRoutes } from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors(config.cors));

app.get('/_status', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

connectMongoDB();

app.use('/api', userRoutes);

app.listen(config.app.port, () => {
  console.log(`Example app listening on port ${config.app.port}`);
});
