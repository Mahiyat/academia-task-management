import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function BarchartAll({allCourseData}) {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const datasets = [
            {
                label: 'Expected Classes',
                data: allCourseData.map(course => course.expectedNoOfClasses),
                backgroundColor: 'rgba(136, 132, 216, 0.5)',
                borderColor: 'rgba(136, 132, 216, 1)',
                borderWidth: 1,
            },
            {
                label: 'Taken Classes',
                data: allCourseData.map(course => course.noOfClassesTaken),
                backgroundColor: 'rgba(130, 202, 157, 0.5)',
                borderColor: 'rgba(130, 202, 157, 1)',
                borderWidth: 1,
            },
            {
                label: 'Expected Tutorials',
                data: allCourseData.map(course => course.expectedNoOfTutorials),
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
            {
                label: 'Taken Tutorials',
                data: allCourseData.map(course => course.noOfTutorialsTaken),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ];

        const myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: allCourseData.map(course => course.courseName),
                datasets: datasets,
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Cleanup chart on unmount
        return () => {
            myBarChart.destroy();
        };
    }, [allCourseData]);

    return (
        <canvas ref={chartRef} width="100%" height="100"></canvas>
    );
}
