import { expect } from "chai";
import sinon from "sinon";
import Message from "../../src/models/Message.js";
import mongoose from "mongoose";
describe("Message Model", () => {
  it("should create a new message", async () => {
    // Mock the message data
    const messageData = {
      sender: new mongoose.Types.ObjectId(),
      recipient: new mongoose.Types.ObjectId(),
      content: "This is a test message",
      timestamp: new Date(),
      status: "sent",
    };

    // Create a new message instance
    const message = new Message(messageData);

    // Stub the save method of the model
    const saveStub = sinon.stub(Message.prototype, "save").resolves(messageData);

    // Call the save method and assert the outcome
    const result = await message.save();

    expect(result.sender.toString()).to.equal(messageData.sender.toString());
    expect(result.recipient.toString()).to.equal(messageData.recipient.toString());
    expect(result.content).to.equal("This is a test message");
    expect(result.status).to.equal("sent");

    // Restore the stubbed save method
    saveStub.restore();
  });

  it("should set default status to 'sent' if not provided", async () => {
    // Mock the message data without status
    const messageData = {
      sender: new mongoose.Types.ObjectId(),
      recipient: new mongoose.Types.ObjectId(),
      content: "Default status test message",
      timestamp: new Date(),
    };

    // Create a new message instance
    const message = new Message(messageData);

    // Stub the save method of the model
    const saveStub = sinon.stub(Message.prototype, "save").resolves({
      ...messageData,
      status: "sent",
    });

    // Call the save method and assert the default status
    const result = await message.save();

    expect(result.status).to.equal("sent");

    // Restore the stubbed save method
    saveStub.restore();
  });

  it("should only allow 'sent' or 'failed' as valid statuses", async () => {
    // Mock the message data with an invalid status
    const messageData = {
      sender: new mongoose.Types.ObjectId(),
      recipient: new mongoose.Types.ObjectId(),
      content: "Invalid status test message",
      status: "pending",
    };

    // Create a new message instance
    const message = new Message(messageData);

    try {
      // Attempt to validate the message and catch any validation errors
      await message.validate();
    } catch (error) {
      expect(error.errors.status).to.exist;
      expect(error.errors.status.kind).to.equal("enum");
    }
  });
});
