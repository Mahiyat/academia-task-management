const mockCards = [
  {
    id: 1,
    category: "Assignment",
    deadline: "2024-11-05T10:00:00Z",
    description: "Complete the project proposal",
    name: "Proposal",
    members: [101, 102],
    label: { id: 1, color: "blue", priority: "high" }
  },
  {
    id: 2,
    category: "Exam Prep",
    deadline: "2024-11-12T09:00:00Z",
    description: "Review algorithms",
    name: "Algorithms Review",
    members: [103, 104],
    label: { id: 2, color: "red", priority: "urgent" }
  },
  {
    id: 3,
    category: "Lecture Notes",
    deadline: "2024-11-08T14:00:00Z",
    description: "Upload notes on database indexing",
    name: "Database Indexing",
    members: [105],
    label: { id: 3, color: "green", priority: "medium" }
  },
  {
    id: 4,
    category: "Project",
    deadline: "2024-11-18T23:59:00Z",
    description: "Finalize frontend for the e-commerce site",
    name: "Frontend Completion",
    members: [101, 106],
    label: { id: 4, color: "purple", priority: "high" }
  },
  {
    id: 5,
    category: "Research",
    deadline: "2024-11-20T17:00:00Z",
    description: "Conduct research on AI ethics",
    name: "AI Ethics Research",
    members: [107, 108],
    label: { id: 5, color: "orange", priority: "low" }
  },
  {
    id: 6,
    category: "Meeting",
    deadline: "2024-11-07T11:00:00Z",
    description: "Team meeting to discuss project timelines",
    name: "Project Meeting",
    members: [101, 102, 103],
    label: { id: 6, color: "yellow", priority: "high" }
  },
  {
    id: 7,
    category: "Assignment",
    deadline: "2024-11-10T08:00:00Z",
    description: "Solve exercises on data structures",
    name: "Data Structures Exercises",
    members: [104, 105],
    label: { id: 7, color: "blue", priority: "medium" }
  },
  {
    id: 8,
    category: "Code Review",
    deadline: "2024-11-15T18:00:00Z",
    description: "Review code for the authentication module",
    name: "Auth Code Review",
    members: [106, 107],
    label: { id: 8, color: "grey", priority: "high" }
  },
  {
    id: 9,
    category: "Documentation",
    deadline: "2024-11-13T16:00:00Z",
    description: "Update API documentation for user module",
    name: "API Documentation Update",
    members: [103],
    label: { id: 9, color: "green", priority: "low" }
  },
  {
    id: 10,
    category: "Workshop",
    deadline: "2024-11-22T15:00:00Z",
    description: "Prepare material for workshop on React",
    name: "React Workshop Preparation",
    members: [105, 108],
    label: { id: 10, color: "pink", priority: "medium" }
  }
];

// Priority mapping for sorting
const priorityMap = {
  urgent: 1,
  high: 2,
  medium: 3,
  low: 4
};

const getCards = () => {
  // Sort cards first by deadline, then by priority
  return mockCards.sort((a, b) => {
    const deadlineA = new Date(a.deadline);
    const deadlineB = new Date(b.deadline);
    
    // Compare deadlines first
    if (deadlineA - deadlineB !== 0) {
      return deadlineA - deadlineB; // Sort by deadline
    }
    
    // If deadlines are the same, compare priorities
    return priorityMap[a.label.priority] - priorityMap[b.label.priority];
  });
};

export default {
  getCards
};
