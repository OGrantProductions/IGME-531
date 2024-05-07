// Description: This file contains functions for drawing more complex shapes like polygons and paths.

// #region Polygons and Polygon Adjacents

/**
 * Draw a polygon
 * @param {Array} points An array of points that make up the polygon 
 * @param {string} stroke The color of the stroke
 * @param {string} fill The color of the fill
 * @param {number} strokeWidth The width of the stroke
 */
const polygon = (points, stroke, fill, strokeWidth = 5) => {
    return `<polygon points="${points.join(" ")}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}

/**
 * Draw a polygon with evenly sized sides
 * @param {number} numSides The number of sides the polygon should have
 * @param {number} centerX The x-coordinate of the center of the polygon
 * @param {number} centerY The y-coordinate of the center of the polygon
 * @param {number} radius The radius of the polygon
 * @param {string} stroke The color of the stroke
 * @param {string} fill The color of the fill
 * @param {number} strokeWidth The width of the stroke
 * @returns 
 */
const radialSymPolygon = (numSides, centerX, centerY, radius, stroke, fill, strokeWidth = 5) => {
    let angle = (2 * Math.PI) / numSides;
    let points = [];
    for (let i = 0; i < numSides; i++) {
        let x = centerX + radius * Math.cos(angle * i);
        let y = centerY + radius * Math.sin(angle * i);
        points.push(`${x},${y}`);
    }

    return polygon(points, stroke, fill, strokeWidth);
   // return `<polygon points="${points.join(" ")}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`

}

