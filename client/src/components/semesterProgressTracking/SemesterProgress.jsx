import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography, Box, Paper, CircularProgress, List, ListItem, ListItemText, LinearProgress } from '@mui/material';

const SemesterProgress = ({ semesterId }) => {
  const [semesterData, setSemesterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSemesterProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/semester-progress-tracking/semester/${semesterId}/progress`);
        setSemesterData(response.data);
      } catch (error) {
        console.error("Error fetching semester progress:", error);
      } finally {
        setLoading(false);
      }
    };

    if (semesterId) {
      fetchSemesterProgress();
    }
  }, [semesterId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (!semesterData) return <Typography variant="h6" align="center">Select a semester to view progress</Typography>;

  const totalProgress = semesterData.progressData.reduce((acc, course) => {
    const courseTotalProgress = ((parseFloat(course.classProgress) + parseFloat(course.tutorialProgress)) * 100) / 200;
    return acc + courseTotalProgress;
  }, 0) / semesterData.progressData.length;

  const chartData = {
    labels: semesterData.progressData.map(course => course.courseName),
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
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Progress (%)' },
      },
      x: { title: { display: true, text: 'Courses' } },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const courseIndex = tooltipItems[0].dataIndex;
            return semesterData.progressData[courseIndex].courseName;
          },
          label: (tooltipItem) => {
            const courseIndex = tooltipItem.dataIndex;
            const courseData = semesterData.progressData[courseIndex];
            const isClassProgress = tooltipItem.dataset.label === 'Class Progress (%)';
            const classesTaken = isClassProgress ? `Classes Taken: ${courseData.noOfClassesTaken}` : `Tutorials Taken: ${courseData.noOfTutorialsTaken}`;
            return [`${tooltipItem.formattedValue}%`, classesTaken];
          }
        }
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          {semesterData.semesterTitle} - Total Progress
        </Typography>
        <Box sx={{ my: 2 }}>
          <LinearProgress variant="determinate" value={totalProgress} />
          <Typography variant="body2" color="textSecondary" align="center">
            Total Progress: {totalProgress.toFixed(2)}%
          </Typography>
        </Box>

        <Paper sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
          <List>
            {semesterData.progressData.map((course, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={course.courseName}
                  secondary={`Class Progress: ${course.classProgress}% | Tutorial Progress: ${course.tutorialProgress}% | Total Progress: ${((parseFloat(course.classProgress) + parseFloat(course.tutorialProgress)) / 2).toFixed(2)}%`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Box sx={{ height: 400 }}>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SemesterProgress;
