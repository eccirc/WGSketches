const speedOfScript = 50; // based on frames (so 60 > 1 sec)
const transformer = 0.85 // 2 is what's on the current desktop mode iframe // 0.5 300,160
const bannerTransformer = 2.5;
const sizeOfBalls = 10;
const sideShifter = -35;
const verticalShifter = -13;

// real canvas is these ones
const widthForSetup = 310;
const heightForSetup = 300;

const canvasWidth = 450;
const canvasHeight = 360;
let CFareaAlpha = 0;
let FFareaAlpha = 0;

const indices = false;
let layerButtonSwitch = false;
let linesOn = true;
let picsOn = false;

const sizeOfMovement = 6;

let amaticFont;
let josefinsFont;
let cabinSketchFont;

// infoBanner
const allInfoBannersOn = false;
const rectWidth = 100 * bannerTransformer;
const rectHeight = 45 * bannerTransformer;
let verticalBannerShifter = 0;

// <---- arrow stuff
const sizeOfArrow = 12 * transformer;
let arrowSpeedFFslower;

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
    colourR: 0,
    colourG: 180,
    colourB: 70,
    givenTo: 91,
    receivedFrom: 200,
    rayToAttractorOption: false,
    links: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    index: 1,
    name: "Festus",
    CForFF: "CF",
    originalX: 185,
    originalY: 135,
    x: 160,
    y: 170,
    finalX: 185,
    finalY: 135,
    pulsing: 1.5,
    sizeOfMovementX: 5,
    sizeOfMovementY: 5,
    ballSize: 1,
    colourR: 0,
    colourG: 180,
    colourB: 50,
    thisInfoBannerOn: false,
    givenTo: 21,
    receivedFrom: 10,
    rayToAttractorOption: false,
    links: [0, 2, 10, 11, 12, 13, 14]
  },
  {
    index: 2,
    name: "Michael",
    CForFF: "CF",
    originalX: 250,
    originalY: 120,
    x: 175,
    y: 135,
    finalX: 250,
    finalY: 120,
    pulsing: 1.5,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballSize: 1,
    colourR: 0,
    colourG: 180,
    colourB: 50,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 20,
    rayToAttractorOption: false,
    links: [0, 1, 4, 13, 14, 15, 16]
  },
  {
    index: 3,
    name: "Adham",
    CForFF: "CF",
    originalX: 250,
    originalY: 120,
    x: 200,
    y: 115,
    finalX: 250,
    finalY: 120,
    pulsing: 1.5,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballSize: 1,
    colourR: 0,
    colourG: 180,
    colourB: 50,
    thisInfoBannerOn: false,
    givenTo: 16,
    receivedFrom: 14,
    rayToAttractorOption: false,
    links: [0]
  },
  {
    index: 4,
    name: "Amber",
    CForFF: "CF",
    originalX: 180,
    originalY: 215,
    x: 235,
    y: 115,
    finalX: 170,
    finalY: 210,
    pulsing: 1.5,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballSize: 1,
    colourR: 0,
    colourG: 180,
    colourB: 50,
    thisInfoBannerOn: false,
    givenTo: 15,
    receivedFrom: 18,
    rayToAttractorOption: false,
    links: [0, 2, 5]
  },
  {
    index: 5,
    name: "Meghan",
    CForFF: "CF",
    originalX: 250,
    originalY: 230,
    x: 270,
    y: 135,
    finalX: 250,
    finalY: 230,
    pulsing: 1.25,
    sizeOfMovementX: 2,
    sizeOfMovementY: 3,
    ballSize: 1,
    colourR: 0,
    colourG: 180,
    colourB: 50,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 10,
    rayToAttractorOption: false,
    links: [0, 4, 6, 17, 18, 19, 20]
  },
  {
    index: 6,
    name: "Simone",
    CForFF: "CF",
    originalX: 285,
    originalY: 170,
    x: 290,
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
    receivedFrom: 4,
    rayToAttractorOption: false,
    links: [0, 5, 7, 18, 20, 21, 22, 23]
  },
  {
    index: 7,
    name: "Matt",
    CForFF: "CF",
    x: 285,
    y: 200,
    pulsing: 1.7,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 5,
    receivedFrom: 7,
    rayToAttractorOption: false,
    links: [0, 6, 8, 9, 23, 24, 25]
  },
  {
    index: 8,
    name: "Petra",
    CForFF: "CF",
    x: 270,
    y: 225,
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
    rayToAttractorOption: false,
    links: [0, 7, 23, 24, 26]
  },
  {
    index: 9,
    name: "Chloe",
    CForFF: "CF",
    x: 230,
    y: 235,
    pulsing: 1.5,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 14,
    receivedFrom: 11,
    rayToAttractorOption: false,
    links: [0, 7, 10, 11, 27]
  },
  {
    index: 10,
    name: "Robin",
    CForFF: "CF",
    x: 190,
    y: 230,
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
    receivedFrom: 10,
    rayToAttractorOption: false,
    links: [0, 1, 9, 10, 28, 29, 30, 31]
  },
  {
    index: 11,
    name: "Steve",
    CForFF: "CF",
    x: 170,
    y: 205,
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
    receivedFrom: 4,
    rayToAttractorOption: false,
    links: [0, 9, 1, 28, 29, 30, 31, 32]
  },
  {
    index: 12,
    name: "Salva",
    CForFF: "FF",
    x: 100,
    y: 175,
    pulsing: 2,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 10,
    receivedFrom: 0,
    rayToAttractorOption: false,
    links: [1]
  },
  {
    index: 13,
    name: "Sarah",
    CForFF: "FF",
    x: 110,
    y: 140,
    pulsing: 1.3,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 7,
    receivedFrom: 11,
    rayToAttractorOption: false,
    links: [1, 2, 14, 15, 16]
  },
  {
    index: 14,
    name: "Laura",
    CForFF: "FF",
    x: 110,
    y: 100,
    pulsing: 1.2,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 3,
    receivedFrom: 0,
    rayToAttractorOption: false,
    links: [1, 2, 13, 15, 16]
  },
  {
    index: 15,
    name: "Jamie",
    CForFF: "FF",
    x: 140,
    y: 70,
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
    receivedFrom: 7,
    rayToAttractorOption: false,
    links: [2, 13, 14]
  },
  {
    index: 16,
    name: "Gorka",
    CForFF: "FF",
    x: 180,
    y: 70,
    pulsing: 1,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 180,
    colourB: 170,
    thisInfoBannerOn: false,
    givenTo: 12,
    receivedFrom: 13,
    rayToAttractorOption: false,
    links: [2, 13, 14]
  },
  {
    index: 17,
    name: "Doug",
    CForFF: "FF",
    x: 270,
    y: 80,
    pulsing: 1,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 180,
    colourB: 0,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 6,
    rayToAttractorOption: false,
    links: [5, 18, 19, 20]
  },
  {
    index: 18,
    name: "Jason",
    CForFF: "FF",
    x: 310,
    y: 65,
    pulsing: 1.1,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 80,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 10,
    receivedFrom: 1,
    rayToAttractorOption: false,
    links: [5, 6, 17, 19, 20]
  },
  {
    index: 19,
    name: "Jodie",
    CForFF: "FF",
    x: 340,
    y: 85,
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
    rayToAttractorOption: false,
    links: [5, 17, 18, 20, 21, 22]
  },
  {
    index: 20,
    name: "Matina",
    CForFF: "FF",
    x: 320,
    y: 115,
    pulsing: 1.2,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 100,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 15,
    receivedFrom: 4,
    rayToAttractorOption: false,
    links: [5, 6, 17, 18, 19, 21, 22]
  },
  {
    index: 21,
    name: "Felipe",
    CForFF: "FF",
    x: 355,
    y: 120,
    pulsing: 1,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 50,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 9,
    receivedFrom: 0,
    rayToAttractorOption: false,
    links: [6, 19, 20, 22]
  },
  {
    index: 22,
    name: "Mikaela",
    CForFF: "FF",
    x: 340,
    y: 155,
    pulsing: 1.4,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 6,
    receivedFrom: 6,
    rayToAttractorOption: false,
    links: [6, 19, 20, 21]
  },
  {
    index: 23,
    name: "Renata",
    CForFF: "FF",
    x: 330,
    y: 190,
    pulsing: 1.2,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 180,
    colourB: 120,
    thisInfoBannerOn: false,
    givenTo: 4,
    receivedFrom: 14,
    rayToAttractorOption: false,
    links: [6, 7, 8, 24, 25, 26]
  },
  {
    index: 24,
    name: "Matthew",
    CForFF: "FF",
    x: 325,
    y: 225,
    pulsing: 1.1,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 180,
    colourB: 140,
    thisInfoBannerOn: false,
    givenTo: 4,
    receivedFrom: 6,
    rayToAttractorOption: false,
    links: [7, 8, 23, 25, 26]
  },
  {
    index: 25,
    name: "Maryam",
    CForFF: "FF",
    x: 365,
    y: 230,
    pulsing: 1.3,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 80,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 11,
    receivedFrom: 2,
    rayToAttractorOption: false,
    links: [7, 23, 24]
  },
  {
    index: 26,
    name: "Aferia",
    CForFF: "FF",
    x: 340,
    y: 255,
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
    rayToAttractorOption: false,
    links: [8, 23, 24]
  },
  {
    index: 27,
    name: "Phil",
    CForFF: "FF",
    x: 240,
    y: 290,
    pulsing: 1.2,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 50,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 8,
    receivedFrom: 0,
    rayToAttractorOption: false,
    links: [9]
  },
  {
    index: 28,
    name: "Lola",
    CForFF: "FF",
    x: 160,
    y: 270,
    pulsing: 1.4,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 150,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 18,
    receivedFrom: 15,
    rayToAttractorOption: false,
    links: [10, 11, 29, 30, 31]
  },
  {
    index: 29,
    name: "Christos",
    CForFF: "FF",
    x: 130,
    y: 240,
    pulsing: 1.3,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 140,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 12,
    receivedFrom: 7,
    rayToAttractorOption: false,
    links: [10, 11, 28, 30, 31, 32]
  },
  {
    index: 30,
    name: "Flavio",
    CForFF: "FF",
    x: 110,
    y: 270,
    pulsing: 1.2,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 130,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 11,
    receivedFrom: 4,
    rayToAttractorOption: false,
    links: [10, 11, 28, 29, 31]
  },
  {
    index: 31,
    name: "Tiago",
    CForFF: "FF",
    x: 80,
    y: 230,
    pulsing: 1,
    sizeOfMovementX: 3,
    sizeOfMovementY: 3,
    ballFinalSize: 1,
    ballSize: 1,
    colourR: 0,
    colourG: 180,
    colourB: 150,
    thisInfoBannerOn: false,
    givenTo: 4,
    receivedFrom: 8,
    rayToAttractorOption: false,
    links: [10, 11, 28, 29, 30, 32]
  },
  {
    index: 32,
    name: "Dorotea",
    CForFF: "FF",
    x: 110,
    y: 210,
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
    rayToAttractorOption: false,
    links: [11, 29, 31]
  },
];