const star = (numPoints, centerX, centerY, outerRadius, innerRadius, stroke, fill, strokeWidth = 5) => {
    let angle = (2 * Math.PI) / (numPoints * 2);
    let points = [];
    for (let i = 0; i < numPoints * 2; i++) {
        let x, y;
        if(i % 2 === 0){
            x = centerX + outerRadius * Math.cos(angle * i);
            y = centerY + outerRadius * Math.sin(angle * i);
        }
        else{
            x = centerX + innerRadius * Math.cos(angle * i);
            y = centerY + innerRadius * Math.sin(angle * i);
        }
        points.push(`${x},${y}`);
    }

    return polygon(points, stroke, fill, strokeWidth);
   // return `<polygon points="${points.join(" ")}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}

/**
 * Draw a group of connected lines
 * @param {Array} points An array of points that make up the lines
 * @param {string} stroke The color of the stroke
 * @param {string} fill The color of the fill
 * @param {number} strokeWidth The width of the stroke
 */
const polyline = (points, stroke, fill, strokeWidth = 5) => {
    return `<polyline points="${points.join(" ")}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}

// #endregion

// #region Paths

/**
 * Draw a path
 * @param {*} startingX The x-coordinate of the starting point 
 * @param {*} startingY The y-coordinate of the starting point
 * @param {*} movements An array of the movements to make to create the path
 * @param {*} fill The color of the fill
 * @param {*} stroke The color of the stroke
 * @param {*} strokeWidth The width of the stroke
 * @param {*} closePath The boolean value to determine if the path should be closed
 * @returns 
 */
const path = (startingX, startingY, movements, fill, stroke, strokeWidth = 5, closePath = false) => {
    // add Z if closePath is true, add nothing if it's false
    return `<path d= "M ${startingX} ${startingY} 
        ${movements.join(" ")}${closePath ? 'Z' : ''}"
        fill="${fill} " stroke="${stroke} " stroke-width="${strokeWidth} "/>
        `
}

/**
 * Draw a line to a point from the current position
 * @param {*} x The x-coordinate of the point
 * @param {*} y The y-coordinate of the point
 * @returns 
 */
const lineTo = (x, y) => {
    return `L ${x} ${y}`
}

/**
 * Draw a horizontal line to a point from the current position
 * @param {*} x The x-coordinate of the point
 * @returns 
 */
const horizontalLineTo = (x) => {
    return `H ${x}`
}

/**
 * Draw a vertical line to a point from the current position
 * @param {*} y The y-coordinate of the point
 * @returns 
 */
const verticalLineTo = (y) => {
    return `V ${y}`
}

// #endregion

// #region Curves and Arcs

/**
 * Draw a cubic curve
 * @param {number} controlStartX The x-coordinate of the starting control point
 * @param {number} controlStartY The y-coordinate of the starting control point
 * @param {number} controlEndX The x-coordinate of the ending control point
 * @param {number} controlEndY The y-coordinate of the ending control point
 * @param {number} strokeEndX The x-coordinate of the ending point
 * @param {number} strokeEndY The y-coordinate of the ending point
 */
const cubicCurve = (controlStartX, controlStartY, controlEndX, controlEndY, strokeEndX, strokeEndY) => {
    return `C ${controlStartX} ${controlStartY} ${controlEndX} ${controlEndY} ${strokeEndX} ${strokeEndY}`
}

/**
 * Continue a cubic curve -
 * If used after another C or S, the first control point is a reflection of that previous control point.
 * If not, the first control point is the current position of the cursor.
 * @param {number} controlEndX // The x-coordinate of the ending control point 
 * @param {number} controlEndY // The y-coordinate of the ending control point
 * @param {number} strokeEndX // The x-coordinate of the ending point
 * @param {number} strokeEndY // The y-coordinate of the ending point
 */
const continuedCubicCurve = (controlEndX, controlEndY, strokeEndX, strokeEndY) => {
    return `S ${controlEndX} ${controlEndY} ${strokeEndX} ${strokeEndY}`
}

/**
 * Draw a quadratic curve
 * @param {number} controlX The x-coordinate of the control point
 * @param {number} controlY The y-coordinate of the control point
 * @param {number} strokeEndX The x-coordinate of the ending point
 * @param {number} strokeEndY The y-coordinate of the ending point
 */
const quadCurve = (controlX, controlY, strokeEndX, strokeEndY) => {
    return `Q ${controlX} ${controlY} ${strokeEndX} ${strokeEndY}`
}

/**
 * Continue a quadratic curve -
 * If used after another Q or T, the control point is infered from the previous control point.
 * If not, the control point is assumed to be the same as the previous point (will draw a line instead of a curve).
 * @param {number} controlEndX The x-coordinate of the control point
 * @param {number} controlEndY The y-coordinate of the control point
 * @param {number} strokeEndX The x-coordinate of the ending point
 * @param {number} strokeEndY The y-coordinate of the ending point
 */
const continuedQuadCurve = (controlEndX, controlEndY, strokeEndX, strokeEndY) => {
    return `T ${controlEndX} ${controlEndY} ${strokeEndX} ${strokeEndY}`
}

/** 
 * Draw an arc
 * @param {number} radiusX - the x-radius of the ellipse that the arc will be drawn on
 * @param {number} radiusY - the y-radius of the ellipse that the arc will be drawn on
 * @param {number} rotationX - the rotation of the ellipse that the arc will be drawn on
 * @param {number} largeArcFlag - determines if the arc should be greater than or less than 180 degrees; in the end, this flag determines which direction the arc will travel around a given circle
 * @param {number} sweepFlag - determines if the arc should begin moving at positive angles or negative ones, which essentially picks which of the two circles will be traveled around
 * @param {number} strokeEndX - the x-coordinate of the ending point of the arc
 * @param {number} strokeEndY - the y-coordinate of the ending point of the arc
 */
const arc = (radiusX, radiusY, rotationX, largeArcFlag, sweepFlag, strokeEndX, strokeEndY) => {
    return `A ${radiusX} ${radiusY} ${rotationX} ${largeArcFlag} ${sweepFlag} ${strokeEndX} ${strokeEndY}`
}

// #endregion

/**
 * Create a group of SVG elements
 * @param {Array} groupMembers The elements to group together
 * @param {Array} transformations The transformations to apply to the group
 * @param {Array} transformOrigin The origin of the transformations
 */
const group = (groupMembers, transformations = null, transformOrigin = null) => {
    let transformTag = "";
    // only includes the transform tag if given transformations
    if (transformations) {
        if(transformOrigin){
            transformTag = `transform = "${transformations.join(" ")}" transform-origin = "${transformOrigin[0]} ${transformOrigin[1]}"`
        }
        else{
            transformTag = `transform = "${transformations.join(" ")}"`;
        }
    }

    return `<g ${transformTag}>
    ${groupMembers.join(" ")}
    </g>`
}

export { polygon, radialSymPolygon, star, polyline, path, lineTo, horizontalLineTo, verticalLineTo, cubicCurve, continuedCubicCurve, quadCurve, continuedQuadCurve, arc, group }