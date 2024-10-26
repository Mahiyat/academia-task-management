import mongoose from "mongoose";

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
