import * as helper from '../../js-tools/helper.js';
import * as primitives from '../../js-tools/primitives.js';
import * as specialty from '../../js-tools/specialty.js';
import * as transform from '../../js-tools/transform.js';

let boxSize = 10;
let numRows = 23;
let numCols = 12;

const makeAnSVG = (x, y, width, height, numSides, scalesDown = false, shapeColor = "black", backgroundColor = "white") => {

    return `<svg width="100%" height="100%" viewBox="${x} ${y} ${width} ${height}">
            ${primitives.rect(x, y, width, height, "black", backgroundColor)}${drawSchotterGrid(numSides, boxSize, numRows, numCols, scalesDown, shapeColor)}
        </svg>`;
}

/**
 * Draws a grid of shapes that are progressively rotated and shifted (and sometimes scaled down) as you move down the grid
 * @param {number} numSides The number of sides for each shape in the grid
 * @param {number} boxSize The size of a side the box
 * @param {number} numRows The number of rows
 * @param {number} numCols The number of columns
 * @param {boolean} scalesDown If the shapes should scale down
 * @param {string} stroke The stroke color
 * @param {number} strokeWidth The width of the stroke
 * @param {string} fill The fill color
 */
const drawSchotterGrid = (numSides, boxSize, numRows, numCols, scalesDown = false, stroke = "black", strokeWidth = 0.3, fill = "none") => {
    let shapes = [];
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let x = (j + 0.5) * boxSize; // shift the grid over by one box
            let y = i * boxSize;
            let xCenter = x + boxSize / 2;
            let yCenter = y + boxSize / 2;
            let randAngle = helper.randNum((i + 0.5) * 6) - ((i + 0.5) * 3); // random angle between a multiples of -3 and 3 based on the level
            let randShiftX = helper.randNum(Math.floor(i / 10) * 6) - (Math.floor(i / 10) * 3); // random shift between -3 and 3
            let randShiftY = helper.randNum(Math.floor(i / 10) * 6) - (Math.floor(i / 10) * 3); // random shift between -3 and 3

            // draw shape
            let hypotenuse = Math.sqrt(Math.pow((boxSize / 2), 2) + Math.pow((boxSize / 2), 2)); //get the hypotenuse of the use as the radius
            let shape = specialty.radialSymPolygon(numSides, xCenter, yCenter, hypotenuse, stroke, fill, strokeWidth);

            let totalDegrees = (numSides - 2) * 180; // total degrees in a polygon
            let rotationAdjustment = totalDegrees / numSides / 2; // adjust the rotation so the shape is pointing up

            let baseShape = `<g transform = "${transform.rotate(rotationAdjustment, xCenter, yCenter)}"> ${shape} </g>`;

            let scaleFactor = 1 - (i / numRows * 0.60); // scale the shape down each row

            let transformations = [];
            if (scalesDown) { // check if the shape should scale down
                let scaleTransformations = [];
                scaleTransformations.push(transform.scale(scaleFactor, scaleFactor))
                baseShape = specialty.group([baseShape], scaleTransformations, [xCenter, yCenter]); // scale the shape down at the center
            }
            transformations.push(transform.rotate(randAngle, xCenter, yCenter)); // rotate the shape
            transformations.push(transform.translate(randShiftX, randShiftY)); // shift the shape
            let finalShape = specialty.group([baseShape], transformations);

            shapes.push(finalShape);
        }
    }
    return shapes.join("");
}


let recContainer = document.querySelector("#recreation");
let varContainer = document.querySelector("#variation");
let shapeColor = helper.getRandomColor(); // get a random color for the variation

recContainer.innerHTML = makeAnSVG(0 - boxSize, 0 - boxSize, boxSize * (numCols + 3), boxSize * (numRows + 3), 4); // Schotter Recreation
varContainer.innerHTML = makeAnSVG(0 - boxSize, 0 - boxSize, boxSize * (numCols + 3), boxSize * (numRows + 3), (helper.randInt(5) + 3), true, shapeColor, "black"); // Schotter Variations

let varyButton = document.querySelector("#varyButton");

varyButton.addEventListener("click", () => {
    shapeColor = helper.getRandomColor();
    varContainer.innerHTML = `${makeAnSVG(0 - boxSize, 0 - boxSize, boxSize * (numCols + 3), boxSize * (numRows + 3), (helper.randInt(5) + 3), true, shapeColor, "black")}`
});
