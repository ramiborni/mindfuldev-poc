export const chartDate = () => {
    const labels: string[] = [];

// Get today's date
    const currentDate = new Date();

// Generate dates for the last 30 days
    for (let i = 30; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);

        // Format the date as "MM/DD"
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        labels.push(`${month}/${day}`);
    }

    return labels;
}