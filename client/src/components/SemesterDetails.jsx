// src/components/SemesterDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, Typography, CircularProgress } from '@mui/material';
import ExamCommitteeSelection from './ExamCommitteeSelection';

const SemesterDetails = () => {
  const { id } = useParams();
  const [semester, setSemester] = useState(null);

  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semesters');
        const data = response.data;
        const selectedSemester = data.find((sem) => sem._id === id);
        setSemester(selectedSemester);
      } catch (error) {
        console.error('Error fetching semester:', error);
      }
    };
    fetchSemester();
  }, [id]);

  if (!semester) return <CircularProgress />; // Display a loading spinner while fetching

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {semester.semesterTitle}
        </Typography>
        <Typography variant="h6" component="p">
          Year: {semester.semesterYear}
        </Typography>
        <Typography variant="h6" component="p">
          Program Type: {semester.programType}
        </Typography>
        <ExamCommitteeSelection semesterId={semester._id} />
      </Paper>
    </Container>
  );
};

export default SemesterDetails;
