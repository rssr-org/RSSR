/**
 * @param range : number (Int)
 * @returns {number} : random number between(1 - range)
 */
export const random = (range) => {
    return Math.floor((Math.random() * range + 1));
}
