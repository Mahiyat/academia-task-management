import mongoose from 'mongoose';

/**
 * Schema representing a semester.
 * 
 * @typedef {object} Semester
 * @property {string} semesterTitle - The title of the semester.
 * @property {number} semesterYear - The year of the semester.
 * @property {number} semesterNo - The semester number within the academic year
 * @property {Array<ObjectId>} courses - Array of course IDs associated with this semester.
 * @property {Array<ObjectId>} examCommittee - Array of teacher IDs assigned to the exam committee.
 * @property {string} [sessionYear] - The academic session year (e.g., "2023-24").
 * @property {string} [programType] - The type of academic program .
 */
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
