const speedOfScript = 50; // based on frames (so 60 > 1 sec)
const transformer = 0.82 // 2 is what's on the current desktop mode iframe // 0.5 300,160
const bannerTransformer = 1.7;
const sizeOfBalls = 10;
const sideShifter = -35;
const verticalShifter = -13;

const canvasWidth = 450;
const canvasHeight = 350;
let CFareaAlpha = 0;
let FFareaAlpha = 0;

const indices = false;

const sizeOfMovement = 6;

let amaticFont;
let josefinsFont;
let cabinSketchFont;

// infoBanner
const allInfoBannersOn = false;
const rectWidth = 100 * bannerTransformer;
const rectHeight = 45 * bannerTransformer;
let verticalBannerShifter = 0;

// ---- arrow stuff

const sizeOfArrow = 18 * transformer;

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
let sideShiftDirection = 0;

let carrierZero = false;
let carrierOne = false;
let carrierThree = false;
let carrierFour = false;
let carrierFive = false;

let carrierG = 0;
let carrierB = 0;

// array  of particle objects
const particlesArray = [
  {
    index: 0,
    CForFF: "CF",
    originalX: canvasWidth * 0.5,
    originalY: canvasHeight * 0.5,
    x: canvasWidth * 0.5,
    y: canvasHeight * 0.5,
    finalX: canvasWidth * 0.5,
    finalY: canvasHeight * 0.5,
    pulsing: 1.5,
    sizeOfMovementX: 5,
    sizeOfMovementY: 5,
    ballSize: 1.2,
    colourR: 150,
    colourG: 150,
    colourB: 150,
    givenTo: 91,
    receivedFrom: 121,
    rayToAttractorOption: false,
  },
  {
    index: 1,
    CForFF: "CF",
    originalX: 185,
    originalY: 135,
    x: 185,
    y: 135,
    finalX: 185,
    finalY: 135,
    pulsing: 1.5,
    sizeOfMovementX: 5,
    sizeOfMovementY: 5,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false
  },
  {
    index: 2,
    CForFF: "CF",
    originalX: 250,
    originalY: 120,
    x: 250,
    y: 120,
    finalX: 250,
    finalY: 120,
    pulsing: 1.5,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  },
  {
    index: 3,
    CForFF: "CF",
    originalX: 170,
    originalY: 210,
    x: 170,
    y: 210,
    finalX: 170,
    finalY: 210,
    pulsing: 1.5,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  },
  {
    index: 4,
    CForFF: "CF",
    originalX: 250,
    originalY: 230,
    x: 250,
    y: 230,
    finalX: 250,
    finalY: 230,
    pulsing: 1.25,
    sizeOfMovementX: 2,
    sizeOfMovementY: 3,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  },
  {
    index: 5,
    CForFF: "CF",
    originalX: 280,
    originalY: 170,
    x: 280,
    y: 170,
    finalX: 280,
    finalY: 170,
    pulsing: 1.5,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  },
  {
    index: 6,
    CForFF: "FF",
    x: 120,
    y: 90,
    pulsing: 1.7,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  },
  {
    index: 7,
    CForFF: "FF",
    x: 180,
    y: 60,
    pulsing: 1.5,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  },
  {
    index: 8,
    CForFF: "FF",
    x: 240,
    y: 60,
    pulsing: 1.5,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  },
  {
    index: 9,
    CForFF: "FF",
    x: 300,
    y: 80,
    pulsing: 1,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  },
  {
    index: 10,
    CForFF: "FF",
    x: 340,
    y: 135,
    pulsing: 1.5,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false
    ,
  },
  {
    index: 11,
    CForFF: "FF",
    x: 350,
    y: 190,
    pulsing: 2,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false
    ,
  },
  {
    index: 12,
    CForFF: "FF",
    x: 320,
    y: 260,
    pulsing: 1.3,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  },
  {
    index: 13,
    CForFF: "FF",
    x: 240,
    y: 290,
    pulsing: 1.2,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  },
  {
    index: 14,
    CForFF: "FF",
    x: 140,
    y: 270,
    pulsing: 1.25,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  },
  {
    index: 15,
    CForFF: "FF",
    x: 100,
    y: 220,
    pulsing: 1,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  }
];

