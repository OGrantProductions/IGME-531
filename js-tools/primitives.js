// draw a circle
const circle = (centerX, centerY, radius, stroke, fill, strokeWidth = 1) => {
    return `<circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}

// draw a ellipse
const ellipse = (centerX, centerY, radiusX, radiusY, stroke, fill, strokeWidth = 1) => {
    return `<ellipse cx="${centerX}" cy="${centerY}" rx="${radiusX}" ry="${radiusY}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}

// drawing a rect
const rect = (x, y, width, height, stroke, fill, strokeWidth = 1) => {
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}

// draw a line
const line = (x1, x2, y1, y2, stroke, strokeWidth = 1) => {
    return `<line x1="${x1}" x2="${x2}" y1="${y1}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`
}

export { circle, ellipse, rect, line }