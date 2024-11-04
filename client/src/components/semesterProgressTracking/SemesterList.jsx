import React, { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { FormControl, InputLabel, Select, MenuItem, Typography, Box, CircularProgress } from '@mui/material';

const SemesterList = ({ onSelectSemester }) => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState(''); // State to store the selected semester
=======

const SemesterList = ({ onSelectSemester }) => {
  const [semesters, setSemesters] = useState([]);
>>>>>>> 3193435 (add semesterprogress tracking frontend+backend)

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semesters'); // Adjust the endpoint as needed
        setSemesters(response.data);
<<<<<<< HEAD
      } catch (error) {
        console.error("Error fetching semesters:", error);
      } finally {
        setLoading(false);
=======
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching semesters:", error);
>>>>>>> 3193435 (add semesterprogress tracking frontend+backend)
      }
    };
    fetchSemesters();
  }, []);

  const handleSelectChange = (event) => {
    const selectedSemesterId = event.target.value;
<<<<<<< HEAD
    setSelectedSemester(selectedSemesterId); // Update the selected semester in the state
=======
>>>>>>> 3193435 (add semesterprogress tracking frontend+backend)
    onSelectSemester(selectedSemesterId);
  };

  return (
<<<<<<< HEAD
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Select a Semester
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
          <CircularProgress />
        </Box>
      ) : (
        <FormControl fullWidth variant="outlined">
          <InputLabel>Semester</InputLabel>
          <Select
            value={selectedSemester} // Use selectedSemester state as the value
            onChange={handleSelectChange}
            label="Semester"
          >
            <MenuItem value="" disabled>
              -- Select a Semester --
            </MenuItem>
            {semesters.map((semester) => (
              <MenuItem key={semester._id} value={semester._id}>
                {semester.semesterTitle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
=======
    <div>
      <h3>Select a Semester</h3>
      <select onChange={handleSelectChange} defaultValue="">
        <option value="" disabled>
          -- Select a Semester --
        </option>
        {semesters.map((semester) => (
          <option key={semester._id} value={semester._id}>
            {semester.semesterTitle}
          </option>
        ))}
      </select>
    </div>
>>>>>>> 3193435 (add semesterprogress tracking frontend+backend)
  );
};

export default SemesterList;
