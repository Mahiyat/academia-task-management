import request from "supertest";
import { expect } from "chai";
import app from "../../src/app.js";

describe("Task Routes", () => {
  it("should create a new task", (done) => {
    request(app)
      .post("/api/tasks/add")
      .send({
        title: "Test Task",
        category: "Class",
        priority: "red",
        kanbanBoardId: "6724f55179cd1dfd50948b6f",
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.title).to.equal("Test Task");
        expect(res.body.kanbanBoardId).to.equal("6724f55179cd1dfd50948b6f");
      })
      .end(done);
  });

  it("should return all tasks", (done) => {
    request(app)
      .get("/api/tasks/")
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.an("array");
      })
      .end(done);
  });

  it("should get tasks by kanban board ID and status", (done) => {
    // First, create a task with a specific board and status
    request(app)
      .post("/api/tasks/add")
      .send({
        title: "Task for Kanban",
        category: "Class",
        priority: "yellow",
        status: "todo",
        kanbanBoardId: "6724f55179cd1dfd50948b6f",
      })
      .expect(201)
      .end(() => {
        // Then, fetch tasks by that board ID and status
        request(app)
          .get("/api/tasks/board/6724f55179cd1dfd50948b6f/status/todo")
          .expect(200)
          .expect((res) => {
            expect(res.body).to.be.an("array");
            expect(res.body.length).to.be.greaterThan(0);
            expect(res.body[0].status).to.equal("todo");
            expect(res.body[0].kanbanBoardId).to.equal("6724f55179cd1dfd50948b6f");
          })
          .end(done);
      });
  });
});
