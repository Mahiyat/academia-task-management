import express from 'express';

import * as userServices from '../services/userServices.js';

// eslint-disable-next-line new-cap
const userRoutes = express.Router();

userRoutes.get('/test', async (req, res) => {
  try {
    const testMessage = await userServices.getUserByEmail();

    res.json({ message: testMessage });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

export { userRoutes };
