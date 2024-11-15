import express from "express";
import { sendMessage } from "../controllers/messageController.js";

// eslint-disable-next-line new-cap
const messageRoutes = express.Router();

/**
 * POST /send
 * @param {object} message.body.required - The message object to send
 * @returns {object} 200 - The confirmation of message sending
 * @returns {Error}  400 - Missing required fields
 * @returns {Error}  500 - System error message
 */
messageRoutes.post("/send", sendMessage);

export { messageRoutes };
