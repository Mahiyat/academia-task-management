// test/controllers/classTutOverviewController.test.js
import { expect } from "chai";
import sinon from "sinon";
import { getClassTutOverview } from "../../src/controllers/classTutOverviewController.js";
import classTutOverviewService from "../../src/services/classTutOverviewServices.js";

describe("getClassTutOverview Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: { teacherId: "123" } };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return overview data with a 200 status", async () => {
    const overviewData = {
      courseCode: "AI101",
      courseName: "Introduction to AI",
      courseCredit: 3,
      courseType: "Theory",
      contactHours: 45,
      expectedNoOfClasses: 20,
      expectedNoOfTutorials: 10,
      noOfClassesTaken: 15,
      noOfTutorialsTaken: 6,
      courseTeachers: [],
      semester: null,
    };
    
    sinon
      .stub(classTutOverviewService, "getCourseOverviewData")
      .resolves(overviewData);

    await getClassTutOverview(req, res, next);

    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(res.json.calledOnceWith(overviewData)).to.be.true;
  });

  it("should return a 404 status when no course data is available", async () => {
    sinon
      .stub(classTutOverviewService, "getCourseOverviewData")
      .rejects(new Error("No course data available"));

    await getClassTutOverview(req, res, next);

    expect(res.status.calledOnceWith(404)).to.be.true;
    expect(res.json.calledOnceWith({ message: "No course data available." })).to
      .be.true;
  });

  it("should return a 500 status when unable to load class and tutorial overview", async () => {
    sinon
      .stub(classTutOverviewService, "getCourseOverviewData")
      .rejects(new Error("Unable to load class and tutorial overview."));

    await getClassTutOverview(req, res, next);

    expect(res.status.calledOnceWith(500)).to.be.true;
    expect(
      res.json.calledOnceWith({
        message: "Unable to load class and tutorial overview.",
      })
    ).to.be.true;
  });

  it("should return a 500 status with a general error message for unexpected errors", async () => {
    sinon
      .stub(classTutOverviewService, "getCourseOverviewData")
      .rejects(new Error("Unexpected error"));

    await getClassTutOverview(req, res, next);

    expect(res.status.calledOnceWith(500)).to.be.true;
    expect(
      res.json.calledOnceWith({
        message: "System error – unable to retrieve progress chart.",
      })
    ).to.be.true;
  });
});
