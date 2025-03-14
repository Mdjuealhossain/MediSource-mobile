export const getFormattedDate = (dateObj) => {
    if (!dateObj) return null;

    const date = new Date(
        dateObj.year,
        dateObj.month - 1, // Month is zero-based
        dateObj.day + 1,
        dateObj.hour || 0,
        dateObj.minute || 0
    );

    // Get Present Day
    const presentDay = date.toISOString().split("T")[0];

    return presentDay;
};
