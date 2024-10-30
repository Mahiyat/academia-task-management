import Teacher from "../models/Teacher.js";
import taskServices from "../services/taskServices.js";
import KanbanBoard from "../models/KanbanBoard.js";

/**
 * Retrieves all 'todo' and 'doing' tasks for a given teacher, based on
 * their courses and associated kanban boards.
 *
 * @async
 * @function getTasks
 * @param {string} teacherId - Unique identifier for the teacher.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of task objects.
 */
const getTasks = async (teacherId) => {
  const teacher = await Teacher.findById(teacherId).populate("courses");
  let tasks = [];

  for (const { _id: courseId } of teacher.courses) {
    const course = courseId.toString();

    const kanbanBoard = await KanbanBoard.findOne({ course });

    const { _id: kanbanBoardId } = kanbanBoard;
    const kanbanBoardIdString = kanbanBoardId.toString();

    const todoTasks = await taskServices.getTasksByBoardAndStatus(
      kanbanBoardIdString,
      "todo"
    );

    tasks = tasks.concat(todoTasks);

    const doingTasks = await taskServices.getTasksByBoardAndStatus(
      kanbanBoardIdString,
      "doing"
    );

    tasks = tasks.concat(doingTasks);
  }

  return tasks;
};

export default {
  getTasks,
};
