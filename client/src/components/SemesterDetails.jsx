import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Divider,
} from '@mui/material';
import ExamCommitteeSelection from './ExamCommitteeSelection';

const SemesterDetails = () => {
  const { id } = useParams();
  const [semester, setSemester] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semesters');
        const data = response.data;
        const selectedSemester = data.find((sem) => sem._id === id);
        setSemester(selectedSemester);
      } catch (error) {
        console.error('Error fetching semester:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSemester();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!semester) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h6" color="textSecondary">
          Semester not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Box mb={3}>
          <Typography variant="h4" component="h2" color="primary" gutterBottom>
            {semester.semesterTitle}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" component="p" gutterBottom>
            <strong>Year:</strong> {semester.semesterYear}
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            <strong>Program Type:</strong> {semester.programType}
          </Typography>
        </Box>
        <ExamCommitteeSelection semesterId={semester._id} />
      </Paper>
    </Container>
  );
};


export default SemesterDetails;
