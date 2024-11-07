import { FC, memo } from "react";
import { Pie } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    DoughnutController,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register necessary chart components and the plugin for data labels
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
    DoughnutController,
    ChartDataLabels
);

interface PieChartProps {
    data: ChartData<"pie">;
}

const PieChart: FC<PieChartProps> = memo(({ data }) => {
    const options: ChartOptions<"pie"> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label || ""}: ${
                            context.raw ?? 0
                        } units`;
                    },
                },
            },
            datalabels: {
                display: true,
                formatter: (value, ctx) => {
                    // Check if value is 0 or undefined
                    return value && value > 0
                        ? ctx?.chart?.data?.labels![ctx.dataIndex]
                        : ""; // Return empty string to hide the label
                },
                color: "#fff",
                align: "center",
                anchor: "center",
                font: { weight: "bold", size: 14 },
            },
        },
    };

    return (
        <div style={{ position: "relative", height: "120px", width: "fit" }}>
            <Pie data={data} options={options} />
        </div>
    );
});

// Explicitly set the display name
PieChart.displayName = "PieChart";

export default PieChart;
