// test/routes/messageRoutes.test.js
import { expect } from "chai";
import sinon from "sinon";
import request from "supertest";
import express from "express";
import { messageRoutes } from "../../src/routes/messageRoutes.js";
import * as messageController from "../../src/controllers/messageController.js";

describe("messageRoutes", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/api/messages", messageRoutes);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should call sendMessage controller and return 200 on successful message send", async () => {
    const sendMessageStub = sinon.stub(messageController, "sendMessage").callsFake((req, res) => {
      res.status(200).json({
        success: true,
        message: "Message sent successfully",
        confirmation: "Message sent at " + new Date().toISOString(),
        data: { id: "message-id", senderId: "123", recipientId: "456", content: "Test content" },
      });
    });

    await request(app)
      .post("/api/messages/send")
      .send({
        senderId: "123",
        recipientId: "456",
        content: "Test content",
      })
      .expect(200)
      .then((res) => {
        expect(sendMessageStub.calledOnce).to.be.true;
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.equal("Message sent successfully");
        expect(res.body.data.id).to.equal("message-id");
      });
  });

  // eslint-disable-next-line max-len
  it("should call sendMessage controller and return 400 if required fields are missing", async () => {
    const sendMessageStub = sinon.stub(messageController, "sendMessage").callsFake((req, res) => {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    });

    await request(app)
      .post("/api/messages/send")
      .send({}) // Missing fields
      .expect(400)
      .then((res) => {
        expect(sendMessageStub.calledOnce).to.be.true;
        expect(res.body.success).to.be.false;
        expect(res.body.message).to.equal("Missing required fields");
      });
  });

  it("should call sendMessage controller and return 500 on system error", async () => {
    const sendMessageStub = sinon.stub(messageController, "sendMessage").callsFake((req, res) => {
      res.status(500).json({
        success: false,
        message: "System error – unable to send message. Please try again later.",
      });
    });

    await request(app)
      .post("/api/messages/send")
      .send({
        senderId: "123",
        recipientId: "456",
        content: "Test content",
      })
      .expect(500)
      .then((res) => {
        expect(sendMessageStub.calledOnce).to.be.true;
        expect(res.body.success).to.be.false;
        // eslint-disable-next-line max-len
        expect(res.body.message).to.equal("System error – unable to send message. Please try again later.");
      });
  });
});
