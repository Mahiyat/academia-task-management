// test/routes/classTutOverviewRoutes.test.js
import { expect } from "chai";
import sinon from "sinon";
import request from "supertest";
import express from "express";
import { classTutOverviewRoutes } from "../../src/routes/classTutOverviewRoutes.js";
import * as classTutOverviewController from "../../src/controllers/classTutOverviewController.js";

describe("classTutOverviewRoutes", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use("/api/class-tut-overview", classTutOverviewRoutes);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should call getClassTutOverview controller with the correct teacherId", async () => {
    const getClassTutOverviewStub = sinon
      .stub(classTutOverviewController, "getClassTutOverview")
      .callsFake((req, res) => {
        res.status(200).json({ message: "Called successfully" });
      });

    const teacherId = "123";

    await request(app)
      .get(`/api/class-tut-overview/${teacherId}`)
      .expect(200)
      .then((res) => {
        expect(getClassTutOverviewStub.calledOnce).to.be.true;
        expect(
          getClassTutOverviewStub.firstCall.args[0].params.teacherId
        ).to.equal(teacherId);
        expect(res.body.message).to.equal("Called successfully");
      });
  });
});
