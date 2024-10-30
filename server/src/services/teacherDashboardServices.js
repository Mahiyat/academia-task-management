import Teacher from '../models/Teacher.js';
import mongoose from 'mongoose';
import KanbanBoard from '../models/KanbanBoard.js';
import Task from '../models/Task.js';

const mockTasks = [
  {
    title: "Complete the project proposal",
    description: "Prepare and submit the project proposal document",
    category: "Class",
    priority: "blue",
    deadline: new Date("2024-11-05T10:00:00Z"),
    status: "todo",
  },
  {
    title: "Review algorithms",
    description: "Study for upcoming exam, focusing on algorithm topics",
    category: "Class",
    priority: "red",
    deadline: new Date("2024-11-12T09:00:00Z"),
    status: "doing",
  },
  {
    title: "Upload lecture notes",
    description: "Add notes on database indexing to the portal",
    category: "Tutorial",
    priority: "green",
    deadline: new Date("2024-11-08T14:00:00Z"),
    status: "todo",
  },
  {
    title: "Frontend completion",
    description: "Finalize frontend for the e-commerce project",
    category: "Others",
    priority: "purple",
    deadline: new Date("2024-11-18T23:59:00Z"),
    status: "doing",
  },
  {
    title: "AI ethics research",
    description: "Conduct preliminary research on AI ethics for paper",
    category: "Others",
    priority: "yellow",
    deadline: new Date("2024-11-20T17:00:00Z"),
    status: "todo",
  },
  {
    title: "Project meeting",
    description: "Team meeting to discuss project timelines and milestones",
    category: "Others",
    priority: "orange",
    deadline: new Date("2024-11-07T11:00:00Z"),
    status: "done",
  },
  {
    title: "Data structures exercises",
    description: "Complete exercises on data structures for assignment",
    category: "Class",
    priority: "blue",
    deadline: new Date("2024-11-10T08:00:00Z"),
    status: "doing",
  },
  {
    title: "Authentication module code review",
    description: "Review code and ensure quality for authentication module",
    category: "Others",
    priority: "red",
    deadline: new Date("2024-11-15T18:00:00Z"),
    status: "todo",
  },
  {
    title: "API documentation update",
    description: "Update the user module API documentation",
    category: "Tutorial",
    priority: "green",
    deadline: new Date("2024-11-13T16:00:00Z"),
    status: "done",
  },
  {
    title: "React workshop preparation",
    description: "Prepare slides and examples for React workshop",
    category: "Others",
    priority: "purple",
    deadline: new Date("2024-11-22T15:00:00Z"),
    status: "todo",
  }
];


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

   
  const teacher = await Teacher.find();

  console.log(id);
  console.log(teacher);
  return teacher;
  if (!teacher || !teacher.courses.length) {
    return [];
  }

  console.log(teacher.courses);
  let tasks = [];

  for (const { _id: courseId } of courses) {
    const kanbanBoard = await getBoardByCourseId(courseId);

    if (kanbanBoard) {
      const { _id: kanbanBoardId } = kanbanBoard; 
      
      const boardTasks = await getTasksByBoardAndStatus(kanbanBoardId, 'todo');

      tasks = tasks.concat(boardTasks); 

      boardTasks = await getTasksByBoardAndStatus(kanbanBoardId, 'doing');

      tasks = tasks.concat(boardTasks); 
    }
  }

  return tasks.sort((a, b) => {
    
    // Sort by deadline
    const deadlineA = new Date(a.deadline);
    const deadlineB = new Date(b.deadline);

    if (deadlineA - deadlineB !== 0) {
      return deadlineA - deadlineB;
    }

    // Sort by priority
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

export default {
  getTasks
};
