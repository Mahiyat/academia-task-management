import express from "express";
import helmet from "helmet";
import cors from "cors";

import config from "./config/index.js";

import { connectMongoDB } from "./db.js";

import { userRoutes } from "./routes/userRoutes.js";
import { courseRoutes } from "./routes/courseRoutes.js";
import { taskRoutes } from "./routes/taskRoutes.js";
import { kanbanRoutes } from "./routes/kanbanRoutes.js";
import { teacherRoutes } from "./routes/teacherRoutes.js";
import { semesterRoutes } from "./routes/semesterRoutes.js";
import { performanceRoutes } from "./routes/performanceRoutes.js";
import { teacherDashboardRoutes } from "./routes/teacherDashboardRoutes.js";
import { classTutOverviewRoutes } from "./routes/classTutOverviewRoutes.js";
import { semesterProgressTrackingRoutes } from "./routes/semesterProgressTrackingRoutes.js";
import { workflowRoutes } from "./routes/generateWorkflowRoutes.js";
import { messageRoutes } from "./routes/messageRoutes.js";
import { performanceChairmanRoutes } from "./routes/performanceChairmanRoutes.js";

const app = express();


app.use(express.json());
app.use(helmet());
app.use(cors(config.cors));

app.get("/_status", (req, res) => {
  res.status(200).json({ status: "OK" });
});

connectMongoDB();

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/semesters", semesterRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/kanban", kanbanRoutes);
app.use("/api/teachers",  teacherRoutes);
app.use("/api/semesters",  semesterRoutes);
app.use("/api/performance", performanceRoutes);

app.use("/api/messaging-system", messageRoutes);
app.use("/api/performanceChairman", performanceChairmanRoutes);

app.use("/api/teacher-dashboard", teacherDashboardRoutes);
app.use('/api/class-overview', classTutOverviewRoutes);
app.use('/api/generate-workflow', workflowRoutes);

app.use("/api/semester-progress-tracking", semesterProgressTrackingRoutes);


app.listen(config.app.port, () => {
  console.log(`Example app listening on port ${config.app.port}`);
}).timeout = 600000;

export default app;
