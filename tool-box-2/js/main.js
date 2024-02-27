import * as helper from './helper.js';

let svgViewWidth;
let svgViewHeight;
let boxWidth;
let boxHeight;
let numRows = 17;
let numCols = 17;
const makeAnSVG = (x, y, width, height) => {
    svgViewWidth = width;
    svgViewHeight = height;
    boxWidth = svgViewWidth / numCols;
    boxHeight = svgViewHeight / numRows;
    return `<svg width="100%" height="100%" viewBox="${x} ${y} ${width} ${height}">
        ${drawEverything()}
        </svg>
        `
}

const makeRectLayer = (rotation, x, y, width, height, stroke = "black", strokeWidth = 2, fill = "none") => {
    return `<g transform="rotate(${rotation}, ${x + width / 2}, ${y + height / 2})">
            ${makeRect(x, y, width, height, stroke, strokeWidth, fill)};
            </g>`
}

const makeRect = (x, y, width, height, stroke, strokeWidth, fill) => {
    return `<rect x=${x} y=${y} width=${width} height=${height} stroke="${stroke}" stroke-width=${strokeWidth} fill=${fill} />`;
}

const drawGroup = (outerX, outerY, outerWidth, outerHeight) => {
    return `
    <g>
        ${makeRectLayer(0, outerX, outerY, outerWidth, outerHeight, "black", 0.2, "none")}
        ${makeRectLayer(getRandAngle(), outerX + outerWidth / 10, outerY + outerHeight / 10, outerWidth / 1.25, outerHeight / 1.25, helper.getRandomColor(), 0.2, "none")}
        ${makeRectLayer(getRandAngle(), outerX + outerWidth / 8, outerY + outerHeight / 8, outerWidth / 1.33, outerHeight / 1.33, helper.getRandomColor(), 0.2, "none")}
        ${makeRectLayer(getRandAngle(), outerX + outerWidth / 6, outerY + outerHeight / 6, outerWidth / 1.5, outerHeight / 1.5, helper.getRandomColor(), 0.2, "none")}
        ${makeRectLayer(getRandAngle(), outerX + outerWidth / 4, outerY + outerHeight / 4, outerWidth / 2, outerHeight / 2, helper.getRandomColor(), 0.2, "none")}
        ${makeRectLayer(getRandAngle(), outerX + outerWidth / 3, outerY + outerHeight / 3, outerWidth / 3, outerHeight / 3, helper.getRandomColor(), 0.2, "none")}
    </g>
    `
}

const drawEverything = () => {
    let svgGroups;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            svgGroups += drawGroup(j * boxWidth, i * boxHeight, boxWidth, boxHeight);
        }
    }
    return svgGroups;
}

const getRandAngle = () => {
    return helper.randNum(30) - 15;
}
document.body.innerHTML = `<p>${makeAnSVG(0, 0, 100, 100)}</p>`;