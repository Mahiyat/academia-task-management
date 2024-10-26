import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import { teacherRoutes } from '../../src/routes/teacherRoutes.js';

// Set up the express app with teacher routes
const app = express();

app.use(express.json());
app.use('/teachers', teacherRoutes);

describe('Teacher Routes', () => {
  describe('GET /teachers', () => {
    it('should retrieve all teachers and return a 200 status', async () => {
      const res = await request(app).get('/teachers');
      
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });
});
