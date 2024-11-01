import { expect } from "chai";
import sinon from "sinon";
import Task from "../../src/models/Task.js";

describe("Task Model", () => {
  it("should create a new task", async () => {
    const taskData = {
      title: "Test Task",
      description: "Task Description",
      category: "Class",
      priority: "red",
      deadline: new Date(),
      status: "todo",
    };

    const task = new Task(taskData);
    const saveStub = sinon.stub(Task.prototype, "save").resolves(taskData);

    const result = await task.save();

    expect(result.title).to.equal("Test Task");
    expect(result.category).to.equal("Class");

    saveStub.restore();
  });
});
