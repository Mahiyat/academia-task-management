import express from 'express';
import { addExamCommitteeMember, getAllSemesters, updateSemester, createSemester }
  from '../controllers/semesterController.js';


// eslint-disable-next-line new-cap
const semesterRoutes = express.Router();

// getAllSemesters

semesterRoutes.get("/", getAllSemesters);
semesterRoutes.put("/updatedSemester/:id", updateSemester);
semesterRoutes.put("/:id/examCommittee", addExamCommitteeMember);
semesterRoutes.get('/', getAllSemesters);
semesterRoutes.post('/', createSemester);
semesterRoutes.post('/updatedSemester', updateSemester);

export { semesterRoutes };
