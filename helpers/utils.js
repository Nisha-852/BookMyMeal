function getWorkingDaysInRange(startDate, endDate) {
    const dateRange = [];

    // Convert startDate and endDate to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Loop through each day in the date range
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)

        // Skip Saturdays (6) and Sundays (0)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            dateRange.push(date.getDate()); // Store the day of the month
        }
    }

    // Join the array into a comma-separated string
    return dateRange.join(', ');
}

module.exports = {
    getWorkingDaysInRange
};
