const transformer = 0.75;
const sizeOfBalls = 45;
const sideShifter = -40;

const sizeOfMovement = 3;

let amaticFont;

// array  of particle objects
const particlesArray = [
  {
    index: 0,
    x: 200,
    y: 50,
    pulsing: 4,
    xPulser: 0,
    yPulser: 0,
    sizeOfMovementX: 5,
    sizeOfMovementY: 5,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    index: 1,
    x: 620,
    y: 150,
    pulsing: 3,
    xPulser: 0,
    yPulser: 0,
    sizeOfMovementX: 5,
    sizeOfMovementY: 5,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    index: 2,
    x: 135,
    y: 205,
    pulsing: 2.5,
    xPulser: 0,
    yPulser: 0,
    sizeOfMovementX: 5,
    sizeOfMovementY: 5,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    index: 3,
    x: 370,
    y: 250,
    pulsing: 1.5,
    xPulser: 0,
    yPulser: 0,
    sizeOfMovementX: 5,
    sizeOfMovementY: 5,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    index: 4,
    x: 370,
    y: 50,
    pulsing: 4,
    xPulser: 0,
    yPulser: 0,
    sizeOfMovementX: 5,
    sizeOfMovementY: 5,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    index: 5,
    x: 520,
    y: 85,
    pulsing: 18,
    xPulser: 20,
    yPulser: 3,
    sizeOfMovementX: 2,
    sizeOfMovementY: 6,
    colourR: 180,
    colourG: 0,
    colourB: 0
  }

]

// -----
var main = (p) => {

  p.preload = () => {
    amaticFont = p.loadFont('AmaticSC-Regular.ttf');
  }

  p.setup = () => {
    p.frameRate(60)
    p.createCanvas(470, 255);
  }

  p.draw = () => {

    pulsing(p);

    p.clear()
    // background (0, 0)
    // background(253, 235, 170);

    p.stroke(100)
    // LINKS
    linkBalls(0, 1, 0.5, p);
    linkBalls(0, 2, 1, p);
    linkBalls(1, 2, 1, p);
    linkBalls(2, 3, 1, p);
    linkBalls(0, 3, 0.5, p);
    linkBalls(1, 3, 0.5, p);
    linkBalls(1, 5, 0.5, p);
    linkBalls(4, 5, 0.5, p);
    linkBalls(2, 4, 1, p);
    linkBalls(3, 4, 0.5, p);
    linkBalls(3, 5, 0.5, p);
    linkBalls(1, 4, 0.5, p);
    linkBalls(5, 2, 1, p);

    p.noStroke();
    // BALLS
    particlesArray.forEach(element => {
      createBall(element, p)
    })

    //   //lines on top
    //   linkBalls(2,3);
    //   linkBalls(0,3);
    //   linkBalls(1,3);
    //   linkBalls(4,3);
    //   linkBalls(5,3);

    // 'YOU'
    p.fill(10, 10, 10);
    p.textSize(60 * transformer)
    // stroke (100, 30, 0, 140);
    p.textFont(amaticFont);
    p.text ("YOU", particlesArray[2].xMoving, particlesArray[2].yMoving + 50);
    // line
    // strokeWeight(4)
    // line (particlesArray[2].xMoving, particlesArray[2].yMoving + 20, particlesArray[2].xMoving, particlesArray[2].yMoving + 8)

    // help requests
    helpRequestMessage(5, p);
  }

}

// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function pulsing(p) {
  particlesArray.forEach(element => {
    // X pulsin
    element.xMoving = ((element.x + p.cos(p.frameCount * 0.01 * element.pulsing) * element.sizeOfMovementX) * transformer) + sideShifter;
    // Y pulsing
    element.yMoving = (element.y + p.sin(p.frameCount * 0.01 * element.pulsing) * element.sizeOfMovementY) * transformer;
  })
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-

function linkBalls(origin, end, thickness, p) {
  if (origin === 2 || end === 2) {
    p.stroke(160, 80, 0)
  }
  else {
    p.stroke(200, 140, 0);
  }
  // stroke (255, 255, 255);
  p.strokeWeight(thickness * 3 * transformer);
  p.line(particlesArray[origin].xMoving, particlesArray[origin].yMoving, particlesArray[end].xMoving, particlesArray[end].yMoving);

}


function createBall(ballObject, p) {

  if (ballObject.index === 5) {
    // glow
    p.fill(ballObject.colourR, ballObject.colourG, ballObject.colourB, 100);
    p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls * 1.5 + 5 * p.cos(p.frameCount * 0.1), sizeOfBalls * 1.3 + 5 * p.cos(p.frameCount * 0.05))
  } else {
    // glow
    p.fill(ballObject.colourR, ballObject.colourG, ballObject.colourB, 100);
    p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls * 1.3 + 5 * p.cos(p.frameCount * 0.05), sizeOfBalls * 1.3 + 5 * p.cos(p.frameCount * 0.05))
  }

  // ellipse
  p.fill(ballObject.colourR, ballObject.colourG, ballObject.colourB);
  p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls, sizeOfBalls)


}

// -------
function helpRequestMessage(friendRequestingNumber, p) {
  p.fill(255, 255, 255);
  p.stroke(20, 20, 20)
  p.strokeWeight(1);
//   p.ellipse(particlesArray[friendRequestingNumber].xMoving + 33, particlesArray[friendRequestingNumber].yMoving - 18, 60, 40)
//   p.fill(30, 0, 0)
//   p.noStroke();
//   p.text("help!", particlesArray[friendRequestingNumber].xMoving + 10, particlesArray[friendRequestingNumber].yMoving - 8)
// }
  p.ellipse (particlesArray[friendRequestingNumber].xMoving + 63 * transformer, particlesArray[friendRequestingNumber].yMoving - 32 * transformer, 120 * transformer, 80 * transformer)
  p.fill (30, 0, 0)
  p.noStroke();
  p.textAlign(p.CENTER);
  p.text ("help!", particlesArray[friendRequestingNumber].xMoving + 65 * transformer, particlesArray[friendRequestingNumber].yMoving - 13 * transformer);
}

var myp5 = new p5(main, 'c1');
