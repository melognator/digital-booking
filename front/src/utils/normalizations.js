
export const normalizeDescription = (description, limit) => {
    if (description.length > limit) {
        return description.substring(0, limit) + "...";
    } else {
        return description
    }
}

export const normalizeRating = (rating) => {
    const fixed = 1
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return rating.toString().match(re)[0];
}