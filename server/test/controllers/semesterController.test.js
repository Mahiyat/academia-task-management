import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";
import Semester from "../../src/models/Semester.js";
import semesterServices from "../../src/services/semesterServices.js";

describe("Semester Controller", () => {
  let mockSemesters;

  beforeEach(() => {
    // Initialize mock data for each test with ObjectIds
    mockSemesters = [
      {
        _id: new mongoose.Types.ObjectId(),
        semesterTitle: "Spring 2024",
        semesterYear: 2024,
        semesterNo: 1,
        courses: [
          new mongoose.Types.ObjectId(), // Mock course ObjectId
        ],
        examCommittee: [
          new mongoose.Types.ObjectId(), // Mock teacher ObjectId
          new mongoose.Types.ObjectId(), // Another mock teacher ObjectId
        ],
        sessionYear: "2023-2024",
        programType: "Undergraduate",
      },
    ];
  });

  afterEach(() => {
    // Restore original methods after each test
    sinon.restore();
  });

  describe("getAllSemesters", () => {
    it("should fetch all semesters with populated courses and examCommittee", async () => {
      // Stub Semester.find().populate() to return mock data
      const populateStub = sinon.stub().resolves(mockSemesters);

      sinon.stub(Semester, "find").returns({
        populate: sinon.stub().returns({ populate: populateStub }),
      });

      const semesters = await semesterServices.getAllSemesters();

      expect(semesters).to.deep.equal(mockSemesters);
    });
  });

  describe("updateSemester", () => {
    it("should update the semester with given data and return updated document", async () => {
      // Mock data
      // eslint-disable-next-line no-underscore-dangle
      const semesterId = mockSemesters[0]._id;

      const updatedData = { semesterTitle: "Updated Title" };
      const updatedSemester = {
        ...mockSemesters[0],
        semesterTitle: "Updated Title",
      };

      // Stub Semester.findByIdAndUpdate to return updated data
      sinon.stub(Semester, "findByIdAndUpdate").resolves(updatedSemester);

      const result = await semesterServices.updateSemester(
        semesterId,
        updatedData
      );

      expect(result).to.deep.equal(updatedSemester);
    });

    it("should return null if semester to update is not found", async () => {
      // Mock data
      const semesterId = new mongoose.Types.ObjectId(); // Non-existing semesterId
      const updatedData = { semesterTitle: "Updated Title" };

      // Stub Semester.findByIdAndUpdate to return null
      sinon.stub(Semester, "findByIdAndUpdate").resolves(null);

      const result = await semesterServices.updateSemester(
        semesterId,
        updatedData
      );
      
      expect(result).to.be.null;
    });
  });

  describe("addExamCommitteeMember", () => {
    it("should add a teacher to the exam committee and return updated document", async () => {
      // Mock data
      // eslint-disable-next-line no-underscore-dangle
      const semesterId = mockSemesters[0]._id;
      const teacherId = new mongoose.Types.ObjectId(); // New teacher ObjectId
      const updatedSemester = {
        ...mockSemesters[0],
        examCommittee: [...mockSemesters[0].examCommittee, teacherId],
      };

      // Stub Semester.findByIdAndUpdate to return updated semester data
      sinon.stub(Semester, "findByIdAndUpdate").resolves(updatedSemester);

      const result = await semesterServices.addExamCommitteeMember(
        semesterId,
        teacherId
      );

      expect(result).to.deep.equal(updatedSemester);
    });

    it("should return null if semester to update exam committee is not found", async () => {
      // Mock data
      const semesterId = new mongoose.Types.ObjectId(); // Non-existing semesterId
      const teacherId = new mongoose.Types.ObjectId();

      // Stub Semester.findByIdAndUpdate to return null
      sinon.stub(Semester, "findByIdAndUpdate").resolves(null);

      const result = await semesterServices.addExamCommitteeMember(
        semesterId,
        teacherId
      );
      
      expect(result).to.be.null;
    });
  });
});
