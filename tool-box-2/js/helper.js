// get random hsl value
const getRandomColor = () => {
    return `hsl(${randNum(360)}, 90%, 50%)`
}

// get random number from 0 to a max (exclusive)
const randNum = max => {
    return Math.random() * max;
}

export { getRandomColor, randNum }