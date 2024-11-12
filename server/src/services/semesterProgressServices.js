import Semester from "../models/Semester.js";
import Course from "../models/Course.js";

/**
 * Fetches detailed semester progress, including overall semester progress
 * and individual course progress.
 *
 * @async
 * @function getSemesterProgress
 * @param {string} semesterId - The ID of the semester to retrieve progress for.
 * @returns {Promise<object>} An object containing the overall progress of the semester
 * and detailed progress for each course.
 * @throws {Error} Throws an error if the semester is not found.
 * 
 * @property {string} overallProgress - The total progress of the semester as a percentage (0-100).
 * @property {Array<object>} coursesProgress - An array containing the progress details of each course.
 * @property {string} coursesProgress[].courseId - The ID of the course.
 * @property {string} coursesProgress[].courseName - The name of the course.
 * @property {string} coursesProgress[].courseCode - The code of the course.
 * @property {string} coursesProgress[].lectureProgress - The lecture progress of the course as a percentage (0-100).
 * @property {string} coursesProgress[].tutorialProgress - The tutorial progress of the course as a percentage (0-100).
 */
export const getSemesterProgress = async (semesterId) => {
  const semester = await Semester.findById(semesterId).populate("courses");
  if (!semester) throw new Error("Semester not found");

  let totalClassesExpected = 0;
  let totalClassesTaken = 0;
  let totalTutorialsExpected = 0; 
  let totalTutorialsTaken = 0; 

  // Calculate individual course progress
  const coursesProgress = await Promise.all(
    semester.courses.map(async (course) => {
      const courseData = await Course.findById(course._id);
      if (!courseData) return null;

      // Lecture and tutorial coverage calculations
      const lectureProgress = (courseData.noOfClassesTaken / courseData.expectedNoOfClasses) * 100 || 0;
      const tutorialProgress = (courseData.noOfTutorialsTaken / courseData.expectedNoOfTutorials) * 100 || 0;

      // Update semester totals
      totalClassesExpected += courseData.expectedNoOfClasses || 0;
      totalClassesTaken += courseData.noOfClassesTaken || 0;
      totalTutorialsExpected += courseData.expectedNoOfTutorials || 0; 
      totalTutorialsTaken += courseData.noOfTutorialsTaken || 0; 

      return {
        courseId: courseData._id,
        courseName: courseData.courseName,
        courseCode: courseData.courseCode,
        lectureProgress: lectureProgress.toFixed(2),
        tutorialProgress: tutorialProgress.toFixed(2),
      };
    })
  );

  // Overall semester progress calculation considering both classes and tutorials
  const overallProgress =
    ((totalClassesTaken + totalTutorialsTaken) /
     (totalClassesExpected + totalTutorialsExpected)) * 100 || 0;

  return {
    overallProgress: overallProgress.toFixed(2),
    coursesProgress: coursesProgress.filter(Boolean),
  };
};

export default {
  getSemesterProgress,
};
