import KanbanBoard from "../models/KanbanBoard.js";

// Create a new Kanban board
const createBoard = async (boardData) => {
  const newBoard = new KanbanBoard(boardData);

  return await newBoard.save();
};

// Get all Kanban boards, populating the linked course information
const getAllBoards = async () => {
  return await KanbanBoard.find().populate("courseId");
};

// Get a specific Kanban board by ID, populating the linked course information
const getBoardById = async (boardId) => {
  return await KanbanBoard.findById(boardId).populate("courseId");
};

// Update an existing Kanban board with a course link
const updateBoard = async (boardId, boardData) => {
  return await KanbanBoard.findByIdAndUpdate(boardId, boardData, { new: true });
};

// Delete a Kanban board
const deleteBoard = async (boardId) => {
  return await KanbanBoard.findByIdAndDelete(boardId);
};

const getBoardByCourseId = async (courseId) => {
  return await KanbanBoard.findOne({ courseId }).populate("courseId");
};

export default {
  createBoard,
  getAllBoards,
  getBoardById,
  deleteBoard,
  getBoardByCourseId,
};
