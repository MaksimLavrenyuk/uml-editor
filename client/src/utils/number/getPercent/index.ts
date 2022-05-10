/**
 * Get the percentage of one number from another.
 * @param value
 * @param total
 * @param precision -  Number of significant digits. Must be in the range 1 - 21, inclusive.
 */
function getPercent(value: number, total: number, precision = 2) {
    if (total === 0) return null;

    try {
        return Number(((value / total) * 100).toFixed(precision));
    } catch (e) {
        return null;
    }
}

export default getPercent;
