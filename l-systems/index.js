import * as helper from '../js-tools/helper.js';
import * as primitives from '../js-tools/primitives.js';
import * as specialty from '../js-tools/specialty.js';

// ## An L-System needs...
// variables, constants (alphabet)
// rules (production rules)
// a way to expand a string through iteration
// way to interpret string into visual 

// ## A Sierpinski triangle drawn using an L-system.
// variables : A B  
// constants : + −
// start  : A
// rules  : (A → B−A−B), (B → A+B+A)
// angle  : 60°
let alphabet = ['A', 'B', '+', '-'];
const axiom = 'A';
const rules = {
  'A': 'B-A-B',
  'B': 'A+B+A',
  '-': '-',
  '+': '+'
};

let changingAngle;

// iterate once through the string
const iterate_once = (lindenmayerString) => {
  let newString = '';
  for (let i = 0; i < lindenmayerString.length; i++) {
    const result = rules[lindenmayerString[i]];
    newString += result || lindenmayerString[i];
  }
  return newString;
}

// iterate n times through the string
const iterateNTimes = (n, lindenmayerString) => {
  let newString = lindenmayerString;
  changingAngle = 75; // reset the angle to 75 degrees
  for (let i = 0; i < n; i++) {
    newString = iterate_once(newString);
    changingAngle -= 3; // decrease the angle by 3 each iteration
  }
  return newString;
};

// interpret the string into a visual
const makeVisual = (options, lindenmayerString) => {
  // Basically constants
  let angle = (options.angle || 90) * Math.PI / 180; // convert to radians
  let startingPoint = options.startingPoint || [0, 0];
  let lineLength = options.lineLength || 10;
  let lineColor = options.lineColor || 'black';

  // State
  let rotation = 0;
  let points = [startingPoint];
  let pointsString = '';

  const moveForward = () => {
    const lastPoint = points[points.length - 1];

    const dx = Math.cos(rotation) * lineLength;
    const dy = Math.sin(rotation) * lineLength;

    let newPoint = [lastPoint[0] + dx, lastPoint[1] + dy];
    points.push(newPoint);

    pointsString += primitives.line(lastPoint[0], newPoint[0], lastPoint[1], newPoint[1], lineColor, 8)
  };

  const whatToDo = {
    'A': () => {
      return moveForward();
    },
    'B': () => {
      return moveForward();
    },
    // turn left
    '+': () => {
      rotation = rotation - angle;
      lineColor = helper.getHSLColor(rotation * 50, 100); // change the color of the line based on the current rotation
    },
    // turn right
    '-': () => {
      rotation = rotation + angle;
      lineColor = helper.getHSLColor(rotation * 50, 100); // change the color of the line based on the current rotation
    },
  };

  for (let i = 0; i < lindenmayerString.length; i++) {
    const toDo = whatToDo[lindenmayerString[i]];
    toDo();
  }
  // returns a group of each line created in the Siepinski triangle
  return specialty.group([pointsString]);
};

let iterationTimes = 6;
const expanded = iterateNTimes(iterationTimes, axiom);
let result = makeVisual({
  lineLength: 20,
  angle: changingAngle,
  startingPoint: [0, 0]
}, expanded);

// get result into the svg in the dom
const svg = document.querySelector('svg');
svg.innerHTML = result;

// let oneStep = iterate_once(axiom);
// debugger;