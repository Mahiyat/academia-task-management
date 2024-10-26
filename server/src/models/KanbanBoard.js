import mongoose from "mongoose";

/**
 * Kanban Board model representing a Kanban board in the system.
 * @typedef {object} KanbanBoard
 * @property {string} name - Name of the Kanban board.
 * @property {string} description - Description of the Kanban board.
 * @property {Date} createdAt - Creation date of the Kanban board.
 * @property {ObjectId} course - Reference to the associated course.
 */
const KanbanBoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", unique: true },
});

const KanbanBoard = mongoose.model("KanbanBoard", KanbanBoardSchema);

export default KanbanBoard;
