export const getFormattedDates = (dateObj) => {
    if (!dateObj) return { presentDay: null, prevDay: null };

    const date = new Date(
        dateObj.year,
        dateObj.month - 1, // Month is zero-based
        dateObj.day,
        dateObj.hour || 0,
        dateObj.minute || 0
    );

    // Get Present Day
    const presentDay = date.toISOString().split("T")[0];

    // Get Previous Day
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevDay = prevDate.toISOString().split("T")[0];

    return { presentDay, prevDay };
};
