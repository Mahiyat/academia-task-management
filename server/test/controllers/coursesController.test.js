import { expect } from "chai";
import sinon from "sinon";
import courseServices from "../../src/services/courseServices.js";
import {
  createNewCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesBySemester,
} from "../../src/controllers/courseController.js";

describe("Course Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        courseCode: "SE101",
        courseName: "Software Engineering",
        courseCredit: 3,
        courseType: "Theory",
        contactHours: 30,
        expectedNoOfClasses: 10,
        expectedNoOfTutorials: 5,
        noOfClassesTaken: 0,
        noOfTutorialsTaken: 0,
        courseTeachers: [],
        semester: null,
      },
      params: { id: "1", semesterId: "2024" }, // Mock params for ID and semester
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

  describe("createNewCourse", () => {
    it("should create a new course and return status 201", async () => {
      sinon.stub(courseServices, "createNewCourse").resolves(req.body);

      await createNewCourse(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(
        res.json.calledWith({ message: "Course created!", course: req.body })
      ).to.be.true;
    });

    it("should return status 500 on error", async () => {
      sinon
        .stub(courseServices, "createNewCourse")
        .throws(new Error("Error creating course"));

      await createNewCourse(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Error creating course",
          error: "Error creating course",
        })
      ).to.be.true;
    });
  });

  describe("getAllCourses", () => {
    it("should fetch all courses and return status 200", async () => {
      const courses = [req.body];

      sinon.stub(courseServices, "getAllCourses").resolves(courses);

      await getAllCourses(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(courses)).to.be.true;
    });

    it("should return status 500 on error", async () => {
      sinon
        .stub(courseServices, "getAllCourses")
        .throws(new Error("Error fetching courses"));

      await getAllCourses(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Error fetching courses",
          error: "Error fetching courses",
        })
      ).to.be.true;
    });
  });

  describe("getCourseById", () => {
    it("should return a course by ID and status 200", async () => {
      const course = req.body;

      sinon.stub(courseServices, "getCourseById").resolves(course);

      await getCourseById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(course)).to.be.true;
    });

    it("should return 404 if the course does not exist", async () => {
      sinon.stub(courseServices, "getCourseById").resolves(null);

      await getCourseById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Course not found" })).to.be.true;
    });

    it("should return status 500 on error", async () => {
      sinon
        .stub(courseServices, "getCourseById")
        .throws(new Error("Error fetching course"));

      await getCourseById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Error fetching course",
          error: "Error fetching course",
        })
      ).to.be.true;
    });
  });

  describe("updateCourse", () => {
    it("should update a course by ID and return status 200", async () => {
      const updatedCourse = {
        ...req.body,
        courseName: "Updated Software Engineering",
      };

      sinon.stub(courseServices, "updateCourse").resolves(updatedCourse);

      await updateCourse(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Course updated successfully",
          course: updatedCourse,
        })
      ).to.be.true;
    });

    it("should return 404 if the course does not exist", async () => {
      sinon.stub(courseServices, "updateCourse").resolves(null);

      await updateCourse(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Course not found" })).to.be.true;
    });

    it("should return status 500 on error", async () => {
      sinon
        .stub(courseServices, "updateCourse")
        .throws(new Error("Error updating course"));

      await updateCourse(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Error updating course",
          error: "Error updating course",
        })
      ).to.be.true;
    });
  });

  describe("deleteCourse", () => {
    it("should delete a course by ID and return status 200", async () => {
      sinon.stub(courseServices, "deleteCourse").resolves(req.body);

      await deleteCourse(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: "Course deleted successfully" })).to
        .be.true;
    });

    it("should return 404 if the course does not exist", async () => {
      sinon.stub(courseServices, "deleteCourse").resolves(null);

      await deleteCourse(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Course not found" })).to.be.true;
    });

    it("should return status 500 on error", async () => {
      sinon
        .stub(courseServices, "deleteCourse")
        .throws(new Error("Error deleting course"));

      await deleteCourse(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Error deleting course",
          error: "Error deleting course",
        })
      ).to.be.true;
    });
  });

  describe("getCoursesBySemester", () => {
    it("should return courses for a specific semester and status 200", async () => {
      const courses = [req.body];

      sinon.stub(courseServices, "getCoursesBySemester").resolves(courses);

      await getCoursesBySemester(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(courses)).to.be.true;
    });

    it("should return 404 if no courses found for the semester", async () => {
      sinon.stub(courseServices, "getCoursesBySemester").resolves([]);

      await getCoursesBySemester(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(
        res.json.calledWith({ message: "No courses found for this semester." })
      ).to.be.true;
    });

    it("should return status 500 on error", async () => {
      sinon
        .stub(courseServices, "getCoursesBySemester")
        .throws(new Error("Error fetching courses"));

      await getCoursesBySemester(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Error fetching courses",
          error: "Error fetching courses",
        })
      ).to.be.true;
    });
  });
});
