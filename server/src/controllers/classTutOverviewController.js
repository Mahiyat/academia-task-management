// controllers/classTutOverviewController.js
import classTutOverviewService from '../services/classTutOverviewServices.js';

export const getClassTutOverview = async (req, res) => {
  const { teacherId } = req.params;

  console.log(teacherId);
  try {
    const overviewData = await classTutOverviewService.getCourseOverviewData(teacherId);

    res.status(200).json(overviewData);
  } catch (error) {
    if (error.message === 'No course data available') {
      res.status(404).json({ message: 'No course data available.' });
    } else if (error.message === 'Unable to load class and tutorial overview.') {
      res.status(500).json({ message: 'Unable to load class and tutorial overview.' });
    } else {
      res.status(500).json({ message: 'System error – unable to retrieve progress chart.' });
    }
  }
};
