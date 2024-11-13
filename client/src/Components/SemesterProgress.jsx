import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SemesterProgress = () => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemesterId, setSelectedSemesterId] = useState('');
  const [semesterProgress, setSemesterProgress] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null); // Store selected course details

  // Fetch semesters on component mount
  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semesters');
        setSemesters(response.data);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };

    fetchSemesters();
  }, []);

  // Fetch semester progress when a semester is selected
  const handleSemesterChange = async (event) => {
    const semesterId = event.target.value;
    setSelectedSemesterId(semesterId);

    if (semesterId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/progress/${semesterId}`);
        setSemesterProgress(response.data);
      } catch (error) {
        console.error("Error fetching semester progress:", error);
      }
    } else {
      setSemesterProgress(null);
    }
  };

  // Handle course progress bar click to show detailed course view
  const handleCourseClick = (course) => {
    setSelectedCourse(course); // Store the selected course to show its details
  };

  // Handle the back button to go back to the semester overview
  const handleBackToSemesterOverview = () => {
    setSelectedCourse(null); // Clear the selected course to go back to the semester overview
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Semester Progress Overview</h1>
      </div>

      {/* Dropdown to select a semester */}
      <div style={styles.dropdownContainer}>
        <select
          onChange={handleSemesterChange}
          value={selectedSemesterId}
          style={styles.dropdown}
        >
          <option value="">Select a Semester</option>
          {semesters.map((semester) => (
            <option key={semester._id} value={semester._id}>
              {semester.semesterTitle}
            </option>
          ))}
        </select>
      </div>

      {/* If a semester is selected and there's progress data, display it */}
      {semesterProgress && !selectedCourse && (
        <div style={styles.progressContainer}>
          <h2>Overall Progress: {semesterProgress.overallProgress}%</h2>

          {/* Progress bar for overall semester progress */}
          <div style={styles.progressBarContainer}>
            <div
              style={{
                ...styles.progressBar,
                width: `${semesterProgress.overallProgress}%`,
                backgroundColor:
                  semesterProgress.overallProgress > 80
                    ? 'green'
                    : semesterProgress.overallProgress >= 40
                    ? 'yellow'
                    : 'red',
              }}
            />
            <span style={styles.progressText}>{semesterProgress.overallProgress}%</span>
          </div>

          {/* Course progress */}
          <h3>Course Progress</h3>
          {semesterProgress.coursesProgress.map((course) => (
            <div key={course.courseId} style={styles.courseContainer}>
              <div style={styles.courseDetails}>
                <strong>{course.courseName} ({course.courseCode})</strong>

                {/* Progress bar for each course */}
                <div
                  style={styles.courseProgressBar}
                  onClick={() => handleCourseClick(course)} // Click to show detailed course info
                >
                  <div
                    style={{
                      ...styles.courseProgress,
                      width: `${course.lectureProgress}%`,
                      backgroundColor:
                        course.lectureProgress > 80
                          ? 'green'
                          : course.lectureProgress >= 40
                          ? 'yellow'
                          : 'red',
                    }}
                  />
                  <span style={styles.courseProgressText}>
                    {course.lectureProgress}%
                  </span>
                </div>
                {/* <div>
                  Tutorial Progress: {course.tutorialProgress}%
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* If a course is selected, display its details */}
      {selectedCourse && (
        <div style={styles.courseDetailsContainer}>
          <button
            onClick={handleBackToSemesterOverview}
            style={styles.backButton}
          >
            Back to Semester Overview
          </button>

          <h2>{selectedCourse.courseName} - {selectedCourse.courseCode}</h2>
          <p><strong>Lecture Progress:</strong> {selectedCourse.lectureProgress}%</p>
          <p><strong>Tutorial Progress:</strong> {selectedCourse.tutorialProgress}%</p>

          {/* Lecture Progress Bar */}
          <div style={styles.progressBarContainer}>
            <div
              style={{
                ...styles.progressBar,
                width: `${selectedCourse.lectureProgress}%`,
                backgroundColor:
                  selectedCourse.lectureProgress > 80
                    ? 'green'
                    : selectedCourse.lectureProgress >= 40
                    ? 'yellow'
                    : 'red',
              }}
            />
            <span style={styles.progressText}>{selectedCourse.lectureProgress}%</span>
          </div>

          {/* Tutorial Progress Bar */}
          <div style={styles.progressBarContainer}>
            <div
              style={{
                ...styles.progressBar,
                width: `${selectedCourse.tutorialProgress}%`,
                backgroundColor:
                  selectedCourse.tutorialProgress > 80
                    ? 'green'
                    : selectedCourse.tutorialProgress >= 40
                    ? 'yellow'
                    : 'red',
              }}
            />
            <span style={styles.progressText}>{selectedCourse.tutorialProgress}%</span>
          </div>

          {/* Display any additional details for the course here */}
          {/* <div>
            <h3>Assignments</h3>
            {selectedCourse.assignments && selectedCourse.assignments.map((assignment, index) => (
              <div key={index}>
                <p>{assignment.name}: {assignment.completionRate}%</p>
              </div>
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: 'black',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#3D3D3D',
  },
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  dropdown: {
    padding: '12px 15px',
    fontSize: '16px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    border: '2px solid #ccc',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#FAFAFA',
  },
  progressContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  progressBarContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    height: '30px',
    margin: '20px auto',
    backgroundColor: '#E0E0E0',
    borderRadius: '15px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: '15px 0 0 15px',
    position: 'absolute',
    transition: 'width 0.5s ease-in-out',
  },
  progressText: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    fontWeight: 'bold',
  },
  courseContainer: {
    margin: '20px 0',
    padding: '20px',
    backgroundColor: '#E2F3F5 ',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  courseDetails: {
    marginBottom: '10px',
    color: '#555',
  },
  courseProgressBar: {
    width: '100%',
    height: '20px',
    backgroundColor: '#E0E0E0',
    borderRadius: '10px',
    marginTop: '10px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  courseProgress: {
    height: '100%',
    borderRadius: '10px 0 0 10px',
    position: 'absolute',
    transition: 'width 0.5s ease-in-out',
  },
  courseProgressText: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  courseDetailsContainer: {
    marginTop: '30px',
    padding: '25px',
    backgroundColor: '#F9F9F9',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  backButton: {
    backgroundColor: '#3D85C6',
    color: '#FFF',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s ease',
  },
};

// Extra Hover Effects
styles.courseProgressBar[':hover'] = {
  transform: 'scale(1.02)',
};

styles.backButton[':hover'] = {
  backgroundColor: '#2B6CA3',
};


export default SemesterProgress;
