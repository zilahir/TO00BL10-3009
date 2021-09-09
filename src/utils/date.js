function createFormattedDate(givenDate) {
    const date = new Date(givenDate);
    return date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      });
}

export default createFormattedDate;