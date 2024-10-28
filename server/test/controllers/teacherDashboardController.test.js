import { expect } from "chai";
import sinon from "sinon";
import teacherDashboardServices from "../../src/services/teacherDashboardServices.js";
import { showPriorityTasks } from "../../src/controllers/teacherDashboardController.js";

describe("Teacher Dashboard Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { teacherId: "123" },
    }; 
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore(); 
  });

  describe("showPriorityTasks", () => {
    it("should retrieve and return sorted priority tasks with status 200", async () => {
      const sortedTasks = [
        {
          title: "Complete the project proposal",
          description: "Prepare and submit the project proposal document",
          category: "Class",
          priority: "blue",
          deadline: new Date("2024-11-05T10:00:00Z"),
          status: "todo",
        },
        {
          title: "Project meeting",
          description: "Team meeting to discuss project timelines and milestones",
          category: "Others",
          priority: "orange",
          deadline: new Date("2024-11-07T11:00:00Z"),
          status: "done",
        },
        {
          title: "Upload lecture notes",
          description: "Add notes on database indexing to the portal",
          category: "Tutorial",
          priority: "green",
          deadline: new Date("2024-11-08T14:00:00Z"),
          status: "todo",
        },
      ];

      // Stub the teacherDashboardServices.getTasks method
      sinon.stub(teacherDashboardServices, "getTasks").withArgs("123").resolves(sortedTasks);

      // Call the showPriorityTasks controller
      await showPriorityTasks(req, res);

      // Verify the response status and json
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sortedTasks)).to.be.true;
    });

    it("should return status 500 and an error message if an error occurs", async () => {
      const errorMessage = "Error retrieving cards";
      const error = new Error("Database connection error");

      // Stub the teacherDashboardServices.getTasks method to throw an error
      sinon.stub(teacherDashboardServices, "getTasks").throws(error);

      // Call the showPriorityTasks controller
      await showPriorityTasks(req, res);

      // Verify the response status and json for the error
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: errorMessage, error: error.message })).to.be.true;
    });
  });
});
