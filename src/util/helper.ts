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

export function calculateTimePassed(
    createdAt: string,
    dueDate: string
): {
    hoursPassed: number | string;
    minutesPassed: number;
    percentagePassed: number;
    hoursLeft: number | string;
    minutesLeft: number;
    hoursLate: number | string;
    minutesLate: number;
} {
    // Convert date strings to Date objects
    const createdDate = new Date(createdAt);
    const dueDateObj = new Date(dueDate);
    const currentDate = new Date(); // Current date and time

    // Calculate the total time difference from created_at to due_date
    const totalDuration = dueDateObj.getTime() - createdDate.getTime();
    const elapsedDuration = currentDate.getTime() - createdDate.getTime();
    const remainingDuration = dueDateObj.getTime() - currentDate.getTime();

    // Calculate the difference in hours and minutes for time passed
    const elapsedHours = Math.floor(elapsedDuration / (1000 * 60 * 60)); // Convert milliseconds to hours
    const elapsedMinutes = Math.floor(
        (elapsedDuration % (1000 * 60 * 60)) / (1000 * 60)
    ); // Remaining minutes

    // Calculate the difference in hours and minutes for time remaining
    const remainingHours = Math.floor(remainingDuration / (1000 * 60 * 60)); // Convert milliseconds to hours
    const remainingMinutes = Math.floor(
        (remainingDuration % (1000 * 60 * 60)) / (1000 * 60)
    ); // Remaining minutes

    // Convert to days and hours if greater than 48 hours
    let formattedElapsedTime: number | string = elapsedHours;
    let formattedRemainingTime: number | string = remainingHours;

    // Convert hours to days if greater than 48 hours
    if (elapsedHours >= 48) {
        const days = Math.floor(elapsedHours / 24);
        const hours = elapsedHours % 24;
        formattedElapsedTime = `${days}d ${hours}`; // Format as days and hours
    }

    if (remainingHours >= 48) {
        const days = Math.floor(remainingHours / 24);
        const hours = remainingHours % 24;
        formattedRemainingTime = `${days}d ${hours}`; // Format as days and hours
    }

    // Calculate the percentage of time passed relative to the total duration
    let percentagePassed = (elapsedDuration / totalDuration) * 100;

    // If the due_date is smaller than created_at, return percentage as 100+%
    if (dueDateObj < createdDate) {
        percentagePassed = 100 + (elapsedDuration / totalDuration) * 100;
    }

    // Calculate the late time if current time is after the due date
    let hoursLate: any = 0;
    let minutesLate = 0;

    if (currentDate > dueDateObj) {
        const lateDuration = currentDate.getTime() - dueDateObj.getTime();
        hoursLate = Math.floor(lateDuration / (1000 * 60 * 60)); // Convert milliseconds to hours
        minutesLate = Math.floor(
            (lateDuration % (1000 * 60 * 60)) / (1000 * 60)
        ); // Remaining minutes

        // If the late time exceeds 48 hours, format as days and hours
        if (hoursLate >= 48) {
            const daysLate = Math.floor(hoursLate / 24);
            const hoursLateRemaining = hoursLate % 24;
            hoursLate = `${daysLate}d ${hoursLateRemaining}`; // Format as days and hours
        }
    }

    // Return the results
    return {
        hoursPassed: formattedElapsedTime,
        minutesPassed: elapsedMinutes,
        percentagePassed: Math.min(percentagePassed, 100), // Ensure percentage does not exceed 100 unless necessary
        hoursLeft: formattedRemainingTime,
        minutesLeft: remainingMinutes,
        hoursLate: hoursLate,
        minutesLate: minutesLate,
    };
}

export function capitalizeFirstLetter(str: string): string {
    if (!str) return str; // Handle empty string or undefined
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

export function formatDate(date: Date): string {
    // Array of month short forms
    const monthShorts = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Get the month, day, and year
    const month = monthShorts[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Determine the day suffix (st, nd, rd, th)
    const suffix = (day: number): string => {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    // Format and return the date
    return `${month} ${day}${suffix(day)} ${year}`;
}

export function formatDateToDMY(date: Date): string {
    // Get the day, month (0-based, so add 1 to it), and year
    const day = date.getDate();
    const month = date.getMonth() + 1; // months are 0-indexed, so add 1
    const year = date.getFullYear();

    // Format the day and month to be two digits if necessary
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    // Return the date in the "DD/MM/YYYY" format
    return `${formattedDay}/${formattedMonth}/${year}`;
}

export function countWordsFromCommaSeparatedString(
    input: string | undefined
): number {
    // Split the input string by commas, trim spaces, and filter out empty strings
    if (!input) return 0;
    const words = input
        .split(",")
        .map((word) => word.trim())
        .filter((word) => word.length > 0);
    return words.length;
}
