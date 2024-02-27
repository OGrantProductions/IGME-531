// #region Shapes

// draw a circle
const circle = (centerX, centerY, radius, stroke, fill, strokeWidth = 5) => {
    return `<circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}

// draw a ellipse
const ellipse = (centerX, centerY, radiusX, radiusY, stroke, fill, strokeWidth = 5) => {
    return `<ellipse cx="${centerX}" cy="${centerY}" rx="${radiusX}" ry="${radiusY}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}

// drawing a rect
const rect = (x, y, width, height, stroke, fill, strokeWidth = 5) => {
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}

// draw a polygon
const polygon = (points, stroke, fill, strokeWidth = 5) =>{
    return `<polygon points="${points.join(" ")}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}

// draw a line
const line = (x1, x2, y1, y2, stroke, strokeWidth = 5) => {
    return `<line x1="${x1}" x2="${x2}" y1="${y1}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`
}

// #endregion

// #region Transformations

// rotates the shape
const rotate = (angle, pivotX, pivotY) => {
    return `rotate(${angle} ${pivotX} ${pivotY})`
}

// #endregion

// draws the whole svg
const makeAnSVG = () => {
    return `<svg width="100%" height="100%" viewBox="0 0 250 250">
            <g id="rect_1" transform="${rotate(0, 15, 15)}">
            ${rect(10, 10, 10, 10, "none", "red")}
            </g>
            </svg`
}

document.body.innerHTML = `<p>${makeAnSVG()}</p>`