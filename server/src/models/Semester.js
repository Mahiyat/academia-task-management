const mongoose = require('mongoose');

const SemesterSchema = new mongoose.Schema({
  semesterYear: {
    type: Number,
    required: true
  },
  semesterNo: {
    type: Number,
    required: true
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  examCommittee: {
    type: Number
  },
  sessionYear: {
    type: Number
  },
  programType: {
    type: String
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    }
  ]
});

module.exports = mongoose.model('Semester', SemesterSchema);
