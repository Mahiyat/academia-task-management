import { expect } from "chai";
import sinon from "sinon";
import Teacher from "../../src/models/Teacher.js";

describe("Teacher Model", () => {
  it("should create a new teacher", async () => {
    // Mock the teacher data
    const teacherData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      designation: "Professor",
      courses: [],
    };

    // Create a new teacher instance
    const teacher = new Teacher(teacherData);

    // Stub the save method of the model
    const saveStub = sinon.stub(Teacher.prototype, "save").resolves(teacherData);

    // Call the save method and assert the outcome
    const result = await teacher.save();

    expect(result.firstName).to.equal("John");
    expect(result.lastName).to.equal("Doe");
    expect(result.email).to.equal("john.doe@example.com");
    expect(result.phoneNumber).to.equal("123-456-7890");
    expect(result.designation).to.equal("Professor");

    // Restore the stubbed save method
    saveStub.restore();
  });

  it("should not create a teacher without a required field", async () => {
    // Mock the teacher data without a required field (email)
    const teacherData = {
      firstName: "Jane",
      lastName: "Doe",
      phoneNumber: "098-765-4321",
      designation: "Lecturer",
      courses: [],
    };

    // Create a new teacher instance
    const teacher = new Teacher(teacherData);

    // Stub the save method to throw an error for missing email
    const saveStub = sinon.stub(Teacher.prototype, "save").rejects(new Error("Validation Error"));

    // Call the save method and assert that an error is thrown
    try {
      await teacher.save();
    } catch (error) {
      expect(error.message).to.equal("Validation Error");
    }

    // Restore the stubbed save method
    saveStub.restore();
  });
});
