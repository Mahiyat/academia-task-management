import reportGenerationServices from '../services/reportGenerationServices.js';

/**
 * Controller function to handle course report generation request.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */

export const getCourseReport = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const courseReports = await reportGenerationServices.generateCourseReport(teacherId);
    
    if (!courseReports || courseReports.length === 0) {
      return res.status(200).json({ message: 'No courses found for this teacher' });
    }

    // eslint-disable-next-line max-len
    const invalidReports = courseReports.filter(courseReport => !courseReport.report || courseReport.report.trim() === '');

    if (invalidReports.length > 0) {
      return res.status(400).json({
        error: 'Some course reports are empty or missing sections.',
        invalidReports: invalidReports.map(courseReport => ({
          courseName: courseReport.courseName,
          courseCode: courseReport.courseCode
        }))
      });
    }

    const report = courseReports.map(courseReport => (
      `Course: ${courseReport.courseName} (${courseReport.courseCode})\n` +
      `Report:\n${courseReport.report}\n\n`
    )).join('');
    
    


    // Send the report as JSON response
    res.status(200).json({ report });
  } catch (error) {
    if (error.message === 'Teacher not found') {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    console.error("Error in getCourseReport controller:", error);
    res.status(500).json({ error: error.message });
  }
};

 
