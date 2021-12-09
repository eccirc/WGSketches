const transformer = 0.5;
const sizeOfBalls = 25;
const sizeOfMovement = 6;
const particlesArray = [
  { x: 50, y: 50, pulsing: 4, xPulser: 0, yPulser: 0, colourG: 200, colourB: 180 },
  { x: 250, y: 150, pulsing: 3, xPulser: 0, yPulser: 0, colourG: 150, colourB: 0 },
  { x: 135, y: 155, pulsing: 2.5, xPulser: 0, yPulser: 0, colourG: 100, colourB: 200 },
  { x: 70, y: 250, pulsing: 1.5, xPulser: 0, yPulser: 0, colourG: 0, colourB: 200 }]

var main = (p) => {
  p.setup = () => {
    p.frameRate(60)
    p.createCanvas(150, 150);
  }

  p.draw = () => {
    pulsing(p); p.clear(); p.background(0, 0); p.stroke(100);
    // LINKS
    linkBalls(0, 1, p);
    linkBalls(0, 2, p);
    linkBalls(1, 2, p);
    linkBalls(2, 3, p);
    linkBalls(0, 3, p);
    linkBalls(1, 3, p);
    p.noStroke();
    // BALLS
    particlesArray.forEach(element => {
      createBall(element, p)
    })
  }
}
function pulsing(p) {
  particlesArray.forEach(element => {
    // X pulsin
    element.xMoving = (element.x + p.cos(p.frameCount * 0.01 * element.pulsing) * sizeOfMovement) * transformer;
    // Y pulsing
    element.yMoving = (element.y + p.sin(p.frameCount * 0.01 * element.pulsing) * sizeOfMovement) * transformer;
  })
}
function linkBalls(origin, end, p) {
  p.stroke(200, 140, 0);
  // stroke (255, 255, 255);
  p.strokeWeight(3 * transformer);
  p.line(particlesArray[origin].xMoving, particlesArray[origin].yMoving, particlesArray[end].xMoving, particlesArray[end].yMoving)
}
function createBall(ballObject, p) {
  // glow
  p.fill(0, ballObject.colourG, ballObject.colourB, 100);
  p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls * 1.3 + 5 * p.cos(p.frameCount * 0.05), sizeOfBalls * 1.3 + 5 * p.cos(p.frameCount * 0.05))
  // ellipse
  p.fill(0, ballObject.colourG, ballObject.colourB);
  p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls, sizeOfBalls)
}
var myp5 = new p5(main, 'c1');
