import semesterServices from "../services/semesterServices.js";

/**
 * Retrieves all semesters from the database.
 * Sends an array of semester objects as JSON response.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to a JSON response with all semesters.
 */
export async function getAllSemesters(req, res) {
  try {
    const semesters = await semesterServices.getAllSemesters();

    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Creates a new semester.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export async function createSemester(req, res) {
  try {
    const newSemester = await semesterServices.createSemester(req.body);

    res
      .status(201)
      .json({
        message: "Semester created successfully",
        semester: newSemester,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating semester", error: error.message });
  }
}

/**
 * Updates an existing semester in the database based on the given ID.
 * Sends the updated semester object as JSON response.
 *
 * @param {object} req - The request object.
 * @param {string} req.params.id - The ID of the semester to update.
 * @param {object} req.body - The updated semester data.
 * @param {object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to a JSON response with the updated semester.
 */
export async function updateSemester(req, res) {
  try {
    const updatedSemester = await semesterServices.updateSemester(
      req.params.id,
      req.body
    );

    if (!updatedSemester) {
      return res.status(404).json({ message: "Semester not found" });
    }
    res.status(200).json(updatedSemester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/**
 * Adds a teacher to the exam committee of a specified semester.
 * Sends the updated semester object as JSON response.
 *
 * @param {object} req - The request object.
 * @param {string} req.params.id - The ID of the semester to update.
 * @param {string} req.body.teacherId - The ID of the teacher to add to the exam committee.
 * @param {object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to a JSON response with the updated semester.
 */
export async function addExamCommitteeMember(req, res) {
  try {
    const { id } = req.params;
    const { teacherId } = req.body;

    const updatedSemester = await semesterServices.addExamCommitteeMember(
      id,
      teacherId
    );

    if (!updatedSemester) {
      return res.status(404).json({ message: "Semester not found" });
    }

    res.status(200).json(updatedSemester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
