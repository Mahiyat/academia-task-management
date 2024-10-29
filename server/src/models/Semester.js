import mongoose from 'mongoose';

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
    type: String
  },
  programType: {
    type: String
  },
});

const Semester = mongoose.model('Semester', SemesterSchema);

export default Semester;
