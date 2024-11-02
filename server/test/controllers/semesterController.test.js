import { expect } from "chai";
import sinon from "sinon";
import semesterServices from "../../src/services/semesterServices.js"; // Adjust the path as necessary
import { createSemester } from "../../src/controllers/semesterController.js";

describe("Semester Controller - createSemester", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        semesterTitle: "Fall Semester",
        semesterYear: 2024,
        semesterNo: 1,
        courses: [],
        examCommittee: [],
        sessionYear: "2024-2025",
        programType: "Undergraduate",
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore(); 
    console.log("Restored sinon stubs.");
  });

  it("should create a new semester and return status 201", async () => {
    sinon.stub(semesterServices, "createSemester").resolves(req.body);
    await createSemester(req, res);

  });

  it("should return status 500 on error", async () => {
    sinon.stub(semesterServices, "createSemester").throws(new Error("Error creating semester"));
    await createSemester(req, res);
  });
});
