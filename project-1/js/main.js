import * as helper from '../../js-tools/helper.js';
import * as primitives from '../../js-tools/primitives.js';
import * as specialty from '../../js-tools/specialty.js';
import * as transform from '../../js-tools/transform.js';

/* Figure out why the outer arc is off at smaller sizes */

// draw the grid

const makeAnSVG = (x, y, svgViewWidth, svgViewHeight) => {
    let sideLength = 20;
    let tileWidth = svgViewWidth / sideLength;
    let tileHeight = svgViewHeight / sideLength;
    let innerStrokeWidth = 3 / sideLength;
    let outerStrokeWidth = 7.5 / sideLength;

    return `<svg width="100%" height="100%" viewBox="${x} ${y} ${svgViewWidth} ${svgViewHeight}">
            ${drawEverything(tileWidth, tileHeight, innerStrokeWidth, outerStrokeWidth, sideLength)}
        </svg>
        `
}

const drawEverything = (tileWidth, tileHeight, innerStrokeWidth, outerStrokeWidth, sideLength) => {
    let fullGrid = "";
    let tileColor = helper.getRandomColor();
    for (let i = 0; i < sideLength; i++) {
        let y = i * tileHeight;
        for (let j = 0; j < sideLength; j++) {
            let x = j * tileWidth;
            let rotationInterval = helper.randInt(4);
            let tileType = helper.randNum(100);
            if (tileType < 20) {
                fullGrid += drawLineTile(x, y, tileWidth, tileHeight, tileColor, "black", innerStrokeWidth, outerStrokeWidth, rotationInterval * 90);
            }
            else {
                fullGrid += drawQuarterCircleTile(x, y, tileWidth, tileHeight, tileColor, "black", innerStrokeWidth, outerStrokeWidth, rotationInterval * 90);
            }
        }
    }
    return fullGrid;
}


// straight path tiles
const drawLineTile = (x, y, width, height, stroke, fill, innerStrokeWidth, outerStrokeWidth, rotation = 0) => {
    let groupItems = [];
    let groupTransforms = [];
    let centerX = x + width / 2;
    let centerY = y + height / 2;
    let rightEdge = x + width;
    let bottomEdge = y + height;

    groupItems.push(primitives.rect(x, y, width, height, stroke, fill, 0));

    groupItems.push(primitives.line(x + width / 10, x + width / 10, y, bottomEdge, "red", outerStrokeWidth));
    groupItems.push(primitives.line(x + width / 4.5, x + width / 4.5, y, bottomEdge, "yellow", innerStrokeWidth));
    groupItems.push(primitives.line(x + width / 2.75, x + width / 2.75, y, bottomEdge, "green", innerStrokeWidth));
    groupItems.push(primitives.line(centerX, centerX, y, bottomEdge, "blue", innerStrokeWidth));
    groupItems.push(primitives.line(rightEdge - width / 2.75, rightEdge - width / 2.75, y, bottomEdge, "green", innerStrokeWidth));
    groupItems.push(primitives.line(rightEdge - width / 4.5, rightEdge - width / 4.5, y, bottomEdge, "yellow", innerStrokeWidth));
    groupItems.push(primitives.line(rightEdge - width / 10, rightEdge - width / 10, y, bottomEdge, "red", outerStrokeWidth));


    // let backgroundGroup = specialty.group(groupItems, [transform.rotate(90, centerX, centerY)]);
    // groupItems.push(primitives.rect(x + 1, y, width - 2, height, stroke, fill, 0));
    // groupItems.push(backgroundGroup);

    let groupRotation = transform.rotate(rotation, centerX, centerY);
    groupTransforms.push(groupRotation);

    //console.log(specialty.group(groupItems))
    return specialty.group(groupItems, groupTransforms);
}

