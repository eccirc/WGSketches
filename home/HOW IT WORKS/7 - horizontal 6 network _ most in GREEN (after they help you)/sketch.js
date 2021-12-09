const transformer = 0.5;
const sizeOfBalls = 30;
const sideShifter = -40;

const sizeOfMovement = 6;

let amaticFont;

// array  of particle objects
const particlesArray = [
  {
    x: 200,
    y: 50,
    pulsing: 4,
    xPulser: 0,
    yPulser: 0,
    colourR: 0,
    colourG: 180,
    colourB: 50
  },
  {
    x: 620,
    y: 150,
    pulsing: 3,
    xPulser: 0,
    yPulser: 0,
    colourR: 0,
    colourG: 180,
    colourB: 50
  },
  {
    x: 135,
    y: 205,
    pulsing: 2.5,
    xPulser: 0,
    yPulser: 0,
    colourR: 0,
    colourG: 180,
    colourB: 120
  },
  {
    x: 370,
    y: 250,
    pulsing: 1.5,
    xPulser: 0,
    yPulser: 0,
    colourR: 0,
    colourG: 180,
    colourB: 50
  },
  {
    x: 370,
    y: 50,
    pulsing: 7,
    xPulser: 0,
    yPulser: 0,
    colourR: 0,
    colourG: 180,
    colourB: 50
  },
  {
    x: 520,
    y: 70,
    pulsing: 4,
    xPulser: 0,
    yPulser: 0,
    colourR: 0,
    colourG: 180,
    colourB: 180
  }

]

// -----
var main = (p) => {

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
    // background (0, 0)
    // background(253, 235, 170);

    p.stroke(100)
    // LINKS (origin, end, strokeWeight)
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

    // 'YOU'
    p.fill(10, 10, 10);
    p.textSize(60 * transformer)
    // stroke (100, 30, 0, 140);
    p.textFont(amaticFont);
    p.text("YOU", particlesArray[2].xMoving - 15, particlesArray[2].yMoving + 32)
    // line
    // strokeWeight(4)
    // line (particlesArray[2].xMoving, particlesArray[2].yMoving + 20, particlesArray[2].xMoving, particlesArray[2].yMoving + 8)

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
    p.stroke(160, 80, 0)
  }
  else {
    p.stroke(200, 140, 0);
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
var myp5 = new p5(main, 'c1');
