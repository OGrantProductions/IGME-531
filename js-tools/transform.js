// Description: This file contains functions that can be used to transform SVG shapes.

/**
 * Changes the origin of the transformation
 * @param {*} transformX The x-coordinate of the new origin
 * @param {*} transformY The y-coordinate of the new origin
 */
const transformOrigin = (transformX, transformY) => {
    return `transform-origin="${transformX} ${transformY}"`;
}

/**
 * Translate the shape to the new position
 * @param {number} moveX How much to move the shape in the x-direction
 * @param {number} moveY How much to move the shape in the y-direction
 */
const translate = (moveX, moveY) => {
    return `translate(${moveX} ${moveY})`
}

/**
 * Rotate the shape
 * @param {number} angle The angle to rotate the shape by
 * @param {number} pivotX The x-coordinate of the pivot point
 * @param {number} pivotY The y-coordinate of the pivot point
 */
const rotate = (angle, pivotX, pivotY) => {
    return `rotate(${angle} ${pivotX} ${pivotY})`
}

/**
 * Scale the size of the shape
 * @param {number} scaleX The amount to scale the shape in the x-direction
 * @param {number} scaleY The amount to scale the shape in the y-direction
 */
const scale = (scaleX, scaleY = scaleX) => {
    return `scale(${scaleX} ${scaleY})`
}

/**
 * Skew the shape in the X direction
 * @param {number} degrees The amount to skew the shape by
 */
const skewX = (degrees) => {
    return `skewX(${degrees})`
}

/**
 * Skew the shape in the Y direction
 * @param {number} degrees The amount to skew the shape by
 */
const skewY = (degrees) => {
    return `skewY(${degrees})`
}

export {transformOrigin, translate, rotate, scale, skewX, skewY}
