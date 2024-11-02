import { expect } from "chai";
import sinon from "sinon";
import teacherServices from "../../src/services/teacherServices.js"; 
import { updateTeacher } from "../../src/controllers/teacherController.js"; 

describe("Teacher Controller - updateTeacher", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: "teacherId" }, 
      body: { courseId: "courseId" }, 
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    console.log("Setting up mocks and stubs for tests...");
  });

  afterEach(() => {
    sinon.restore(); // Restore stubbed functions after each test
    console.log("Restored sinon stubs.");
  });

  it("should update a teacher's courses and return status 200", async () => {
    const updatedTeacher = { id: req.params.id, courseId: req.body.courseId }; 
    sinon.stub(teacherServices, "updateTeacherCourses").resolves(updatedTeacher);

    await updateTeacher(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: 'Teacher updated successfully', teacher: updatedTeacher })).to.be.true;
  });

  it("should return 404 if the teacher does not exist", async () => {
    sinon.stub(teacherServices, "updateTeacherCourses").resolves(null); // Simulate teacher not found

    await updateTeacher(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Teacher not found' })).to.be.true;
  });

  it("should return status 500 on error", async () => {
    sinon.stub(teacherServices, "updateTeacherCourses").throws(new Error("Error updating teacher"));

    await updateTeacher(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: 'Error updating teacher', error: "Error updating teacher" })).to.be.true;
  });
});
