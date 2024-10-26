/* eslint-disable jsdoc/require-returns */
import kanbanServices from "../services/kanbanServices.js";

/**
 * Creates a new Kanban board.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const createBoard = async (req, res) => {
  try {
    const board = await kanbanServices.createBoard(req.body);

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Kanban board creation failed", error });
  }
};

/**
 * Retrieves all Kanban boards.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const getAllBoards = async (req, res) => {
  try {
    const boards = await kanbanServices.getAllBoards();

    res.status(200).json(boards);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to retrieve Kanban boards", error });
  }
};

/**
 * Retrieves a Kanban board by ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const getBoardById = async (req, res) => {
  try {
    const board = await kanbanServices.getBoardById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: "Kanban board not found" });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Kanban board", error });
  }
};

/**
 * Updates a Kanban board by ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const updateBoard = async (req, res) => {
  try {
    const board = await kanbanServices.updateBoard(req.params.id, req.body);

    if (!board) {
      return res.status(404).json({ message: "Kanban board not found" });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: "Unable to update Kanban board", error });
  }
};

/**
 * Deletes a Kanban board by ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const deleteBoard = async (req, res) => {
  try {
    await kanbanServices.deleteBoard(req.params.id);
    res.status(200).json({ message: "Kanban board deleted" });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete Kanban board", error });
  }
};

/**
 * Retrieves a Kanban board by course ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const getBoardByCourseId = async (req, res) => {
  try {
    const board = await kanbanServices.getBoardByCourseId(req.params.courseId);

    if (!board) {
      return res
        .status(404)
        .json({ message: "Kanban board not found for the given course" });
    }
    res.status(200).json(board);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving Kanban board by course ID", error });
  }
};
