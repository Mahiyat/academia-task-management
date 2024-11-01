import Teacher from '../models/Teacher.js';
import taskServices from "../services/taskServices.js";
import KanbanBoard from '../models/KanbanBoard.js';



const getTasks = async (teacherId) => {

   
  const teacher = await Teacher.findById(teacherId).populate("courses");
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


  return tasks;
};

export default {
  getTasks
};
