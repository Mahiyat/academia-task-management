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
});
