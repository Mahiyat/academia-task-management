import MessageService from "../services/messageService.js";

/**
 * Sends a message to the specified recipient.
 * @param {object} req - The request object containing senderId, recipientId, and content.
 * @param {object} res - The response object.
 * @returns {Promise<void>} Returns a response with the status of the message send operation.
 */
const sendMessage = async (req, res) => {
  const { senderId, recipientId, content } = req.body;

  if (!senderId || !recipientId || !content) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const response = await MessageService.sendMessage(
    senderId,
    recipientId,
    content
  );

  if (response.success) {
    return res.status(200).json({
      success: true,
      message: response.message,
      confirmation: "Message sent at " + new Date().toISOString(),
      data: response.data,
    });
  } else {
    const errorMessage = response.error
      ? "System error – unable to send message. Please try again later."
      : response.message;

    return res.status(500).json({ success: false, message: errorMessage });
  }
};

export { sendMessage };
