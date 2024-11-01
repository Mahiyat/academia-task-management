import express from 'express';
import request from 'supertest';
import { expect } from 'chai';
import { courseRoutes } from '../../src/routes/courseRoutes.js'; // Adjust the path as necessary
import sinon from 'sinon';
import courseService from '../../src/services/courseServices.js'; // Adjust the path as necessary

const app = express();
app.use(express.json());
app.use('/courses', courseRoutes); // Mounting the course routes

describe('Course Routes', () => {
  afterEach(() => {
    sinon.restore(); // Restore all stubs after each test
  });

  describe('POST /courses', () => {
    it('should create a new course and return status 201', async () => {
      const newCourse = {
        courseCode: 'CS101',
        courseName: 'Introduction to Computer Science',
        courseCredit: 3,
        courseType: 'Lecture',
      };

      // Stub the courseService method
      sinon.stub(courseService, 'createNewCourse').resolves(newCourse);

      const res = await request(app).post('/courses').send(newCourse);
      
      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('Course created!');
      expect(res.body.course).to.deep.equal(newCourse);
    });

    it('should return status 500 if there is an error', async () => {
      const newCourse = {
        courseCode: 'CS101',
        courseName: 'Introduction to Computer Science',
        courseCredit: 3,
        courseType: 'Lecture',
      };

      // Stub the courseService method to throw an error
      sinon.stub(courseService, 'createNewCourse').rejects(new Error('Error creating course'));

      const res = await request(app).post('/courses').send(newCourse);

      expect(res.status).to.equal(500);
      expect(res.body.message).to.equal('Error creating course');
    });
  });

  describe('GET /courses', () => {
    it('should fetch all courses and return status 200', async () => {
      const courses = [
        {
          courseCode: 'CS101',
          courseName: 'Introduction to Computer Science',
        },
        {
          courseCode: 'CS102',
          courseName: 'Data Structures',
        },
      ];

      // Stub the courseService method
      sinon.stub(courseService, 'getAllCourses').resolves(courses);

      const res = await request(app).get('/courses');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(courses);
    });

    it('should return status 500 if there is an error', async () => {
      // Stub the courseService method to throw an error
      sinon.stub(courseService, 'getAllCourses').rejects(new Error('Error fetching courses'));

      const res = await request(app).get('/courses');

      expect(res.status).to.equal(500);
      expect(res.body.message).to.equal('Error fetching courses');
    });
  });

  describe('GET /courses/:id', () => {
    it('should get a specific course by ID and return status 200', async () => {
      const courseId = 'someCourseId';
      const course = {
        courseCode: 'CS101',
        courseName: 'Introduction to Computer Science',
      };

      // Stub the courseService method
      sinon.stub(courseService, 'getCourseById').resolves(course);

      const res = await request(app).get(`/courses/${courseId}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(course);
    });

    it('should return status 404 if the course is not found', async () => {
      const courseId = 'invalidCourseId';

      // Stub the courseService method to return null
      sinon.stub(courseService, 'getCourseById').resolves(null);

      const res = await request(app).get(`/courses/${courseId}`);

      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('Course not found');
    });

    it('should return status 500 if there is an error', async () => {
      const courseId = 'someCourseId';

      // Stub the courseService method to throw an error
      sinon.stub(courseService, 'getCourseById').rejects(new Error('Error fetching course'));

      const res = await request(app).get(`/courses/${courseId}`);

      expect(res.status).to.equal(500);
      expect(res.body.message).to.equal('Error fetching course');
    });
  });

});
