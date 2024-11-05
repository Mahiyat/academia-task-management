import generateWorkflowServices from "../services/generateWorkflowServices.js";

/**
 * Streams the response from the service to the client in chunks.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {Promise<void>} - Sends the generated suggestions as a stream to the client.
 */
export const generateSuggestions = async (req, res) => {
  try {
    const kanbanBoardId = req.params.kanbanBoardId;

    res.setHeader("Content-Type", "application/json");

    const responseStream = await generateWorkflowServices.generateSuggestions(
      kanbanBoardId
    );

    if (!responseStream) {
      throw new Error("Response stream is undefined");
    }

    for await (const chunk of responseStream) {

      const data = JSON.stringify({
        response: chunk.response,
        done: chunk.done,
      });


      res.write(data + "\n");

      if (chunk.done) {
        break;
      }
    }

    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to generate workflow suggestions" });
  }
};
