
const speedOfScript = 50; // based on frames (so 60 > 1 sec)
const transformer = 2.2 // 2 is what's on the current desktop mode iframe
const bannerTransformer = 4;
const sizeOfBalls = 10;
const sideShifter = 0;
const verticalShifter = 0;

const canvasWidth = 450;
const canvasHeight = 350;
let CFareaAlpha = 0;
let FFareaAlpha = 0;

let finalBannerAlpha = 0;

const indices = false;

const sizeOfMovement = 6;

let amaticFont;
let josefinsFont;
let cabinSketchFont;

let networkImage;

// infoBanner
const allInfoBannersOn = false;
const rectWidth = 100 * bannerTransformer;
const rectHeight = 45 * bannerTransformer;
let verticalBannerShifter = 0;

// ---- arrow stuff

const sizeOfArrow = 4 * transformer;

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
    originalX: 160,
    originalY: 225,
    x: 160,
    y: 225,
    finalX: canvasWidth * 0.5,
    finalY: canvasHeight * 0.5,
    pulsing: 1.5,
    sizeOfMovementX: 5,
    sizeOfMovementY: 5,
    ballSize: 1.2,
    colourR: 150,
    colourG: 150,
    colourB: 150,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false,
  },
  {
    index: 1,
    CForFF: "CF",
    originalX: 330,
    originalY: 210,
    x: 330,
    y: 210,
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
    originalX: 190,
    originalY: 170,
    x: 190,
    y: 170,
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
    originalX: 250,
    originalY: 245,
    x: 250,
    y: 245,
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
    originalX: 300,
    originalY: 180,
    x: 300,
    y: 180,
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
    originalX: 250,
    originalY: 170,
    x: 250,
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
    ballSize: 0,
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
    ballSize: 0,
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
    ballSize: 0,
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
    ballSize: 0,
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
    ballSize: 0,
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
    ballSize: 0,
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
    ballSize: 0,
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
    ballSize: 0,
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
    ballSize: 0,
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
    ballSize: 0,
    colourR: 180,
    colourG: 180,
    colourB: 180,
    thisInfoBannerOn: false,
    givenTo: 0,
    receivedFrom: 0,
    rayToAttractorOption: false

  }
];

let step = 0;



// -------------------------------------------------------
// -------------------------------------------------------

