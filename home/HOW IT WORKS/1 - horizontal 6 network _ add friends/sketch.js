const transformer = 0.5;
const sizeOfBalls = 30;
const sideShifter = -40;

const sizeOfMovement = 6;

let amaticFont;

// ---- arrow stuff

const sizeOfArrow = 25;

let triangleLeftVertexX;
let triangleLeftVertexY;
let triangleRightVertexX;
let triangleRightVertexY;

let arrowVerticeX;
let arrowVerticeY;
let arrowRightCornerX;
let arrowRightCornerY;
let arrowLeftCornerX;
let arrowLeftCornerY;
let arrowRotation;
let arrowDirection;
let arrowPath;
let arrowCarrier = 0;
let arrowCarrierEnd = 0.8;
let arrowCarrierBeginning = 0.2;
let arrowCarrierMargin = 0.1;

// array  of particle objects
const particlesArray = [
  {
    x: 200,
    y: 50,
    pulsing: 4,
    xPulser: 0,
    yPulser: 0,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    x: 620,
    y: 150,
    pulsing: 3,
    xPulser: 0,
    yPulser: 0,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    x: 135,
    y: 205,
    pulsing: 2.5,
    xPulser: 0,
    yPulser: 0,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    x: 370,
    y: 250,
    pulsing: 1.5,
    xPulser: 0,
    yPulser: 0,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    x: 370,
    y: 50,
    pulsing: 7,
    xPulser: 0,
    yPulser: 0,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    x: 520,
    y: 70,
    pulsing: 4,
    xPulser: 0,
    yPulser: 0,
    colourR: 180,
    colourG: 180,
    colourB: 180
  }

]


var main = (p) => {
  // -----
  p.preload = () => {
    amaticFont = p.loadFont('AmaticSC-Regular.ttf');
  }

  p.setup = () => {
    p.frameRate(60)
    p.createCanvas(300, 150);
  }

  p.draw = () => {

    pulsing(p);

    p.clear()
    p.background(0, 0)
    // background(253, 235, 170);

    p.stroke(100)
    // LINKS (origin, end, strokeWeight)
    // linkBalls(0,1,0.5);
    linkBalls(0, 2, 0.5, p);
    linkBalls(1, 2, 0.5, p);
    linkBalls(2, 3, 0.5, p);
    // linkBalls(0,3,0.5);
    // linkBalls(1,3,0.5);
    // linkBalls(1,5,0.5);
    // linkBalls(4,5,0.5);
    linkBalls(2, 4, 0.5, p);
    // linkBalls(3,4,0.5);
    // linkBalls(3,5,0.5);
    // linkBalls(1,4,0.5);
    linkBalls(5, 2, 0.5, p);

    p.noStroke();
    // BALLS
    particlesArray.forEach(element => {
      createBall(element, p)
    })

    // 'YOU'
    p.fill(10, 10, 10);
    p.textSize(60 * transformer)
    // stroke (100, 30, 0, 140);
    p.textFont(amaticFont);
    p.textAlign(p.CENTER);
    p.text("YOU", particlesArray[2].xMoving, particlesArray[2].yMoving + 55 * transformer)
    // line
    // strokeWeight(4)
    // line (particlesArray[2].xMoving, particlesArray[2].yMoving + 20, particlesArray[2].xMoving, particlesArray[2].yMoving + 8)

    // arrows

    drawArrow(2, 0, false, 0.1, 160, 80, 0, 200, 0, p);
    drawArrow(2, 1, false, 0.2, 160, 80, 0, 200, 0, p);
    drawArrow(2, 3, false, 0.5, 160, 80, 0, 200, 0, p);
    drawArrow(2, 4, false, 0.5, 160, 80, 0, 200, 0, p);
    drawArrow(2, 5, false, 0.5, 160, 80, 0, 200, 0, p);
  }
}

// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function pulsing(p) {
  particlesArray.forEach(element => {
    // X pulsin
    element.xMoving = ((element.x + p.cos(p.frameCount * 0.01 * element.pulsing) * sizeOfMovement) * transformer) + sideShifter;
    // Y pulsing
    element.yMoving = ((element.y + p.sin(p.frameCount * 0.01 * element.pulsing) * sizeOfMovement) * transformer);
  })
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function linkBalls(origin, end, thickness, p) {
  if (origin === 2 || end === 2) {
    p.stroke(160, 80, 0, 150)
  }
  else {
    p.stroke(200, 140, 0, 150);
  }
  // stroke (255, 255, 255);
  p.strokeWeight(3 * transformer * thickness);
  p.line(particlesArray[origin].xMoving, particlesArray[origin].yMoving, particlesArray[end].xMoving, particlesArray[end].yMoving)
}


