import { expect } from "chai";
import sinon from "sinon";
import generateWorkflowServices from "../../src/services/generateWorkflowServices.js";
import * as generateWorkflowController from "../../src/controllers/generateWorkflowController.js";

const mockRequestBody = [
  {
    title: "Complete AI Module",
    description: "Finish the module on AI-driven workflow suggestions",
    category: "Class",
    priority: "red",
    deadline: new Date("2024-11-15T23:59:59.000Z"),
    status: "todo",
    kanbanBoardId: "64b28c4f1f2fbb00123abcd4",
  },
  {
    title: "Prepare Tutorial Slides",
    description: "Create slides for the upcoming coding tutorial session",
    category: "Tutorial",
    priority: "orange",
    deadline: new Date("2024-11-10T17:00:00.000Z"),
    status: "doing",
    kanbanBoardId: "64b28c4f1f2fbb00123abcd4",
  },
  {
    title: "Review Class Assignments",
    description: "Check and provide feedback on students' assignments",
    category: "Class",
    priority: "yellow",
    deadline: new Date("2024-11-12T21:00:00.000Z"),
    status: "todo",
    kanbanBoardId: "64b28c4f1f2fbb00123abcd4",
  },
];

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
