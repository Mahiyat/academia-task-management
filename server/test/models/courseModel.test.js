import { expect } from "chai";
import sinon from "sinon";
import Course from "../../src/models/Course.js";

describe("Course Model", () => {
  it("should create a new course", async () => {
    // Mock the course data
    const courseData = {
      name: "Software Engineering",
      description: "Intro to SE",
    };

    // Create a new course instance
    const course = new Course(courseData);

    // Stub the save method of the model
    const saveStub = sinon.stub(Course.prototype, "save").resolves(courseData);

    // Call the save method and assert the outcome
    const result = await course.save();

    expect(result.name).to.equal("Software Engineering");
    expect(result.description).to.equal("Intro to SE");

    // Restore the stubbed save method
    saveStub.restore();
  });
});
