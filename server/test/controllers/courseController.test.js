import { expect } from "chai";
import sinon from "sinon";
import courseServices from "../../src/services/courseServices.js";
import {
  createNewCourse,
  getAllCourses,
} from "../../src/controllers/courseController.js";

describe("Course Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { name: "Software Engineering", description: "Intro to SE" },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => { 
    sinon.restore(); // Restore stubbed functions after each test
  });

  describe("createCourse", () => {
    it("should create a new course and return status 201", async () => {
      // Stub the courseServices.createCourse method
      sinon.stub(courseServices, "createNewCourse").resolves(req.body);

      // Call the createCourse controller
      await createNewCourse(req, res);

      // Verify the response status and json
      expect(res.status.calledWith(201)).to.be.true;
      expect(
        res.json.calledWith({ message: "Course created!", course: req.body })
      ).to.be.true;
    });
  });

  describe("getCourses", () => {
    it("should fetch all courses and return status 200", async () => {
      const courses = [
        { name: "Software Engineering", description: "Intro to SE" },
      ];

      // Stub the courseServices.getCourses method
      sinon.stub(courseServices, "getAllCourses").resolves(courses);

      // Call the getCourses controller
      await getAllCourses(req, res);

      // Verify the response status and json
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(courses)).to.be.true;
    });
  });
});
