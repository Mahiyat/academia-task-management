import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import { semesterRoutes } from '../../src/routes/semesterRoutes.js';

// Set up the express app with semester routes
const app = express();

app.use(express.json());
app.use('/semesters', semesterRoutes);

describe('Semester Routes', () => {
  describe('GET /semesters', () => {
    it('should retrieve all semesters and return a 200 status', async () => {
      const res = await request(app).get('/semesters');
      
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('PUT /semesters/updatedSemester/:id', () => {
    it('should update a semester and return a 200 status with updated data', async () => {
      const semesterId = '67213390945ebf69a9cd193a';  // Provide a valid ID here
      const res = await request(app)
        .put(`/semesters/updatedSemester/${semesterId}`)
        .send({ semesterTitle: 'Title is updated' });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('semesterTitle', 'Title is updated');
    });

  });

  describe('PUT /semesters/:id/examCommittee', () => {
    it('should add a teacher to the exam committee and return the updated semester', async () => {
      const semesterId = '67213390945ebf69a9cd193a';  // Provide a valid ID here
      const teacherId = '67252657d611aef3369b7e93';  // Provide a valid teacher ID here
      const res = await request(app)
        .put(`/semesters/${semesterId}/examCommittee`)
        .send({ teacherId });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('examCommittee').that.includes(teacherId);
    });

  });
});
