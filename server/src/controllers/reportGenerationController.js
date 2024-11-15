import { Ollama } from "ollama";
import teacherServices from "../services/teacherServices.js";

const ollama = new Ollama({
  apiKey: process.env.OLLAMA_API_KEY,
  baseUrl: "http://127.0.0.1:11434",
});

/**
 * Controller function to handle course report generation request.
 * @param {object} req - The HTTP request object.
 * @param {string} req.params.teacherId - The ID of the teacher for whom the report is generated.
 * @param {object} res - The HTTP response object.
 * @throws {Error} 500 if there is a server error.
 */

export const getCourseReport = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const teacher = await teacherServices.getTeacherById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const courses = teacher.courses;

    const courseReports = [];

    for (const course of courses) {
      const prompt = `
        Analyze the performance for the course **${course.courseName} (${course.courseCode})**:

        - **Planned Classes**: ${course.expectedNoOfClasses}
        - **Classes Taken**: ${course.noOfClassesTaken}
        - **Planned Tutorials**: ${course.expectedNoOfTutorials}
        - **Tutorials Taken**: ${course.noOfTutorialsTaken}

        And provide recommendations.

      `;

      const response = await ollama.chat({
        model: "llama3.2",
        messages: [{ role: "user", content: prompt }],
      });

      courseReports.push({
        courseName: course.courseName,
        courseCode: course.courseCode,
        report: response.message.content,
      });
    }

    if (!courseReports || courseReports.length === 0) {
      return res
        .status(200)
        .json({ message: "No courses found for this teacher" });
    }

    const invalidReports = courseReports.filter(
      (courseReport) =>
        !courseReport.report || courseReport.report.trim() === ""
    );

    if (invalidReports.length > 0) {
      return res.status(400).json({
        error: "Some course reports are empty or missing sections.",
        invalidReports: invalidReports.map((courseReport) => ({
          courseName: courseReport.courseName,
          courseCode: courseReport.courseCode,
        })),
      });
    }

    const report = courseReports
      .map(
        (courseReport) =>
          `## Course: ${courseReport.courseName} (${courseReport.courseCode})\n\n` +
          `**Report:**\n\n${courseReport.report}\n\n`
      )
      .join("");

    res.status(200).json({ report });
  } catch (error) {
    console.error("Error in getCourseReport controller:", error);
    res.status(500).json({ error: error.message });
  }
};
