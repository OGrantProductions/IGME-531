// get random hsl value
const getRandomColor = (saturation = 90, lightness = 50) => {
    return `hsl(${randNum(360)}, ${saturation}%, ${lightness}%)`
}

// get random number from 0 to a max (exclusive)
const randNum = max => {
    return Math.floor(Math.random() * max);
}

export { getRandomColor, randNum }