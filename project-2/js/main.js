import { render } from './render.js';

const { booleans, colors, primitives, transforms } = jscadModeling // modeling comes from the included MODELING library

const { translate } = transforms // https://openjscad.xyz/docs/module-modeling_transforms.html#.translate
// const { intersect, subtract, union } = booleans
// const { colorize, colorNameToRgb } = colors
// const { cube, cuboid, sphere } = primitives

const torusTowers = (parameters, iterations = 0) => {
    const size = parameters.size;
    //  const innerRadius = parameters.size;

    let tower = [];
    const towerX = parameters.X;
    const towerY = parameters.Y;
    const initialDivider = 10;
    const cylinderRadius = size / initialDivider;
    let segments = 16;


    let sizeDivider = 3; // the number to divide the size by to get the outer radius of each torus
    const maxLoops = initialDivider - sizeDivider; // the number of torus to create, the sum of the maxLoops and sizeDivider cannot exceed initialDivider

    let torusOuter = size / sizeDivider;
    let newInner = torusOuter - cylinderRadius;
    let lastInner = 0;
    let translateZ = 0;
    let lastZ = 0;

    let startingInner = newInner; // save the inner radius of the first torus to use for the cylinder's Z point
    let cylinderHeight = newInner; // set the height of the cylinder to start at the inner radius of the first torus

    if (iterations === 0) {
        for (let i = 0; i < maxLoops; i++) {
            tower.push(translate([towerX, towerY, lastZ], primitives.torus({ innerRadius: newInner, outerRadius: torusOuter, segments: segments })));
            lastInner = newInner; // save the inner radius of the last torus
            sizeDivider++; // increase the size divider so that the next torus is smaller
            torusOuter = size / sizeDivider; // set the outer radius of the next torus
            newInner = torusOuter - cylinderRadius; // set the inner radius of the next torus
            translateZ = lastInner + newInner; // set the height of the next torus so that it is directly on top of the last one
            lastZ += translateZ; // save the height of the last torus
            cylinderHeight += translateZ; // increase the height of the cylinder
            console.log("torusOuter: ", torusOuter, "newInner: ", newInner, "translateZ: ", lastZ);
        }

        // add the central cylinder
        tower.push(translate([towerX, towerY, (cylinderHeight / 2 - startingInner) + lastInner], primitives.roundedCylinder({ radius: cylinderRadius, height: cylinderHeight + lastInner, roundRadius: size / 50, segments: segments })));
        return tower;
    }

    return [
        torusTowers({ size: size / 2, X: towerX + size / 2, Y: towerY - size / 2 }, iterations - 1),
        torusTowers({ size: size / 2, X: towerX + size / 2, Y: towerY + size / 2 }, iterations - 1),
        torusTowers({ size: size, X: towerX, Y: towerY }, iterations - 1),
        torusTowers({ size: size / 2, X: towerX - size / 2, Y: towerY - size / 2 }, iterations - 1),
        torusTowers({ size: size / 2, X: towerX - size / 2, Y: towerY + size / 2 }, iterations - 1),
    ]

}

render(document.getElementById("render"), torusTowers({ size: 300, X: 0, Y: 0 }))