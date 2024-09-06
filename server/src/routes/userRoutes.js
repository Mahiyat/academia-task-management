const express = require('express');

const userServices = require('../services/userServices');

const userRoutes = express.Router();

userRoutes.get('/test', async (req, res) => {
  try {
    const testMessage = await userServices.getUserByEmail();
    res.json({ message: testMessage });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

module.exports = userRoutes;
