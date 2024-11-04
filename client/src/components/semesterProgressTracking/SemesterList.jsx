import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SemesterList = ({ onSelectSemester }) => {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semesters'); // Adjust the endpoint as needed
        setSemesters(response.data);
        
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };
    fetchSemesters();
  }, []);

  const handleSelectChange = (event) => {
    const selectedSemesterId = event.target.value;
    onSelectSemester(selectedSemesterId);
  };

  return (
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
  );
};

export default SemesterList;
