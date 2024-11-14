import express from "express";
import {
  getSemesters,
  getCoursesBySemester,
  getAllTeachers,
  getTeacherCourses,
} from "../controllers/performanceChairmanController.js";

// eslint-disable-next-line new-cap
const performanceChairmanRoutes = express.Router();

performanceChairmanRoutes.get("/semesters", getSemesters);
performanceChairmanRoutes.get("/semesters/:semesterId", getCoursesBySemester);

performanceChairmanRoutes.get("/teachers", getAllTeachers);
performanceChairmanRoutes.get("/teachers/:id", getTeacherCourses);

export { performanceChairmanRoutes };
