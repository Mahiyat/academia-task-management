import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div className="container" style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Select Teacher and Course</h2>

      <select 
        onChange={(e) => handleTeacherSelect(e.target.value)} 
        value={selectedTeacher || ''} 
        style={{ fontSize: '18px', margin: '10px 0', padding: '5px' }}
      >
        <option value="">Select a Teacher</option>
        {teachers.map(teacher => (
          <option key={teacher._id} value={teacher._id}>
            {teacher.firstName} {teacher.lastName}
          </option>
        ))}
      </select>

      {courses.length > 0 && (
        <select 
          onChange={(e) => handleCourseSelect(e.target.value)} 
          value={selectedCourse || ''} 
          style={{ fontSize: '18px', margin: '10px 0', padding: '5px' }}
        >
          <option value="">Select a Course</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>
              {course.courseName}
            </option>
          ))}
        </select>
      )}

      {courseData && (
        <div className="course-details" style={{ marginTop: '20px', fontSize: '18px' }}>
          <h3 style={{ fontWeight: 'bold' }}>Course Details</h3>
          <p><strong>Course Code:</strong> {courseData.courseCode}</p>
          <p><strong>Course Name:</strong> {courseData.courseName}</p>
          <p><strong>Expected Classes:</strong> {courseData.expectedNoOfClasses}</p>
          <p><strong>Classes Taken:</strong> {courseData.noOfClassesTaken}</p>
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;
