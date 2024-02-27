// translates the shape
const translate = (newX, newY) => {
    return `translate(${newX} ${newY})`
}

// rotates the shape
const rotate = (angle, pivotX, pivotY) => {
    return `rotate(${angle} ${pivotX} ${pivotY})`
}

// scales the shape
const scale = (scaleX, scaleY = scaleX) => {
    return `scale(${scaleX} ${scaleY})`
}

// skew the shape in the X direction
const skewX = (degrees) => {
    return `skewX(${degrees})`
}

// skew the shape in the Y direction
const skewY = (degrees) => {
    return `skewY(${degrees})`
}

export {translate, rotate, scale, skewX, skewY}
