// src/components/Analytics.tsx
"use client";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { transformData } from "@/util/helper";
import PieChart from "../chart/PieChart";
import { useAnalyticsStore } from "@/store/analyticsStore";
import BarChart from "../chart/BarChart";

// Reusable StatBox component for statistics display
const StatBox = ({
    iconSrc,
    label,
    value,
    trend,
    trendValue,
    trendText,
    customClass = "font-semibold",
}: {
    iconSrc: string;
    label: string;
    value: string | number;
    trend?: string | null;
    trendValue?: number | null;
    trendText?: string;
    customClass?: string;
}) => (
    <div className="text-center space-y-1">
        <div className="flex gap-1 items-center justify-center">
            <Image src={iconSrc} alt={label} width={20} height={20} />
            <p>{label}</p>
        </div>
        <p className={`text-3xl font-serif ${customClass}`}>{value}</p>
        {trend && trendValue !== undefined && (
            <div className="flex gap-1 items-center">
                <Image src={trend} alt="Trend arrow" width={10} height={10} />
                <p
                    className={`text-xs ${
                        trendValue! > 0 ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {trendText}
                </p>
            </div>
        )}
    </div>
);

const PieChartLegend = ({
    data,
}: {
    data: Array<{
        color: string;
        value: number;
        name: string;
        percentage?: number;
    }>;
}) => (
    <div className="ml-2 grid grid-cols-2 gap-2">
        {data.map((item, index) => (
            <div key={index} className="text-sm">
                <div className="flex items-center gap-2">
                    <div
                        style={{ backgroundColor: item.color }}
                        className="w-3 h-3 rounded-full"
                    />
                    <p>
                        {item.value} ({item.percentage ?? 0}%)
                    </p>
                </div>
                <p className="text-xs">{item.name}</p>
            </div>
        ))}
    </div>
);

const Analytics: React.FC = () => {
    const {
        totalTasksCreated,
        completedTasks,
        isLoading,
        openTasks,
        overdueTasks,
        fetchAnalyticsState,
        brandTasksCount,
        eventTasksCount,
        generalTasksCount,
        inventoryTasksCount,
    } = useAnalyticsStore();

    const chartData = useMemo(
        () => [
            {
                label: "A",
                value: generalTasksCount,
                name: "General Service",
                color: "#78E7F0",
            },
            {
                label: "B",
                value: brandTasksCount,
                name: "Brand Related",
                color: "#07747D",
            },
            {
                label: "C",
                value: eventTasksCount,
                name: "Event Related",
                color: "#09949F",
            },
            {
                label: "D",
                value: inventoryTasksCount,
                name: "Inventory Related",
                color: "#38C6D2",
            },
        ],
        [
            generalTasksCount,
            brandTasksCount,
            eventTasksCount,
            inventoryTasksCount,
        ]
    );

    useEffect(() => {
        fetchAnalyticsState("alltime");
    }, [fetchAnalyticsState]);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="bg-gray-100 rounded-2xl text-black m-3 h-36 p-4">
            <div className="flex items-center justify-evenly h-full">
                <StatBox
                    iconSrc="/svg/cube.svg"
                    label="Total task created"
                    value={totalTasksCreated}
                    trend="/svg/up.svg"
                    trendValue={2}
                    trendText="+40 more than last week"
                />
                <div className="h-[60%] w-px bg-gray-300" />
                <StatBox
                    iconSrc="/svg/cube.svg"
                    label="Open tasks"
                    value={openTasks}
                    trend="/svg/up.svg"
                    trendValue={2}
                    trendText="+40 more than last week"
                />
                {/* Bar Chart for Open and Completed Tasks */}
                <BarChart
                    openTasks={openTasks}
                    completedTasks={completedTasks}
                />
                <div className="h-[60%] w-px bg-gray-300" />
                <StatBox
                    iconSrc="/svg/cube.svg"
                    label="SLA breached tasks"
                    value={overdueTasks || "No Breaches"}
                    customClass={`${
                        overdueTasks
                            ? "text-red-500 font-semibold"
                            : "text-gray-500/70"
                    }`}
                />
                <div className="h-[60%] w-px bg-gray-300" />
                <div className="flex items-center">
                    <PieChart data={transformData(chartData)} />
                    <PieChartLegend data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default Analytics;
