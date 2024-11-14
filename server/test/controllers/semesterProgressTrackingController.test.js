import { expect } from 'chai';
import sinon from 'sinon';
import { getSemesterProgress, getAllSemestersProgress } 
  from '../../src/controllers/semesterProgressTrackingController.js';
import Semester from '../../src/models/Semester.js';
import semesterProgressTrackingServices 
  from '../../src/services/semesterProgressTrackingServices.js';


describe('Semester Progress Tracking Controller', () => {
  afterEach(() => {
    // Restore any stubbed methods after each test
    sinon.restore();
  });

  describe('getSemesterProgress', () => {
    it('should return progress data for a specific semester', async () => {
      // Mock request and response objects
      const req = { params: { semesterId: '12345' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      // Mock data for the semester and associated courses
      const mockSemester = {
        semesterTitle: 'Fall 2024',
        courses: [
          {
            courseName: 'Mathematics',
            expectedNoOfClasses: 20,
            noOfClassesTaken: 15,
            expectedNoOfTutorials: 10,
            noOfTutorialsTaken: 8
          }
        ]
      };

      // Stub the Semester model's findById and populate method
      const findByIdStub = sinon.stub(Semester, 'findById').returns({
        populate: sinon.stub().resolves(mockSemester)
      });

      // Call the controller function
      await getSemesterProgress(req, res);

      // Expected response data
      const expectedData = {
        semesterTitle: 'Fall 2024',
        progressData: [
          {
            courseName: 'Mathematics',
            classProgress: '75.00',
            tutorialProgress: '80.00',
            totalProgress: '77.50',
            noOfClassesTaken: 15,
            noOfTutorialsTaken: 8
          }
        ]
      };

      // Assertions
      expect(findByIdStub.calledOnceWith('12345')).to.be.true;
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith(expectedData)).to.be.true;
    });

    
  });

  describe('getAllSemestersProgress', () => {
    it('should return total progress data for all semesters in the specified format', async () => {
      // Mock request and response objects
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      /*
       *  Mock data representing multiple semesters 
       * based on the Semester model
       */
      const mockSemestersProgress = [
        {
          semesterTitle: 'Fall 2024',
          totalProgress: '77.50'
        },
        {
          semesterTitle: 'Spring 2025',
          totalProgress: '81.67'
        }
      ];

      // Stub the service function to return mock data
      sinon.stub(semesterProgressTrackingServices, 'getAllSemestersProgress')
        .resolves(mockSemestersProgress);

      // Call the controller function
      await getAllSemestersProgress(req, res);

      // Assertions
      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith(mockSemestersProgress)).to.be.true;
    });
  });
});
