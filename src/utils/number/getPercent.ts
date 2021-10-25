/**
 * Get the percentage of one number from another.
 * @param value
 * @param total
 * @param precision -  Number of significant digits. Must be in the range 1 - 21, inclusive.
 */
function getPercent(value: number, total: number, precision = 2) {
    return Number(((value / total) * 100).toPrecision(precision));
}

export default getPercent;
