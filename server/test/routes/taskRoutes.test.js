import request from "supertest";
import { expect } from "chai";
import app from "../../src/app.js";

describe("Task Routes", () => {
  it("should create a new task", (done) => {
    request(app)
      .post("/api/tasks/add")
      .send({ title: "Test Task", category: "Class", priority: "red" })
      .expect(201)
      .expect((res) => {
        expect(res.body.title).to.equal("Test Task");
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

  // New test for fetching tasks by status
  it("should get tasks by status", (done) => {
    // First, create a task with a specific status
    request(app)
      .post("/api/tasks/add")
      .send({ title: "Task in To-Do", category: "Class", priority: "yellow", status: "todo" })
      .expect(201)
      .end(() => {
        // Then, fetch tasks by that status
        request(app)
          .get("/api/tasks/status/todo")
          .expect(200)
          .expect((res) => {
            expect(res.body).to.be.an("array");
            expect(res.body.length).to.be.greaterThan(0);
            expect(res.body[0].status).to.equal("todo");
          })
          .end(done);
      });
  });
});
