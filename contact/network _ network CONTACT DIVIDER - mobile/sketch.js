const xTransformer = 0.45;
const yTransformer = 0.1;
const transformer = 0.4;
const sizeOfBalls = 30;
const sideShifter = -33;
const verticalShifter = 30;


//TABLET
// const xTransformer = 0.75;
// const yTransformer = 0.15;
// const transformer = 0.4;
// const sizeOfBalls = 30;
// const sideShifter = -70;
// const verticalShifter = 30;

const sizeOfMovement = 6;

let amaticFont;

// array  of particle objects
const particlesArray = [
  {
    x: 200,
    y: 50,
    pulsing: 4,
    xPulser: 1.5,
    yPulser: 2,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    x: 620,
    y: 200,
    pulsing: 3,
    xPulser: 2,
    yPulser: 3,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    x: 135,
    y: 205,
    pulsing: 2.5,
    xPulser: 1.5,
    yPulser: 2,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    x: 340,
    y: 250,
    pulsing: 1.5,
    xPulser: 1,
    yPulser: 1.5,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    x: 390,
    y: 50,
    pulsing: 7,
    xPulser: 2,
    yPulser: 2.5,
    colourR: 180,
    colourG: 180,
    colourB: 180
  },
  {
    x: 520,
    y: 70,
    pulsing: 4,
    xPulser: 2,
    yPulser: 3,
    colourR: 180,
    colourG: 180,
    colourB: 180
  }

]


var main = (p) => {
  // -----
  p.preload = () => {
    amaticFont = p.loadFont('../../AmaticSC-Regular.ttf');
  }

  p.setup = () => {
    p.frameRate(60)
    p.createCanvas(280, 90);
  }

  p.draw = () => {

    pulsing(p);

    p.clear()
    p.background(0, 0)
    // background(253, 235, 170);

    p.stroke(100)
    // LINKS (origin, end, strokeWeight)
    linkBalls(0, 1, 1, p);
    linkBalls(0, 2, 1, p);
    linkBalls(1, 2, 1, p);
    linkBalls(2, 3, 1, p);
    linkBalls(0, 3, 1, p);
    linkBalls(1, 3, 1, p);
    linkBalls(1, 5, 1, p);
    linkBalls(4, 5, 1, p);
    linkBalls(2, 4, 1, p);
    linkBalls(3, 4, 1, p);
    linkBalls(3, 5, 1, p);
    linkBalls(1, 4, 1, p);
    linkBalls(5, 2, 1, p);

    p.noStroke();
    // BALLS
    particlesArray.forEach(element => {
      createBall(element, p)
    })

    message(3, "?", p)
    message(2, "?", p)
    // message(4, , p"?")
    message(5, "?", p)

  }

}

// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function pulsing(p) {
  particlesArray.forEach(element => {
    // X pulsin
    element.xMoving = ((element.x * xTransformer + p.cos(p.frameCount * 0.01 * element.xPulser) * sizeOfMovement)) + sideShifter;
    // Y pulsingp.
    element.yMoving = ((element.y * yTransformer + p.sin(p.frameCount * 0.01 * element.yPulser) * sizeOfMovement)) + verticalShifter;
  })
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function linkBalls(origin, end, thickness, p) {
  // if (origin === 2 || end === 2) {
  //   stroke (160, 80, 0)
  // }
  // else {
  p.stroke(150, 100, 50);
  // }
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

function message(friendRequestingNumber, message, p) {
  p.fill(255, 255, 255);
  p.stroke(20, 20, 20)
  p.strokeWeight(1);
  p.ellipse(particlesArray[friendRequestingNumber].xMoving + 55 * transformer, particlesArray[friendRequestingNumber].yMoving - 32 * transformer, 80 * transformer, 70 * transformer)
  p.fill(30, 0, 0)
  p.noStroke();
  p.textAlign(p.CENTER);
  p.textSize(55 * transformer)
  // textFont(amaticFont);
  p.text(message, particlesArray[friendRequestingNumber].xMoving + 55 * transformer, particlesArray[friendRequestingNumber].yMoving - 10 * transformer);
}

var myp5 = new p5(main, 'c1');
