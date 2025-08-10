const toUpperFirst = (text) => {
    return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
};

const formatDate = (text) => {
    const date = new Date(text);
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return date.toLocaleDateString("en-US", {
        timeZone: localTimeZone,
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

const trucateWords = (text, wordLimit) => {
    const words = text.trim().split(/\s+/);
    if(words <= wordLimit)
        return text;

    const newText = words.slice(0, wordLimit).join(' ');
    return newText + (newText.endsWith('.') ? '' : '...');
}

const formatText = (text) => {
    return text.split(' ').map(word => {
        const capitalCount = (word.match(/[A-Z]/g) || []).length;
        return capitalCount > 0 ? word : toUpperFirst(word);
    }).join(' ');
}

export { toUpperFirst, formatDate, trucateWords, formatText }