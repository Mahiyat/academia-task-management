// test/controllers/reportController.test.js
import { expect } from 'chai';
import sinon from 'sinon';
import reportGenerationServices from '../../src/services/reportGenerationServices.js';
import { getCourseReport } from '../../src/controllers/reportGenerationController.js';

describe('Report Generation Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { params: { teacherId: 'fakeTeacherId' } };
    res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should respond with generated report', async () => {
    const reportText = 'Sample consolidated report';

    sinon.stub(reportGenerationServices, 'generateCourseReport').resolves(reportText);

    await getCourseReport(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ report: reportText })).to.be.true;
  });

  it('should respond with 404 if teacher is not found', async () => {
    // eslint-disable-next-line max-len
    sinon.stub(reportGenerationServices, 'generateCourseReport').throws(new Error('Teacher not found'));
    await getCourseReport(req, res);
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ error: 'Teacher not found' })).to.be.true;
  });

  it('should respond with 200 and message if teacher has no courses', async () => {
    // eslint-disable-next-line max-len
    sinon.stub(reportGenerationServices, 'generateCourseReport').resolves(null); 
    await getCourseReport(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: 'No courses found for this teacher' })).to.be.true;
  });

  it('should handle errors and respond with a 500 status', async () => {
    const error = new Error('Report generation failed');

    sinon.stub(reportGenerationServices, 'generateCourseReport').throws(error);

    await getCourseReport(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: error.message })).to.be.true;
  });
});
