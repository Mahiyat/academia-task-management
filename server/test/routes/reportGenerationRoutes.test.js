// test/routes/reportGenerationRoutes.test.js
import request from "supertest";
import { expect } from "chai";
import sinon from "sinon";
import app from "../../src/app.js";
import reportGenerationServices from "../../src/services/reportGenerationServices.js";

describe("Report Generation Routes", () => {
  beforeEach(() => {
    sinon.restore();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("GET /:teacherId", () => {
    it("should return a consolidated report for all courses", (done) => {
      const teacherId = "6722664b2722d82a38dd1fc8";
      const courseReports = [
        { courseName: "Course 1", courseCode: "CSE101", report: "Report for CSE101" },
        { courseName: "Course 2", courseCode: "CSE102", report: "Report for CSE102" }
      ];

      // Stub the service to return the course reports
      sinon.stub(reportGenerationServices, "generateCourseReport").resolves(courseReports);

      request(app)
        .get(`/api/report-generation/${teacherId}`)
        .expect(200)
        .expect((res) => {
          const expectedConsolidatedReport = courseReports.map(courseReport => (
            `Course: ${courseReport.courseName} (${courseReport.courseCode})\n` +
            `Report:\n${courseReport.report}\n\n`
          )).join('');

          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("report");
          expect(res.body.report).to.equal(expectedConsolidatedReport);
        })
        .end(done);
    });

    it("should return a 200 status and a message if teacher has no courses", (done) => {
      const teacherId = "6722664b2722d82a38dd1fc8";

      sinon.stub(reportGenerationServices, "generateCourseReport").resolves([]);

      request(app)
        .get(`/api/report-generation/${teacherId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("No courses found for this teacher");
        })
        .end(done);
    });

    it("should respond with 404 if teacher is not found", (done) => {
      const teacherId = "nonexistentTeacherId";

      // eslint-disable-next-line max-len
      sinon.stub(reportGenerationServices, "generateCourseReport").throws(new Error("Teacher not found"));

      request(app)
        .get(`/api/report-generation/${teacherId}`)
        .expect(404)
        .expect((res) => {
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.equal("Teacher not found");
        })
        .end(done);
    });

    it("should handle errors and respond with a 500 status", (done) => {
      const teacherId = "6722664b2722d82a38dd1fc8";

      // eslint-disable-next-line max-len
      sinon.stub(reportGenerationServices, "generateCourseReport").throws(new Error("Report generation failed"));

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
