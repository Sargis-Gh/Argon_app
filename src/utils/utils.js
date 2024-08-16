export const stringFormat = (string, values) => {
    values = [].concat(values || []);
    for (const value of values) {
        string = string.replace('%S', value);
    }
    return string;
};

export const removeTags = (string) => {
    return string?.replace(/<\/?p>|<\/?b>/g, '');
};
