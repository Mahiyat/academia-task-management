import { expect } from "chai";
import sinon from "sinon";
import Semester from "../../src/models/Semester.js";

describe("Semester Model", () => {
  it("should create a new semester", async () => {
    // Mock the semester data
    const semesterData = {
      semesterTitle: "Fall 2024",
      semesterYear: 2024,
      semesterNo: 1,
      courses: [],
      examCommittee: [],
      sessionYear: "2024-2025",
      programType: "Undergraduate",
    };

    // Create a new semester instance
    const semester = new Semester(semesterData);

    // Stub the save method of the model
    const saveStub = sinon.stub(Semester.prototype, "save").resolves(semesterData);

    // Call the save method and assert the outcome
    const result = await semester.save();

    expect(result.semesterTitle).to.equal("Fall 2024");
    expect(result.semesterYear).to.equal(2024);
    expect(result.semesterNo).to.equal(1);
    expect(result.sessionYear).to.equal("2024-2025");
    expect(result.programType).to.equal("Undergraduate");

    // Restore the stubbed save method
    saveStub.restore();
  });
});
