import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { Container, Paper, Typography, CircularProgress, Box } from '@mui/material';

const TotalProgress = () => {
  const [semestersProgress, setSemestersProgress] = useState([]);

  useEffect(() => {
    const fetchTotalProgress = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semester-progress-tracking/semesters');
        setSemestersProgress(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching total progress:", error);
      }
    };

    fetchTotalProgress();
  }, []);

  // Prepare dataset for MUI X BarChart
  const dataset = semestersProgress.map(semester => ({
    semesterTitle: semester.semesterTitle,
    totalProgress: parseFloat(semester.totalProgress), // Ensure totalProgress is a number
  }));

  const valueFormatter = (value) => `${value.toFixed(2)}%`;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Total Progress of All Semesters
        </Typography>
        {semestersProgress.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
              Loading total progress...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ width: '100%', mt: 3 }}>
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: 'band', dataKey: 'semesterTitle' }]}
              series={[
                {
                  dataKey: 'totalProgress',
                  label: 'Total Progress (%)',
                  color: 'rgba(75, 192, 192, 0.6)',
                  valueFormatter
                }
              ]}
              height={400}
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default TotalProgress;
