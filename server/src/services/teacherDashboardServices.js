import Teacher from '../models/Teacher.js';
import taskServices from "../services/taskServices.js";
import KanbanBoard from '../models/KanbanBoard.js';


// Priority mapping for sorting
const priorityOrder = {
  red: 1,
  orange: 2,
  yellow: 3,
  green: 4,
  blue: 5,
  purple: 6
};


const getTasks = async (id) => {

   
  const teacher = await Teacher.findById(id).populate("courses");

  if (!teacher || !teacher.courses.length) {
    return [];
  }
  let tasks = [];

  for (const { _id: courseId } of teacher.courses) {

    const course = courseId.toString(); 

    const kanbanBoard = await KanbanBoard.findOne({course});

    if (kanbanBoard) {
      const { _id: kanbanBoardId } = kanbanBoard;
      const kanbanBoardIdString = kanbanBoardId.toString(); 
      
      const todoTasks = await taskServices.getTasksByBoardAndStatus(kanbanBoardIdString, 'todo');

      tasks = tasks.concat(todoTasks); 

      const doingTasks = await taskServices.getTasksByBoardAndStatus(kanbanBoardIdString, 'doing'); 

      tasks = tasks.concat(doingTasks); 
    } else {
      console.log(`No kanban board found for course ID: ${courseIdString}`);
    }
  }


  return tasks.sort((a, b) => {
    
    const deadlineA = new Date(a.deadline);
    const deadlineB = new Date(b.deadline);

    if (deadlineA - deadlineB !== 0) {
      return deadlineA - deadlineB;
    }

    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

export default {
  getTasks
};
