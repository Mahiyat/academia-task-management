import { expect } from "chai";
import sinon from "sinon";
import { getSemesterProgress } from "../../src/controllers/semesterProgressController.js";
import semesterProgressServices from "../../src/services/semesterProgressServices.js";

describe("Semester Progress Controller", () => {
  let req, res;

  beforeEach(() => {
    
    req = { params: { semesterId: "2024" } };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore(); 
  });

  describe("getSemesterProgress", () => {
    it("should return detailed semester progress data with status 200", async () => {
    
      const progressData = {
        semesterId: "2024",
        overallProgress: 75,
        coursesProgress: [
          {
            courseId: "course1",
            courseName: "Mathematics",
            courseCode: "MATH101",
            lectureProgress: "66.67",
            tutorialProgress: "80.00",
          },
          {
            courseId: "course2",
            courseName: "Physics",
            courseCode: "PHYS101",
            lectureProgress: "70.00",
            tutorialProgress: "85.00",
          },
        ],
      };

     
      sinon.stub(semesterProgressServices, "getSemesterProgress").resolves(progressData);

      await getSemesterProgress(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(progressData)).to.be.true;
    });

    it("should return status 404 if progress data not found", async () => {
      sinon.stub(semesterProgressServices, "getSemesterProgress").resolves(null);

      await getSemesterProgress(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Progress data not found' })).to.be.true;
    });

    it("should return status 500 if there is an error", async () => {
      const errorMessage = "An error occurred";
      
      sinon.stub(semesterProgressServices, "getSemesterProgress").rejects(new Error(errorMessage));

      await getSemesterProgress(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: errorMessage })).to.be.true;
    });
  });
});
