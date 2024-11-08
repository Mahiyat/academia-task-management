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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  dropdownContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  dropdown: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    width: '60%',
    border: '2px solid #ddd',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  progressContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  progressBarContainer: {
    position: 'relative',
    width: '70%',
    height: '25px',
    margin: '20px auto',
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
  },
  progressBar: {
    height: '100%',
    borderRadius: '15px',
    position: 'absolute',
  },
  progressText: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#000',
    fontWeight: 'bold',
  },
  courseContainer: {
    margin: '20px 0',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  courseDetails: {
    marginBottom: '15px',
  },
  courseProgressBar: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    marginTop:'20px',
    marginBottom: '10px',
    position: 'relative',
    cursor: 'pointer',
  },
  courseProgress: {
    height: '20px',
    borderRadius: '15px',
    position: 'absolute',
  },
  courseProgressText: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#000',
    fontWeight: 'bold',
  },
  courseDetailsContainer: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  backButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
};

export default SemesterProgress;
