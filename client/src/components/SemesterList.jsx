// src/components/SemesterList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography } from '@mui/material';

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
    <Grid container spacing={3} justifyContent="center">
      {semesters.map((semester) => (
        <Grid item xs={12} sm={6} md={4} key={semester._id}>
          <Card 
            variant="outlined" 
            onClick={() => navigate(`/semester/${semester._id}`)} 
            style={{ cursor: 'pointer' }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {semester.semesterTitle}
              </Typography>
              <Typography color="text.secondary">
                {semester.programType} - {semester.semesterYear}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SemesterList;
