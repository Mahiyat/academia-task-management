import KanbanBoard from "../models/KanbanBoard.js";

/**
 * Creates a new Kanban board.
 * @param {object} boardData - Data for the new Kanban board.
 * @returns {Promise<object>} The created Kanban board.
 */
const createBoard = async (boardData) => {
  const newBoard = new KanbanBoard(boardData);

  return await newBoard.save();
};

/**
 * Retrieves all Kanban boards, populating course information.
 * @returns {Promise<Array>} An array of Kanban boards.
 */
const getAllBoards = async () => {
  return await KanbanBoard.find().populate("course");
};

/**
 * Retrieves a specific Kanban board by its ID, populating course information.
 * @param {string} boardId - The ID of the Kanban board to retrieve.
 * @returns {Promise<object|null>} The Kanban board or null if not found.
 */
const getBoardById = async (boardId) => {
  return await KanbanBoard.findById(boardId).populate("course");
};

/**
 * Updates a Kanban board by its ID.
 * @param {string} boardId - The ID of the Kanban board to update.
 * @param {object} boardData - New data for the Kanban board.
 * @returns {Promise<object|null>} The updated Kanban board or null if not found.
 */
const updateBoard = async (boardId, boardData) => {
  return await KanbanBoard.findByIdAndUpdate(boardId, boardData, { new: true });
};

/**
 * Deletes a Kanban board by its ID.
 * @param {string} boardId - The ID of the Kanban board to delete.
 * @returns {Promise<object|null>} The deleted Kanban board or null if not found.
 */
const deleteBoard = async (boardId) => {
  return await KanbanBoard.findByIdAndDelete(boardId);
};

/**
 * Retrieves a Kanban board by the associated course ID.
 * @param {string} courseId - The ID of the course linked to the Kanban board.
 * @returns {Promise<object|null>} The Kanban board or null if not found.
 */
const getBoardByCourseId = async (courseId) => {
  return await KanbanBoard.findOne({ course: courseId }).populate("course");
};

export default {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
  getBoardByCourseId,
};
