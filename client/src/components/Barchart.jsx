import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function BarChart({ courseData }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Classes', 'Tutorials'],
                datasets: [
                    {
                        label: 'Expected',
                        data: [
                            courseData.expectedNoOfClasses,
                            courseData.expectedNoOfTutorials,
                        ],
                        backgroundColor: 'rgba(136, 132, 216, 0.5)',
                        borderColor: 'rgba(136, 132, 216, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Taken',
                        data: [
                            courseData.noOfClassesTaken,
                            courseData.noOfTutorialsTaken,
                        ],
                        backgroundColor: 'rgba(130, 202, 157, 0.5)',
                        borderColor: 'rgba(130, 202, 157, 1)',
                        borderWidth: 1,
                    },
                ],
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
    }, [courseData]);

    return (
        <canvas ref={chartRef} width="100%" height="50"></canvas>
    );
}