function createBall(ballObject, p) {

  // glow
  p.fill(ballObject.colourR, ballObject.colourG, ballObject.colourB, 100);
  p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls * 1.3 + 5 * p.cos(p.frameCount * 0.05), sizeOfBalls * 1.3 + 5 * p.cos(p.frameCount * 0.05))

  // ellipse
  p.fill(ballObject.colourR, ballObject.colourG, ballObject.colourB);
  p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls, sizeOfBalls)
}

// ===================================================
// ===================================================
// ===================================================

function drawArrow(origin, end, arrowDirection, arrowSpeed, colourR, colourG, colourB, transparency, displacer, p) {
  // ARROW ====================================

  // **** IT GOES BACKWARDS!!!! **** (from end to beginning)

  // arrow carrier goes from BEGINNING to END and then loops back    
  // if close to the END end of the trajectory
  if ((arrowCarrier < arrowCarrierEnd) && (arrowCarrier > (arrowCarrierEnd - arrowCarrierMargin))) {
    // colour of the arrow
    p.noStroke();
    p.fill(colourR, colourG, colourB, p.map(arrowCarrier, arrowCarrierEnd, arrowCarrierEnd - arrowCarrierMargin, 0, transparency));
    // speed of the arrow
    arrowCarrier -= 0.0045 * arrowSpeed;
  }
  // if close to the BEGINNING end of the trajectory
  else if ((arrowCarrier < arrowCarrierBeginning + arrowCarrierMargin) && (arrowCarrier > arrowCarrierBeginning)) {
    // colour of the arrow
    p.noStroke();
    p.fill(colourR, colourG, colourB, p.map(arrowCarrier, arrowCarrierBeginning, arrowCarrierBeginning + arrowCarrierMargin, 0, transparency));
    // fill(0);
    // speed of the arrow
    arrowCarrier -= 0.0045 * arrowSpeed;
  }
  // anywhere in the middle
  else {
    // speed of the arrow
    arrowCarrier -= 0.004 * arrowSpeed;
    // colour of the arrow
    p.noStroke();
    p.fill(colourR, colourG, colourB, transparency);
    // fill (0);

  };

  // rewind the carrier
  if (arrowCarrier <= arrowCarrierBeginning) {
    p.noStroke();
    p.fill(colourR, colourG, colourB, 0);
    // fill(0);
    arrowCarrier = arrowCarrierEnd - 0.001;
  }

  if (arrowDirection) {
    // if blue
    arrowDirection = 1.1;
    arrowPath = arrowCarrier;
    // noStroke();
    // text(arrowPath, 30, 30)

  } else {
    // if green
    arrowDirection = 4.24;
    arrowPath = 1 - arrowCarrier;
    // noStroke();
    // text(arrowPath, 30, 70)
  };

  arrowRotation = p.atan2(particlesArray[origin].xMoving - particlesArray[end].xMoving, particlesArray[origin].yMoving - particlesArray[end].yMoving);

  // arrowVerticeX = ((x - attractor.x) * arrowPath) + attractor.x;
  arrowVerticeX = ((particlesArray[end].xMoving - particlesArray[origin].xMoving) * arrowPath) + particlesArray[origin].xMoving;
  arrowVerticeY = ((particlesArray[end].yMoving - particlesArray[origin].yMoving) * arrowPath) + particlesArray[origin].yMoving;

  triangleLeftVertexX = arrowVerticeX + (sizeOfArrow * transformer) * p.cos(arrowRotation + arrowDirection);
  triangleLeftVertexY = arrowVerticeY - (sizeOfArrow * transformer) * p.sin(arrowRotation + arrowDirection);
  triangleRightVertexX = arrowVerticeX + (sizeOfArrow * transformer) * p.cos(arrowRotation + arrowDirection + 1);
  triangleRightVertexY = arrowVerticeY - (sizeOfArrow * transformer) * p.sin(arrowRotation + arrowDirection + 1);


  p.triangle(arrowVerticeX, arrowVerticeY, triangleLeftVertexX, triangleLeftVertexY, triangleRightVertexX, triangleRightVertexY);


}

var myp5 = new p5(main, 'c1');
