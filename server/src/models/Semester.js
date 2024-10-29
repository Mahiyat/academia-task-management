const mongoose = require('mongoose');

const SemesterSchema = new mongoose.Schema({
  semesterTitle : {
    type : String,
    required : true
  },
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
  examCommittee: [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Teacher'
    }
  ],
  sessionYear: {
    type: Number
  },
  programType: {
    type: String
  },
});

module.exports = mongoose.model('Semester', SemesterSchema);
