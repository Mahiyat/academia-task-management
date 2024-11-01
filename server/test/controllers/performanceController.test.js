import { expect } from "chai";
import sinon from "sinon";
import teacherServices from "../../src/services/teacherServices.js";
import courseServices from "../../src/services/courseServices.js";
import {
  getAllTeachers,
  getTeacherById,
  getTeacherCourses,
} from "../../src/controllers/performanceController.js";

describe("Performance Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: "1" }, // Mock params for ID
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

  describe("getAllTeachers", () => {
    it("should fetch all teachers and return status 200", async () => {
      const teachers = [{ id: "1", name: "John Doe" }, { id: "2", name: "Jane Smith" }];

      sinon.stub(teacherServices, "getAllTeachers").resolves(teachers);

      await getAllTeachers(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(teachers)).to.be.true;
    });

    it("should return status 500 on error", async () => {
      sinon.stub(teacherServices, "getAllTeachers").throws(new Error("Error fetching teachers"));

      await getAllTeachers(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: "Error fetching teachers" })).to.be.true;
    });
  });

  describe("getTeacherById", () => {
    it("should return a teacher by ID and status 200", async () => {
      const teacher = { id: "1", name: "John Doe" };

      sinon.stub(teacherServices, "getTeacherById").resolves(teacher);

      await getTeacherById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(teacher)).to.be.true;
    });

    it("should return 404 if the teacher does not exist", async () => {
      sinon.stub(teacherServices, "getTeacherById").resolves(null);

      await getTeacherById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Teacher not found" })).to.be.true;
    });

    it("should return status 500 on error", async () => {
      sinon.stub(teacherServices, "getTeacherById").throws(new Error("Error fetching teacher"));

      await getTeacherById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: "Error fetching teacher" })).to.be.true;
    });
  });


  describe("getTeacherCourses", () => {
    it("should return courses for a specific teacher and status 200", async () => {
      const courses = [{ id: "1", courseName: "Software Engineering" }];

      sinon.stub(teacherServices, "getCoursesByTeacherId").resolves(courses);

      await getTeacherCourses(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(courses)).to.be.true;
    });

    it("should return 404 if no courses found for the teacher", async () => {
      sinon.stub(teacherServices, "getCoursesByTeacherId").resolves([]);

      await getTeacherCourses(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      // eslint-disable-next-line max-len
      expect(res.json.calledWith({ message: "Course data missing for the specified teacher." })).to.be.true;
    });

    it("should return status 500 on error", async () => {
      // eslint-disable-next-line max-len
      sinon.stub(teacherServices, "getCoursesByTeacherId").throws(new Error("Error fetching courses"));

      await getTeacherCourses(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: "System error – Please try again later." })).to.be.true;
    });
  });
});
