import { ChartData } from "chart.js";

// Helper function to transform the default data into the format required by chart.js
export const transformData = (
    data: { label: string; value: number }[]
): ChartData<"pie"> => {
    return {
        labels: data.map((item) => item.label),
        datasets: [
            {
                label: "Categories",
                data: data.map((item) => item.value),
                backgroundColor: ["#78E7F0", "#07747D", "#09949F", "#38C6D2"],
                hoverBackgroundColor: [
                    "#78E7F0",
                    "#07747D",
                    "#09949F",
                    "#38C6D2",
                ],
            },
        ],
    };
};
