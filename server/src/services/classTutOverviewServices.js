import Teacher from "../models/Teacher.js";

/**
 * Retrieves course overview data for a specified teacher, including progress metrics and status.
 * @param {string} teacherId - The ID of the teacher whose course overview data is to be fetched.
 * @returns {Promise<object[]>} An array of objects representing course details,
 * progress metrics, and status.
 * @throws {Error} Throws an error if no course data is available or
 * if there is an issue loading the data.
 */

const getCourseOverviewData = async (teacherId) => {
  try {
    const teacher = await Teacher.findById(teacherId).populate("courses");

    console.log(teacher);
    // Retrieve courses for a specific teacher
    const courses = teacher.courses;

    if (!courses.length) {
      throw new Error("No course data available");
    }

    // Calculate progress and format response data
    return courses.map((course) => {
      // eslint-disable-next-line max-len
      const classCompletionPercentage =
        (course.noOfClassesTaken / course.expectedNoOfClasses) * 100;
      // eslint-disable-next-line max-len
      const tutorialCompletionPercentage =
        (course.noOfTutorialsTaken / course.expectedNoOfTutorials) * 100;
      // eslint-disable-next-line max-len
      const overallProgressPercentage =
        (classCompletionPercentage + tutorialCompletionPercentage) / 2;

      // Determine qualitative progress status
      let progressStatus;

      if (overallProgressPercentage >= 90) {
        progressStatus = "Excellent";
      } else if (overallProgressPercentage >= 70) {
        progressStatus = "Very good";
      } else if (overallProgressPercentage >= 50) {
        progressStatus = "Good";
      } else if (overallProgressPercentage >= 30) {
        progressStatus = "Bad";
      } else {
        progressStatus = "Very bad";
      }

      return {
        courseDetails: {
          courseName: course.courseName,
          courseCode: course.courseCode,
          courseCredit: course.courseCredit,
          courseType: course.courseType,
          contactHours: course.contactHours,
        },
        expectedNoOfClasses: course.expectedNoOfClasses,
        noOfClassesTaken: course.noOfClassesTaken,
        expectedNoOfTutorials: course.expectedNoOfTutorials,
        noOfTutorialsTaken: course.noOfTutorialsTaken,
        progressStatus,
      };
    });
  } catch (error) {
    throw new Error(
      error.message || "Unable to load class and tutorial overview."
    );
  }
};

export default { getCourseOverviewData };
