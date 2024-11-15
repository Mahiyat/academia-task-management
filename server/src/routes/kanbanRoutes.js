import express from "express";
import * as kanbanController from "../controllers/kanbanController.js";

// eslint-disable-next-line new-cap
const kanbanRoutes = express.Router();

/**
 * POST /add
 * @summary Creates a new Kanban board linked to a course.
 * @param {Kanban.model} board.body.required - The Kanban board object to create
 * @returns {object} 201 - The created Kanban board
 * @returns {Error} 500 - Error message
 */
kanbanRoutes.post("/add", kanbanController.createBoard);

/**
 * GET /
 * @summary Retrieves all Kanban boards.
 * @returns {Array.<Kanban>} 200 - An array of Kanban boards
 * @returns {Error} 500 - Error message
 */
kanbanRoutes.get("/", kanbanController.getAllBoards);

/**
 * GET /:id
 * @summary Retrieves a specific Kanban board by ID.
 * @param {string} id.path.required - The ID of the Kanban board to retrieve
 * @returns {Kanban.model} 200 - The requested Kanban board
 * @returns {Error} 404 - Kanban board not found
 * @returns {Error} 500 - Error message
 */
kanbanRoutes.get("/:id", kanbanController.getBoardById);

/**
 * PUT /update/:id
 * @summary Updates a Kanban board by ID.
 * @param {string} id.path.required - The ID of the Kanban board to update
 * @param {Kanban.model} board.body.required - The updated Kanban board object
 * @returns {object} 200 - The updated Kanban board
 * @returns {Error} 404 - Kanban board not found
 * @returns {Error} 500 - Error message
 */
kanbanRoutes.put("/update/:id", kanbanController.updateBoard);

/**
 * DELETE /delete/:id
 * @summary Deletes a Kanban board by ID.
 * @param {string} id.path.required - The ID of the Kanban board to delete
 * @returns {object} 200 - A success message
 * @returns {Error} 404 - Kanban board not found
 * @returns {Error} 500 - Error message
 */
kanbanRoutes.delete("/delete/:id", kanbanController.deleteBoard);

/**
 * GET /course/:courseId
 * @summary Retrieves a Kanban board by course ID.
 * @param {string} courseId.path.required - The ID of the course to retrieve the Kanban board for
 * @returns {Kanban.model} 200 - The requested Kanban board
 * @returns {Error} 404 - Kanban board not found
 * @returns {Error} 500 - Error message
 */
kanbanRoutes.get("/course/:courseId", kanbanController.getBoardByCourseId);

export { kanbanRoutes };
