const Semester = require('../models/Semester');

// Get all semesters
exports.getAllSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find().populate('courses').populate('teachers');

    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a semester by ID
exports.getSemesterById = async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id).populate('courses').populate('teachers');

    if (!semester) {
      return res.status(404).json({ message: 'Semester not found' });
    }
    res.status(200).json(semester);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new semester
exports.createSemester = async (req, res) => {
  const semester = new Semester(req.body);

  try {
    const newSemester = await semester.save();

    res.status(201).json(newSemester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a semester
exports.updateSemester = async (req, res) => {
  try {
    const updatedSemester = await Semester.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedSemester) {
      return res.status(404).json({ message: 'Semester not found' });
    }
    res.status(200).json(updatedSemester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

