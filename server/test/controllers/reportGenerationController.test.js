import { expect } from 'chai';
import sinon from 'sinon';
import teacherServices from '../../src/services/teacherServices.js';
import { getCourseReport } from '../../src/controllers/reportGenerationController.js';
import { Ollama } from 'ollama';

describe('Report Generation Controller', function () {
  this.timeout(5000);

  let req, res;
  let ollamaStub;

  beforeEach(() => {
    req = { params: { teacherId: '6722664b2722d82a38dd1fc8' } };
    res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    ollamaStub = sinon.stub(Ollama.prototype, 'chat').resolves({
      message: { content: 'Mock report content' },
    });

    sinon.stub(teacherServices, 'getTeacherById').resolves({
      _id: '6722664b2722d82a38dd1fc8',
      firstName: 'Alice',
      lastName: 'Johnson',
      courses: [
        {
          courseCode: 'CSE101',
          courseName: 'Computer Science Basics',
          expectedNoOfClasses: 20,
          noOfClassesTaken: 18,
          expectedNoOfTutorials: 10,
          noOfTutorialsTaken: 8,
        },
        {
          courseCode: 'CSE102',
          courseName: 'Data Structures',
          expectedNoOfClasses: 20,
          noOfClassesTaken: 15,
          expectedNoOfTutorials: 8,
          noOfTutorialsTaken: 6,
        },
      ],
    });
  });

  afterEach(() => {
    sinon.restore(); 
  });

  it('should respond with a consolidated report for all courses', async () => {
    await getCourseReport(req, res);

    // eslint-disable-next-line max-len
    const report = `## Course: Computer Science Basics (CSE101)\n\n**Report:**\n\nMock report content\n\n` +
                   `## Course: Data Structures (CSE102)\n\n**Report:**\n\nMock report content\n\n`;

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ report })).to.be.true;
  });

  it('should respond with 404 if teacher is not found', async () => {
    teacherServices.getTeacherById.resolves(null); 

    await getCourseReport(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Teacher not found' })).to.be.true;
  });

  it('should respond with 200 and message if teacher has no courses', async () => {
    teacherServices.getTeacherById.resolves({
      _id: '6722664b2722d82a38dd1fc8',
      firstName: 'Alice',
      lastName: 'Johnson',
      courses: [], 
    });

    await getCourseReport(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: 'No courses found for this teacher' })).to.be.true;
  });

  it('should respond with 400 if some course reports are empty', async () => {
    ollamaStub.onFirstCall().resolves({ message: { content: '' } });
    ollamaStub.onSecondCall().resolves({ message: { content: 'Valid report for CSE102' } });

    await getCourseReport(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({
      error: 'Some course reports are empty or missing sections.',
      invalidReports: [
        { courseName: 'Computer Science Basics', courseCode: 'CSE101' }
      ]
    })).to.be.true;
  });

  it('should handle errors and respond with a 500 status', async () => {
    const error = new Error('Report generation failed');

    ollamaStub.rejects(error);

    await getCourseReport(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: error.message })).to.be.true;
  });
});
