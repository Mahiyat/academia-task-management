// import express from 'express';
// import request from 'supertest';
// import { expect } from 'chai';
// import sinon from 'sinon';
// import semesterProgressRoutes from '../../src/routes/semesterProgressRoutes.js';
// import semesterProgressServices from '../../src/services/semesterProgressServices.js';

// const app = express();
// app.use(express.json());
// app.use('/semesters', semesterProgressRoutes); 

// describe('Semester Progress Routes', () => {
//   afterEach(() => {
//     sinon.restore(); 
//   });

//   describe('GET /semesters/:semesterId/progress', () => {
//     it('should return progress data for the specified semester with status 200', async () => {
//       const semesterId = '2024'; 
//       const progressData = { semesterId: '2024', overallProgress: 80 }; 

//       sinon.stub(semesterProgressServices, 'getSemesterProgress').resolves(progressData);

//       const res = await request(app).get(`/semesters/${semesterId}/progress`);

//       expect(res.status).to.equal(200);
//       expect(res.body).to.deep.equal(progressData);
//     });

//     it('should return status 404 if progress data is not found', async () => {
//       const semesterId = '2024';

    
//       sinon.stub(semesterProgressServices, 'getSemesterProgress').resolves(null);

//       const res = await request(app).get(`/semesters/${semesterId}/progress`);

//       expect(res.status).to.equal(404);
//       expect(res.body.message).to.equal('Progress data not found');
//     });
//   });
// });
