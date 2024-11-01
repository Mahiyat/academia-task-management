import express from 'express';
import request from 'supertest';
import { expect } from 'chai';
// eslint-disable-next-line max-len
import { performanceRoutes } from '../../src/routes/performanceRoutes.js'; // Adjust the path as necessary
import sinon from 'sinon';
import teacherService from '../../src/services/teacherServices.js'; // Adjust the path as necessary

const app = express();

app.use(express.json());
app.use('/performance', performanceRoutes); // Mounting the performance routes

describe('Performance Routes', () => {
  afterEach(() => {
    sinon.restore(); // Restore all stubs after each test
  });

  describe('GET /teacher', () => {
    it('should fetch all teachers and return status 200', async () => {
      const teachers = [
        { id: '1', firstName: 'John', lastName: 'Doe' },
        { id: '2', firstName: 'Jane', lastName: 'Smith' },
      ];

      // Stub the teacherService method
      sinon.stub(teacherService, 'getAllTeachers').resolves(teachers);

      const res = await request(app).get('/performance/teacher');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(teachers);
    });

    it('should return status 500 if there is an error', async () => {
      // Stub the teacherService method to throw an error
      sinon.stub(teacherService, 'getAllTeachers').rejects(new Error('Error fetching teachers'));

      const res = await request(app).get('/performance/teacher');

      expect(res.status).to.equal(500);
      expect(res.body.message).to.equal('Error fetching teachers');
    });
  });

  describe('GET /teacher/:id', () => {
    it('should return a teacher by ID and status 200', async () => {
      const teacherId = '1';
      const teacher = { id: '1', firstName: 'John', lastName: 'Doe' };

      // Stub the teacherService method
      sinon.stub(teacherService, 'getTeacherById').resolves(teacher);

      const res = await request(app).get(`/performance/teacher/${teacherId}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(teacher);
    });

    it('should return status 404 if the teacher does not exist', async () => {
      const teacherId = 'invalidId';

      // Stub the teacherService method to return null
      sinon.stub(teacherService, 'getTeacherById').resolves(null);

      const res = await request(app).get(`/performance/teacher/${teacherId}`);

      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('Teacher not found');
    });

    it('should return status 500 if there is an error', async () => {
      const teacherId = '1';

      // Stub the teacherService method to throw an error
      sinon.stub(teacherService, 'getTeacherById').rejects(new Error('Error fetching teacher'));

      const res = await request(app).get(`/performance/teacher/${teacherId}`);

      expect(res.status).to.equal(500);
      expect(res.body.message).to.equal('Error fetching teacher');
    });
  });

  describe('GET /teacherCourse/:id', () => {
    it('should return courses for a specific teacher and status 200', async () => {
      const teacherId = '1';
      const courses = [
        { courseCode: 'CS101', courseName: 'Introduction to Computer Science' },
        { courseCode: 'CS102', courseName: 'Data Structures' },
      ];

      // Stub the teacherService method
      sinon.stub(teacherService, 'getCoursesByTeacherId').resolves(courses);

      const res = await request(app).get(`/performance/teacherCourse/${teacherId}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(courses);
    });

    it('should return status 404 if no courses found for the teacher', async () => {
      const teacherId = '1';

      // Stub the teacherService method to return an empty array
      sinon.stub(teacherService, 'getCoursesByTeacherId').resolves([]);

      const res = await request(app).get(`/performance/teacherCourse/${teacherId}`);

      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('Course data missing for the specified teacher.');
    });

    it('should return status 500 if there is an error', async () => {
      const teacherId = '1';

      // Stub the teacherService method to throw an error
      // eslint-disable-next-line max-len
      sinon.stub(teacherService, 'getCoursesByTeacherId').rejects(new Error('Error fetching courses'));

      const res = await request(app).get(`/performance/teacherCourse/${teacherId}`);

      expect(res.status).to.equal(500);
      expect(res.body.message).to.equal('System error – Please try again later.');
    });
  });
});
