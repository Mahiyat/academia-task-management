import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

const SemesterList = () => {
  const [semesters, setSemesters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semesters');
        setSemesters(response.data); // Adjust based on the actual API response structure
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    };
    fetchSemesters();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Semester List
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {semesters.map((semester) => (
          <Grid item xs={12} sm={6} md={4} key={semester._id}>
            <Card 
              variant="outlined" 
              onClick={() => navigate(`/semester/${semester._id}`)} 
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 3,
                },
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom color="secondary">
                  {semester.semesterTitle}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {semester.programType} - {semester.semesterYear}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SemesterList;
