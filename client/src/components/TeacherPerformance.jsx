import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeacherCourses.css';
import Barchart from './Barchart';
import BarchartAll from './BarchartAll'

const TeacherCourses = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [allCourseData, setAllCoursesData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/performance/teacher')
      .then(response => setTeachers(response.data))
      .catch(error => console.error("Error fetching teachers:", error));
  }, []);

  const handleTeacherSelect = (teacherId) => {
    setSelectedTeacher(teacherId);
    axios.get(`http://localhost:5000/api/performance/teacherCourse/${teacherId}`)
      .then(response => {
        setCourses(response.data);
        setAllCoursesData(response.data);
      })
      .catch(error => console.error("Error fetching courses:", error));
  };

  const handleCourseSelect = (courseId) => {
    if (courseId === "all") {
      setSelectedCourse("all");
      setCourseData(null);
    } else {
      const selected = courses.find(course => course._id === courseId);
      setSelectedCourse(courseId);
      setCourseData(selected);
    }
  };

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
          <option value="all">All Courses</option>
        </select>
      )}

      {selectedCourse === "all" ? (
        <div className="all-courses">
          <h3>All Courses Details</h3>
          {allCourseData.map(course => (
            <><div key={course._id} className="course-details">
              <p>Course Code: {course.courseCode}</p>
              <p>Course Name: {course.courseName}</p>
              <p>Expected Classes: {course.expectedNoOfClasses}</p>
              <p>Classes Taken: {course.noOfClassesTaken}</p>
              <p>Expected Tutorials: {course.expectedNoOfTutorials}</p>
              <p>Tutorials Taken: {course.noOfTutorialsTaken}</p>
              <hr />
            </div><div>
      
              </div></>
          ))}
          <h1>Courses Data</h1>
          <BarchartAll allCourseData={allCourseData} />
        </div>
      ) : (
        courseData && (
          <><div className="course-details">
              <h3>Course Details</h3>
              <p>Course Code: {courseData.courseCode}</p>
              <p>Course Name: {courseData.courseName}</p>
              <p>Expected Classes: {courseData.expectedNoOfClasses}</p>
              <p>Classes Taken: {courseData.noOfClassesTaken}</p>
              <p>Expected Tutorials: {courseData.expectedNoOfTutorials}</p>
              <p>Tutorials Taken: {courseData.noOfTutorialsTaken}</p>
            </div><div>
                <h1>Course Data</h1>
                <Barchart courseData={courseData} />
              </div></>
        )


      )}
    </div>
  );
};

export default TeacherCourses;
