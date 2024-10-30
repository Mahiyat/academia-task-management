import Semester from '../models/Semester.js';
import semesterServices from '../services/semesterServices.js';

// Get all semesters
export async function getAllSemesters(req, res) {
  try {
    const semesters = await semesterServices.getAllSemesters();

    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// // Get a semester by ID
// export async function getSemesterById(req, res) {
//   try {
//     const semester = await findById(req.params.id).populate('courses').populate('teachers');

//     if (!semester) {
//       return res.status(404).json({ message: 'Semester not found' });
//     }
//     res.status(200).json(semester);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// Create a new semester
export async function createSemester(req, res) {
  try {
    const newSemester = await semesterServices.createSemester(req.body);
    res.status(201).json({ message: 'Semester created successfully', semester: newSemester });
  } catch (error) {
    res.status(400).json({ message: 'Error creating semester', error: error.message });
  }
}

// Update a semester
export async function updateSemester(req, res) {
  try {
    const updatedSemester = await semesterServices.updateSemester(req.params.id,req.body);

    if (!updatedSemester) {
      return res.status(404).json({ message: 'Semester not found' });
    }
    res.status(200).json(updatedSemester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

