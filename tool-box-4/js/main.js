import * as helper from '../../js-tools/helper.js';
import * as primitives from '../../js-tools/primitives.js';
import * as specialty from '../../js-tools/specialty.js';
import * as transform from '../../js-tools/transform.js';

// Uses the FastNoise Lite library:
// https://github.com/Auburn/FastNoiseLite/tree/master/JavaScript#fastnoise-lite
import FastNoiseLite from 'https://unpkg.com/fastnoise-lite@1.1.0/FastNoiseLite.js';

let seed = helper.randInt(1000);

// Create a FastNoiseLite object with a random seed
let noise = new FastNoiseLite(seed);
noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
noise.SetFrequency(0.03);

let boxSize = 20;
let numRows = 30;
let numCols = 30;

const makeAnSVG = (x, y, width, height, gridType = "transparency", backgroundColor = "white", shapeColor = "black") => {

    return `<svg width="100%" height="100%" viewBox="${x - boxSize} ${y - boxSize} ${width + boxSize * 2} ${height + boxSize * 2}">
            ${primitives.rect(x - boxSize, y - boxSize, width + boxSize * 2, height + boxSize * 2, "black", backgroundColor)}${drawInterruptionsGrid(boxSize, numRows, numCols, gridType, shapeColor)}
        </svg>`;
}

/**
 * Draws a grid of lines that are randomly rotated
 * @param {number} boxSize The size of a side the box
 * @param {number} numRows The number of rows
 * @param {number} numCols The number of columns
 * @param {string} gridType The type of grid that should be drawn, default is transparency
 * @param {string} stroke The stroke color, default is black
 * @param {number} strokeWidth The width of the stroke, default is 0.5
 */
const drawInterruptionsGrid = (boxSize, numRows, numCols, gridType = "transparency", stroke = "black", strokeWidth = 0.5) => {
    // Gather noise data
    let noiseData = [];
    let gridSize = boxSize * numRows;

    for (let x = 0; x < 128; x++) {
        noiseData[x] = [];

        for (let y = 0; y < 128; y++) {
            noiseData[x][y] = noise.GetNoise(x, y);
        }
    }

    let squares = mapGrid(gridSize / 128, 128, 128, noiseData, gridType);

    let lines = [];
    for (let i = 0; i < numRows * 2; i++) {
        for (let j = 0; j < numCols * 2; j++) {
            let x = j * boxSize / 2;
            let y = i * boxSize / 2;
            let xCenter = x + boxSize / 2;
            let yCenter = y + boxSize / 2;
            let randAngle = helper.randInt(360);

            let lineColor;
            let lineOpacity;
            let lineToDraw;

            // Find the square that the line is in
            squares.forEach(square => {
                if (xCenter >= square.xStart && xCenter < square.xStart + square.size && yCenter >= square.yStart && yCenter < square.yStart + square.size) {
                    lineColor = square.color;
                    lineOpacity = square.opacity;
                }
            })


            if (gridType === "transparency") {
                lineToDraw = primitives.line(xCenter, xCenter, y, y + boxSize, stroke, strokeWidth, lineOpacity);
            }
            else if (gridType === "color") {
                lineToDraw = primitives.line(xCenter, xCenter, y, y + boxSize, lineColor, strokeWidth);
            }

            let transformations = [];
            transformations.push(transform.rotate(randAngle, xCenter, yCenter)); // rotate the line
            let finalShape = specialty.group([lineToDraw], transformations);
            lines.push(finalShape);
        }
    }

    let finalGrid = specialty.group([lines]);
    return finalGrid;
}

/**
 * Maps a grid that can be useed to make visual changes based on noise data
 * @param {number} boxSize The size of a side the box
 * @param {number} numRows The number of rows
 * @param {number} numCols The number of columns
 * @param {number} noiseGrid The noise data
 * @param {string} gridType The type of grid that should be mapped, default is transparency
 */
const mapGrid = (boxSize, numRows, numCols, noiseGrid, gridType = "transparency") => {
    let squares = [];
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let x = j * boxSize;
            let y = i * boxSize;

            let gridOpacity = ((noiseGrid[i][j] + 1) / 2); // normalize the noise data to be between 0 and 1
            let quadrantColor = "black";

            // maps a grid that has varying points of transparency based on the noise data
            if (gridType === "transparency") {
                let rectOpacity;
                if (gridOpacity < 0.075) {
                    rectOpacity = 0; // make the grid transparent
                } else {
                    rectOpacity = 1; // make the grid opaque
                }
                squares.push({ xStart: x, yStart: y, size: boxSize, color: quadrantColor, opacity: rectOpacity });
            }

            // maps a grid that is colored based on the noise data
            else if (gridType === "color") {
                quadrantColor = helper.getHSLColor(gridOpacity * 360, 100);
                squares.push({ xStart: x, yStart: y, size: boxSize, color: quadrantColor, opacity: gridOpacity });
            }
        }
    }
    return squares;
}


let flexContainer = document.querySelector("#flex-container");

flexContainer.innerHTML += `<div class="flex-items"><h1 style= "text-align: center">Interruptions Recreation</h1>${makeAnSVG(0, 0, boxSize * numCols, boxSize * numRows)}</div>`; // Interruptions Recreation
flexContainer.innerHTML += `<div class="flex-items"><h1 style= "text-align: center">Interruptions Variations</h1>${makeAnSVG(0, 0, boxSize * numCols, boxSize * numRows, "color", "black")}</div>`; // Interruptions Variations
