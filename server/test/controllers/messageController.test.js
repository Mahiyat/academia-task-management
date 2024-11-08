import { expect } from "chai";
import sinon from "sinon";
import MessageService from "../../src/services/messageService.js";
import { sendMessage } from "../../src/controllers/messageController.js";

describe("Message Controller - sendMessage", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        senderId: "64ff324f93b4cd0016e85647",
        recipientId: "64ff324f93b4cd0016e85648",
        content: "Test message content",
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    console.log("Setting up mocks and stubs for tests...");
  });

  afterEach(() => {
    sinon.restore();
    console.log("Restored sinon stubs.");
  });

  describe("sendMessage", () => {
    it("should return 400 if required fields are missing", async () => {
      req.body = {}; // Empty body to simulate missing fields

      await sendMessage(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      // eslint-disable-next-line max-len
      expect(res.json.calledWith({ success: false, message: "Missing required fields" })).to.be.true;
    });

    it("should return 200 and confirmation if message is sent successfully", async () => {
      const mockResponse = {
        success: true,
        message: "Message sent successfully",
        data: { id: "message-id", ...req.body },
      };

      sinon.stub(MessageService, "sendMessage").resolves(mockResponse);

      await sendMessage(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match({
        success: true,
        message: mockResponse.message,
        confirmation: sinon.match.string,
        data: mockResponse.data,
      }))).to.be.true;
    });

    it("should return 500 and error message on system error", async () => {
      const mockErrorResponse = {
        success: false,
        message: "Message failed to send",
        error: new Error("Database error"),
      };

      sinon.stub(MessageService, "sendMessage").resolves(mockErrorResponse);

      await sendMessage(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({
        success: false,
        message: "System error – unable to send message. Please try again later.",
      })).to.be.true;
    });

    it("should return 500 if MessageService responds with a custom error message", async () => {
      const mockCustomErrorResponse = {
        success: false,
        message: "Recipient not available",
      };

      sinon.stub(MessageService, "sendMessage").resolves(mockCustomErrorResponse);

      await sendMessage(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({
        success: false,
        message: mockCustomErrorResponse.message,
      })).to.be.true;
    });
  });
});
