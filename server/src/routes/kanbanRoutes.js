import express from "express";
import * as kanbanController from "../controllers/kanbanController.js";

// eslint-disable-next-line new-cap
const kanbanRoutes = express.Router();

// Route to create a Kanban board linked to a course
kanbanRoutes.post("/add", kanbanController.createBoard);

// Route to get all Kanban boards
kanbanRoutes.get("/", kanbanController.getAllBoards);

// Route to get a specific Kanban board by ID
kanbanRoutes.get("/:id", kanbanController.getBoardById);

// Route to update a Kanban board
kanbanRoutes.put("/update/:id", kanbanController.updateBoard);

// Route to delete a Kanban board
kanbanRoutes.delete("/delete/:id", kanbanController.deleteBoard);

// Route to get a Kanban board by course ID
kanbanRoutes.get('/course/:courseId', kanbanController.getBoardByCourseId);

export { kanbanRoutes };