// quarter circle tiles
const drawQuarterCircleTile = (x, y, width, height, stroke, fill, innerStrokeWidth, outerStrokeWidth, rotation = 0) => {
    let groupItems = [];
    let groupTransforms = [];
    let centerX = x + width / 2;
    let centerY = y + height / 2;
    let bottomEdge = y + height;
    let rightEdge = x + width;

    groupItems.push(primitives.rect(x, y, width, height, stroke, fill, 0));

    // under arcs
    groupItems.push(specialty.path(x, y + height / 10, [specialty.arc(width - 1, height - 1, 0, 0, 1, rightEdge - height / 10, bottomEdge)], fill, "red", outerStrokeWidth));
    groupItems.push(specialty.path(x, y + height / 4.5, [specialty.arc(width - width / 4.5, height - height / 4.5, 0, 0, 1, rightEdge - width / 4.5, bottomEdge)], fill, "yellow", innerStrokeWidth));
    groupItems.push(specialty.path(x, y + height / 2.75, [specialty.arc(width - width / 2.75, height - height / 2.75, 0, 0, 1, rightEdge - width / 2.75, bottomEdge)], fill, "green", innerStrokeWidth));
    groupItems.push(specialty.path(x, centerY, [specialty.arc(width / 2, height / 2, 0, 0, 1, centerX, bottomEdge)], fill, "blue", innerStrokeWidth));
    groupItems.push(specialty.path(x, bottomEdge - height / 2.75, [specialty.arc(width / 2.75, height / 2.75, 0, 0, 1, x + width / 2.75, bottomEdge)], fill, "green", innerStrokeWidth));
    groupItems.push(specialty.path(x, bottomEdge - height / 4.5, [specialty.arc(width / 4.5, height / 4.5, 0, 0, 1, x + width / 4.5, bottomEdge)], fill, "yellow", innerStrokeWidth));
    groupItems.push(specialty.path(x, bottomEdge - height / 10, [specialty.arc(1, 1, 0, 0, 1, x + height / 10, bottomEdge)], fill, "red", outerStrokeWidth));

    // "shadow" arc
    let shadowArc = [];
    shadowArc.push(specialty.arc(width, height, 0, 0, 0, rightEdge, bottomEdge));
    shadowArc.push(specialty.verticalLineTo(y));
    groupItems.push(specialty.path(x, y, [shadowArc], fill, "black", 0, true));

    // over arcs
    groupItems.push(specialty.path(x + width / 10, y, [specialty.arc(width - 1, height - 1, 0, 0, 0, rightEdge, bottomEdge - width / 10)], fill, "red", outerStrokeWidth));
    groupItems.push(specialty.path(x + width / 4.5, y, [specialty.arc(width - width / 4.5, height - height / 4.5, 0, 0, 0, rightEdge, bottomEdge - height / 4.5)], fill, "yellow", innerStrokeWidth));
    groupItems.push(specialty.path(x + width / 2.75, y, [specialty.arc(width - width / 2.75, height - height / 2.75, 0, 0, 0, rightEdge, bottomEdge - height / 2.75)], fill, "green", innerStrokeWidth));
    groupItems.push(specialty.path(centerX, y, [specialty.arc(width / 2, height / 2, 0, 0, 0, rightEdge, centerY)], fill, "blue", innerStrokeWidth));
    groupItems.push(specialty.path(rightEdge - width / 2.75, y, [specialty.arc(width / 2.75, height / 2.75, 0, 0, 0, rightEdge, y + height / 2.75)], fill, "green", innerStrokeWidth));
    groupItems.push(specialty.path(rightEdge - width / 4.5, y, [specialty.arc(width / 4.5, height / 4.5, 0, 0, 0, rightEdge, y + height / 4.5)], fill, "yellow", innerStrokeWidth));
    groupItems.push(specialty.path(rightEdge - width / 10, y, [specialty.arc(1, 1, 0, 0, 0, rightEdge, y + width / 10)], fill, "red", outerStrokeWidth));


    let groupRotation = transform.rotate(rotation, centerX, centerY);
    groupTransforms.push(groupRotation);

    //console.log(specialty.group(groupItems, groupTransforms))
    return specialty.group(groupItems, groupTransforms);
}

// display the truchet tiles to the webpage
let truchet = document.querySelector("#truchet");
truchet.innerHTML = makeAnSVG(0, 0, 200, 200);

let varyButton = document.querySelector("#varyButton");
varyButton.addEventListener("click", () => { truchet.innerHTML = makeAnSVG(0, 0, 200, 200) });