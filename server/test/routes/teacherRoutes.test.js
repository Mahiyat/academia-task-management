import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import sinon from 'sinon';
import { teacherRoutes } from '../../src/routes/teacherRoutes.js';
import teacherServices from '../../src/services/teacherServices.js';

const app = express();

app.use(express.json());
app.use('/teachers', teacherRoutes);

describe('PUT /teachers/:id', () => {
    let req, res, teacherId;

    beforeEach(() => {
      req = {
        body: { courseId: 'courseId' },
      };
      teacherId = 'teacherId'; 
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should update a teacher and return status 200', async () => {
      const updatedTeacher = { id: teacherId, courseId: req.body.courseId };
      sinon.stub(teacherServices, 'updateTeacherCourses').resolves(updatedTeacher);

      const res = await request(app).put(`/teachers/${teacherId}`).send(req.body);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({ message: 'Teacher updated successfully', teacher: updatedTeacher });
    });

    it('should return 404 if the teacher does not exist', async () => {
      sinon.stub(teacherServices, 'updateTeacherCourses').resolves(null);

      const res = await request(app).put(`/teachers/${teacherId}`).send(req.body);

      expect(res.status).to.equal(404);
      expect(res.body).to.deep.equal({ message: 'Teacher not found' });
    });

    it('should return status 500 on error', async () => {
      sinon.stub(teacherServices, 'updateTeacherCourses').throws(new Error('Error updating teacher'));

      const res = await request(app).put(`/teachers/${teacherId}`).send(req.body);

      expect(res.status).to.equal(500);
      expect(res.body).to.deep.equal({ message: 'Error updating teacher', error: 'Error updating teacher' });
    });
  });
