import Message from "../models/Message.js";

/**
 * Sends a message from the sender to the recipient.
 * @param {string} senderId - The ID of the teacher sending the message.
 * @param {string} recipientId - The ID of the department receiving the message.
 * @param {string} content - The content of the message.
 * @returns {Promise<object>} The result of the send operation.
 */
const sendMessage = async (senderId, recipientId, content) => {
  try {
    const message = new Message({
      sender: senderId,
      recipient: recipientId,
      content,
    });

    await message.save();

    await sendAlert(recipientId); // Ensure the alert is sent after saving the message

    return {
      success: true,
      message: "Message sent successfully",
      data: message,
    };
  } catch (error) {
    return { success: false, message: "Message failed to send", error };
  }
};

/**
 * Sends an alert to the recipient.
 * @param {string} recipientId - The ID of the recipient to alert.
 * @returns {Promise<void>} A promise indicating completion.
 */
const sendAlert = async (recipientId) => {
  // Implement alert logic here
  console.log(`Alert sent to recipient with ID: ${recipientId}`);
};

export default {
  sendMessage,
};
