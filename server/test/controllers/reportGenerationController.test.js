import { expect } from 'chai';
import sinon from 'sinon';
import reportGenerationServices from '../../src/services/reportGenerationServices.js';
import { getCourseReport } from '../../src/controllers/reportGenerationController.js';

describe('Report Generation Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { params: { teacherId: '6722664b2722d82a38dd1fc8' } };
    res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should respond with generated report', async () => {
    const courseReports = [
      { courseName: 'Course 1', courseCode: 'CSE101', report: 'This is the report for CSE101' },
      { courseName: 'Course 2', courseCode: 'CSE102', report: 'This is the report for CSE102' }
    ];

    sinon.stub(reportGenerationServices, 'generateCourseReport').resolves(courseReports);

    await getCourseReport(req, res);

    const report = courseReports.map(courseReport => (
      `Course: ${courseReport.courseName} (${courseReport.courseCode})\n` +
      `Report:\n${courseReport.report}\n\n`
    )).join('');

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ report: report })).to.be.true;
  });

  it('should respond with 404 if teacher is not found', async () => {
    // eslint-disable-next-line max-len
    sinon.stub(reportGenerationServices, 'generateCourseReport').throws(new Error('Teacher not found'));

    await getCourseReport(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ error: 'Teacher not found' })).to.be.true;
  });

  it('should respond with 200 and message if teacher has no courses', async () => {
    sinon.stub(reportGenerationServices, 'generateCourseReport').resolves([]);

    await getCourseReport(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: 'No courses found for this teacher' })).to.be.true;
  });

  it('should respond with 400 if some course reports are empty', async () => {
    const courseReports = [
      { courseName: 'Course 1', courseCode: 'CSE101', report: '' },  
      { courseName: 'Course 2', courseCode: 'CSE102', report: 'Valid report for CSE102' }
    ];

    sinon.stub(reportGenerationServices, 'generateCourseReport').resolves(courseReports);

    await getCourseReport(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({
      error: 'Some course reports are empty or missing sections.',
      invalidReports: [
        { courseName: 'Course 1', courseCode: 'CSE101' }
      ]
    })).to.be.true;
  });

  it('should handle errors and respond with a 500 status', async () => {
    const error = new Error('Report generation failed');

    sinon.stub(reportGenerationServices, 'generateCourseReport').throws(error);

    await getCourseReport(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: error.message })).to.be.true;
  });
});
