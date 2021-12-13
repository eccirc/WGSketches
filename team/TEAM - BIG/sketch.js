let marie;
let guillermo;
let zahida;
let dave;

let amaticFont;

const transformer = 1;
const sizeOfBalls = transformer * 60;
const sideShifter = -70;

const sizeOfMovement = 6;

// array  of particle objects
const particlesArray = [
  {
    x: 220,
    y: 65,
    pulsing: 3,
    xPulser: 0,
    yPulser: 0,
    colourG: 180,
    colourB: 150
  },
  {
    x: 500,
    y: 100,
    pulsing: 3,
    xPulser: 0,
    yPulser: 0,
    colourG: 150,
    colourB: 0
  },
  {
    x: 375,
    y: 215,
    pulsing: 2,
    xPulser: 0,
    yPulser: 0,
    colourG: 140,
    colourB: 180
  },
  {
    x: 120,
    y: 180,
    pulsing: 1.5,
    xPulser: 0,
    yPulser: 0,
    colourG: 80,
    colourB: 180
  }

]

var main = (p) => {

  p.preload = () => {

    amaticFont = p.loadFont('AmaticSC-Regular.ttf');
    marie = p.loadImage('pics/marie-small.png');
    guillermo = p.loadImage('pics/guillermo-small.png');
    zahida = p.loadImage('pics/zahida-small.png');
    dave = p.loadImage('pics/dave-team.png');
  }

  p.setup = () => {
    p.frameRate(60)
    p.createCanvas(485, 300);
  }

  p.draw = () => {

    pulsing(p);

    p.clear()
    // background (0, 0)
    // background (250, 216, 140);

    // area
    //   rotate(PI * 0.02);
    //   fill(241, 184, 88);
    //   ellipse(290, 130, 520, 290)
    //   rotate(PI * -0.02);

    p.stroke(100)
    // LINKS
    linkBalls(0, 1, "brown", p);
    linkBalls(0, 2, "brown", p);
    linkBalls(1, 2, "brown", p);
    linkBalls(2, 3, "brown", p);
    linkBalls(0, 3, "brown", p);
    linkBalls(1, 3, "brown", p);

    p.noStroke();
    // BALLS
    particlesArray.forEach(element => {
      createBall(element, p)
    })

    // NAMES
    p.fill(10, 10, 10);
    p.textSize(40 * transformer)
    // stroke (100, 30, 0, 140);
    p.textFont(amaticFont);
    p.textAlign(p.CENTER);

    // GUILLERMO
    if (p.dist(p.mouseX, p.mouseY, particlesArray[0].xMoving, particlesArray[0].yMoving) < sizeOfBalls * 0.5) {

      linkBalls(0, 1, "black", p);
      linkBalls(0, 2, "black", p);
      linkBalls(0, 3, "black", p);
      p.noStroke();
      // BALLS
      particlesArray.forEach(element => {
        createBall(element, p)
      })
      // PHOTOS
      p.image(guillermo, particlesArray[0].xMoving - sizeOfBalls * 0.5, particlesArray[0].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.tint(255, 150);
      p.image(zahida, particlesArray[1].xMoving - sizeOfBalls * 0.5, particlesArray[1].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.image(marie, particlesArray[3].xMoving - sizeOfBalls * 0.5, particlesArray[3].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.image(dave, particlesArray[2].xMoving - sizeOfBalls * 0.5, particlesArray[2].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.fill(0);
      p.text("Guillermo", particlesArray[0].xMoving, particlesArray[0].yMoving + 65 * transformer);
      p.noTint();
    }

    // ZAHIDA
    else if (p.dist(p.mouseX, p.mouseY, particlesArray[1].xMoving, particlesArray[1].yMoving) < sizeOfBalls * 0.5) {

      linkBalls(1, 0, "black", p);
      linkBalls(1, 2, "black", p);
      linkBalls(1, 3, "black", p);

      p.noStroke();
      // BALLS
      particlesArray.forEach(element => {
        createBall(element, p)
      })

      // PHOTOS
      p.image(zahida, particlesArray[1].xMoving - sizeOfBalls * 0.5, particlesArray[1].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.tint(255, 150);
      p.image(guillermo, particlesArray[0].xMoving - sizeOfBalls * 0.5, particlesArray[0].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)

      p.image(marie, particlesArray[3].xMoving - sizeOfBalls * 0.5, particlesArray[3].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.image(dave, particlesArray[2].xMoving - sizeOfBalls * 0.5, particlesArray[2].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.fill(0);
      p.text("Zahida", particlesArray[1].xMoving, particlesArray[1].yMoving + 65 * transformer);
      p.noTint();
    }

    // DAVE
    else if (p.dist(p.mouseX, p.mouseY, particlesArray[2].xMoving, particlesArray[2].yMoving) < sizeOfBalls * 0.5) {
      linkBalls(2, 0, "black", p);
      linkBalls(2, 1, "black", p);
      linkBalls(2, 3, "black", p);

      p.noStroke();
      // BALLS
      particlesArray.forEach(element => {
        createBall(element, p)
      })
      // PHOTOS
      p.image(dave, particlesArray[2].xMoving - sizeOfBalls * 0.5, particlesArray[2].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.tint(255, 150);
      p.image(guillermo, particlesArray[0].xMoving - sizeOfBalls * 0.5, particlesArray[0].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.image(zahida, particlesArray[1].xMoving - sizeOfBalls * 0.5, particlesArray[1].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.image(marie, particlesArray[3].xMoving - sizeOfBalls * 0.5, particlesArray[3].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls);
      p.fill(0);
      p.text("Dave", particlesArray[2].xMoving, particlesArray[2].yMoving + 65 * transformer);
      p.noTint();
    }

    // MARIE
    else if (p.dist(p.mouseX, p.mouseY, particlesArray[3].xMoving, particlesArray[3].yMoving) < sizeOfBalls * 0.5) {
      linkBalls(3, 0, "black", p);
      linkBalls(3, 1, "black", p);
      linkBalls(3, 2, "black", p);

      p.noStroke();
      // BALLS
      particlesArray.forEach(element => {
        createBall(element, p)
      })
      // PHOTOS
      p.image(marie, particlesArray[3].xMoving - sizeOfBalls * 0.5, particlesArray[3].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.tint(255, 150);
      p.image(guillermo, particlesArray[0].xMoving - sizeOfBalls * 0.5, particlesArray[0].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.image(zahida, particlesArray[1].xMoving - sizeOfBalls * 0.5, particlesArray[1].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.image(dave, particlesArray[2].xMoving - sizeOfBalls * 0.5, particlesArray[2].yMoving - sizeOfBalls * 0.5, sizeOfBalls, sizeOfBalls)
      p.fill(0);
      p.text("Marie", particlesArray[3].xMoving, particlesArray[3].yMoving + 65 * transformer);
    }
    p.noTint();
  }
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function pulsing(p) {
  particlesArray.forEach(element => {
    // X pulsin
    element.xMoving = ((element.x + p.cos(p.frameCount * 0.01 * element.pulsing) * sizeOfMovement) * transformer) + sideShifter;
    // Y pulsing
    element.yMoving = (element.y + p.sin(p.frameCount * 0.01 * element.pulsing) * sizeOfMovement) * transformer;
  })
}
// -=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=--=-=-=-=-=-
function linkBalls(origin, end, colour, p) {
  if (colour === "brown") { p.stroke(200, 140, 0); }
  else if (colour === "black") { p.stroke(130, 90, 0) };
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
  p.ellipse(ballObject.xMoving, ballObject.yMoving, sizeOfBalls * 1.2, sizeOfBalls * 1.2)



}

var myP5 = new p5(main, "c1")