const transformer = 0.6;
const sizeOfBalls = 40 * transformer;

const sizeOfMovement = 6;

// array  of particle objects
const particlesArray = [
  {
    x: 80,
    y: 40,
    ballSize: 50,
    glowSize: 45,
    pulsing: 0,
    xPulser: 0,
    yPulser: 0,
    colourG: 180,
    colourB: 180
  },
  {
    x: 40,
    y: 110,
    ballSize: 35,
    glowSize: 0,
    pulsing: 0,
    xPulser: 0,
    yPulser: 0,
    colourG: 180,
    colourB: 50
  },
  {
    x: 120,
    y: 110,
    ballSize: 35,
    glowSize: 0,
    pulsing: 0,
    xPulser: 0,
    yPulser: 0,
    colourG: 50,
    colourB: 180
  }

]


var main = (p) => {

  p.setup = () => {
    p.frameRate(60)
    p.createCanvas(150, 130);
  }

  p.draw = () => {

    pulsing(p);

    p.clear()
    p.background(0, 0)
    // background(241, 184, 88);

    p.stroke(100)
    // // LINKS
    linkBalls(0, 1, p);
    linkBalls(0, 2, p);
    // linkBalls(1,2);

    p.noStroke();
    // BALLS
    particlesArray.forEach(element => {
      createBall(element, p)
    })

  }
}

// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function pulsing(p) {
  particlesArray.forEach(element => {
    // X pulsin
    element.xMoving = (element.x + p.cos(p.frameCount * 0.01 * element.pulsing) * sizeOfMovement) * transformer;
    // Y pulsing
    element.yMoving = (element.y + p.sin(p.frameCount * 0.01 * element.pulsing) * sizeOfMovement) * transformer;
  })
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function linkBalls(origin, end, p) {
  p.stroke(100, 200);
  // stroke (255, 255, 255);
  p.strokeWeight(2 * transformer);
  p.line(particlesArray[origin].xMoving, particlesArray[origin].yMoving, particlesArray[end].xMoving, particlesArray[end].yMoving)
}


function createBall(ballObject, p) {

  // glow
  p.fill(180, 180, 180, 100);
  p.ellipse(ballObject.xMoving, ballObject.yMoving, ballObject.glowSize * 1.3 * transformer + 5 * p.cos(p.frameCount * 0.05), ballObject.glowSize * 1.3 * transformer + 5 * p.cos(p.frameCount * 0.05))

  // ellipse
  p.fill(180, 180, 180);
  p.ellipse(ballObject.xMoving, ballObject.yMoving, ballObject.ballSize * transformer, ballObject.ballSize * transformer)

}

var myp5 = new p5(main, 'c1');
