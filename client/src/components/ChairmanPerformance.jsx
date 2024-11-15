import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeacherCourses.css';
import Barchart from './Barchart';
import BarchartAll from './BarchartAll';

const ChairmanCourse = () => {
  const [view, setView] = useState(''); // 'semester' or 'teacher'
  const [semesters, setSemesters] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch semesters and teachers on component mount
  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/performanceChairman/semesters');
        setSemesters(response.data);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/performanceChairman/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchSemesters();
    fetchTeachers();
  }, []);

  // Fetch courses based on the selected semester
  const fetchCoursesBySemester = async (semesterId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/performanceChairman/semesters/${semesterId}`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses for semester:", error);
    }
  };

  // Fetch courses based on the selected teacher
  const fetchCoursesByTeacher = async (teacherId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/performanceChairman/teachers/${teacherId}`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses for teacher:", error);
    }
  };

  // Handle view change (semester or teacher)
  const handleViewChange = (e) => {
    setView(e.target.value);
    setSelectedSemester(null);
    setSelectedTeacher(null);
    setCourses([]);
  };

  // Handle semester selection
  const handleSemesterChange = (e) => {
    const semesterId = e.target.value;
    setSelectedSemester(semesterId);
    fetchCoursesBySemester(semesterId);
  };

  // Handle teacher selection
  const handleTeacherChange = (e) => {
    const teacherId = e.target.value;
    setSelectedTeacher(teacherId);
    fetchCoursesByTeacher(teacherId);
  };

  // Handle course selection
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div className="container">
      <h1>Academic Information System</h1>
      <div>
        <label>Select Type: </label>
        <select onChange={handleViewChange}>
          <option value="">-- Select type --</option>
          <option value="semester">Semester</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      {view === 'semester' && (
        <div>
          <h2>Select Semester</h2>
          <select onChange={handleSemesterChange} value={selectedSemester || ""}>
            <option value="">-- Select Semester --</option>
            {semesters.map((semester) => (
              <option key={semester._id} value={semester._id}>
                {semester.semesterTitle} ({semester.semesterYear})
              </option>
            ))}
          </select>
        </div>
      )}

      {view === 'teacher' && (
        <div>
          <h2>Select Teacher</h2>
          <select onChange={handleTeacherChange} value={selectedTeacher || ""}>
            <option value="">-- Select Teacher --</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstName} {teacher.lastName} ({teacher.designation})
              </option>
            ))}
          </select>
        </div>
      )}

      {courses.length > 0 && (
        <div>
          <h3>Select Course</h3>
          <select onChange={handleCourseChange} value={selectedCourse || ""}>
            <option value="all">All Courses</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseCode} - {course.courseName}
              </option>
            ))}
          </select>

          <div>
            {selectedCourse === "all" ? (
              <div className="all-courses">
                {courses.map((course) => (
                  <div key={course._id} className="course-details">
                    <h4>{course.courseName}</h4>
                    <p>Code: {course.courseCode}</p>
                    <p>Credit: {course.courseCredit}</p>
                  </div>
                ))}
                <BarchartAll allCourseData={courses} />
              </div>
            ) : (
              courses
                .filter((course) => course._id === selectedCourse)
                .map((course) => (
                  <div key={course._id} className="course-details">
                    <h4>{course.courseName}</h4>
                    <p>Code: {course.courseCode}</p>
                    <p>Credit: {course.courseCredit}</p>
                    <p>Contact Hours: {course.contactHours}</p>
                    <Barchart courseData={course} />
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChairmanCourse;
