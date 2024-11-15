import { expect } from "chai";
import sinon from "sinon";
import generateWorkflowServices from "../../src/services/generateWorkflowServices.js";
import * as generateWorkflowController from "../../src/controllers/generateWorkflowController.js";

describe("Generate Workflow Controller", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should handle multiple tasks and return response and done properties", async () => {
    // timeout(200000);

    const req = {
      params: { kanbanBoardId: "67226aff90863f1442fc8051" },
    };

    const res = {
      setHeader: sinon.spy(),
      write: sinon.spy(),
      status: sinon.stub().returnsThis(),
      end: sinon.spy(),
      json: sinon.spy(),
    };

    const generateSuggestionsStub = sinon
      .stub(generateWorkflowServices, "generateSuggestions")
      .callsFake(async function* () {
        yield { response: "Mock response part 1", done: false };
        yield { response: "Mock response part 2", done: false };
        yield { response: "Final part of mock response", done: true };
      });

    await generateWorkflowController.generateSuggestions(req, res);


    expect(res.status.calledWith(200)).to.be.true;

    expect(res.setHeader.calledWith("Content-Type", "application/json")).to.be
      .true;

    res.write.getCalls().forEach((call, index) => {
      const data = JSON.parse(call.args[0]);

      expect(data).to.have.property("response");
      expect(data).to.have.property("done");

      if (index === res.write.callCount - 1) {
        expect(data.done).to.be.true;
      }
    });

    expect(res.end.calledOnce).to.be.true;
  });

  it("should handle a single task and return response and done properties", async () => {
    // timeout(200000);

    const req = { params: { kanbanBoardId: "67226aff90863f1442fc8051" } };
    const res = {
      setHeader: sinon.spy(),
      write: sinon.spy(),
      status: sinon.stub().returnsThis(),
      end: sinon.spy(),
      json: sinon.spy(),
    };

    const generateSuggestionsStub = sinon
      .stub(generateWorkflowServices, "generateSuggestions")
      .callsFake(async function* () {
        yield { response: "Mock response for single task", done: true };
      });

    await generateWorkflowController.generateSuggestions(req, res);


    expect(res.status.calledWith(200)).to.be.true;

    expect(res.setHeader.calledWith("Content-Type", "application/json")).to.be
      .true;

    res.write.getCalls().forEach((call, index) => {
      const data = JSON.parse(call.args[0]);

      expect(data).to.have.property("response");
      expect(data).to.have.property("done");

      if (index === res.write.callCount - 1) {
        expect(data.done).to.be.true;
      }
    });

    expect(res.end.calledOnce).to.be.true;
  });

  it("should return a 500 error if generateSuggestions throws an error", async () => {
    // timeout(200000);

    const req = { params: { kanbanBoardId: "67226aff90863f1442fc8051" } };
    const res = {
      setHeader: sinon.spy(),
      write: sinon.spy(),
      status: sinon.stub().returnsThis(),
      end: sinon.spy(),
      json: sinon.spy(),
    };

    const generateSuggestionsStub = sinon
      .stub(generateWorkflowServices, "generateSuggestions")
      .throws(new Error("Test error"));

    await generateWorkflowController.generateSuggestions(req, res);


    expect(res.status.calledWith(500)).to.be.true;
    expect(
      res.json.calledWith({ error: "Failed to generate workflow suggestions" })
    ).to.be.true;
    expect(res.end.calledOnce).to.be.false;
  });
}).timeout(200000);
