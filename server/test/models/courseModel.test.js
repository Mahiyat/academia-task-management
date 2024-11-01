import { expect } from "chai";
import sinon from "sinon";
import Course from "../../src/models/Course.js";

describe("Course Model", () => {
  it("should create a new course with the correct properties", async () => {
    // Mock the course data
    const courseData = {
      courseCode: "SE101",
      courseName: "Software Engineering",
      courseCredit: 3,
      courseType: "Core",
      contactHours: 30,
      expectedNoOfClasses: 10,
      expectedNoOfTutorials: 5,
      noOfClassesTaken: 0,
      noOfTutorialsTaken: 0,
      courseTeachers: [],
      semester: null,
    };

    // Create a new course instance
    const course = new Course(courseData);

    // Stub the save method of the model
    const saveStub = sinon.stub(Course.prototype, "save").resolves(course);

    // Call the save method and assert the outcome
    const result = await course.save();

    expect(result.courseCode).to.equal("SE101");
    expect(result.courseName).to.equal("Software Engineering");
    expect(result.courseCredit).to.equal(3);
    expect(result.courseType).to.equal("Core");
    expect(result.contactHours).to.equal(30);
    expect(result.expectedNoOfClasses).to.equal(10);
    expect(result.expectedNoOfTutorials).to.equal(5);
    expect(result.noOfClassesTaken).to.equal(0);
    expect(result.noOfTutorialsTaken).to.equal(0);
    expect(result.courseTeachers).to.deep.equal([]);
    expect(result.semester).to.be.null;

    // Restore the stubbed save method
    saveStub.restore();
  });
});
