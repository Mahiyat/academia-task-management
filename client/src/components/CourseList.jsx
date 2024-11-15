import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = ({ semesterId, onSelectCourse }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    if (!semesterId) return;

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/semesters/${semesterId}`
        );
        console.log('Fetched courses:', response.data);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [semesterId]);

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
    onSelectCourse(courseId);
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
              padding: '16px 20px',
              marginBottom: '10px',
              backgroundColor:
                course._id === selectedCourseId
                  ? 'linear-gradient(135deg, #d0e8ff, #b4d8ff)'
                  : '#fff',
              border: '1px solid #ddd',
              borderRadius: '12px',
              cursor: 'pointer',
              transition:
                'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              fontSize: '1rem',
              fontWeight: '500',
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                course._id === selectedCourseId
                  ? 'linear-gradient(135deg, #c2ddf7, #a3cbee)'
                  : '#f7faff')
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor =
                course._id === selectedCourseId
                  ? 'linear-gradient(135deg, #d0e8ff, #b4d8ff)'
                  : '#fff')
            }
          >
            {course.courseName}
          </li>
        ))
      ) : (
        <li
          style={{
            padding: '16px',
            textAlign: 'center',
            color: '#888',
            backgroundColor: '#f9f9f9',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '500',
          }}
        >
          No courses found for this semester.
        </li>
      )}
    </ul>
  );
};

export default CourseList;
