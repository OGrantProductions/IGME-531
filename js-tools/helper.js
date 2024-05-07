// Description: Miscellaneous helper functions that can be used in any project.

/**
 * Gets a random hsl color with a default 90% saturation and 50% lightness
 * @param {number} saturation The saturation of the color
 * @param {number} lightness The lightness of the color
 */
const getRandomColor = (saturation = 90, lightness = 50) => {
    return `hsl(${randNum(360)}, ${saturation}%, ${lightness}%)`
}

const getHSLColor = (hue, saturation = 90, lightness = 50) => {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

/**
 * Get random number from 0 to a max (exclusive)
 * @param {number} max The maximum number to return (exclusive)
 */
const randNum = max => {
    return Math.random() * max;
}

/**
 * Get random integer from 0 to a max (exclusive)
 * @param {number} max The maximum integer to return (exclusive)
 */
const randInt = max => {
    return Math.floor(randNum(max));
}

export { getRandomColor, getHSLColor, randNum, randInt }