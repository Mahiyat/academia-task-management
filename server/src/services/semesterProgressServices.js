import Semester from "../models/Semester.js";
import Course from "../models/Course.js";

/**
 * Fetches detailed semester progress, including overall semester progress
 * and individual course progress.
 *
 * @param {string} semesterId - The ID of the semester.
 * @returns {object} Semester progress data with overall and per-course progress.
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