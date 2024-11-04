import semesterProgressTrackingServices from '../services/semesterProgressTrackingServices.js';

export async function getSemesterProgress (req, res) {
  try {
    const semesterId = req.params.semesterId;
    const progressData = await semesterProgressTrackingServices
      .calculateSemesterProgress(semesterId);

    res.status(200).json(progressData);
  } catch (error) {
    res.status(500).json({ message: "Unable to load semester data." });
  }
};

