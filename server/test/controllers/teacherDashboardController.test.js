// test/controllers/teacherDashboardController.test.js
import { expect } from "chai";
import sinon from "sinon";
import teacherDashboardServices from "../../src/services/teacherDashboardServices.js";
import { showPriorityTasks } from "../../src/controllers/teacherDashboardController.js";

describe("Teacher Dashboard Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { teacherId: "6722664b2722d82a38dd1fc8" },
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
    it("should retrieve, sort, and return priority tasks with status 200", async () => {
      const unsortedTasks = [
        {
          "_id": "672267dd2722d82a38dd1fea",
          "title": "Review algorithms",
          "description": "Revise algorithms for CSE102.",
          "category": "Class",
          "priority": "red",
          "deadline": "2024-02-20T12:00:00.000Z",
          "status": "doing",
          "createdAt": "2024-01-01T00:00:00.000Z",
          "kanbanBoardId": "672267132722d82a38dd1fd6"
        },
        {
          "_id": "672267dd2722d82a38dd1fe9",
          "title": "Complete project proposal",
          "description": "Prepare the project proposal for CSE101.",
          "category": "Class",
          "priority": "orange",
          "deadline": "2024-02-15T12:00:00.000Z",
          "status": "todo",
          "createdAt": "2024-01-01T00:00:00.000Z",
          "kanbanBoardId": "672267132722d82a38dd1fd6"
        }
      ];

      const sortedTasks = [
        {
          "_id": "672267dd2722d82a38dd1fe9",
          "title": "Complete project proposal",
          "description": "Prepare the project proposal for CSE101.",
          "category": "Class",
          "priority": "orange",
          "deadline": "2024-02-15T12:00:00.000Z",
          "status": "todo",
          "createdAt": "2024-01-01T00:00:00.000Z",
          "kanbanBoardId": "672267132722d82a38dd1fd6"
        },
        {
          "_id": "672267dd2722d82a38dd1fea",
          "title": "Review algorithms",
          "description": "Revise algorithms for CSE102.",
          "category": "Class",
          "priority": "red",
          "deadline": "2024-02-20T12:00:00.000Z",
          "status": "doing",
          "createdAt": "2024-01-01T00:00:00.000Z",
          "kanbanBoardId": "672267132722d82a38dd1fd6"
        }
      ];

      // Stub the teacherDashboardServices.getTasks method to return unsorted tasks
      sinon.stub(teacherDashboardServices, "getTasks").resolves(unsortedTasks);

      // Call the showPriorityTasks controller
      await showPriorityTasks(req, res);

      // Capture the tasks returned by res.json
      const returnedTasks = res.json.getCall(0).args[0];

      // Verify response status and sorted tasks
      expect(res.status.calledWith(200)).to.be.true;
      expect(returnedTasks).to.deep.equal(sortedTasks); // Check that tasks are sorted as expected
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
