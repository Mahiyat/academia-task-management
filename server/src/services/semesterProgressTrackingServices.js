import Semester from '../models/Semester.js';
import Course from '../models/Course.js';

/**
 * Calculates the progress of a specific semester based on the progress of each course.
 * 
 * @async
 * @function calculateSemesterProgress
 * @param {string} semesterId - The ID of the semester to calculate progress for.
<<<<<<< HEAD
 * @returns {Promise<object>} An object containing 
 * the semester title and progress data for each course.
=======
 * @returns {Promise<Object>} An object containing the semester title and progress data for each course.
>>>>>>> af58ac5 (modify frontend for assignExamCommittee)
 * 
 * @throws {Error} Throws an error if unable to calculate semester progress.
 */
const calculateSemesterProgress = async (semesterId) => {
  try {
    const semester = await Semester.findById(semesterId).populate('courses');

    const progressData = semester.courses.map(course => {
      const classProgress = course.expectedNoOfClasses 
        ? (course.noOfClassesTaken / course.expectedNoOfClasses) * 100 
        : 0;
      const tutorialProgress = course.expectedNoOfTutorials 
        ? (course.noOfTutorialsTaken / course.expectedNoOfTutorials) * 100 
        : 0;
      const totalProgress = ((classProgress + tutorialProgress) / 2).toFixed(2);

      return {
        courseName: course.courseName,
        classProgress: classProgress.toFixed(2),
        tutorialProgress: tutorialProgress.toFixed(2),
        totalProgress: totalProgress,
        noOfClassesTaken: course.noOfClassesTaken,
        noOfTutorialsTaken: course.noOfTutorialsTaken
      };
    });

    return { semesterTitle: semester.semesterTitle, progressData };
  } catch (error) {
    throw new Error("Error calculating semester progress");
  }
};

/**
 * Retrieves the progress data for all semesters.
 * 
 * @async
 * @function getAllSemestersProgress
 * @returns {Promise<Array<object>>} An array of objects, each 
 * containing a semester title and the total progress.
 * 
 * @throws {Error} Throws an error if unable to fetch progress for all semesters.
 */
const getAllSemestersProgress = async () => {
  try {
    const semesters = await Semester.find({}).populate('courses');
    
    // Create an array to hold all semesters' progress
    const semestersProgress = await Promise.all(semesters.map(async (semester) => {
      // eslint-disable-next-line 'no-underscore-dangle'
      const { semesterTitle, progressData } = await calculateSemesterProgress(semester._id);
      
      // Calculate total progress for this semester
      const totalProgress = progressData.reduce((acc, course) => {
        return acc + parseFloat(course.totalProgress);
      }, 0) / progressData.length; // Average progress

      return {
        semesterTitle,
        totalProgress: totalProgress.toFixed(2), // Total progress as a fixed decimal
      };
    }));

    return semestersProgress;
  } catch (error) {
    throw new Error("Error fetching all semesters progress");
  }
};

export default {
  calculateSemesterProgress,
  getAllSemestersProgress,
};
