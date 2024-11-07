// src/components/chart/BarChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

interface BarChartProps {
    openTasks: number;
    completedTasks: number;
}

const BarChart: React.FC<BarChartProps> = ({ openTasks, completedTasks }) => {
    const data = {
        labels: ["Open", "Completed"],
        datasets: [
            {
                label: "Tasks",
                data: [openTasks, completedTasks],
                backgroundColor: ["#4A90E2", "#7ED321"], // Blue and green colors
                barThickness: 30, // Set explicit bar thickness
                categoryPercentage: 1.0, // here
                barPercentage: 0.98, // here
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
        scales: {
            x: {
                grid: { display: false }, // No grid lines
                ticks: {
                    display: true,
                    color: "#888888", // Label color
                    font: { size: 12 },
                    padding: 0.5,
                    maxRotation: 0,
                    minRotation: 0,
                },
            },
            y: {
                display: false,
                beginAtZero: true,
                grid: { display: false },
                min: 0, // Starting point of the bar
                max: Math.max(openTasks, completedTasks) < 10 ? 10 : undefined,
            },
        },
    };

    return (
        <div className="w-40 h-full flex items-center justify-center">
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
