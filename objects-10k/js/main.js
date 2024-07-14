let ctx;
let numCols; // number of columns
let numRows; // number of rows
let currentColumn; // index of the current column
let currentRow; // index of the current row
let colWidth; // width of each column
let rowHeight; // height of each row
let circleRadius; // radius of each circle
let hueOffsetX; // the x position of the current circle
let hueOffsetY; // the y position of the current circle
let circleColor; // the color of the current circle

const init = () => {
    console.log("page loaded!");
    let canvas = document.querySelector("canvas");
    
    // draw the canvas background 
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // set values
    numCols = 100;
    numRows = 100;
    colWidth = canvas.width / numCols;
    rowHeight = canvas.height / numRows;
    circleRadius = rowHeight / 2 * 0.9;
    currentColumn = 0;
    currentRow = 0;
    hueOffsetX = 0;
    hueOffsetY = 0;

    // start drawing the grid
    drawGrid();
}

// draw the grid
const drawGrid = () => {
    // checks if the current row and column are within the grid
    if (currentRow < numRows && currentColumn < numCols) {
        for (let i = 0; i < currentColumn; i++) {
            // draw the bottom left half of the grid
            drawCircleInGrid(i, currentRow);
        }
        for (let i = 0; i < currentRow; i++) {
            // draw the top right half of the grid
            drawCircleInGrid(currentColumn, i);
        }
        // draw the central line
        drawCircleInGrid(currentColumn, currentRow);
        currentColumn++;
        currentRow++;

        requestAnimationFrame(drawGrid);
    }
    else {
        // once the grid is filled, draw the rainbow wave
        rainbowWave();
    }
}


// repeatedly draw the grid with a rainbow wave effect
const rainbowWave = () => {
    for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
            drawCircleInGrid(i, j);
        }
        hueOffsetX -= 0.1;
        hueOffsetY -= 0.1;
    }
    requestAnimationFrame(rainbowWave);
}

// draw a circle in the proper grid position and set the hue based on that grid position
const drawCircleInGrid = (colIndex, rowIndex) => {
    let circleX = (colIndex * colWidth) + (colWidth / 2);
    let circleY = (rowIndex * rowHeight) + (rowHeight / 2);

    // adjust the hue based on the circle's position, using an offset to create a wave effect when the grid is filled
    let hueX = circleX + hueOffsetX;
    let hueY = circleY + hueOffsetY;

    circleColor = `hsl(${setHue(hueX, hueY)},100%,30%)`;
    drawCircle(ctx, circleColor, circleX, circleY, circleRadius);
}

// draw a circle
const drawCircle = (ctx, color, x, y, radius) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

// sets the hue of the circle based on its position
const setHue = (positionX, positionY) => {
    let hue;
    hue = (Math.max(positionX, positionY) * 10) / 5 % 361;
    //hue = (positionX * positionY) / 5 % 361;
    //console.log(hue);
    return hue;
}

init();