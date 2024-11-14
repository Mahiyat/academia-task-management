/* eslint-disable max-len */
import { expect } from "chai";
import sinon from "sinon";
import teacherServices from "../../src/services/teacherServices.js";
import semesterServices from "../../src/services/semesterServices.js";
import courseServices from "../../src/services/courseServices.js";
import * as performanceController from "../../src/controllers/performanceChairmanController.js";

describe("Performance Chairman Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.restore();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getSemesters", () => {
    it("should fetch all semesters and return status 200", async () => {
      const semesters = [
        { id: "1", semesterTitle: "Fall 2023", semesterYear: 2023, semesterNo: 1 },
        { id: "2", semesterTitle: "Spring 2024", semesterYear: 2024, semesterNo: 2 },
      ];

      sinon.stub(semesterServices, "getSemesters").resolves(semesters);

      await performanceController.getSemesters(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(semesters)).to.be.true;
    });

    it("should return status 500 on error", async () => {
      sinon.stub(semesterServices, "getSemesters").throws(new Error("Error fetching semesters"));

      await performanceController.getSemesters(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: "Error fetching semesters" })).to.be.true;
    });
  });

  describe("getAllTeachers", () => {
    it("should fetch all teachers and return status 200", async () => {
      const teachers = [
        { id: "201", firstName: "Alice", lastName: "Johnson", designation: "Professor" },
        { id: "202", firstName: "Bob", lastName: "Smith", designation: "Lecturer" },
      ];

      sinon.stub(teacherServices, "getAllTeachers").resolves(teachers);

      await performanceController.getAllTeachers(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(teachers)).to.be.true;
    });

    it("should return status 500 on error", async () => {
      sinon.stub(teacherServices, "getAllTeachers").throws(new Error("Error fetching teachers"));

      await performanceController.getAllTeachers(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: "Error fetching teachers" })).to.be.true;
    });
  });

  describe("getTeacherCourses", () => {
    it("should fetch courses for a specific teacher and return status 200", async () => {
      const courses = [
        { id: "301", courseCode: "ENG101", courseName: "English Literature" },
        { id: "302", courseCode: "PHL102", courseName: "Philosophy" },
      ];
      
      req.params.id = "201";
      sinon.stub(teacherServices, "getCoursesByTeacherId").resolves(courses);

      await performanceController.getTeacherCourses(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(courses)).to.be.true;
    });

    it("should return 404 if no courses found for the teacher", async () => {
      req.params.id = "201";
      sinon.stub(teacherServices, "getCoursesByTeacherId").resolves([]);

      await performanceController.getTeacherCourses(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Course data missing for the specified teacher." })).to.be.true;
    });

    it("should return status 500 on error", async () => {
      req.params.id = "201";
      sinon.stub(teacherServices, "getCoursesByTeacherId").throws(new Error("Error fetching courses"));

      await performanceController.getTeacherCourses(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: "System error – Please try again later." })).to.be.true;
    });
  });
});
