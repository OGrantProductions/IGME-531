// draw a polygon
const polygon = (points, stroke, fill, strokeWidth = 5) => {
    return `<polygon points="${points.join(" ")}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}

// draw a shape using polylines
const polylines = (points, stroke, fill, strokeWidth = 5) => {
    return `<polylines points="${points.join(" ")}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}

// #region Paths

// draw a path
const path = (startingX, startingY, movements, fill, stroke, strokeWidth = 5, closePath = false) => {
    // add Z if closePath is true, add nothing if it's false
    return `<path d= "M ${startingX} ${startingY} 
        ${movements.join(" ")}${closePath ? 'Z' : ''}"
        fill="${fill} " stroke="${stroke} " stroke-width="${strokeWidth} "/>
        `
}

// path line
const lineTo = (x, y) => {
    return `L ${x} ${y}`
}

// horizontal path line
const horizontalLineTo = (x) => {
    return `H ${x}`
}

// vertical path line
const verticalLineTo = (y) => {
    return `V ${y}`
}

// #region Curves

// cubic curve
const cubicCurve = (controlStartX, controlStartY, controlEndX, controlEndY, strokeEndX, strokeEndY) => {
    return `C ${controlStartX} ${controlStartY} ${controlEndX} ${controlEndY} ${strokeEndX} ${strokeEndY}`
}

/** Continued Cubic Curve -
 *  If used after another C or S, the first control point is a reflection of that previous control point.
 *  If not, the first control point is the current position of the cursor.
 */
const continuedCubicCurve = (controlEndX, controlEndY, strokeEndX, strokeEndY) => {
    return `S ${controlEndX} ${controlEndY} ${strokeEndX} ${strokeEndY}`
}

// quadratic curve
const quadCurve = (controlX, controlY, strokeEndX, strokeEndY) => {
    return `Q ${controlX} ${controlY} ${strokeEndX} ${strokeEndY}`
}

/** Continued Quadratic Curve -
 *  If used after another Q or T, the control point is infered from the previous control point.
 *  If not, the control point is assumed to be the same as the previous point (will draw a line instead of a curve).
 */
const continuedQuadCurve = (controlEndX, controlEndY, strokeEndX, strokeEndY) => {
    return `T ${controlEndX} ${controlEndY} ${strokeEndX} ${strokeEndY}`
}

// #endregion


/** Draw an arc
 * @param {number} largeArcFlag - determines if the arc should be greater than or less than 180 degrees; in the end, this flag determines which direction the arc will travel around a given circle
 * @param {number} sweepFlag - determines if the arc should begin moving at positive angles or negative ones, which essentially picks which of the two circles will be traveled around
 */
const arc = (radiusX, radiusY, rotationX, largeArcFlag, sweepFlag, strokeEndX, strokeEndY) => {
    return `A ${radiusX} ${radiusY} ${rotationX} ${largeArcFlag} ${sweepFlag} ${strokeEndX} ${strokeEndY}`
}

// #endregion

// Create a group
const group = (groupMembers, transformations = null) => {
    let transformTag = "";
    // only includes the transform tag if given transformations
    if (transformations) {
        transformTag = `transform = "${transformations.join(" ")}"`;
    }

    return `<g ${transformTag}>
    ${groupMembers.join(" ")}
    </g>`
}

export { polygon, polylines, path, lineTo, horizontalLineTo, verticalLineTo, cubicCurve, continuedCubicCurve, quadCurve, continuedQuadCurve, arc, group }