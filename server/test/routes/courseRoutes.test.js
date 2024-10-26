import request from "supertest";
import { expect } from "chai";
import app from "../../src/app.js"; // Import the Express app

describe("Course Routes", () => {
  describe("POST /courses", () => {
    it("should create a new course", (done) => {
      request(app)
        .post("/api/courses")
        .send({ name: "Software Engineering", description: "Intro to SE" })
        .expect(201)
        .expect((res) => {
          expect(res.body.message).to.equal("Course created!");
        })
        .end(done);
    });
  });

  describe("GET /courses", () => {
    it("should return all courses", (done) => {
      request(app)
        .get("/api/courses")
        .expect(200)
        .expect((res) => {
          expect(res.body).to.be.an("array");
        })
        .end(done);
    });
  });
});
