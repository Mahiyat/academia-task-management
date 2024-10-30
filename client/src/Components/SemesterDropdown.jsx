import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SemesterDropdown = ({ onSelectSemester }) => {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semesters');
        setSemesters(response.data);
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    };
    fetchSemesters();
  }, []);

  return (
    <select
      onChange={(e) => onSelectSemester(e.target.value)}
      style={{
        width: '100%',
        padding: '12px 16px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        color: '#333',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        outline: 'none',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onFocus={(e) =>
        (e.target.style.borderColor = '#4A90E2') // Change border color on focus
      }
      onBlur={(e) =>
        (e.target.style.borderColor = '#ccc') // Reset border color on blur
      }
    >
      <option value="" disabled selected>
        Select a Semester
      </option>
      {semesters.map((semester) => (
        <option key={semester._id} value={semester._id}>
          {semester.semesterTitle}
        </option>
      ))}
    </select>
  );
};

export default SemesterDropdown;