var main = (p) => {

  // -------------------------------------------------------
  p.preload = () => {
    amaticFont = p.loadFont('AmaticSC-Regular.ttf');
    josefinFont = p.loadFont('JosefinSans-Regular.ttf')
    cabinSketchFont = p.loadFont('CabinSketch-Regular.ttf')

    particlesArray[0].pic = p.loadImage("pics/Celina.png")
    particlesArray[1].pic = p.loadImage("pics/Festus.png")
    particlesArray[2].pic = p.loadImage("pics/Michael.png")
    particlesArray[3].pic = p.loadImage("pics/Ahmed.png")
    particlesArray[4].pic = p.loadImage("pics/Amber.png")

    particlesArray[5].pic = p.loadImage("pics/Meghan.png")
    particlesArray[6].pic = p.loadImage("pics/Simone.png")
    particlesArray[7].pic = p.loadImage("pics/Matt.png")
    particlesArray[8].pic = p.loadImage("pics/Petra.png")
    particlesArray[9].pic = p.loadImage("pics/Chloe.png")

    particlesArray[10].pic = p.loadImage("pics/Robin.png")
    particlesArray[11].pic = p.loadImage("pics/Steve.png")
    particlesArray[12].pic = p.loadImage("pics/Salva.png")
    particlesArray[13].pic = p.loadImage("pics/Timea.png")
    particlesArray[14].pic = p.loadImage("pics/Elizabeth.png")
    particlesArray[15].pic = p.loadImage("pics/Jane.png")
    particlesArray[16].pic = p.loadImage("pics/Ron.png")
    particlesArray[17].pic = p.loadImage("pics/Doug.png")
    particlesArray[18].pic = p.loadImage("pics/Jason.png")
    particlesArray[19].pic = p.loadImage("pics/Jodie.png")
    particlesArray[20].pic = p.loadImage("pics/Matina.png")
    particlesArray[21].pic = p.loadImage("pics/Mask.png")
    particlesArray[22].pic = p.loadImage("pics/Deirdree.png")
    particlesArray[23].pic = p.loadImage("pics/Renata.png")
    particlesArray[24].pic = p.loadImage("pics/Samuel.png")
    particlesArray[25].pic = p.loadImage("pics/phoner.png")
    particlesArray[26].pic = p.loadImage("pics/glasses-rim.png")
    particlesArray[27].pic = p.loadImage("pics/Phil.png")
    particlesArray[28].pic = p.loadImage("pics/Michela.png")
    particlesArray[29].pic = p.loadImage("pics/christos.png")
    particlesArray[30].pic = p.loadImage("pics/red-cap.png")
    particlesArray[31].pic = p.loadImage("pics/blue-cap.png")
    particlesArray[32].pic = p.loadImage("pics/goggles.png")

  }

  p.mouseClicked = () => {
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

    // layer button stuff
    if (layerButtonSwitch) {
      // activate lines
      if (p.dist(p.mouseX, p.mouseY, 40 * transformer, 150 * transformer) < 20 * transformer && linesOn) { linesOn = false }
      else if (p.dist(p.mouseX, p.mouseY, 40 * transformer, 150 * transformer) < 20 * transformer && !linesOn) { linesOn = true }

      // activate pics
      if (p.dist(p.mouseX, p.mouseY, 95 * transformer, 150 * transformer) < 20 * transformer && picsOn) { picsOn = false }
      else if (p.dist(p.mouseX, p.mouseY, 95 * transformer, 150 * transformer) < 20 * transformer && !picsOn) { picsOn = true }
      // deactivate by clicking outside
      else if (p.dist(p.mouseX, p.mouseY, 40 * transformer, 150 * transformer) > 50 * transformer && layerButtonSwitch) { layerButtonSwitch = false }
    }
    // switch it on
    else if (!layerButtonSwitch) {
      if (p.dist(p.mouseX, p.mouseY, 40 * transformer, 140 * transformer) < 20 * transformer && !layerButtonSwitch) { layerButtonSwitch = true }
    }
  }


  p.setup = () => {
    p.frameRate(60)
    p.createCanvas(widthForSetup, heightForSetup);

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
    particlesArray[0].colourB = 140
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

    // Far Friends AREA
    p.noStroke();
    p.fill(250, 216, 140);
    p.ellipse((canvasWidth * 0.5 * transformer) + sideShifter, (canvasHeight * 0.5 * transformer) + verticalShifter, canvasWidth * 0.8 * transformer, canvasWidth * 0.7 * transformer);

    // Close Friends  AREA
    p.fill(241, 184, 88);
    p.ellipse((canvasWidth * 0.5 * transformer) + sideShifter, (canvasHeight * 0.5 * transformer) + verticalShifter, canvasWidth * 0.4 * transformer, canvasWidth * 0.35 * transformer);

    // links and balls
    if (linesOn) {
      linkCF(p)
      linkCFtoFF(p)
      linkFFtoFF(p)
    }

    particlesArray.forEach(element => {
      drawLinesWhenHoveredOver(element, p)

    })
    particlesArray.forEach(element => {
      createBall(element, p)
    })
    particlesArray.forEach(element => {
      drawFacesHalfLitWhenHoveredOver(element, p)
    })

    // 'YOU'
    p.fill(10, 10, 10);
    p.textSize(23 * transformer)
    p.textAlign(p.CENTER);
    p.textFont(amaticFont);
    p.text("Celina", particlesArray[0].xMoving, particlesArray[0].yMoving + 30 * transformer)


    p.noStroke();
    if (layerButtonSwitch) {
      drawLayerSwitch(p)
    }
    else {
      p.fill(0, 140)
      p.ellipse(38 * transformer, 140 * transformer, 60 * transformer, 50 * transformer)
      p.fill(255, 100)
      p.beginShape()
      p.vertex(32 * transformer, 128 * transformer)
      p.vertex(52 * transformer, 128 * transformer)
      p.vertex(42 * transformer, 136 * transformer)
      p.vertex(22 * transformer, 136 * transformer)
      p.endShape()
      p.fill(255, 160)
      p.beginShape()
      p.vertex(32 * transformer, 134 * transformer)
      p.vertex(52 * transformer, 134 * transformer)
      p.vertex(42 * transformer, 142 * transformer)
      p.vertex(22 * transformer, 142 * transformer)
      p.endShape()
      p.fill(255, 220)
      p.beginShape()
      p.vertex(32 * transformer, 140 * transformer)
      p.vertex(52 * transformer, 140 * transformer)
      p.vertex(42 * transformer, 148 * transformer)
      p.vertex(22 * transformer, 148 * transformer)
      p.endShape()
    }

    // INFO BANNERS bring on the info banners
    particlesArray.forEach(element => {
      if (element.thisInfoBannerOn) {
        drawInfoBanner(element.index, p)
      }
    })

  }



}





// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function drawLayerSwitch(p) {
  p.fill(0, 140)
  p.ellipse(70 * transformer, 150 * transformer, 130 * transformer, 70 * transformer)
  // LINES SWITCH(top left)
  if (linesOn) {
    p.stroke(200)
    p.strokeWeight(transformer);
    p.fill(255);
  } else if (!linesOn) {
    p.strokeWeight(transformer);
    p.stroke(255, 50);
    p.fill(255, 50);
  }
  p.line(25 * transformer, 150 * transformer, 50 * transformer, 135 * transformer)
  p.line(25 * transformer, 150 * transformer, 55 * transformer, 165 * transformer)
  p.line(50 * transformer, 135 * transformer, 55 * transformer, 165 * transformer)
  p.noStroke()
  p.ellipse(25 * transformer, 150 * transformer, 17 * transformer, 17 * transformer)
  p.ellipse(50 * transformer, 135 * transformer, 13 * transformer, 13 * transformer)
  p.ellipse(55 * transformer, 165 * transformer, 15 * transformer, 15 * transformer)

  // FACES Switch ("p")
  p.fill(200, 50);
  p.noStroke();
  p.fill(255, 50)
  p.ellipse(95 * transformer, 145 * transformer, 30 * transformer, 30 * transformer)

  if (picsOn) {
    p.fill(200);
    p.noStroke();
    p.fill(255)

  } else if (!picsOn) {
    p.fill(200, 50);
    p.noStroke();
    p.fill(255, 50)
  }
  p.ellipse(95 * transformer, 140 * transformer, 15 * transformer, 15 * transformer)
  p.beginShape()
  p.curveVertex(83 * transformer, 153 * transformer)
  p.curveVertex(83 * transformer, 153 * transformer)
  p.curveVertex(90 * transformer, 158 * transformer)
  p.curveVertex(100 * transformer, 158 * transformer)
  p.curveVertex(107 * transformer, 153 * transformer)
  p.curveVertex(107 * transformer, 153 * transformer)
  p.endShape()
  p.beginShape()
  p.curveVertex(83 * transformer, 153 * transformer)
  p.curveVertex(83 * transformer, 153 * transformer)
  p.curveVertex(90 * transformer, 149 * transformer)
  p.curveVertex(100 * transformer, 149 * transformer)
  p.curveVertex(107 * transformer, 153 * transformer)
  p.curveVertex(107 * transformer, 153 * transformer)
  p.endShape()

  p.text("name", 95 * transformer, 172 * transformer)

}

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
    // textFont("Lucida")
    p.text(ballObject.index, ballObject.xMoving - 10, ballObject.yMoving - 15)
  }

  // your pic
  if (ballObject.index === 0 && !ballObject.thisInfoBannerOn) {
    p.image(ballObject.pic, ballObject.xMoving - (sizeOfBalls * transformer * 1.8 * ballObject.ballSize) * 0.5, ballObject.yMoving - (sizeOfBalls * transformer * 1.8 * ballObject.ballSize) * 0.5, sizeOfBalls * transformer * 1.8 * ballObject.ballSize, sizeOfBalls * transformer * 1.8 * ballObject.ballSize)
  }

  // other pics (if ON)
  if (picsOn) {
    p.image(ballObject.pic, ballObject.xMoving - (sizeOfBalls * transformer * 1.8 * ballObject.ballSize) * 0.5, ballObject.yMoving - (sizeOfBalls * transformer * 1.8 * ballObject.ballSize) * 0.5, sizeOfBalls * transformer * 1.8 * ballObject.ballSize, sizeOfBalls * transformer * 1.8 * ballObject.ballSize)

    p.fill(0);
    p.textAlign(p.CENTER)
    p.textFont(amaticFont)
    p.textSize(18 * transformer)
    // textFont("Amatic")
    if (ballObject.index !== 0) { p.text(ballObject.name, ballObject.xMoving, ballObject.yMoving + 20 * transformer) }
  }

  // HOVERING OVER - FACE and NAME
  if (p.dist(p.mouseX, p.mouseY, ballObject.xMoving, ballObject.yMoving) < 10 * transformer && !ballObject.thisInfoBannerOn && !picsOn) {
    p.image(ballObject.pic, ballObject.xMoving - (sizeOfBalls * transformer * 1.8 * ballObject.ballSize) * 0.5, ballObject.yMoving - (sizeOfBalls * transformer * 1.8 * ballObject.ballSize) * 0.5, sizeOfBalls * transformer * 1.8 * ballObject.ballSize, sizeOfBalls * transformer * 1.8 * ballObject.ballSize)
    p.fill(0);
    p.textAlign(p.CENTER)
    p.textFont(amaticFont)
    p.textSize(21 * transformer)
    if (ballObject.index !== 0) { p.text(ballObject.name, ballObject.xMoving, ballObject.yMoving + 23 * transformer) }
  }
}

// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-     // HOVERING OVER - LINES
function drawLinesWhenHoveredOver(ballObject, p) {
  if (p.dist(p.mouseX, p.mouseY, ballObject.xMoving, ballObject.yMoving) < 10 * transformer) {
    ballObject.links.forEach(element => {
      p.stroke(0)
      p.strokeWeight(transformer)
      p.line(ballObject.xMoving, ballObject.yMoving, particlesArray[element].xMoving, particlesArray[element].yMoving)
      p.noStroke()
    })
  }
}

// draw FACES HALF LIT
function drawFacesHalfLitWhenHoveredOver(ballObject, p) {
  if (p.dist(p.mouseX, p.mouseY, ballObject.xMoving, ballObject.yMoving) < 10 * transformer) {

    // tint (255, 150)
    ballObject.links.forEach(element => {
      p.image(particlesArray[element].pic, particlesArray[element].xMoving - (sizeOfBalls * transformer * 1.8 * particlesArray[element].ballSize) * 0.5, particlesArray[element].yMoving - (sizeOfBalls * transformer * 1.8 * particlesArray[element].ballSize) * 0.5,
        sizeOfBalls * transformer * 1.8 * particlesArray[element].ballSize,
        sizeOfBalls * transformer * 1.8 * particlesArray[element].ballSize)
    })
    // tint (255)
  }
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function drawCarrier(origin, end, width, colourR, colourG, colourB, transparency, p) {
  p.stroke(colourR, colourG, colourB, transparency)
  p.strokeWeight(width)

  p.line(particlesArray[origin].xMoving, particlesArray[origin].yMoving, particlesArray[end].xMoving, particlesArray[end].yMoving)
  p.noStroke();
  p.noFill();

  // and celina's face
  if (!particlesArray[0].thisInfoBannerOn) {
    p.image(particlesArray[0].pic, particlesArray[0].xMoving - (sizeOfBalls * transformer * 1.8 * particlesArray[0].ballSize) * 0.5, particlesArray[0].yMoving - (sizeOfBalls * transformer * 1.8 * particlesArray[0].ballSize) * 0.5, sizeOfBalls * transformer * 1.8 * particlesArray[0].ballSize, sizeOfBalls * transformer * 1.8 * particlesArray[0].ballSize)
  }
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function drawArrow(origin, end, arrowDirection, arrowSpeed, colourR, colourG, colourB, transparency, p) {
  if (origin) {
    // change the speed if it's a far friend
    if (p.dist(particlesArray[origin].xMoving, particlesArray[origin].yMoving, particlesArray[end].xMoving, particlesArray[end].yMoving) > 100 * transformer) {
      arrowSpeedFFslower = 0.5
    } else { arrowSpeedFFslower = 1 }

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
      arrowCarrier -= 0.004 * arrowSpeed * arrowSpeedFFslower;
    }
    // if close to the BEGINNING end of the trajectory
    else if ((arrowCarrier < arrowCarrierBeginning + arrowCarrierMargin) && (arrowCarrier > arrowCarrierBeginning)) {
      // colour of the arrow
      p.noStroke();
      p.fill(colourR, colourG, colourB, p.map(arrowCarrier, arrowCarrierBeginning, arrowCarrierBeginning + arrowCarrierMargin, 0, transparency));
      // speed of the arrow
      arrowCarrier -= 0.0045 * arrowSpeed * arrowSpeedFFslower;
    }
    // anywhere in the middle
    else {
      // speed of the arrow
      arrowCarrier -= 0.004 * arrowSpeed * arrowSpeedFFslower;
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

    p.noFill()
    p.noTint()
  }
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
  p.textAlign(p.CENTER);
  p.textFont(amaticFont);
  p.textSize(25 * transformer);
  p.text(actualMessage, particlesArray[indexRequesting].xMoving + 25 * transformer, particlesArray[indexRequesting].yMoving - 7 * transformer)
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function drawInfoBanner(friendIndex, p) {

  // drawCarrier (origin, end, width, colourR, colourG, colourB, transparency) 
  drawCarrier(friendIndex, 0, 20 * transformer, 0, particlesArray[friendIndex].colourG, particlesArray[friendIndex].colourB, 100, p)

  // drawArrow (origin, end, arrowDirection, arrowSpeed, colourR, colourG, colourB, transparency, howMuch)
  if (particlesArray[friendIndex].givenTo > particlesArray[friendIndex].receivedFrom) {
    drawArrow(friendIndex, 0, true, 1, 0, particlesArray[friendIndex].colourG, particlesArray[friendIndex].colourB, 100, p)
  } else if (particlesArray[friendIndex].givenTo < particlesArray[friendIndex].receivedFrom) {
    drawArrow(friendIndex, 0, false, 1, 0, particlesArray[friendIndex].colourG, particlesArray[friendIndex].colourB, 100, p)
  }

  let xBorderShifter = 0;
  let yBorderShifter = 0;

  // side borders
  // left
  if (particlesArray[friendIndex].xMoving < rectWidth * 0.52) {
    xBorderShifter = rectWidth * 0.52 - particlesArray[friendIndex].xMoving
  }
  // right
  else if (particlesArray[friendIndex].xMoving > (widthForSetup - rectWidth * 0.52)) {
    xBorderShifter = widthForSetup - rectWidth * 0.52 - particlesArray[friendIndex].xMoving
  }
  // top border
  if (particlesArray[friendIndex].yMoving < rectHeight * 1.15) {
    yBorderShifter = rectHeight * 1.15 - particlesArray[friendIndex].yMoving
  }
  // bottom border
  else if (particlesArray[friendIndex].yMoving > (63 + heightForSetup - rectHeight * 1.5)) {
    yBorderShifter = 63 + heightForSetup - rectHeight * 1.5 - particlesArray[friendIndex].yMoving
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
  for (let i = 0; i < p.int(35 * bannerTransformer); i++) {
    p.stroke(0, 180,
      p.int(p.map(i, 0, p.int(35 * bannerTransformer), 0, 180)), 150);
    p.line(
      particlesArray[friendIndex].xMoving + xBorderShifter - 34 * bannerTransformer + i,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 18 * bannerTransformer,
      particlesArray[friendIndex].xMoving + xBorderShifter - 34 * bannerTransformer + i,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 15 * bannerTransformer);
  }
  // turquoise to blue
  for (let i = 0; i < p.int(35 * bannerTransformer); i++) {
    p.stroke(
      0,
      p.int(p.map(i, 0, p.int(35 * bannerTransformer), 180, 50)), 180, 150);
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
  p.image(particlesArray[0].pic,
    particlesArray[friendIndex].xMoving + xBorderShifter - rectWidth * 0.5 + 12 * bannerTransformer - bannerTransformer * 7.5,
    particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 17 * bannerTransformer - bannerTransformer * 7.5,
    15 * bannerTransformer,
    15 * bannerTransformer);

  // friend ball
  if (friendIndex) {
    p.fill(particlesArray[friendIndex].colourR, particlesArray[friendIndex].colourG, particlesArray[friendIndex].colourB)
    p.image(particlesArray[friendIndex].pic,
      particlesArray[friendIndex].xMoving + xBorderShifter + rectWidth * 0.5 - 12 * bannerTransformer - bannerTransformer * 7.5,
      particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 17 * bannerTransformer - bannerTransformer * 7.5,
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
  p.textSize(9 * bannerTransformer)
  p.textAlign(p.RIGHT);
  p.textFont(amaticFont);
  p.text("Celina", particlesArray[friendIndex].xMoving + xBorderShifter - rectWidth * 0.5 + 20 * bannerTransformer,
    particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 25 * bannerTransformer)
  // 'friend'
  p.textAlign(p.CENTER)
  if (friendIndex) {
    p.text(particlesArray[friendIndex].name, particlesArray[friendIndex].xMoving + xBorderShifter + rectWidth * 0.5 - 13 * bannerTransformer,
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
  p.textFont(cabinSketchFont)
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
  if (p.mouseX > particlesArray[friendIndex].xMoving + xBorderShifter - 30 * bannerTransformer &&
    p.mouseX < particlesArray[friendIndex].xMoving + xBorderShifter + 30 * bannerTransformer &&
    p.mouseY > particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 22 * bannerTransformer &&
    p.mouseY < particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 15 * bannerTransformer
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
        "£" + p.int(particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom) + ">",
        particlesArray[friendIndex].xMoving + xBorderShifter + (particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom) / (particlesArray[friendIndex].givenTo + particlesArray[friendIndex].receivedFrom) * 28 * bannerTransformer,
        particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 23 * bannerTransformer
      );
    } else if (particlesArray[friendIndex].givenTo < particlesArray[friendIndex].receivedFrom) {
      p.text(
        "<£" + -(p.int(particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom)),
        particlesArray[friendIndex].xMoving + xBorderShifter + (particlesArray[friendIndex].givenTo - particlesArray[friendIndex].receivedFrom) / (particlesArray[friendIndex].givenTo + particlesArray[friendIndex].receivedFrom) * 28 * bannerTransformer,
        particlesArray[friendIndex].yMoving + yBorderShifter + verticalBannerShifter - 23 * bannerTransformer
      );
    }
  }
}
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
        drawInfoBanner(element.index, p);
      }
    }
  })
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function linkCF(p) {
  // LINKS (origin, end, strokeWeight)
  linkBalls(0, 2, 1, p);
  linkBalls(0, 1, 1, p);
  linkBalls(0, 3, 1, p);
  linkBalls(0, 4, 1, p);
  linkBalls(0, 5, 1, p);
  linkBalls(0, 6, 1, p);
  linkBalls(0, 7, 1, p);
  linkBalls(0, 8, 1, p);
  linkBalls(0, 9, 1, p);
  linkBalls(0, 10, 1, p);
  linkBalls(0, 11, 1, p);

  // CF to CF
  linkBalls(1, 2, 0.9, p);
  linkBalls(2, 4, 0.9, p);
  linkBalls(4, 5, 0.9, p);
  linkBalls(5, 6, 0.9, p);
  linkBalls(6, 7, 0.9, p);
  linkBalls(7, 8, 0.9, p);
  linkBalls(7, 9, 0.9, p);
  linkBalls(9, 10, 0.9, p);
  linkBalls(9, 11, 0.9, p);
  linkBalls(10, 1, 0.9, p);

  p.noStroke()
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function linkCFtoFF(p) {
  // festus
  linkBalls(1, 11, 0.5, p);
  linkBalls(1, 12, 0.5, p);
  linkBalls(1, 13, 0.5, p);
  linkBalls(1, 14, 0.5, p);
  // michael
  linkBalls(2, 13, 0.5, p);
  linkBalls(2, 14, 0.5, p);
  linkBalls(2, 15, 0.5, p);
  linkBalls(2, 16, 0.5, p);
  // meghan
  linkBalls(5, 17, 0.5, p);
  linkBalls(5, 18, 0.5, p);
  linkBalls(5, 19, 0.5, p);
  linkBalls(5, 20, 0.5, p);
  // simone
  linkBalls(6, 18, 0.5, p);
  linkBalls(6, 20, 0.5, p);
  linkBalls(6, 21, 0.5, p);
  linkBalls(6, 22, 0.5, p);
  linkBalls(6, 23, 0.5, p);
  // matt
  linkBalls(7, 23, 0.5, p);
  linkBalls(7, 24, 0.5, p);
  linkBalls(7, 25, 0.5, p);
  linkBalls(7, 23, 0.5, p);
  // petra
  linkBalls(8, 23, 0.5, p);
  linkBalls(8, 24, 0.5, p);
  linkBalls(8, 26, 0.5, p);
  // chloe
  linkBalls(9, 27, 0.5, p);
  // robin
  linkBalls(10, 28, 0.5, p);
  linkBalls(10, 29, 0.5, p);
  linkBalls(10, 30, 0.5, p);
  linkBalls(10, 31, 0.5, p);
  // steve
  linkBalls(11, 28, 0.5, p);
  linkBalls(11, 29, 0.5, p);
  linkBalls(11, 30, 0.5, p);
  linkBalls(11, 31, 0.5, p);
  linkBalls(11, 32, 0.5, p);

  p.noStroke()
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=   
function linkFFtoFF(p) {
  // LINKS FF to FF
  linkBalls(13, 14, 0.3, p);
  linkBalls(13, 15, 0.3, p);
  linkBalls(13, 16, 0.3, p);

  linkBalls(14, 13, 0.3, p);
  linkBalls(14, 15, 0.3, p);
  linkBalls(14, 16, 0.3, p);

  linkBalls(17, 18, 0.3, p);
  linkBalls(17, 19, 0.3, p);
  linkBalls(17, 20, 0.3, p);

  linkBalls(18, 19, 0.3, p);
  linkBalls(18, 20, 0.3, p);

  linkBalls(19, 20, 0.3, p);
  linkBalls(19, 21, 0.3, p);
  linkBalls(19, 22, 0.3, p);

  linkBalls(20, 22, 0.3, p);

  linkBalls(21, 20, 0.3, p);
  linkBalls(21, 22, 0.3, p);

  linkBalls(23, 24, 0.3, p);
  linkBalls(23, 25, 0.3, p);
  linkBalls(23, 26, 0.3, p);

  linkBalls(24, 25, 0.3, p);
  linkBalls(24, 26, 0.3, p);

  linkBalls(28, 29, 0.3, p);
  linkBalls(28, 30, 0.3, p);
  linkBalls(28, 31, 0.3, p);

  linkBalls(29, 30, 0.3, p);
  linkBalls(29, 31, 0.3, p);
  linkBalls(29, 32, 0.3, p);


  linkBalls(31, 30, 0.3, p);
  linkBalls(31, 32, 0.3, p);

  p.noStroke()
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-


var myp5 = new p5(main, 'c1');