var main = (p) => {

  p.preload = () => {
    amaticFont = p.loadFont('AmaticSC-Regular.ttf');
    amaticBoldFont = p.loadFont('AmaticSC-Bold.ttf');
    josefinFont = p.loadFont('JosefinSans-Regular.ttf')
    cabinSketchFont = p.loadFont('CabinSketch-Regular.ttf')

    networkImage = p.loadImage('We-Guild_logo.png')
  }

  p.setup = () => {
    p.frameRate(60)
    p.createCanvas(canvasWidth * transformer, canvasHeight * transformer);
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
    // activating the forward arrow
    if (p.dist((canvasWidth - 59) * transformer,
      (canvasHeight - 30) * transformer, p.mouseX, p.mouseY) < 22 * transformer && step < 20) {
      step++
    }
    // activating the backward arrow
    if (p.dist(59 * transformer,
      (canvasHeight - 30) * transformer, p.mouseX, p.mouseY) < 22 * transformer && step > 0) {
      step--
    }
  }

  p.draw = () => {

    pulsing(p);
    p.clear();

    // background(253, 235, 170);

    // Far Friends AREA
    p.noStroke();
    p.fill(250, 216, 140, FFareaAlpha);
    p.ellipse((canvasWidth * 0.5 * transformer) + sideShifter, (canvasHeight * 0.5 * transformer) + verticalShifter, canvasWidth * 0.8 * transformer, canvasWidth * 0.7 * transformer);

    // Close Friends  AREA
    p.fill(241, 184, 88, CFareaAlpha);
    p.ellipse((canvasWidth * 0.5 * transformer) + sideShifter, (canvasHeight * 0.5 * transformer) + verticalShifter, canvasWidth * 0.4 * transformer, canvasWidth * 0.35 * transformer);

    // steps come here: ============================
    switch (step) {

      // ===================== 
      case 0:
        // resetting 
        particlesArray.forEach(element => {
          if (element.CForFF === "CF") {
            element.x = element.originalX
            element.y = element.originalY
          }
        })
        // DRAW LINKS
        linkCF(p);
        p.noStroke();


        // BALLS CF
        particlesArray.forEach(element => {
          if (element.CForFF === "CF") { createBall(element, p) }
        })

        textDisplayer("Let's start with the same network as before.", "", p)
        drawForwardArrow(p);
        break
      // ---------------------  

      // =====================    
      case 1:
        // resetting
        CFareaAlpha = 0;

        // move to new network                
        particlesArray.forEach(element => {
          if (element.CForFF === "CF") {
            if (element.x - element.finalX < 3) {
              element.x += 0.2 * (element.finalX - element.x)
            }
            else if (element.x - element.finalX > 3) {
              element.x -= 0.2 * (element.x - element.finalX)
            }
            if (element.y - element.finalY < 3) {
              element.y += 0.2 * (element.finalY - element.y)
            }
            else if (element.y - element.finalY > 3) {
              element.y -= 0.2 * (element.y - element.finalY)
            }
          }
        })
        // DRAW LINKS
        linkCF(p);


        // BALLS CF
        particlesArray.forEach(element => {
          if (element.CForFF === "CF") { createBall(element, p) }
        })


        textDisplayer("First we'll get you in the middle,", "", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 2:
        // resetting
        FFareaAlpha = 0;
        particlesArray.forEach(element => {
          if (element.CForFF === "FF") {
            element.ballSize = 0
          }
        })

        // draw CF area   
        if (CFareaAlpha < 255) { CFareaAlpha += 15 }

        // DRAW LINKS
        linkCF(p);
        p.noStroke();

        // BALLS CF
        particlesArray.forEach(element => {
          if (element.CForFF === "CF") { createBall(element, p) }
        })

        textDisplayer("and highlight your friends area. We'll", "call these your close friends from now on.", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================  
      case 3:
        // resetting
        particlesArray[4].pulsing = 1.25;
        particlesArray[4].colourR = 180;
        particlesArray[4].colourG = 180;
        particlesArray[4].colourB = 180;

        // add FF with area and links
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        if (FFareaAlpha < 255) { FFareaAlpha += 15 }
        particlesArray.forEach(element => {
          if (element.CForFF === "FF") {
            if (element.ballSize < element.ballFinalSize) { element.ballSize += 0.1 }
            createBall(element, p)
          }
        })

        // BALLS CF
        particlesArray.forEach(element => {
          if (element.CForFF === "CF") { createBall(element, p) }
        })

        textDisplayer("In We-Guild you also connect to your friends'", "friends, whom we'll call your far friends.", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 4:
        // resetting
        particlesArray[0].colourR = 150;
        particlesArray[0].colourG = 150;
        particlesArray[0].colourB = 150;

        particlesArray[0].givenTo = 0;
        particlesArray[4].givenTo = 0;


        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        // sometimes your friends will ask for help
        particlesArray[4].pulsing = 40;
        particlesArray[4].colourR = 180;
        particlesArray[4].colourG = 0;
        particlesArray[4].colourB = 0;
        message(4, "sos!", p);

        textDisplayer("And when any friend asks for help...", "(same as before)", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 5:
        // resetting
        particlesArray[0].colourR = 0;
        particlesArray[0].colourG = 50;
        particlesArray[0].colourB = 180;

        particlesArray[4].pulsing = 2
        particlesArray[4].colourR = 0;
        particlesArray[4].colourG = 50;
        particlesArray[4].colourB = 180;

        // links
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);

        particlesArray[0].givenTo = 15;
        particlesArray[4].givenTo = 15;

        drawCarrier(0, 4, 1, particlesArray[4].colourR, particlesArray[4].colourG, particlesArray[4].colourB, 100, p)
        drawArrow(0, 4, false, 3, particlesArray[4].colourR, particlesArray[4].colourG, particlesArray[4].colourB, 150, 15, p)

        // BALLS
        particlesArray.forEach(element => { createBall(element, p) })

        message(4, "ta!", p);

        textDisplayer("You help if you can.", "This time with £15.", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 6:
        // resetting

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        textDisplayer("Others friends can help too, but you only see", "what happens between you and your network.", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 7:
        // resetting

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        textDisplayer("Your friend has glowed in blue since", "you helped them... (you too but that later)", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 8:
        // resetting
        particlesArray[4].givenTo = 0;

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        textDisplayer("and that is because you've so far helped", "them more than they've helped you.", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 9:
        // resetting

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        particlesArray[4].givenTo = 15;
        drawInfoBanner(4, p)

        textDisplayer("The info banner of that friend shows", "your help exchanges with them.", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 10:
        // resetting

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        drawInfoBanner(4, p)

        textDisplayer("Hover over the triangle to see the balance.", "(Though you may wanna guess first.)", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 11:
        // resetting

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        // INFO BANNERS bring on the info banners
        particlesArray.forEach(element => {
          if (element.thisInfoBannerOn) {
            drawInfoBanner(element.index, p)
          }
        })

        textDisplayer("You can trigger anyone's info banner by", "clicking on them. Go on, it's on now :-)", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 12:
        // resetting
        particlesArray[0].pulsing = 1.5;
        particlesArray[0].colourR = 0;
        particlesArray[0].colourG = 50;
        particlesArray[0].colourB = 180;

        particlesArray[4].colourB = 180;

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        // INFO BANNERS bring on the info banners
        particlesArray.forEach(element => {
          if (element.thisInfoBannerOn) {
            drawInfoBanner(element.index, p)
          }
        })

        textDisplayer("Though mostly everyone is in grey as", "grey means 'no exchanges yet'.", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 13:
        // resetting
        // CF
        particlesArray[1].colourR = 180;
        particlesArray[1].colourG = 180;
        particlesArray[1].colourB = 180;
        particlesArray[2].colourR = 180;
        particlesArray[2].colourG = 180;
        particlesArray[2].colourB = 180;
        particlesArray[3].colourR = 180;
        particlesArray[3].colourG = 180;
        particlesArray[3].colourB = 180;
        particlesArray[4].colourR = 0;
        particlesArray[4].colourG = 50;
        particlesArray[4].colourB = 180;
        particlesArray[5].colourR = 180;
        particlesArray[5].colourG = 180;
        particlesArray[5].colourB = 180;
        // FF  
        particlesArray[6].colourR = 180;
        particlesArray[6].colourG = 180;
        particlesArray[6].colourB = 180;
        particlesArray[7].colourR = 180;
        particlesArray[7].colourG = 180;
        particlesArray[7].colourB = 180;
        particlesArray[9].colourR = 180;
        particlesArray[9].colourG = 180;
        particlesArray[9].colourB = 180;
        particlesArray[10].colourR = 180;
        particlesArray[10].colourG = 180;
        particlesArray[10].colourB = 180;
        particlesArray[11].colourR = 180;
        particlesArray[11].colourG = 180;
        particlesArray[11].colourB = 180;
        particlesArray[13].colourR = 180;
        particlesArray[13].colourG = 180;
        particlesArray[13].colourB = 180;
        particlesArray[15].colourR = 180;
        particlesArray[15].colourG = 180;
        particlesArray[15].colourB = 180;

        particlesArray[1].receivedFrom = 0;
        particlesArray[2].receivedFrom = 0;
        particlesArray[3].receivedFrom = 0;
        particlesArray[4].receivedFrom = 0;
        particlesArray[5].receivedFrom = 0;

        particlesArray[6].receivedFrom = 0;
        particlesArray[7].receivedFrom = 0;
        particlesArray[9].receivedFrom = 0;
        particlesArray[10].receivedFrom = 0;
        particlesArray[11].receivedFrom = 0;
        particlesArray[13].receivedFrom = 0;
        particlesArray[15].receivedFrom = 0;


        particlesArray[0].receivedFrom = 0;

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        // now you ask for help
        particlesArray[0].pulsing = 25;
        particlesArray[0].colourR = 180;
        particlesArray[0].colourG = 0;
        particlesArray[0].colourB = 0;

        particlesArray[4].colourB = 0;
        message(0, "sos!", p);

        textDisplayer("Now it's you who needs help, remember?", "", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 14:
        // resetting    
        particlesArray[0].pulsing = 1.5;

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

        // links
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);

        drawCarrier(1, 0, 1, 0, 180, 50, 50, p)
        drawCarrier(2, 0, 1, 0, 180, 50, 50, p)
        drawCarrier(3, 0, 1, 0, 180, 50, 50, p)
        drawCarrier(4, 0, 1, 0, 180, 50, 50, p)
        drawCarrier(5, 0, 1, 0, 180, 50, 50, p)

        drawCarrier(6, 0, 1, 0, 180, 50, 50, p)
        drawCarrier(7, 0, 1, 0, 180, 50, 50, p)
        drawCarrier(9, 0, 1, 0, 180, 50, 50, p)
        drawCarrier(10, 0, 1, 0, 180, 50, 50, p)
        drawCarrier(11, 0, 1, 0, 180, 50, 50, p)
        drawCarrier(13, 0, 1, 0, 180, 50, 50, p)
        drawCarrier(15, 0, 1, 0, 180, 50, 50, p)

        // arrows
        drawArrow(1, 0, false, 0.1, 0, 180, 50, 150, particlesArray[1].receivedFrom, p)
        drawArrow(2, 0, false, 0.1, 0, 180, 50, 150, particlesArray[2].receivedFrom, p)
        drawArrow(3, 0, false, 0.1, 0, 180, 50, 150, particlesArray[3].receivedFrom, p)
        drawArrow(4, 0, false, 0.1, 0, 180, 50, 150, particlesArray[4].receivedFrom, p)
        drawArrow(5, 0, false, 0.1, 0, 180, 50, 150, particlesArray[5].receivedFrom, p)

        drawArrow(6, 0, false, 0.1, 0, 180, 50, 150, particlesArray[6].receivedFrom, p)
        drawArrow(7, 0, false, 0.1, 0, 180, 50, 150, particlesArray[7].receivedFrom, p)
        drawArrow(9, 0, false, 0.1, 0, 180, 50, 150, particlesArray[9].receivedFrom, p)
        drawArrow(10, 0, false, 0.1, 0, 180, 50, 150, particlesArray[10].receivedFrom, p)
        drawArrow(11, 0, false, 0.1, 0, 180, 50, 150, particlesArray[11].receivedFrom, p)
        drawArrow(13, 0, false, 0.1, 0, 180, 50, 150, particlesArray[13].receivedFrom, p)
        drawArrow(15, 0, false, 0.1, 0, 180, 50, 150, particlesArray[15].receivedFrom, p)

        particlesArray[0].receivedFrom = 121;

        // balls
        particlesArray.forEach(element => { createBall(element, p) })

        message(0, "ta!", p);

        // INFO BANNERS bring on the info banners
        particlesArray.forEach(element => {
          if (element.thisInfoBannerOn) {
            drawInfoBanner(element.index, p)
          }
        })
        textDisplayer("And close and far friends", "help you if they can.", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------  

      // =====================
      case 15:
        // resetting

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        // INFO BANNERS bring on the info banners
        particlesArray.forEach(element => {
          if (element.thisInfoBannerOn) {
            drawInfoBanner(element.index, p)
          }
        })
        textDisplayer("Click on them and check what everybody's", "info-banners look like now.", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // ---------------------

      // =====================
      case 16:
        // resetting

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        // INFO BANNERS bring on the info banners
        particlesArray.forEach(element => {
          if (element.thisInfoBannerOn) {
            drawInfoBanner(element.index, p)
          }
        })
        textDisplayer("And clicking on yourself shows your", "info-banner with the whole network. Try!", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // --------------------- 

      // =====================
      case 17:
        // resetting
        particlesArray[0].givenTo = 15
        particlesArray[1].givenTo = 0
        particlesArray[3].givenTo = 0
        particlesArray[7].givenTo =
          particlesArray[9].givenTo = 0
        particlesArray[13].givenTo = 0
        particlesArray[14].givenTo = 0

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
        particlesArray[12].colourR = 180
        particlesArray[12].colourG = 180
        particlesArray[12].colourB = 180
        particlesArray[13].colourR = 0;
        particlesArray[13].colourG = 180;
        particlesArray[13].colourB = 50;
        particlesArray[15].colourR = 0;
        particlesArray[15].colourG = 180;
        particlesArray[15].colourB = 50;
        particlesArray[14].colourR = 180
        particlesArray[14].colourG = 180
        particlesArray[14].colourB = 180

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        // INFO BANNERS bring on the info banners
        particlesArray.forEach(element => {
          if (element.thisInfoBannerOn) {
            drawInfoBanner(element.index, p)
          }
        })
        textDisplayer("As more help exchanges happen your", "network will change colours accordingly.", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // --------------------- 

      // =====================
      case 18:
        // resetting   
        particlesArray[0].givenTo = 91 // 15 + 66
        particlesArray[1].givenTo = 21
        particlesArray[3].givenTo = 16
        particlesArray[7].givenTo = 5
        particlesArray[9].givenTo = 14
        particlesArray[12].givenTo = 10
        particlesArray[13].givenTo = 7
        particlesArray[14].givenTo = 3


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


        drawCarrier(0, 1, 1, 0, 50, 180, 100, p)
        drawCarrier(0, 3, 1, 0, 50, 180, 100, p)
        drawCarrier(0, 7, 1, 0, 50, 180, 100, p)
        drawCarrier(0, 9, 1, 0, 50, 180, 100, p)
        drawCarrier(0, 12, 1, 0, 50, 180, 100, p)
        drawCarrier(0, 13, 1, 0, 50, 180, 100, p)
        drawCarrier(0, 14, 1, 0, 50, 180, 100, p)

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        drawArrow(0, 1, false, 0.2, 0, 50, 180, 150, 21, p)
        drawArrow(0, 3, false, 0.2, 0, 50, 180, 150, 16, p)
        drawArrow(0, 7, false, 0.2, 0, 50, 180, 150, 5, p)
        drawArrow(0, 9, false, 0.2, 0, 50, 180, 150, 14, p)
        drawArrow(0, 12, false, 0.2, 0, 50, 180, 150, 10, p)
        drawArrow(0, 13, false, 0.2, 0, 50, 180, 150, 7, p)
        drawArrow(0, 14, false, 0.2, 0, 50, 180, 150, 3, p)

        // message (1, "ta!");
        // message (3, "ta!");
        // message (7, "ta!");
        // message (9, "ta!");
        // message (12, "ta!");
        // message (13, "ta!");
        // message (14, "ta!");

        // INFO BANNERS bring on the info banners
        particlesArray.forEach(element => {
          if (element.thisInfoBannerOn) {
            drawInfoBanner(element.index, p)
          }
        })
        textDisplayer("Like you helping out more close and far", "friends when they need it and you can.", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // --------------------- 

      // =====================
      case 19:
        // resetting
        finalBannerAlpha = 0;

        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        // INFO BANNERS bring on the info banners
        particlesArray.forEach(element => {
          if (element.thisInfoBannerOn) {
            drawInfoBanner(element.index, p)
          }
        })

        textDisplayer("This way you can intuitively assess your", "relation to your network at any time.", p)
        drawBackwardArrow(p);
        drawForwardArrow(p);
        break;
      // =====================
      case 20:

        if (finalBannerAlpha < 240) { finalBannerAlpha += 30 }
        // links and balls
        linkCF(p);
        linkCFtoFF(p);
        linkFFtoFF(p);
        particlesArray.forEach(element => { createBall(element, p) })

        // INFO BANNERS bring on the info banners
        particlesArray.forEach(element => {
          if (element.thisInfoBannerOn) {
            drawInfoBanner(element.index, p)
          }
        })

        // text displayer ---------
        p.fill(241, 184, 88, finalBannerAlpha)
        p.rect((canvasWidth * 0.5 - 150) * transformer, 80 * transformer, 300 * transformer, (canvasHeight - 160) * transformer, 30 * transformer)

        p.noStroke()
        p.textFont(amaticFont)
        p.fill(60, 20, 20, finalBannerAlpha)
        p.textSize(20 * transformer)
        p.textAlign(p.CENTER);

        p.text("And now that you know how it works...", canvasWidth * 0.5 * transformer, (canvasHeight * 0.5 - 40) * transformer)

        p.fill(0, finalBannerAlpha)
        p.textSize(25 * transformer)
        p.textFont(amaticBoldFont)
        p.text("subscribe if you wanna", canvasWidth * 0.5 * transformer, (canvasHeight * 0.5 - 10) * transformer)
        p.text("be part of We-Guild!", canvasWidth * 0.5 * transformer, (canvasHeight * 0.5 + 15) * transformer)

        p.tint(255, finalBannerAlpha)
        p.image(networkImage,
          (canvasWidth * 0.5 - 25) * transformer,
          200 * transformer,
          50 * transformer,
          50 * transformer)
        // ------------------------ 

        drawBackwardArrow(p);
      // --------------------- 

    }
    p.noStroke();
    // ==================================================== end of steps

    // 'YOU'
    if (!particlesArray[11].thisInfoBannerOn && step !== 20) {
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
  p.textAlign(p.CENTER);
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
  p.rect((canvasWidth * 0.5 - 150) * transformer, (canvasHeight - 10) * transformer, 300 * transformer, -40 * transformer, 10 * transformer)

  p.textFont(josefinFont)
  p.noStroke()
  p.fill(60, 20, 20)
  p.textSize(14 * transformer)
  p.textAlign(p.CENTER);
  if (!secondLineToShow) {
    p.text(firstLineToShow, canvasWidth * 0.5 * transformer, (canvasHeight - 25) * transformer)
  } else {
    p.text(firstLineToShow, canvasWidth * 0.5 * transformer, (canvasHeight - 33) * transformer)
    p.text(secondLineToShow, canvasWidth * 0.5 * transformer, (canvasHeight - 18) * transformer)
  }
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-

// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function drawForwardArrow(p) {
  // draw it
  p.fill(241, 184, 88)
  p.ellipse((canvasWidth - 59) * transformer,
    (canvasHeight - 30) * transformer,
    23 * transformer, 23 * transformer)
  p.stroke(150, 70, 30)
  p.strokeWeight(3 * transformer)
  p.line((canvasWidth - 55) * transformer,
    (canvasHeight - 30) * transformer,
    (canvasWidth - 60) * transformer,
    (canvasHeight - 35) * transformer)
  p.line((canvasWidth - 55) * transformer,
    (canvasHeight - 30) * transformer,
    (canvasWidth - 60) * transformer,
    (canvasHeight - 25) * transformer)
  p.noStroke()
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function drawBackwardArrow(p) {
  p.fill(241, 184, 88)
  p.ellipse(59 * transformer,
    (canvasHeight - 30) * transformer,
    23 * transformer, 23 * transformer)
  p.stroke(150, 70, 30)
  p.strokeWeight(3 * transformer)
  p.line(55 * transformer,
    (canvasHeight - 30) * transformer,
    60 * transformer,
    (canvasHeight - 35) * transformer)
  p.line(55 * transformer,
    (canvasHeight - 30) * transformer,
    60 * transformer,
    (canvasHeight - 25) * transformer)
  p.noStroke()
}

var myp5 = new p5(main, 'c1');

