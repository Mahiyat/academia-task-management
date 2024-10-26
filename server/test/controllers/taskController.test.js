import { expect } from "chai";
import sinon from "sinon";
import taskServices from "../../src/services/taskServices.js";
import * as taskController from "../../src/controllers/taskController.js";

describe("Task Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        title: "Test Task",
        category: "Class",
        priority: "red",
        kanbanBoardId: "someBoardId",
      },
    };
    res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create a new task and return status 201", async () => {
    sinon.stub(taskServices, "createTask").resolves(req.body);
    await taskController.createTask(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(req.body)).to.be.true;
  });

  it("should return all tasks with status 200", async () => {
    const tasks = [{ title: "Test Task", category: "Class" }];

    sinon.stub(taskServices, "getAllTasks").resolves(tasks);

    await taskController.getAllTasks(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(tasks)).to.be.true;
  });

  it("should get tasks by board and status with status 200", async () => {
    req = { params: { kanbanBoardId: "someBoardId", status: "todo" } };
    const tasks = [
      { title: "Test Task", status: "todo", kanbanBoardId: "someBoardId" },
    ];

    sinon.stub(taskServices, "getTasksByBoardAndStatus").resolves(tasks);

    await taskController.getTasksByBoardAndStatus(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(tasks)).to.be.true;
  });
});
