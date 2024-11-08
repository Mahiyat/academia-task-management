import React, { useState } from 'react';
import SemesterList from './SemesterList';
import SemesterProgress from './SemesterProgress';
import TotalSemesterProgress from './TotalSemesterProgress';
import { Container, Box, Typography, Paper } from '@mui/material';

const SemesterProgressTracker = () => {
  const [selectedSemesterId, setSelectedSemesterId] = useState('');

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Semester Progress Tracker
        </Typography>
        <Box sx={{ mb: 4 }}>
          <TotalSemesterProgress />
        </Box>
        
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
          <SemesterList onSelectSemester={setSelectedSemesterId} />
        </Box>
        
        <Box sx={{ mt: 4 }}>
          {selectedSemesterId ? (
            <SemesterProgress semesterId={selectedSemesterId} />
          ) : (
            <Typography variant="body1" align="center" color="textSecondary">
              Please select a semester to view progress.
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default SemesterProgressTracker;
