import request from "supertest";
import { expect } from "chai";
import sinon from "sinon";
import app from "../../src/app.js";
import teacherDashboardServices from "../../src/services/teacherDashboardServices.js";

describe("Teacher Dashboard Routes", () => {
  beforeEach(() => {
    
    sinon.stub(teacherDashboardServices, "getTasks").resolves([
      {
        _id: "672267dd2722d82a38dd1fe9",
        title: "Complete project proposal",
        description: "Prepare the project proposal for CSE101.",
        category: "Class",
        priority: "orange",
        deadline: "2024-02-15T12:00:00.000Z",
        status: "todo",
        createdAt: "2024-01-01T00:00:00.000Z",
        kanbanBoardId: "672267132722d82a38dd1fd6",
      },
    ]);
  });

  afterEach(() => {
    sinon.restore(); 
  });

  describe("GET /:teacherId", () => {
    it("should return priority tasks for all the courses a teacher is included in", (done) => {
      const teacherId = "6722664b2722d82a38dd1fc8";

      request(app)
        .get(`/api/teacher-dashboard/${teacherId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.be.an("array"); 
          expect(res.body).to.have.lengthOf(1); 
          expect(res.body[0]).to.include.all.keys(
            "_id",
            "title",
            "description",
            "category",
            "priority",
            "deadline",
            "status",
            "createdAt",
            "kanbanBoardId"
          ); 
        })
        .end(done); 
    });
  });
});
