// Description: This file contains functions for drawing basic shapes like circle, ellipse, rect, line.

/**
 * Draw a circle
 * @param {number} centerX The x-coordinate of the center of the circle
 * @param {number} centerY The y-coordinate of the center of the circle
 * @param {number} radius The radius of the circle
 * @param {string} stroke The color of the stroke
 * @param {string} fill The color of the fill
 * @param {number} strokeWidth The width of the stroke
 * @param {number} opacity The opacity of the whole object
 * @param {number} strokeOpacity The opacity of the stroke
 */
const circle = (centerX, centerY, radius, stroke, fill, strokeWidth = 1, opacity = 1, strokeOpacity = 1) => {
    return `<circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}" opacity="${opacity}" stroke-opacity="${strokeOpacity}"/>`
}

/**
 * Draw an ellipse
 * @param {number} centerX The x-coordinate of the center of the ellipse 
 * @param {number} centerY The y-coordinate of the center of the ellipse
 * @param {number} radiusX The x-radius of the ellipse
 * @param {number} radiusY The y-radius of the ellipse
 * @param {string} stroke The color of the stroke
 * @param {string} fill The color of the fill
 * @param {number} strokeWidth The width of the stroke
 * @param {number} opacity The opacity of the whole object
 * @param {number} strokeOpacity The opacity of the stroke
 */
const ellipse = (centerX, centerY, radiusX, radiusY, stroke, fill, strokeWidth = 1, opacity = 1, strokeOpacity = 1) => {
    return `<ellipse cx="${centerX}" cy="${centerY}" rx="${radiusX}" ry="${radiusY}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}" opacity="${opacity}" stroke-opacity="${strokeOpacity}"/>`
}

/**
 * Draw a rectangle
 * @param {number} x The x-coordinate of the top-left corner of the rectangle
 * @param {number} y The y-coordinate of the top-left corner of the rectangle
 * @param {number} width The width of the rectangle
 * @param {number} height The height of the rectangle
 * @param {string} stroke The color of the stroke
 * @param {string} fill The color of the fill
 * @param {number} strokeWidth The width of the stroke
 * @param {number} opacity The opacity of the whole object
 * @param {number} strokeOpacity The opacity of the stroke
 */
const rect = (x, y, width, height, stroke, fill, strokeWidth = 1, opacity = 1, strokeOpacity = 1) => {
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}" opacity="${opacity}" stroke-opacity="${strokeOpacity}"/>`
}

/**
 * Draw a line
 * @param {number} x1 The x-coordinate of the start of the line
 * @param {number} x2 The x-coordinate of the end of the line
 * @param {number} y1 The y-coordinate of the start of the line
 * @param {number} y2 The y-coordinate of the end of the line
 * @param {string} stroke The color of the stroke
 * @param {number} strokeWidth The width of the stroke
 * @param {number} strokeOpacity The opacity of the stroke
 */
const line = (x1, x2, y1, y2, stroke, strokeWidth = 1, strokeOpacity = 1) => {
    return `<line x1="${x1}" x2="${x2}" y1="${y1}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-opacity="${strokeOpacity}"/>`
}

export { circle, ellipse, rect, line }