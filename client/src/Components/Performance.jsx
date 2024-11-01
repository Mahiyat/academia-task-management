import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import {
  BarPlot,
  ChartContainer,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
} from '@mui/x-charts';
import './TeacherCourses.css'; // Import the CSS file

const TeacherCourses = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/performance/teacher')
      .then(response => setTeachers(response.data))
      .catch(error => console.error("Error fetching teachers:", error));
  }, []);

  const handleTeacherSelect = (teacherId) => {
    setSelectedTeacher(teacherId);
    axios.get(`http://localhost:5000/api/performance/teacherCourse/${teacherId}`)
      .then(response => setCourses(response.data))
      .catch(error => console.error("Error fetching courses:", error));
  };

  const handleCourseSelect = (courseId) => {
    const selected = courses.find(course => course._id === courseId);
    setSelectedCourse(courseId);
    setCourseData(selected);
  };

  // Chart Data Preparation
  const valueFormatter = (value) => `${value}`;

  const series = [
    {
      type: 'bar',
      yAxisKey: 'general',
      color: '#42a5f5',
      data: [
        courseData?.expectedNoOfClasses || 0,
        courseData?.noOfClassesTaken || 0,
      ],
      valueFormatter,
    },
    {
      type: 'line',
      yAxisKey: 'general',
      color: '#f44336',
      label: 'Expected Classes',
      data: [courseData?.expectedNoOfClasses || 0],
      valueFormatter,
    },
  ];

  return (
    <div className="container">
      <h2>Select Teacher and Course</h2>

      <select onChange={(e) => handleTeacherSelect(e.target.value)} value={selectedTeacher || ''}>
        <option value="">Select a Teacher</option>
        {teachers.map(teacher => (
          <option key={teacher._id} value={teacher._id}>
            {teacher.firstName} {teacher.lastName}
          </option>
        ))}
      </select>

      {courses.length > 0 && (
        <select onChange={(e) => handleCourseSelect(e.target.value)} value={selectedCourse || ''}>
          <option value="">Select a Course</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>
              {course.courseName}
            </option>
          ))}
        </select>
      )}

      {courseData && (
        <div className="course-details">
          <h3>Course Details</h3>
          <p>Course Code: {courseData.courseCode}</p>
          <p>Course Name: {courseData.courseName}</p>
          <p>Expected Classes: {courseData.expectedNoOfClasses}</p>
          <p>Classes Taken: {courseData.noOfClassesTaken}</p>
        </div>
      )}

      <div className="chart-container">
        {courseData && (
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ChartContainer
              series={series}
              width={800}
              height={400}
              xAxis={[{
                id: 'classType',
                data: ['Expected Classes', 'Classes Taken'],
                scaleType: 'band',
              }]}
              yAxis={[{ id: 'general', scaleType: 'linear' }]}
            >
              <BarPlot />
              <LinePlot />
              <ChartsXAxis label="Class Type" position="bottom" axisId="classType" />
              <ChartsYAxis label="Number of Classes" position="left" axisId="general" />
              <ChartsTooltip />
            </ChartContainer>
            <Typography variant="body1" gutterBottom>
              {`Statistics for ${courseData.courseName}`}
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
};

export default TeacherCourses;
