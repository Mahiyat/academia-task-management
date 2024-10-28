import request from "supertest";
import { expect } from "chai";
import app from "../../src/app.js"; 

describe("Teacher Dashboard Routes", () => {
  describe("GET /:teacherId", () => {
    it("should return priority tasks for a specific teacher", (done) => {
      const teacherId = "123"; 

      request(app)
        .get(`/api/teacher-dashboard/${teacherId}`) 
        .expect(200) 
        .expect((res) => {
          expect(res.body).to.be.an("array"); 
        })
        .end(done);
    });
  });
});
