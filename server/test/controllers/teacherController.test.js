import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";
import { getAllTeachers } from "../../src/controllers/teacherController.js";
import teacherServices from "../../src/services/teacherServices.js";

describe("Teacher Controller", () => {
  afterEach(() => {
    // Restore any stubbed methods after each test
    sinon.restore();
  });

  describe("getAllTeachers", () => {
    it("should fetch teachers with courses populated and return in response", async () => {
      // Mock data for teachers
      const mockTeachers = [
        {
          _id: new mongoose.Types.ObjectId(),
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phoneNumber: "123-456-7890",
          designation: "Professor",
          courses: [
            {
              _id: new mongoose.Types.ObjectId(),
              courseName: "Mathematics",
              courseCode: "MATH101",
            },
          ],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          phoneNumber: "098-765-4321",
          designation: "Assistant Professor",
          courses: [
            {
              _id: new mongoose.Types.ObjectId(),
              courseName: "Physics",
              courseCode: "PHY101",
            },
          ],
        },
      ];

      // Stub teacherServices.getAllTeachers to return mock data
      sinon.stub(teacherServices, "getAllTeachers").resolves(mockTeachers);

      // Mock req and res objects
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Call the controller function
      await getAllTeachers(req, res);

      // Assertions
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockTeachers)).to.be.true;
    });

    it("should return a 500 status code and an error message if an error occurs", async () => {
      // Simulate an error in teacherServices.getAllTeachers
      const errorMessage = "Failed to retrieve teachers";
      
      sinon
        .stub(teacherServices, "getAllTeachers")
        .throws(new Error(errorMessage));

      // Mock req and res objects
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Call the controller function
      await getAllTeachers(req, res);

      // Assertions
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: errorMessage })).to.be.true;
    });
  });
});
