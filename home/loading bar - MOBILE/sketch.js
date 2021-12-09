let size = .7;
const transX = 40;
const transY = 40;
const barThicknessOut = 50;
const ratioThicknessInToOut = 0.8;
const barLength = 280;

const colourOfBackground = [250, 216, 140]
const colourOfBorder = [110, 110, 110]
const colourOfBalls = [110, 110, 110]

const numberOfBalls = 8;
const ratioOfBarLoaded = 0.7;
const sizeOfBalls = 20;
const minSizeOfBalls = 10;
const speedFromLeftToRight = 3; // the bigger the slower
const waitingBetweenInAndOut = 60;

let growing = true;
const speedOfChange = .5;
const arrayOfBallSizes = [];

var main = (p) => {
  p.setup = () => {
    p.createCanvas(255, 80);
    for (let i = 0; i < numberOfBalls; i++) {
      arrayOfBallSizes.push(minSizeOfBalls);
    }
  }

  p.draw = () => {
    p.clear()

    // alternating the in and out ------------------------
    if (p.frameCount % waitingBetweenInAndOut === (waitingBetweenInAndOut - 1) && !growing) { growing = true; }
    else if (p.frameCount % waitingBetweenInAndOut === (waitingBetweenInAndOut - 1) && growing) { growing = false; }

    // actual bar -----------------------------------------
    p.noStroke();
    p.fill(colourOfBorder[0], colourOfBorder[1], colourOfBorder[2]);

    p.ellipse(0 + transX, 0 + transY, 50 * size);
    p.ellipse((barLength * size) + transX, 0 + transY, 50 * size);
    p.rect(0 + transX, (0 + transY) - (barThicknessOut * 0.5 * size), barLength * size, barThicknessOut * size);


    p.fill(colourOfBackground[0], colourOfBackground[1], colourOfBackground[2]);
    p.ellipse(0 + transX, 0 + transY, 50 * size * ratioThicknessInToOut);
    p.ellipse((barLength * size) + transX, 0 + transY, 50 * size * ratioThicknessInToOut);
    p.rect(0 + transX, (0 + transY) - (barThicknessOut * 0.5 * size * ratioThicknessInToOut), barLength * size, barThicknessOut * size * ratioThicknessInToOut);

    // updating the ball sizes ---------------------------    
    // GROWING  
    if (growing) {
      for (let i = 0; i < numberOfBalls; i++) {

        if (arrayOfBallSizes[i] < sizeOfBalls) {
          if (i && arrayOfBallSizes[i - 1] > minSizeOfBalls + speedFromLeftToRight) {
            arrayOfBallSizes[i] += speedOfChange
          } else if (!i) {
            arrayOfBallSizes[i] += speedOfChange
          }
        }
      }
    }
    // SHRINKING
    if (!growing) {
      for (let i = numberOfBalls - 1; i > -1; i--) {

        if (arrayOfBallSizes[i] > minSizeOfBalls) {
          if (i !== (numberOfBalls - 1) && arrayOfBallSizes[i + 1] < (sizeOfBalls - speedFromLeftToRight)) { arrayOfBallSizes[i] -= speedOfChange }
          else if (i === numberOfBalls - 1) {
            arrayOfBallSizes[i] -= speedOfChange
          }
        }
      }
    }
    // balls ---------------------------------------------
    for (let i = 0; i < numberOfBalls; i++) {
      p.fill(colourOfBalls[0], colourOfBalls[1], colourOfBalls[2]);
      p.ellipse(((280 * ratioOfBarLoaded / (numberOfBalls - 1)) * i * size) + transX, transY, arrayOfBallSizes[i] * size)
    }
  }
}

var myp5 = new p5(main, 'c1');
