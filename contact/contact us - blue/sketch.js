const transformer = 0.6;
const sizeOfBalls = 21;
const sideShifter = -0;
const verticalShifter = 7;

let counter = 0;
let step = 0

const sizeOfMovement = 6;

const sideDisplacer = -20

let amaticFont;

const indicesOn = 0;

// ---- arrow stuff

const sizeOfArrow = 20;

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
const particlesArray = [{
  index: 0,
  x: 100,
  y: 50,
  pulsing: 2,
  xPulser: 0,
  yPulser: 0,
  colourR: 255,
  colourG: 255,
  colourB: 255
},
{
  index: 1,
  x: 200,
  y: 20,
  pulsing: 2,
  xPulser: 0,
  yPulser: 0,
  colourR: 180,
  colourG: 180,
  colourB: 180
},
{
  index: 2,
  x: 215,
  y: 80,
  pulsing: 1.8,
  xPulser: 0,
  yPulser: 0,
  colourR: 180,
  colourG: 180,
  colourB: 180
},
{
  index: 3,
  x: 185,
  y: 50,
  pulsing: 1.9,
  xPulser: 0,
  yPulser: 0,
  colourR: 180,
  colourG: 180,
  colourB: 180
},
{
  index: 4,
  x: 265,
  y: 25,
  pulsing: 2.5,
  xPulser: 0,
  yPulser: 0,
  colourR: 180,
  colourG: 180,
  colourB: 180
},
{
  index: 5,
  x: 280,
  y: 70,
  pulsing: 1.5,
  xPulser: 0,
  yPulser: 0,
  colourR: 180,
  colourG: 180,
  colourB: 180
},
{
  index: 6,
  x: 235,
  y: 48,
  pulsing: 2.1,
  xPulser: 0,
  yPulser: 0,
  colourR: 180,
  colourG: 180,
  colourB: 180
}

]

// -----
var main = (p) => {

  p.preload = () => {
    amaticFont = p.loadFont('../../AmaticSC-Regular.ttf');
  }

  p.setup = () => {
    p.frameRate(60)
    p.createCanvas(240, 95);

    // saveFrames ()
  }

  p.draw = () => {

    pulsing(p);

    p.clear()
    // background (100)
    // background(253, 235, 170);


    p.fill(0, 55, 180, 180)

    // stroke (0)
    // ellipse (140 + sideShifter, 80 + verticalShifter, 210, 170)
    // rect (60, 0, 80, 80)
    p.ellipse(122 + sideShifter, 135 + verticalShifter, 450 * transformer, 464 * transformer)

    //   stroke(1)
    //   ellipse(50, 40, 79, 79)
    //   ellipse(155, 40, 79, 79)

    //   noStroke()
    //   fill(255)
    //   // ellipse (110, 40, 170, 80)
    //   rect (50, 0, 105, 80)

    //   stroke (0)
    //   line (50, 0.5, 155, 0.5)
    //   line (50, 79.5, 155, 79.5)

    p.stroke(255)
    linkBalls(0, 3, 1, p);
    linkBalls(1, 3, 1, p);
    linkBalls(1, 4, 1, p);
    // linkBalls(1,5,, p3);
    linkBalls(1, 6, 1, p);
    // linkBalls(1,2,, p3);
    linkBalls(2, 3, 1, p);
    linkBalls(2, 5, 1, p);
    linkBalls(2, 6, 1, p);
    linkBalls(3, 6, 1, p);
    // linkBalls(3,5,, p3);
    linkBalls(4, 6, 1, p);
    // linkBalls(4,2,, p3);
    // linkBalls(4,3,, p3);
    linkBalls(5, 4, 1, p);
    linkBalls(5, 6, 1, p);


    p.noStroke();
    // BALLS
    particlesArray.forEach(element => {
      createBall(element, false, 20, p)
    })

    // arrows
    // make a script of 4 steps. 
    // 1) one arrow from sender
    // 2, 3 and 4) the arrows spreading in the community
    // you could have a script for subscribe and a script for contacting

    // text("counter: " + counter, 10, 10)
    // text("step: " + step, 10, 20)

    if (counter < 140) {
      counter++
    } else {
      counter = 0
      step++
    }

    if (step === 5) {
      step = 0
    }

    // 1 
    switch (step) {
      //   case 0:
      // drawArrow(0, 3, false, 3.2, 255, 255, 255, 255);
      // break
      case 0:
        drawArrow(0, 3, false, 3.2, 255, 255, 255, 200, p);
        createBall(particlesArray[0], true, 1, p)
        break
      case 1:
        drawArrow(0, 3, false, 3.2, 255, 255, 255, 200, p);
        createBall(particlesArray[0], true, 1, p)
        break
      case 2:
        drawArrow(0, 3, false, 3.2, 255, 255, 255, 200, p);
        createBall(particlesArray[0], true, 1, p)
        break
      case 3:
        createBall(particlesArray[1], true, 0.5, p)
        createBall(particlesArray[2], true, 0.5, p)
        createBall(particlesArray[3], true, 0.5, p)
        createBall(particlesArray[4], true, 0.5, p)
        createBall(particlesArray[5], true, 0.5, p)
        createBall(particlesArray[6], true, 0.5, p)
        break
      case 4:
        drawArrow(0, 3, true, 3.2, 255, 255, 255, 200, p);
        createBall(particlesArray[0], true, 1, p)
        break
    }



    // if (counter === 99) {
    // drawArrow(0, 3, false, 2, 255, 255, 255, 200);
    // } 
    // showIndices();

    // saving the frame
    //   if (frameCount < 80) {
    // saveCanvas('Img', 'png');
    //   }
  }
}

// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function pulsing(p) {
  particlesArray.forEach(element => {
    // X pulsin
    element.xMoving = (element.x + 1.5 * (p.cos(p.frameCount * 0.03 * element.pulsing + element.index * 10))) * transformer + sideShifter;
    // Y pulsing
    element.yMoving = (element.y + p.sin(p.frameCount * 0.03 * element.pulsing + element.index * 10)) * transformer + verticalShifter;
    // element.xMoving = element.x + sideDisplacer;
    // element.yMoving = element.y;
  })
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function linkBalls(origin, end, thickness, p) {
  p.stroke(255);
  p.strokeWeight(3 * transformer * thickness);
  p.line(particlesArray[origin].xMoving, particlesArray[origin].yMoving, particlesArray[end].xMoving, particlesArray[end].yMoving)
}


function createBall(ballObject, glow, speedOfGlow, p) {
  // user glow ellipse
  if (glow) {
    p.fill(255, 100);
    p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls * transformer * 1.5 * (p.cos(p.frameCount * 0.03 * speedOfGlow * ballObject.pulsing + ballObject.index * 10)), sizeOfBalls * transformer * 1.5 * (p.cos(p.frameCount * 0.03 * speedOfGlow * ballObject.pulsing + ballObject.index * 10)))
  }
  if (!glow) {
    // ellipse
    p.fill(255);
    p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls * transformer, sizeOfBalls * transformer)
  }
}

// ===================================================
// ===================================================
// ===================================================

function drawArrow(origin, end, arrowDirection, arrowSpeed, colourR, colourG, colourB, transparency, p) {
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

function showIndices(p) {
  if (indicesOn) {
    particlesArray.forEach(element => {
      p.fill(150)
      p.text(element.index, (element.x + 10) * transformer + sideShifter, (element.y + 10) * transformer)
    });
  }
}


var myp5 = new p5(main, 'c1');
