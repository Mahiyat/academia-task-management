import express from "express";
import * as kanbanController from "../controllers/kanbanController.js";

// eslint-disable-next-line new-cap
const kanbanRoutes = express.Router();

/**
 * POST /add
 * Route to create a Kanban board linked to a course.
 */
kanbanRoutes.post("/add", kanbanController.createBoard);

/**
 * GET /
 * Route to get all Kanban boards.
 */
kanbanRoutes.get("/", kanbanController.getAllBoards);

/**
 * GET /:id
 * Route to get a specific Kanban board by ID.
 */
kanbanRoutes.get("/:id", kanbanController.getBoardById);

/**
 * PUT /update/:id
 * Route to update a Kanban board.
 */
kanbanRoutes.put("/update/:id", kanbanController.updateBoard);

/**
 * DELETE /delete/:id
 * Route to delete a Kanban board.
 */
kanbanRoutes.delete("/delete/:id", kanbanController.deleteBoard);

/**
 * GET /course/:courseId
 * Route to get a Kanban board by course ID.
 */
kanbanRoutes.get('/course/:courseId', kanbanController.getBoardByCourseId);

export { kanbanRoutes };
