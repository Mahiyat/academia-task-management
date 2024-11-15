import mongoose from "mongoose";

/**
 * Task schema representing a task within a Kanban board.
 * @typedef {object} Task
 * @property {string} title - Title of the task.
 * @property {string} description - Description of the task.
 * @property {string} category - Category of the task ("Class", "Tutorial", or "Others").
 * @property {string} priority -
 * Priority level ("red", "orange", "yellow", "green", "purple", "blue").
 * @property {Date} deadline - Deadline for task completion.
 * @property {string} status - Status of the task ("todo", "doing", "done").
 * @property {Date} createdAt - Creation date of the task.
 * @property {ObjectId} kanbanBoardId - Reference to the associated Kanban board.
 */
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: { type: String, enum: ["Class", "Tutorial", "Others"] },
  priority: {
    type: String,
    enum: ["red", "orange", "yellow", "green", "purple", "blue"],
  },
  deadline: Date,
  status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
  createdAt: { type: Date, default: Date.now },
  kanbanBoardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "KanbanBoard",
    required: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
