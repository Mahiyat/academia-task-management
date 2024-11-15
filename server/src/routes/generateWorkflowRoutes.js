import express from "express";
import * as generateWorkflowController from "../controllers/generateWorkflowController.js";

// eslint-disable-next-line new-cap
const workflowRoutes = express.Router();

/**
 * POST /board/{kanbanBoardId}
 * @summary Generates workflow suggestions based on the specified Kanban board ID.
 * @param {string} kanbanBoardId.path.required - The ID of the Kanban board.
 * @returns {object} 200 - Streamed response with workflow suggestions.
 * @returns {Error} 500 - Error message if generation fails.
 */
workflowRoutes.post(
  "/board/:kanbanBoardId",
  generateWorkflowController.generateSuggestions
);

export { workflowRoutes };