let step = 18;



// -------------------------------------------------------
// -------------------------------------------------------

var main = (p) => {

  p.preload = () => {
    amaticFont = p.loadFont('AmaticSC-Regular.ttf');
  }

  p.setup = () => {
    p.frameRate(60)
    p.createCanvas(300, 260);

    particlesArray[0].givenTo = 91 // 15 + 66
    particlesArray[1].givenTo = 21
    particlesArray[3].givenTo = 16
    particlesArray[4].givenTo = 15
    particlesArray[7].givenTo = 5
    particlesArray[9].givenTo = 14
    particlesArray[12].givenTo = 10
    particlesArray[13].givenTo = 7
    particlesArray[14].givenTo = 3

    // values receivedFrom
    particlesArray[1].receivedFrom = 10;
    particlesArray[2].receivedFrom = 20;
    particlesArray[3].receivedFrom = 14;
    particlesArray[4].receivedFrom = 18;
    particlesArray[5].receivedFrom = 10;

    particlesArray[6].receivedFrom = 4;
    particlesArray[7].receivedFrom = 7;
    particlesArray[9].receivedFrom = 11;
    particlesArray[10].receivedFrom = 10;
    particlesArray[11].receivedFrom = 4;
    particlesArray[13].receivedFrom = 11;
    particlesArray[15].receivedFrom = 7;

    particlesArray[0].colourG = 180
    particlesArray[0].colourB = 175
    particlesArray[1].colourG = 130
    particlesArray[1].colourB = 180
    particlesArray[3].colourG = 180
    particlesArray[3].colourB = 180
    particlesArray[7].colourG = 180
    particlesArray[7].colourB = 165
    particlesArray[9].colourG = 165
    particlesArray[9].colourB = 180
    particlesArray[12].colourR = 0
    particlesArray[12].colourG = 50
    particlesArray[12].colourB = 180
    particlesArray[13].colourG = 180
    particlesArray[13].colourB = 155
    particlesArray[14].colourR = 0
    particlesArray[14].colourG = 50
    particlesArray[14].colourB = 180

    // you
    particlesArray[0].colourR = 0;
    particlesArray[0].colourG = 180;
    particlesArray[0].colourB = 70;
    // CF
    particlesArray[1].colourR = 0;
    particlesArray[1].colourG = 180;
    particlesArray[1].colourB = 50;
    particlesArray[2].colourR = 0;
    particlesArray[2].colourG = 180;
    particlesArray[2].colourB = 50;
    particlesArray[3].colourR = 0;
    particlesArray[3].colourG = 180;
    particlesArray[3].colourB = 50;
    particlesArray[4].colourR = 0;
    particlesArray[4].colourG = 180;
    particlesArray[4].colourB = 180;
    particlesArray[5].colourR = 0;
    particlesArray[5].colourG = 180;
    particlesArray[5].colourB = 50;
    // FF  
    particlesArray[6].colourR = 0;
    particlesArray[6].colourG = 180;
    particlesArray[6].colourB = 50;
    particlesArray[7].colourR = 0;
    particlesArray[7].colourG = 180;
    particlesArray[7].colourB = 50;
    particlesArray[9].colourR = 0;
    particlesArray[9].colourG = 180;
    particlesArray[9].colourB = 50;
    particlesArray[10].colourR = 0;
    particlesArray[10].colourG = 180;
    particlesArray[10].colourB = 50;
    particlesArray[11].colourR = 0;
    particlesArray[11].colourG = 180;
    particlesArray[11].colourB = 50;
    particlesArray[13].colourR = 0;
    particlesArray[13].colourG = 180;
    particlesArray[13].colourB = 50;
    particlesArray[15].colourR = 0;
    particlesArray[15].colourG = 180;
    particlesArray[15].colourB = 50;

    particlesArray[0].colourG = 180
    particlesArray[0].colourB = 175
    particlesArray[1].colourG = 130
    particlesArray[1].colourB = 180
    particlesArray[3].colourG = 180
    particlesArray[3].colourB = 180
    particlesArray[7].colourG = 180
    particlesArray[7].colourB = 165
    particlesArray[9].colourG = 165
    particlesArray[9].colourB = 180
    particlesArray[12].colourR = 0
    particlesArray[12].colourG = 50
    particlesArray[12].colourB = 180
    particlesArray[13].colourG = 180
    particlesArray[13].colourB = 155
    particlesArray[14].colourR = 0
    particlesArray[14].colourG = 50
    particlesArray[14].colourB = 180
  }

  p.draw = () => {

    pulsing(p);
    p.clear();

    // background(253, 235, 170);

    // Far Friends AREA
    p.noStroke();
    p.fill(250, 216, 140);
    p.ellipse((canvasWidth * 0.5 * transformer) + sideShifter, (canvasHeight * 0.5 * transformer) + verticalShifter, canvasWidth * 0.8 * transformer, canvasWidth * 0.7 * transformer);

    // Close Friends  AREA
    p.fill(241, 184, 88);
    p.ellipse((canvasWidth * 0.5 * transformer) + sideShifter, (canvasHeight * 0.5 * transformer) + verticalShifter, canvasWidth * 0.4 * transformer, canvasWidth * 0.35 * transformer);

    // links and balls
    linkCF(p);
    linkCFtoFF(p);
    linkFFtoFF(p);
    particlesArray.forEach(element => { createBall(element, p) })


    // INFO BANNERS bring on the info banners
    particlesArray.forEach(element => {
      if (element.thisInfoBannerOn) {
        drawInfoBanner(element.index, 20, 20, p)
      }
    })

    p.noStroke();
    // ==================================================== end of steps

    // 'YOU'
    if (!particlesArray[11].thisInfoBannerOn) {
      p.fill(10, 10, 10);
      p.textSize(23 * transformer)
      p.textAlign(p.CENTER);
      // stroke (100, 30, 0, 140);
      p.textFont(amaticFont);
      p.text("YOU", particlesArray[0].xMoving, particlesArray[0].yMoving + 30 * transformer)
    }
  }
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function pulsing(p) {
  particlesArray.forEach(element => {
    // X pulsin
    element.xMoving = ((element.x + p.cos(p.frameCount * 0.01 * element.pulsing) * element.sizeOfMovementX) * transformer) + sideShifter;
    // Y pulsing
    element.yMoving = ((element.y + p.sin(p.frameCount * 0.01 * element.pulsing) * element.sizeOfMovementY) * transformer) + verticalShifter;
  })
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function linkBalls(origin, end, thickness, p) {
  if (origin === 0 || end === 0) {
    p.stroke(100, 30, 0, 150)
  }
  else {
    p.stroke(150, 100, 0, 150);
  }
  // stroke (255, 255, 255);
  p.strokeWeight(1.5 * transformer * thickness);
  p.line(particlesArray[origin].xMoving, particlesArray[origin].yMoving, particlesArray[end].xMoving, particlesArray[end].yMoving)
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function createBall(ballObject, p) {
  // glow
  p.fill(ballObject.colourR, ballObject.colourG, ballObject.colourB, 100);
  p.ellipse(ballObject.xMoving, ballObject.yMoving, (sizeOfBalls * 1.3 + 2 * p.cos(p.frameCount * 0.05)) * transformer * 2 * ballObject.ballSize, (sizeOfBalls * 1.3 + 2 * p.cos(p.frameCount * 0.05)) * transformer * 2 * ballObject.ballSize);

  // ellipse
  p.fill(ballObject.colourR, ballObject.colourG, ballObject.colourB);
  p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls * transformer * 2 * ballObject.ballSize, sizeOfBalls * transformer * 2 * ballObject.ballSize)

  if (indices) {
    p.fill(0);
    p.textSize(15 * transformer)
    p.textFont("Lucida")
    p.text(ballObject.index, ballObject.xMoving - 10, ballObject.yMoving - 15)
  }
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function drawCarrier(origin, end, width, colourR, colourG, colourB, transparency, p) {
  p.stroke(colourR, colourG, colourB, transparency)
  p.strokeWeight(width * 30)

  p.line(particlesArray[origin].xMoving, particlesArray[origin].yMoving, particlesArray[end].xMoving, particlesArray[end].yMoving)
  p.noStroke();
  p.noFill();
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function drawArrow(origin, end, arrowDirection, arrowSpeed, colourR, colourG, colourB, transparency, howMuch, p) {

  if (arrowDirection) {
    sideShiftDirection = 50;
  }
  else { sideShiftDirection = 0; }
  // ARROW ====================================

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
  }
  // rewind the carrier
  if (arrowCarrier <= arrowCarrierBeginning) {
    p.noStroke();
    p.fill(colourR, colourG, colourB, 0);
    arrowCarrier = arrowCarrierEnd - 0.001;
  }
  if (arrowDirection) {
    // if blue
    arrowDirection = 1.1;
    arrowPath = arrowCarrier;
  } else {
    // if green
    arrowDirection = 4.24;
    arrowPath = 1 - arrowCarrier;
  }
  arrowRotation = p.atan2(particlesArray[origin].xMoving - particlesArray[end].xMoving, particlesArray[origin].yMoving - particlesArray[end].yMoving);

  arrowVerticeX = ((particlesArray[end].xMoving - particlesArray[origin].xMoving) * arrowPath) + particlesArray[origin].xMoving;
  arrowVerticeY = ((particlesArray[end].yMoving - particlesArray[origin].yMoving) * arrowPath) + particlesArray[origin].yMoving;

  triangleLeftVertexX = arrowVerticeX + (sizeOfArrow * transformer) * p.cos(arrowRotation + arrowDirection);
  triangleLeftVertexY = arrowVerticeY - (sizeOfArrow * transformer) * p.sin(arrowRotation + arrowDirection);
  triangleRightVertexX = arrowVerticeX + (sizeOfArrow * transformer) * p.cos(arrowRotation + arrowDirection + 1);
  triangleRightVertexY = arrowVerticeY - (sizeOfArrow * transformer) * p.sin(arrowRotation + arrowDirection + 1);

  p.triangle(arrowVerticeX, arrowVerticeY, triangleLeftVertexX, triangleLeftVertexY, triangleRightVertexX, triangleRightVertexY);

  p.textFont("amatic")
  p.textSize(15 * transformer)
  p.textAlign(p.CENTER);
  if (howMuch && arrowVerticeX > canvasWidth * transformer * 0.5) {
    p.text("£" + howMuch, arrowVerticeX + 20 * transformer, arrowVerticeY - 1 * transformer)
  } else if (howMuch && arrowVerticeX <= canvasWidth * transformer * 0.5) {
    p.text("£" + howMuch, arrowVerticeX - 20 * transformer, arrowVerticeY - 1 * transformer)
  }
  p.noFill()
  p.noTint()
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function message(indexRequesting, actualMessage, p) {
  p.fill(255, 255, 255);
  p.stroke(20, 20, 20)
  p.strokeWeight(1 * transformer);
  p.ellipse(particlesArray[indexRequesting].xMoving + 25 * transformer, particlesArray[indexRequesting].yMoving - 15 * transformer, 42 * transformer, 32 * transformer)
  p.fill(30, 0, 0)
  p.noStroke();
  p.textAlign(CENTER);
  p.textFont(amaticFont);
  p.textSize(25 * transformer);
  p.text(actualMessage, particlesArray[indexRequesting].xMoving + 25 * transformer, particlesArray[indexRequesting].yMoving - 7 * transformer)
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function drawInfoBanner(friendIndex, p) {

  if (friendIndex === 11) {
    p.fill(10, 10, 10);
    p.textSize(23 * transformer)
    p.textAlign(p.CENTER);
    // stroke (100, 30, 0, 140);
    p.textFont(amaticFont);
    p.text("YOU", particlesArray[0].xMoving, particlesArray[0].yMoving + 30 * transformer)
  }

  let xBorderShifter = 0;
  let yBorderShifter = 0;

  // side borders
  // left
  if (particlesArray[friendIndex].xMoving < rectWidth * 0.52) {
    xBorderShifter = rectWidth * 0.52 - particlesArray[friendIndex].xMoving
  }
  // right
  else if (particlesArray[friendIndex].xMoving > (canvasWidth * transformer - rectWidth * 0.52)) {
    xBorderShifter = canvasWidth * transformer - rectWidth * 0.52 - particlesArray[friendIndex].xMoving
  }
  // top border
  if (particlesArray[friendIndex].yMoving < rectHeight * 1.15) {
    yBorderShifter = rectHeight * 1.15 - particlesArray[friendIndex].yMoving
  }
  // bottomg border
  else if (particlesArray[friendIndex].yMoving > (canvasHeight * transformer - rectHeight * 1.5)) {
    yBorderShifter = canvasHeight * transformer - rectHeight * 1.5 - particlesArray[friendIndex].yMoving + yBorderShifter
  }


  if (particlesArray[friendIndex].yMoving + yBorderShifter > canvasHeight * 0.5 * transformer && friendIndex) {
    verticalBannerShifter = rectHeight + 10 * transformer;
  } else if (particlesArray[friendIndex].yMoving + yBorderShifter <= canvasHeight * 0.5 * transformer || !friendIndex) {
    verticalBannerShifter = 0;
    // and triangle
    p.fill(particlesArray[friendIndex].colourR, particlesArray[friendIndex].colourG, particlesArray[friendIndex].colourB)
    p.triangle(particlesArray[friendIndex].xMoving + xBorderShifter - rectWidth * 0.5 + 5 * bannerTransformer,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 5 * bannerTransformer,

      particlesArray[friendIndex].xMoving + xBorderShifter + rectWidth * 0.5 - 5 * bannerTransformer,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 5 * bannerTransformer,

      particlesArray[friendIndex].xMoving,
      particlesArray[friendIndex].yMoving)
  }

  p.stroke(particlesArray[friendIndex].colourR, particlesArray[friendIndex].colourG, particlesArray[friendIndex].colourB);
  p.strokeWeight(2 * bannerTransformer);
  p.fill(255);
  p.rect(particlesArray[friendIndex].xMoving + xBorderShifter - rectWidth * 0.5, particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - rectHeight - 5 * bannerTransformer, rectWidth, rectHeight, 6 * bannerTransformer)
  p.fill(particlesArray[friendIndex].colourR, particlesArray[friendIndex].colourG, particlesArray[friendIndex].colourB)

  // COLOUR BAR
  // green to turquoise
  for (let i = 0; i < int(35 * bannerTransformer); i++) {
    p.stroke(0, 180,
      int(map(i, 0, int(35 * bannerTransformer), 0, 180)), 150);
    p.line(
      particlesArray[friendIndex].xMoving + xBorderShifter - 34 * bannerTransformer + i,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 18 * bannerTransformer,
      particlesArray[friendIndex].xMoving + xBorderShifter - 34 * bannerTransformer + i,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 15 * bannerTransformer);
  }
  // turquoise to blue
  for (let i = 0; i < int(35 * bannerTransformer); i++) {
    p.stroke(
      0,
      int(map(i, 0, int(35 * bannerTransformer), 180, 50)), 180, 150);
    p.line(
      particlesArray[friendIndex].xMoving + xBorderShifter + bannerTransformer + i,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 18 * bannerTransformer,
      particlesArray[friendIndex].xMoving + xBorderShifter + bannerTransformer + i,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 15 * bannerTransformer
    );
  }

  // FADER - triangle gauge 
  p.stroke(255);
  p.strokeWeight(1 * bannerTransformer);
  p.fill(particlesArray[friendIndex].colourR, particlesArray[friendIndex].colourG, particlesArray[friendIndex].colourB);
  p.triangle(

    particlesArray[friendIndex].xMoving + xBorderShifter + ((particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom) / (particlesArray[friendIndex].givenTo + particlesArray[friendIndex].receivedFrom) * 28 - 5) * bannerTransformer,
    particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 22 * bannerTransformer,

    particlesArray[friendIndex].xMoving + xBorderShifter + ((particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom) / (particlesArray[friendIndex].givenTo + particlesArray[friendIndex].receivedFrom) * 28 + 5) * bannerTransformer,
    particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 22 * bannerTransformer,

    particlesArray[friendIndex].xMoving + xBorderShifter + (particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom) / (particlesArray[friendIndex].givenTo + particlesArray[friendIndex].receivedFrom) * 28 * bannerTransformer,
    particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 17 * bannerTransformer
  )

  // you ball
  p.noStroke();
  if (!friendIndex) {
    p.fill(particlesArray[friendIndex].colourR, particlesArray[friendIndex].colourG, particlesArray[friendIndex].colourB)
  } else { p.fill(180, 180, 180) }
  p.ellipse(
    particlesArray[friendIndex].xMoving + xBorderShifter - rectWidth * 0.5 + 12 * bannerTransformer,
    particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 17 * bannerTransformer,
    15 * bannerTransformer,
    15 * bannerTransformer);
  // friend ball
  if (friendIndex) {
    p.fill(particlesArray[friendIndex].colourR, particlesArray[friendIndex].colourG, particlesArray[friendIndex].colourB)
    p.ellipse(
      particlesArray[friendIndex].xMoving + xBorderShifter + rectWidth * 0.5 - 12 * bannerTransformer,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 17 * bannerTransformer,
      15 * bannerTransformer,
      15 * bannerTransformer);

  } else { // network area icon
    p.fill(250, 216, 140)
    p.ellipse(
      particlesArray[friendIndex].xMoving + xBorderShifter + rectWidth * 0.5 - 12 * bannerTransformer,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 17 * bannerTransformer,
      15 * bannerTransformer,
      15 * bannerTransformer);
    p.fill(241, 184, 88)
    p.ellipse(
      particlesArray[friendIndex].xMoving + xBorderShifter + rectWidth * 0.5 - 12 * bannerTransformer,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 17 * bannerTransformer,
      8 * bannerTransformer,
      8 * bannerTransformer);
  }
  // 'YOU'
  p.fill(10, 10, 10);
  p.textSize(10 * bannerTransformer)
  p.textAlign(p.CENTER);
  p.textFont(amaticFont);
  p.text("you", particlesArray[friendIndex].xMoving + xBorderShifter - rectWidth * 0.5 + 12 * bannerTransformer,
    particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 25 * bannerTransformer)
  // 'friend'
  if (friendIndex) {
    p.text("friend", particlesArray[friendIndex].xMoving + xBorderShifter + rectWidth * 0.5 - 13 * bannerTransformer,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 25 * bannerTransformer)
  }
  else {
    p.text("network", particlesArray[friendIndex].xMoving + xBorderShifter + rectWidth * 0.5 - 15 * bannerTransformer,
      particlesArray[friendIndex].yMoving + yBorderShifter - 25 * bannerTransformer)
  }

  // given and received to
  p.textAlign(p.LEFT)
  p.text(`given:`,
    particlesArray[friendIndex].xMoving + xBorderShifter - rectWidth * 0.5 + 25 * bannerTransformer,
    particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 40 * bannerTransformer)
  p.text(`received:`,
    particlesArray[friendIndex].xMoving + xBorderShifter - rectWidth * 0.5 + 25 * bannerTransformer,
    particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 31 * bannerTransformer)
  textFont(cabinSketchFont)
  p.textAlign(p.RIGHT)
  p.fill(0, 30, 150);
  p.text(`£${particlesArray[friendIndex].givenTo}`,
    particlesArray[friendIndex].xMoving + xBorderShifter - rectWidth * 0.5 + 70 * bannerTransformer,
    particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 40 * bannerTransformer)
  p.fill(0, 150, 30);
  p.text(`£${particlesArray[friendIndex].receivedFrom}`,
    particlesArray[friendIndex].xMoving + xBorderShifter - rectWidth * 0.5 + 70 * bannerTransformer,
    particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 31 * bannerTransformer)

  // FADER - number
  // display the gauge number
  if (mouseX > particlesArray[friendIndex].xMoving + xBorderShifter - 30 * bannerTransformer &&
    mouseX < particlesArray[friendIndex].xMoving + xBorderShifter + 30 * bannerTransformer &&
    mouseY > particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 22 * bannerTransformer &&
    mouseY < particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 15 * bannerTransformer
  ) {
    // and the rectangle background for the balance number
    p.fill(particlesArray[friendIndex].colourR, particlesArray[friendIndex].colourG, particlesArray[friendIndex].colourB);
    p.rect(
      particlesArray[friendIndex].xMoving + xBorderShifter + ((particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom) / (particlesArray[friendIndex].givenTo + particlesArray[friendIndex].receivedFrom) * 28 - 10) * bannerTransformer,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 30 * bannerTransformer,
      20 * bannerTransformer,
      10 * bannerTransformer,
      2 * bannerTransformer);

    p.fill(255);
    p.textAlign(p.CENTER);
    p.textFont(cabinSketchFont);
    p.textSize(7 * bannerTransformer)
    if (particlesArray[friendIndex].givenTo === particlesArray[friendIndex].receivedFrom && particlesArray[friendIndex].givenTo + particlesArray[friendIndex].receivedFrom) {
      p.text(
        "£ 0",
        particlesArray[friendIndex].xMoving + xBorderShifter + (particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom) / (particlesArray[friendIndex].givenTo + particlesArray[friendIndex].receivedFrom) * 28 * bannerTransformer,
        particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 23 * bannerTransformer
      );
    } else if (particlesArray[friendIndex].givenTo > particlesArray[friendIndex].receivedFrom) {
      p.text(
        "£" + int(particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom) + ">",
        particlesArray[friendIndex].xMoving + xBorderShifter + (particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom) / (particlesArray[friendIndex].givenTo + particlesArray[friendIndex].receivedFrom) * 28 * bannerTransformer,
        particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 23 * bannerTransformer
      );
    } else if (particlesArray[friendIndex].givenTo < particlesArray[friendIndex].receivedFrom) {
      p.text(
        "<£" + -(int(particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom)),
        particlesArray[friendIndex].xMoving + xBorderShifter + (particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom) / (particlesArray[friendIndex].givenTo + particlesArray[friendIndex].receivedFrom) * 28 * bannerTransformer,
        particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 23 * bannerTransformer
      );
    }
  }
}

// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function drawInfoBannerIfHovered(CForFF, p) {
  // CForFF is "CF" or "FF" (you are included in CF)
  particlesArray.forEach(element => {

    if (element.CForFF === CForFF) {
      if (p.dist(p.mouseX, p.mouseY, element.xMoving, element.yMoving) < sizeOfBalls * element.ballSize * transformer) {

        if (element.rayToAttractorOption) {
          drawCarrier(0, element.index, 1, element.colourR, element.colourG, element.colourB, 100, p);
          if (element.givenTo > element.receivedFrom) {
            drawArrow(0, element.index, false, 3, element.colourR, element.colourG, element.colourB, 150, 10, false, p)
          }
          else if (element.givenTo < element.receivedFrom) {
            drawArrow(0, element.index, true, 3, element.colourR, element.colourG, element.colourB, 150, 10, false, p)
          }
          // you ball
          p.fill(particlesArray[0].colourR, particlesArray[0].colourG, particlesArray[0].colourB)
          p.ellipse(
            particlesArray[0].xMoving,
            particlesArray[0].yMoving,
            24 * transformer, 24 * transformer);
        }
        drawInfoBanner(element.index, 10, 10, p);
      }
    }
  })
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function linkCF(p) {
  // LINKS (origin, end, strokeWeight)
  linkBalls(0, 2, 1, p);
  linkBalls(0, 1, 1, p);
  linkBalls(0, 3, 1, p);
  linkBalls(0, 4, 1, p);
  linkBalls(5, 0, 1, p);

  linkBalls(1, 3, 0.75, p);
  linkBalls(1, 5, 0.75, p);
  linkBalls(1, 4, 0.75, p);
  linkBalls(2, 1, 0.75, p);
  linkBalls(2, 1, 0.75, p);
  linkBalls(2, 3, 0.75, p);
  linkBalls(3, 4, 0.75, p);
  linkBalls(3, 5, 0.75, p);
  linkBalls(4, 5, 0.75, p);
  p.noStroke()
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function linkCFtoFF(p) {
  //LINKS CF to FF
  linkBalls(1, 6, 0.5, p);
  linkBalls(1, 7, 0.5, p);
  linkBalls(1, 8, 0.5, p);
  linkBalls(1, 9, 0.5, p);

  linkBalls(2, 6, 0.5, p);
  linkBalls(2, 7, 0.5, p);
  linkBalls(2, 8, 0.5, p);
  linkBalls(2, 9, 0.5, p);

  linkBalls(5, 10, 0.5, p);
  linkBalls(5, 11, 0.5, p);
  linkBalls(5, 12, 0.5, p);

  linkBalls(4, 12, 0.5, p);
  linkBalls(4, 13, 0.5, p);
  linkBalls(4, 14, 0.5, p);

  linkBalls(3, 13, 0.5, p);
  linkBalls(3, 14, 0.5, p);
  linkBalls(3, 15, 0.5, p);
  p.noStroke()
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=   
function linkFFtoFF(p) {
  // LINKS FF to FF
  linkBalls(6, 7, 0.3, p);
  linkBalls(6, 8, 0.3, p);
  linkBalls(6, 9, 0.3, p);
  linkBalls(7, 6, 0.3, p);
  linkBalls(7, 8, 0.3, p);
  linkBalls(7, 9, 0.3, p);
  linkBalls(8, 9, 0.3, p);
  linkBalls(11, 12, 0.3, p);
  linkBalls(12, 13, 0.3, p);
  linkBalls(12, 14, 0.3, p);
  linkBalls(12, 15, 0.3, p);
  linkBalls(13, 14, 0.3, p);
  linkBalls(13, 15, 0.3, p);
  linkBalls(14, 15, 0.3, p);
  p.noStroke()
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function textDisplayer(firstLineToShow, secondLineToShow, p) {
  p.fill(241, 184, 88, 230)
  p.rect((55), (canvasHeight - 10) * transformer, 300 * transformer, -40 * transformer, 10 * transformer)

  p.textFont(josefinFont)
  p.noStroke()
  p.fill(60, 20, 20)
  p.textSize(14 * transformer)
  p.textAlign(p.CENTER);
  if (!secondLineToShow) {
    p.text(firstLineToShow, 267 - 25, (canvasHeight - 25) * transformer)
  } else {
    p.text(firstLineToShow, 267 - 25, (canvasHeight - 33) * transformer)
    p.text(secondLineToShow, 267 - 25, (canvasHeight - 18) * transformer)
  }
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function mouseClicked(p) {
  particlesArray.forEach(element => {
    if (p.dist(p.mouseX, p.mouseY, element.xMoving, element.yMoving) < sizeOfBalls * element.ballSize * transformer) {
      element.thisInfoBannerOn = true;
      // switching every other banner off
      particlesArray.forEach(element2 => {
        if (element.index !== element2.index) {
          element2.thisInfoBannerOn = false;
        }
      })
    } else {
      particlesArray.forEach(element2 => {
        element.thisInfoBannerOn = false;
      })
    }
  })
}
// ---
function keyPressed(p) {
  if (p.keyCode === p.LEFT_ARROW) {
    step--;
  } else if (p.keyCode === p.RIGHT_ARROW) {
    step++;
  }
  return false; // prevent default
}

var myp5 = new p5(main, 'c1')


