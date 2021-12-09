
// array  of particle objects
const particlesArray = [
  {
    x: 38,
    y: 38,
    pulsing: 4.2,
    colourR: 0,
    colourG: 180,
    colourB: 50
  }
]


const transformer = 1;
const sizeOfBalls = 50;
const sizeOfMovement = 2;



var main = (p) => {

  p.setup = () => {
    p.frameRate(60)
    p.createCanvas(78, 78);
  }

  p.draw = () => {

    pulsing(p);

    p.clear()
    p.background(0, 0)
    // background (100, 100, 100)

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

function createBall(ballObject, p) {

  // glow
  p.fill(ballObject.colourR, ballObject.colourG, ballObject.colourB, 100);
  p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls * 1.3 + 5 * p.cos(p.frameCount * 0.05), sizeOfBalls * 1.3 + 5 * p.cos(p.frameCount * 0.05))

  // ellipse
  p.fill(ballObject.colourR, ballObject.colourG, ballObject.colourB);
  p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls, sizeOfBalls)
}

var myp5 = new p5(main, 'c1');


