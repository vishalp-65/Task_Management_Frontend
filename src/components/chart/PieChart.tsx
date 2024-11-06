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
    data: ChartData<"pie">; // Ensure data is typed specifically for the "pie" chart
    options?: ChartOptions<"pie">; // Ensure options are typed specifically for the "pie" chart
}

const PieChart: FC<PieChartProps> = memo(({ data, options }) => {
    return (
        <div style={{ position: "relative", height: "120px", width: "fit" }}>
            <Pie data={data} options={options} />
        </div>
    );
});

// Explicitly set the display name
PieChart.displayName = "PieChart";

export default PieChart;
