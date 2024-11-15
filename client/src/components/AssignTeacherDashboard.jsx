// src/components/AssignTeacherDashboard.jsx
import React, { useState } from 'react';
import SemesterDropdown from './SemesterDropdown';
import CourseList from './CourseList';
import TeacherList from './TeacherList';

const AssignTeacherDashboard = () => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Assign Teacher Dashboard</h1>

      <div style={{ marginBottom: '20px', width: '500px' }}>
        {/* Dropdown to select semester */}
        <SemesterDropdown onSelectSemester={setSelectedSemester} />
      </div>

      {selectedSemester && (
        <div
          style={{
            marginBottom: '20px',
            width: '500px',
            padding: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <CourseList semesterId={selectedSemester} onSelectCourse={setSelectedCourse} />
        </div>
      )}

      {selectedCourse && (
        <div
          style={{
            width: '500px',
            padding: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <TeacherList courseId={selectedCourse} />
        </div>
      )}
    </div>
  );
};

export default AssignTeacherDashboard;
