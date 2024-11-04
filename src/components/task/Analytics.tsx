// src/components/Analytics.tsx
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ChartData, ChartOptions } from "chart.js";
import { transformData } from "@/util/helper";
import { defaultDataForChart } from "@/constant/constant";
import PieChart from "../chart/PieChart";

type Props = {};

// SubComponent for individual statistic boxes
const StatBox = ({
    iconSrc,
    label,
    value,
    trend,
    trendValue,
    trendText,
    customClass,
}: any) => (
    <div className="text-center space-y-1">
        <div className="flex gap-1 items-center justify-center">
            <Image src={iconSrc} alt={label} width={15} height={15} />
            <p>{label}</p>
        </div>
        <p
            className={`text-3xl font-serif ${
                customClass ? customClass : "font-semibold"
            }`}
        >
            {value}
        </p>
        {trend && (
            <div className="flex gap-1 items-center">
                <Image src={trend} alt="Trend arrow" width={10} height={10} />
                <p
                    className={`text-xs ${
                        trendValue > 0 ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {trendText}
                </p>
            </div>
        )}
    </div>
);

// SubComponent for PieChart legend items
const PieChartLegend = ({ data }: any) => (
    <div className="ml-2 grid grid-cols-2 gap-2">
        {data.map((item: any, index: number) => (
            <div key={index} className="text-sm">
                <div className="flex items-center gap-2">
                    <div
                        style={{ backgroundColor: item.color }}
                        className="w-3 h-3 rounded-full"
                    />
                    <p>
                        {item.value} ({item.percentage}%)
                    </p>
                </div>
                <p className="text-xs">{item.name}</p>
            </div>
        ))}
    </div>
);

const Analytics: React.FC<Props> = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, setData] = useState<ChartData<"pie">>(
        transformData(defaultDataForChart)
    );

    const options: ChartOptions<"pie"> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || "";
                        if (context.raw !== undefined) {
                            label += ": " + context.raw + " units";
                        }
                        return label;
                    },
                },
            },
            datalabels: {
                display: true,
                formatter: (value, ctx) =>
                    ctx?.chart?.data?.labels![ctx.dataIndex],
                color: "#fff",
                align: "center",
                anchor: "center",
                font: { weight: "bold", size: 14 },
            },
        },
    };

    return (
        <div className="bg-gray-100 text-nowrap rounded-2xl text-black m-3 h-36 p-4">
            <div className="flex items-center justify-evenly h-full">
                {/* Stat Boxes */}
                <StatBox
                    iconSrc="/svg/cube.svg"
                    label="Total task created"
                    value="2,765"
                    trend="/svg/up.svg"
                    trendValue="2"
                    trendText="+40 more than last week"
                />
                <div className="h-[60%] w-px bg-gray-300" />

                <StatBox
                    iconSrc="/svg/cube.svg"
                    label="Open tasks"
                    value="2,765"
                    trend="/svg/up.svg"
                    trendValue="2"
                    trendText="+40 more than last week"
                />
                <div className="h-[60%] w-px bg-gray-300" />

                <StatBox
                    iconSrc="/svg/cube.svg"
                    label="SLA breached tasks"
                    value="No breaches"
                    trend={null}
                    customClass="text-gray-500/70"
                />
                <div className="h-[60%] w-px bg-gray-300" />

                {/* Pie Chart with Legend */}
                <div className="flex items-center">
                    <PieChart data={data} options={options} />
                    <PieChartLegend data={defaultDataForChart} />
                </div>
            </div>
        </div>
    );
};

export default Analytics;
