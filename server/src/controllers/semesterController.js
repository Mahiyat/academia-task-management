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
    const updatedSemester = await semesterServices.updateSemester(req.params.id,  req.body);

    if (!updatedSemester) {
      return res.status(404).json({ message: 'Semester not found' });
    }
    res.status(200).json(updatedSemester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function addExamCommitteeMember(req,  res){
  try {
    const { id } = req.params;
    const { teacherId } = req.body;

    const updatedSemester = await semesterServices.addExamCommitteeMember(id, teacherId);

    if (!updatedSemester) {
      return res.status(404).json({ message: 'Semester not found' });
    }

    res.status(200).json(updatedSemester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

