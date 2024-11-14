/* eslint-disable max-len */
import { expect } from "chai";
import sinon from "sinon";
import semesterServices from "../../src/services/semesterServices.js";
import { getCoursesBySemester } from "../../src/controllers/performanceChairmanController.js";

describe("getCoursesBySemester", () => {
  let req, res;

  beforeEach(() => {
    req = { params: { semesterId: "1" } };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should fetch courses for a specific semester and return status 200", async () => {
    const courses = [
      { id: "101", courseCode: "CS101", courseName: "Introduction to Computer Science", semesterId: "1" },
      { id: "102", courseCode: "CS102", courseName: "Data Structures", semesterId: "1" },
    ];

    sinon.stub(semesterServices, "getCoursesBySemesterId").resolves(courses);

    await getCoursesBySemester(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(courses)).to.be.true;
  });

  it("should return 404 if no courses found for the semester", async () => {
    sinon.stub(semesterServices, "getCoursesBySemesterId").resolves([]);

    await getCoursesBySemester(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: "No courses found for this semester." })).to.be.true;
  });

  it("should return status 500 on error", async () => {
    sinon.stub(semesterServices, "getCoursesBySemesterId").throws(new Error("Error fetching courses"));

    await getCoursesBySemester(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: "Error fetching courses", error: "Error fetching courses" })).to.be.true;
  });
});
