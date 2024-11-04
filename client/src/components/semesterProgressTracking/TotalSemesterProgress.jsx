import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';

const TotalProgress = () => {
  const [semestersProgress, setSemestersProgress] = useState([]);

  useEffect(() => {
    const fetchTotalProgress = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semester-progress-tracking/semesters');
        setSemestersProgress(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching total progress:", error);
      }
    };

    fetchTotalProgress();
  }, []);

  // Prepare dataset for MUI X BarChart
  const dataset = semestersProgress.map(semester => ({
    semesterTitle: semester.semesterTitle,
    totalProgress: parseFloat(semester.totalProgress), // Ensure totalProgress is a number
  }));

  const valueFormatter = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const chartSettings = {
    height: 400,
    xAxis: [{ scaleType: 'band', dataKey: 'semesterTitle' }], // x-axis based on semesterTitle
  };

  return (
    <div>
      <h3>Total Progress of All Semesters</h3>
      {semestersProgress.length === 0 ? (
        <div>Loading total progress...</div>
      ) : (
        <div style={{ width: '60%', margin: '0 auto' }}>
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'semesterTitle' }]}
            series={[
              { 
                dataKey: 'totalProgress', 
                label: 'Total Progress (%)', 
                color: 'rgba(75, 192, 192, 0.6)', 
                valueFormatter 
              }
            ]}
            {...chartSettings}
          />
        </div>
      )}
    </div>
  );
};

export default TotalProgress;
