import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
  Snackbar,
  Button,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ExamCommitteeSelection = ({ semesterId }) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setError('Failed to load teachers. Please try again later.');
      }
    };
    fetchTeachers();
  }, []);

  const handleSelectTeacher = (event) => {
    const teacherId = event.target.value;

    // Prevent adding more than 3 teachers or duplicate selections
    if (selectedTeachers.length >= 3) {
      setAlertOpen(true);
      return;
    }
    if (selectedTeachers.includes(teacherId)) {
      setAlertOpen(true);
      return;
    }

    // Update selected teachers state and reset select value
    setSelectedTeachers((prev) => [...prev, teacherId]);
    setSelectedTeacherId(''); // Reset selected teacher id
  };

  const handleRemoveTeacher = (teacherId) => {
    setSelectedTeachers((prev) => prev.filter((id) => id !== teacherId));
  };

  const handleSaveCommittee = async () => {
    try {
      for (const teacherId of selectedTeachers) {
        await axios.put(`http://localhost:5000/api/semesters/${semesterId}/examCommittee`, { teacherId });
      }
      setSuccessMessage('Exam committee updated successfully!');
      setSelectedTeachers([]); // Clear the selected teachers after saving
    } catch (error) {
      console.error('Error saving exam committee:', error);
      setError('Failed to save exam committee. Please try again.');
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSuccess = () => {
    setSuccessMessage(null);
  };

  return (
    <div className="exam-committee-selection">
      <Typography variant="h5" gutterBottom>
        Select Exam Committee Members
      </Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="teacher-select-label">Select a teacher</InputLabel>
        <Select
          labelId="teacher-select-label"
          value={selectedTeacherId} // Set the value to selectedTeacherId
          onChange={handleSelectTeacher}
          disabled={selectedTeachers.length >= 3}
        >
          <MenuItem value="">
            <em>Select a teacher</em>
          </MenuItem>
          {teachers.map((teacher) => (
            <MenuItem key={teacher._id} value={teacher._id}>
              {teacher.firstName} {teacher.lastName} - {teacher.designation}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper} marginTop={5}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedTeachers.map((teacherId) => {
              const teacher = teachers.find((t) => t._id === teacherId);
              return (
                teacher && (
                  <TableRow key={teacherId}>
                    <TableCell>{`${teacher.firstName} ${teacher.lastName}`}</TableCell>
                    <TableCell>{teacher.designation}</TableCell>
                    <TableCell>{teacher.phoneNumber}</TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => handleRemoveTeacher(teacherId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSaveCommittee} 
        disabled={selectedTeachers.length === 0}
        sx={{
            marginTop : "10px"
        }}
      >
        Save Committee
      </Button>

      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="warning">
          You can only select up to 3 teachers, or you have already selected this teacher.
        </Alert>
      </Snackbar>
      <Snackbar open={Boolean(error)} autoHideDuration={3000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={Boolean(successMessage)} autoHideDuration={3000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ExamCommitteeSelection;
