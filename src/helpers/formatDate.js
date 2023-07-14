function formatDate(date) {
    const months = [
        "januari", "februari", "maart", "april", "mei", "juni",
        "juli", "augustus", "september", "oktober", "november", "december"
    ];

    const parts = date.split("-");
    const day = parseInt(parts[2]);
    const month = months[parseInt(parts[1]) - 1];
    const year = parseInt(parts[0]);

    return `(${day} ${month} ${year})`;
}

export default formatDate;