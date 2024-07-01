import * as helper from '../../js-tools/helper.js';
import * as primitives from '../../js-tools/primitives.js';
import * as specialty from '../../js-tools/specialty.js';
import * as transform from '../../js-tools/transform.js';

let boxSize = 10;
let numRows = 4;
let numCols = 17;

const makeAnSVG = (x, y, width, height, backgroundColor, shapeType, numLayers, shapeColor, rotation = 0) => {
    return `<svg width="100%" height="100%" viewBox="${x} ${y} ${width} ${height}">
            ${primitives.rect(x, y, width, height, "none", backgroundColor)}${drawDesOrderSVG(shapeType, numLayers, shapeColor, rotation)}
        </svg>`;
}


/**
 * Draws a group of uneven squares that steadily decrease in size
 * @param {string} type The type of shape to draw
 * @param {number} numLayers The number of layers of shapes to draw
 * @param {number} x The x-coordinate of the top-left corner of the group
 * @param {number} y The y-coordinate of the top-left corner of the group
 * @param {number} groupWidth The width of the group
 * @param {number} groupHeight The height of the group
 * @param {string} stroke The stroke color
 * @param {number} rotation The rotation angle of the group
 * @param {number} strokeWidth The stroke width
 * @param {string} fill The fill color
 * @returns 
 */
const drawDesorderTile = (type, numLayers, x, y, groupWidth, groupHeight, stroke = "black", rotation = 0, strokeWidth = 0.1, fill = "none") => {
    let tile = []; // an array to hold the tiles to draw

    let variation = 5 + helper.randNum(2); // the amount variation in the square's corners
    numLayers = 15; // the number of tiles to draw

    for (let i = 0; i < numLayers; i++) {

        // determine if we should draw this layer
        let notDrawChance = helper.randNum(10);
        if (notDrawChance < 4) { // 40% chance of not drawing
            continue;
        }

        // how much the corner should shift inward with each layer
        let shift = (i / numLayers) * (groupWidth / 2 - groupWidth / 30);

        let points;
        // get the points for the shape based on the type
        points = calculateShapePoints(type, x, y, groupWidth, groupHeight, shift, variation);

        // add the square to the array
        tile.push(specialty.polyline(points, stroke, fill, strokeWidth));
    }

    let transformations = [];
    transformations.push(transform.rotate(rotation, x + groupWidth / 2, y + groupHeight / 2)); // rotate the group
    return specialty.group(tile, transformations); // return the group of shapes
}

/**
 * Calculate the points of a shape with uneven sides and corners
 * @param {string} shapeType The type of shape to draw
 * @param {number} x The x-coordinate of the top-left corner of the square
 * @param {number} y The y-coordinate of the top-left corner of the square
 * @param {number} boxWidth The width of the square
 * @param {number} boxHeight The height of the square
 * @param {number} shift The amount to shift the corners inward
 * @param {number} variation The amount of variation in the corners
 */
const calculateShapePoints = (shapeType, x, y, boxWidth, boxHeight, shift, variation) => {
    // determine the edges and lines to based the points on
    let centerLine = x + boxWidth / 2;
    let leftEdge = x;
    let rightEdge = x + boxWidth;
    let topEdge = y;
    let bottomEdge = y + boxHeight;

    let points = [];

    // lower right corner
    let x1 = rightEdge - shift - helper.randNum(variation / boxWidth);
    let y1 = bottomEdge - shift - helper.randNum(variation / boxHeight);
    points.push(`${x1},${y1}`);

    // lower left corner
    let x2 = leftEdge + shift + helper.randNum(variation / boxWidth);
    let y2 = bottomEdge - shift - helper.randNum(variation / boxHeight);
    points.push(`${x2},${y2}`);

    if (shapeType == "square") {
        // upper left corner
        let x3 = leftEdge + shift + helper.randNum(variation / boxWidth);
        let y3 = topEdge + shift + helper.randNum(variation / boxHeight);
        points.push(`${x3},${y3}`);

        // upper right corner
        let x4 = rightEdge - shift - helper.randNum(variation / boxWidth);
        let y4 = topEdge + shift + helper.randNum(variation / boxHeight);
        points.push(`${x4},${y4}`);
    }

    if (shapeType == "triangle") {
        // upper middle point
        let x3;
        if (helper.randNum(2) < 1) { // 50% chance of being on the left side
            x3 = centerLine + helper.randNum(variation / boxWidth);
        }
        else { // 50% chance of being on the right side
            x3 = centerLine - helper.randNum(variation / boxWidth);
        }
        let y3 = topEdge + shift + helper.randNum(variation / boxHeight);
        points.push(`${x3},${y3}`);
    }

    points.push(`${x1},${y1}`); // close the shape

    return points;
}

/**
 * Draws a group of (Des)Ordres tiles
 * @param {string} type The type of shape to draw
 * @param {number} numLayers The number of layers of shapes to draw
 * @param {string} shapeColor The color of the shapes
 * @param {number} rotation The rotation angle of the group
 */
const drawDesOrderSVG = (type, numLayers, shapeColor, rotation = 0) => {
    let svgGroups;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            svgGroups += drawDesorderTile(type, numLayers, j * boxSize, i * boxSize, boxSize, boxSize, shapeColor, rotation);
        }
    }
    return `${svgGroups}`;
}

let recContainer = document.querySelector("#recreation");
let varContainer = document.querySelector("#variation");

recContainer.innerHTML = makeAnSVG(0, 0, boxSize * numCols, boxSize * numRows, "#F4F1EB", "square", 15, "#2D2115"); // (Des)Ordres recreation
varContainer.innerHTML = makeAnSVG(0, 0, boxSize * numCols, boxSize * numRows, "black", "triangle", 10, `${helper.getRandomColor()}`, helper.randNum(360)); // (Des)Ordres variation

let varyButton = document.querySelector("#varyButton");

varyButton.addEventListener("click", () => {
    varContainer.innerHTML = makeAnSVG(0, 0, boxSize * numCols, boxSize * numRows, "black", "triangle", 10, `${helper.getRandomColor()}`, helper.randNum(360)); // (Des)Ordres variation
});