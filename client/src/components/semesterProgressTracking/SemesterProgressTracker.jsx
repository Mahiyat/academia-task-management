import React, { useState } from 'react';
import SemesterList from './SemesterList';
import SemesterProgress from './SemesterProgress';
import TotalSemesterProgress from './TotalSemesterProgress';

const SemesterProgressTracker = () => {
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);

  return (
    <div>
      <h2>Semester Progress Tracker</h2>
      <TotalSemesterProgress/>
      <div style={{width : "50%" }}>
        <SemesterList onSelectSemester={setSelectedSemesterId} />
      </div>
      
      {selectedSemesterId ? (
        <SemesterProgress semesterId={selectedSemesterId} />
      ) : (
        <p>Please select a semester to view progress.</p>
      )}
    </div>
  );
};

export default SemesterProgressTracker;
