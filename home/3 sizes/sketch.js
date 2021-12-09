const transformer = 1;
const sizeOfBalls = 50;
const sizeOfMovement = 2;

// array  of particle objects
const particlesArray = [
  {
    x: 38,
    y: 45,
    size: 0.5,
    pulsing: 4,
    colourR: 0,
    colourG: 180,
    colourB: 150
  },
  {
    x: 100,
    y: 45,
    size: 0.8,
    pulsing: 3,
    colourR: 0,
    colourG: 180,
    colourB: 180
  },
  {
    x: 180,
    y: 45,
    size: 1.1,
    pulsing: 4.5,
    colourR: 0,
    colourG: 140,
    colourB: 180
  }
]

var main = (p) => {

  p.setup = () => {
    p.frameRate(60)
    p.createCanvas(230, 90);
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
  p.ellipse(ballObject.xMoving, ballObject.yMoving,
    sizeOfBalls * 1.3 * ballObject.size + 5 * p.cos(p.frameCount * 0.05),
    sizeOfBalls * 1.3 * ballObject.size + 5 * p.cos(p.frameCount * 0.05)
  )

  // ellipse
  p.fill(ballObject.colourR, ballObject.colourG, ballObject.colourB);
  p.ellipse(ballObject.xMoving, ballObject.yMoving,
    sizeOfBalls * ballObject.size,
    sizeOfBalls * ballObject.size
  )
}

var myp5 = new p5(main, 'c1');
