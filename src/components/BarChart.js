import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data }) => {
    const chartRef = useRef(null); // Ref for accessing the chart instance

    useEffect(() => {
        // Create the new chart instance if data is provided
        if (data && data.length > 0 && chartRef.current) {
            // Destroy the existing chart instance if it exists
            if (chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }

            // Create the new chart instance
            chartRef.current.chartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: data.map(price => formatDate(price.timestamp)), // Format timestamp to date
                    datasets: [{
                        label: 'Price History',
                        data: data.map(price => price.amount), // Assuming amount is used as data
                        backgroundColor: '#ff780a',
                        borderColor: 'black',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        },
                        x: {
                            barPercentage: 0.5,
                            barThickness: 5
                        }
                    }
                }
            });
        }

        // Clean up on unmount
        return () => {
            if (chartRef.current && chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }
        };
    }, [data]);

    // Function to format timestamp to date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0]; // Extract date part from ISO string
    };

    return <canvas ref={chartRef} />;
};

export default BarChart;
