class ClassTutOverviewServices {
  constructor() {
    // Embedded dummy data
    this.courses = [
      {
        name: 'Introduction to AI',
        code: 'AI101',
        expectedClasses: 20,
        classesConducted: 15,
        expectedTutorials: 10,
        tutorialsConducted: 6,
        kanbanOverview: {
          todo: 5,
          doing: 3,
          done: 12,
        },
      },
      {
        name: 'Data Science Basics',
        code: 'DSB201',
        expectedClasses: 25,
        classesConducted: 20,
        expectedTutorials: 8,
        tutorialsConducted: 6,
        kanbanOverview: {
          todo: 4,
          doing: 5,
          done: 16,
        },
      },
    ];
  }

  // Function to simulate creating a new course (adding to the embedded dummy data)
  async createNewCourse(courseData) {
    this.courses.push(courseData);
    return courseData;
  }

  // Function to retrieve all courses with an overview calculation for each course
  async getAllCourses() {
    return this.courses.map((course) => {
      // Calculate progress percentages for each course
      const classCompletionPercentage = (course.classesConducted / course.expectedClasses) * 100;
      const tutorialCompletionPercentage =
       (course.tutorialsConducted / course.expectedTutorials) * 100;
      const overallProgressPercentage = 
      i(classCompletionPercentage + tutorialCompletionPercentage) / 2;

      // Determine qualitative progress status based on the percentage
      let progressStatus;

      if (overallProgressPercentage >= 90) {
        progressStatus = 'Excellent';
      } else if (overallProgressPercentage >= 70) {
        progressStatus = 'Very good';
      } else if (overallProgressPercentage >= 50) {
        progressStatus = 'Good';
      } else if (overallProgressPercentage >= 30) {
        progressStatus = 'Bad';
      } else {
        progressStatus = 'Very bad';
      }

      return {
        courseDetails: {
          name: course.name,
          code: course.code,
        },
        expectedClasses: course.expectedClasses,
        classesConducted: course.classesConducted,
        expectedTutorials: course.expectedTutorials,
        tutorialsConducted: course.tutorialsConducted,
        progressStatus,
        kanbanOverview: course.kanbanOverview,
      };
    });
  }
}

export default new ClassTutOverviewServices();
