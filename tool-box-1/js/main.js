import * as primitives from '../../js-tools/primitives.js';
import * as specialty from '../../js-tools/specialty.js';
import * as transform from '../../js-tools/transform.js';
import * as helper from '../../js-tools/helper.js';

let shapeInfo = [
    { x: 2.5, y: 35, color: "BE2A2A", angle: 5 },
    { x: 8, y: 11, color: "6B2933", angle: -25 },
    { x: 29, y: 3, color: "BF302C", angle: -3 },
    { x: 22, y: 15, color: "E84139", angle: 45 },
    { x: 40, y: 56, color: "6B2933", angle: -27 },
    { x: 55, y: 44, color: "6B2933", angle: 5 },
    { x: 41, y: 26, color: "E84139", angle: -10 },
    { x: 69, y: 62, color: "BE2A2A", angle: 43 },
    { x: 74, y: 65, color: "E52524", angle: 15 }
];

// draws the original Sainte-Victoire en Rouge as an svg
const makeSainteVictoireSVG = (x, y, svgViewWidth, svgViewHeight) => {
    return `<svg width="100%" height="100%" viewBox="${x} ${y} ${svgViewWidth} ${svgViewHeight}">
            ${primitives.rect(0, 0, svgViewHeight, svgViewHeight, "none", "#EEEDEB")}
            ${drawEverySquare(shapeInfo)}
        </svg>
        `
}

// draws a variation of Sainte-Victoire en Rouge as an svg
const makeVariationSVG = (x, y, svgViewWidth, svgViewHeight) => {
    return `<svg width="100%" height="100%" viewBox="${x} ${y} ${svgViewWidth} ${svgViewHeight}">
            ${primitives.rect(0, 0, svgViewHeight, svgViewHeight, "none", "#EEEDEB")}
            ${drawEveryStar(shapeInfo)}
        </svg>
        `
}


const drawEverySquare = (squareInfo) => {
    let squareSide = 25; // 25 is the proper size

    let groupItems = [];

    let squares = squareInfo;

    // moved all of the below info the squares array so that's easier to change the order that they're drawn in
    // let shapeXs = [2.5, 22, 8, 29, 41, 40, 55, 69, 74];
    // let shapeYs = [35, 15, 11, 3, 26, 56, 44, 62, 65];
    // let colors = ["BE2A2A", "E84139", "6B2933", "BF302C", "E84139", "6B2933", "6B2933", "BE2A2A", "E52524"];
    // let angles = [5, 45, -25, -3, -10, -27, 5, 43, 15];

    for (let i = 0; i < 9; i++) {
        groupItems.push(specialty.group([primitives.rect(squares[i].x, squares[i].y, squareSide, squareSide, "none", `#${squares[i].color}`)], [transform.rotate(squares[i].angle, squares[i].x, squares[i].y)]));
    }
    // 9 rects
    return specialty.group(groupItems);

}

const drawEveryStar = (starInfo) => {
    let tileSize = 25; // 25 is the proper size
    let hypotenuse = Math.sqrt(Math.pow((tileSize / 2), 2) + Math.pow((tileSize / 2), 2)); //get the hypotenuse of the use as the radius

    let outerRadius = hypotenuse;
    let innerRadius = hypotenuse / 2;

    let hueOffset = helper.randInt(360);


    let groupItems = [];
    let hslValues = [
        {hue: 0 + hueOffset, saturation: 63, lightness: 45},
        {hue: 350 + hueOffset, saturation: 44, lightness: 29},
        {hue: 1 + hueOffset, saturation: 62, lightness: 46},
        {hue: 2 + hueOffset, saturation: 79, lightness: 56},
        {hue: 350 + hueOffset, saturation: 44, lightness: 29},
        {hue: 350 + hueOffset, saturation: 44, lightness: 29},
        {hue: 2 + hueOffset, saturation: 79, lightness: 56},
        {hue: 0 + hueOffset, saturation: 63, lightness: 45},
        {hue: 0 + hueOffset, saturation: 78, lightness: 52}
    ];

    let stars = starInfo;

    for (let i = 0; i < 9; i++) {
        let numPoints = 5;
        let currentStar = stars[i];
        let centerX = currentStar.x + tileSize/2;
        let centerY = currentStar.y + tileSize/2;
        let cornerX = centerX - tileSize / 2;
        let cornerY = centerY - tileSize / 2;

        let star = specialty.star(numPoints, centerX, centerY, outerRadius, innerRadius, "none", `${helper.getHSLColor(hslValues[i].hue, hslValues[i].saturation, hslValues[i].lightness)}`);
        let totalDegrees = (numPoints - 2) * 180; // total degrees in a polygon
        let rotationAdjustment = totalDegrees / numPoints / 2; // adjust the rotation so the shape is pointing up

        let rotationFix = transform.rotate(rotationAdjustment, centerX, centerY);
        let adjustedStar = specialty.group([star], [rotationFix]);
        let rotation = transform.rotate(currentStar.angle, cornerX, cornerY);
        groupItems.push(specialty.group([adjustedStar], [rotation]));
    }
    // 9 stars
    return specialty.group(groupItems);
}


let recContainer = document.querySelector("#recreation");
let varContainer = document.querySelector("#variation");
//let shapeColor = helper.getRandomColor(); // get a random color for my personal changes

recContainer.innerHTML += `${makeSainteVictoireSVG(0, 0, 100, 100)}`
varContainer.innerHTML += `${makeVariationSVG(0, 0, 100, 100)}`

let varyButton = document.querySelector("#varyButton");

varyButton.addEventListener("click", () => { varContainer.innerHTML = `${makeVariationSVG(0, 0, 100, 100)}`});