// test/routes/reportGenerationRoutes.test.js
import request from "supertest";
import { expect } from "chai";
import sinon from "sinon";
import app from "../../src/app.js";
import reportGenerationServices from "../../src/services/reportGenerationServices.js";

describe("Report Generation Routes", () => {
  beforeEach(() => {
    // Stub the generateCourseReport method to return a sample report text
    // eslint-disable-next-line max-len
    sinon.stub(reportGenerationServices, "generateCourseReport").resolves("Sample consolidated report");
  });

  afterEach(() => {
    // Restore the stubbed methods after each test
    sinon.restore();
  });

  describe("GET /:teacherId", () => {
    it("should return a consolidated report for all courses", (done) => {
      const teacherId = "fakeTeacherId";

      request(app)
        .get(`/api/report-generation/${teacherId}`)  // Adjust route path as needed
        .expect(200)
        .expect((res) => {
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("report");
          expect(res.body.report).to.equal("Sample consolidated report");
        })
        .end(done); 
    });

    it("should handle errors and respond with a 500 status", (done) => {
      // Simulate an error by making the stub reject
      reportGenerationServices.generateCourseReport.rejects(new Error("Report generation failed"));

      const teacherId = "fakeTeacherId";

      request(app)
        .get(`/api/report-generation/${teacherId}`)
        .expect(500)
        .expect((res) => {
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.equal("Report generation failed");
        })
        .end(done);
    });
  });
});
