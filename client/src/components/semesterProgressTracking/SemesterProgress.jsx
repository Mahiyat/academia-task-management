import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const SemesterProgress = ({ semesterId }) => {
  const [semesterData, setSemesterData] = useState(null);

  useEffect(() => {
    const fetchSemesterProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/semester-progress-tracking/semester/${semesterId}/progress`);
        setSemesterData(response.data);
      } catch (error) {
        console.error("Error fetching semester progress:", error);
      }
    };

    if (semesterId) {
      fetchSemesterProgress();
    }
  }, [semesterId]);

  if (!semesterData) return <div>Select a semester to view progress</div>;

  // Calculate total progress based on individual course progress
  const totalProgress = semesterData.progressData.reduce((acc, course) => {
    const courseTotalProgress = ((parseFloat(course.classProgress) + parseFloat(course.tutorialProgress)) * 100 / 200);
    return acc + courseTotalProgress;
  }, 0) / semesterData.progressData.length; // Average progress

  const chartData = {
    labels: semesterData.progressData.map(course => `${course.courseName}`),
    datasets: [
      {
        label: 'Class Progress (%)',
        data: semesterData.progressData.map(course => parseFloat(course.classProgress)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Tutorial Progress (%)',
        data: semesterData.progressData.map(course => parseFloat(course.tutorialProgress)),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };
  
  // Chart options defined here
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Progress (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Courses'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const courseIndex = tooltipItems[0].dataIndex;
            return semesterData.progressData[courseIndex].courseName; // Show course name
          },
          label: (tooltipItem) => {
            const courseIndex = tooltipItem.dataIndex;
            const courseData = semesterData.progressData[courseIndex];
            const classProgress = `${tooltipItem.formattedValue}%`;

            // Determine if the tooltip is for class progress or tutorial progress
            const isClassProgress = tooltipItem.dataset.label === 'Class Progress (%)';
            const classesTaken = isClassProgress ? `Classes Taken: ${courseData.noOfClassesTaken}` : `Tutorials Taken: ${courseData.noOfTutorialsTaken}`;
            
            return [`${classProgress}`, classesTaken]; // Return both class progress/tutorial progress and the corresponding count
          }
        }
      }
    }
  };

  return (
    <div>
      <h3>{semesterData.semesterTitle} - Total Progress</h3>
      <ol>
        {semesterData.progressData.map(course => (
          <li key={course.courseName}>
            {course.courseName} - Class Progress: {course.classProgress}% | Tutorial Progress: {course.tutorialProgress}% | Total Progress: {((parseFloat(course.classProgress) + parseFloat(course.tutorialProgress)) * 100 / 200).toFixed(2)}%
          </li>
        ))}
      </ol>
      <p>Total Progress: {totalProgress.toFixed(2)}%</p>
      <div style={{ width: '60%', margin: '0 auto' }}>
        <Bar 
          data={chartData} 
          options={chartOptions} // Use chartOptions here
          height={400} // Adjust the height as needed
        />
      </div>
    </div>
  );
};

export default SemesterProgress;
