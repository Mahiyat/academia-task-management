import classTutOverviewServices from '../services/classTutOverviewServices.js';
import ClassTutOverviewServices from '../services/classTutOverviewServices.js';

export async function getClassTutOverview(req, res) {
  const { courseId } = req.query;

  try {
    const overview = await classTutOverviewServices.getClassTutOverview(courseId);

    res.status(200).json({
      success: true,
      message: 'Class and tutorial overview loaded successfully',
      data: overview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: determineErrorMessage(error.message),
      error: error.message
    });
  }
};

const determineErrorMessage = (errorMsg) => {
  switch (errorMsg) {
  case 'No course data available':
    return 'No course data available.';
  case 'Unable to load class and tutorial overview':
    return 'Unable to load class and tutorial overview.';
  default:
    return 'System error – unable to retrieve progress chart.';
  }
};



