import kanbanServices from "../services/kanbanServices.js";

export const createBoard = async (req, res) => {
  try {
    const board = await kanbanServices.createBoard(req.body);

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Kanban board creation failed", error });
  }
};

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

export const deleteBoard = async (req, res) => {
  try {
    await kanbanServices.deleteBoard(req.params.id);
    res.status(200).json({ message: "Kanban board deleted" });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete Kanban board", error });
  }
};

// Controller to get a Kanban board by course ID
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
