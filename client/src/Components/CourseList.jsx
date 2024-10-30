import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = ({ semesterId, onSelectCourse }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null); // Track selected course

  useEffect(() => {
    if (!semesterId) return; // Skip fetch if no semester is selected

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/semesters/${semesterId}`
        );
        console.log('Fetched courses:', response.data); // Log fetched courses
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [semesterId]);

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId); // Set the selected course ID
    onSelectCourse(courseId); // Trigger parent callback with selected course
  };

  return (
    <ul
      style={{
        listStyleType: 'none',
        padding: '0',
        margin: '0',
        width: '100%',
      }}
    >
      {courses.length > 0 ? (
        courses.map((course) => (
          <li
            key={course._id}
            onClick={() => handleCourseClick(course._id)}
            style={{
              padding: '12px 16px',
              marginBottom: '8px',
              backgroundColor:
                course._id === selectedCourseId ? '#d0e8ff' : '#fff', // Highlight selected
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                course._id === selectedCourseId ? '#c2ddf7' : '#f0f0f0')
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor =
                course._id === selectedCourseId ? '#d0e8ff' : '#fff')
            }
          >
            {course.courseName}
          </li>
        ))
      ) : (
        <li
          style={{
            padding: '12px',
            textAlign: 'center',
            color: '#888',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        >
          No courses found for this semester.
        </li>
      )}
    </ul>
  );
};

export default CourseList;
