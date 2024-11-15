import mongoose from "mongoose";

/**
 * Schema representing a message.
 *
 * @typedef {object} Message
 * @property {ObjectId} sender - The ID of the teacher sending the message.
 * @property {ObjectId} recipient - The ID of the department receiving the message.
 * @property {string} content - The content of the message.
 * @property {Date} timestamp - The date and time when the message was sent.
 * @property {string} status
 * - The status of the message, indicating if it was successfully sent or failed.
 */
const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["sent", "failed"],
    default: "sent",
  },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
