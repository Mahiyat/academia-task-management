import express from 'express';
import { getAllTeachers, updateTeacher} from '../controllers/teacherController.js';


// eslint-disable-next-line new-cap
const teacherRoutes = express.Router();

/**
 * GET / - Retrieves all teachers.
 * @route GET /
 * @group Teachers - Operations related to teachers
 * @returns {Array<Teacher>} 200 - An array of teacher objects
 * @returns {Error} 500 - Server error
 */
teacherRoutes.get('/', getAllTeachers);
teacherRoutes.put('/:id', updateTeacher);

export { teacherRoutes };
