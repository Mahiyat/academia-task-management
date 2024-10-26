import mongoose from "mongoose";

const KanbanBoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", unique: true },
});

const KanbanBoard = mongoose.model("KanbanBoard", KanbanBoardSchema);

export default KanbanBoard;
