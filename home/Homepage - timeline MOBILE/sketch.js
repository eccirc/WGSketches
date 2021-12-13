const transformer = 0.5;
let bannerTransformer = 1; // so far only affecting the colour balance bar from the now hovering box

// data from ledger
let yourName;
let yourProfilePicRound;
let yourProfilePicThumbnail;
let signUpWhen = "Fri May 15 2020 18:04:30 GMT+0100 (British Summer Time)";
let collectionOfFriendsProfilePicsRound = {};
let collectionOfFriendsProfilePicsThumbnails = {};

let arrayOfTransactions;

let width = 610;
let height = 800;
let maxBalanceAdjuster;
let Yorigin = height * 0.33 - (50 * height) / width;
let Xdistorter = 1.56;
let Ydistorter = 223;
let sideShifter = -150;
let trapezoidTwister = 0;
let graphSideMargin = 150;
let transYshifter = 0;
let finalYshifter = 0;
let zoomAmount = 1;
let zoomLoc = 0;
let verticalScroll;


let numberOfDotsPerVerticalLine = 30;
let infoBannerXshifter = 0;
let infoBannerYshifter = 0;


let helpRequestBannerXShifter;
let helpRequestBannerYShifter;
let rightShifter;

let specificInfoBannerOn = false;
let specificInfoBanner = 0;

let fourCornersOfBackgroundTrapezoid = new Array(4);

let colourGgradient = 0;
let colourBgradient = 0;

let cnv;

let amaticFont;
let cabinSketchFont;
let josefinSansFont;

let celina;
let festus;
let jodie;
let steve;
let collectionOfFriendsProfilePics = {};
let clue;

var main = (p) => {

  p.preload = () => {
    amaticFont = p.loadFont("AmaticSC-Regular.ttf")
    cabinSketchFont = p.loadFont("CabinSketch-Regular.ttf")
    josefinSansFont = p.loadFont("JosefinSans-Regular.ttf")

    celina = p.loadImage("pics/Celina.png")

    collectionOfFriendsProfilePics.privateLedgerWithUser1 = p.loadImage("pics/Festus.png")
    collectionOfFriendsProfilePics.privateLedgerWithUser2 = p.loadImage("pics/Jason.png")
    collectionOfFriendsProfilePics.privateLedgerWithUser3 = p.loadImage("pics/Chloe.png")


  }

  p.setup = () => {
    parsingPrivateLedger(signUpWhen, privateLedgers, p);
    p.frameRate(60)
    cnv = p.createCanvas(width * transformer, height * transformer);
    cnv.doubleClicked(() => p.doubleClicking());



    // make the ledger be pushed towards vertical (Yorigin going up)
    // DESKTOP mode (practically)
    Yorigin = height * 0.33;
    maxBalanceAdjuster = 1.5;
    trapezoidTwister = 0;
    bannerTransformer = 1;


    // colour stuff
    for (let i = 1; i < arrayOfTransactions.length; i++) {
      // if towards green
      if (arrayOfTransactions[i].balance < 0) {
        arrayOfTransactions[i].colourG = 180;
        arrayOfTransactions[i].colourB = p.map(
          Math.abs(arrayOfTransactions[i].balance),
          0,
          arrayOfTransactions[i].totalExchangedSoFar,
          180,
          0
        );
      }
      // if towards blue
      else {
        arrayOfTransactions[i].colourG = p.map(
          Math.abs(arrayOfTransactions[i].balance),
          0,
          arrayOfTransactions[i].totalExchangedSoFar,
          180,
          50
        );
        arrayOfTransactions[i].colourB = 180;
      }
      if (arrayOfTransactions[i].amount < 0) {
        arrayOfTransactions[i].totalReceivedSoFar =
          arrayOfTransactions[i - 1].totalReceivedSoFar +
          Math.abs(arrayOfTransactions[i].amount);
        arrayOfTransactions[i].totalGiftedSoFar =
          arrayOfTransactions[i - 1].totalGiftedSoFar;
      } else {
        arrayOfTransactions[i].totalReceivedSoFar =
          arrayOfTransactions[i - 1].totalReceivedSoFar;
        arrayOfTransactions[i].totalGiftedSoFar =
          arrayOfTransactions[i - 1].totalGiftedSoFar +
          Math.abs(arrayOfTransactions[i].amount);
      }
    }

    // and the final gifted and received
    arrayOfTransactions[arrayOfTransactions.length - 1].totalReceivedSoFar =
      arrayOfTransactions[arrayOfTransactions.length - 2].totalReceivedSoFar;
    arrayOfTransactions[arrayOfTransactions.length - 1].totalGiftedSoFar =
      arrayOfTransactions[arrayOfTransactions.length - 2].totalGiftedSoFar;

    // and the first and last object's coordinates (beginning and end of graph)
    arrayOfTransactions[0].x0 = graphSideMargin;
    arrayOfTransactions[0].y = Yorigin;
    arrayOfTransactions[arrayOfTransactions.length - 1].x0 =
      width - graphSideMargin;
    arrayOfTransactions[arrayOfTransactions.length - 1].y = 0;


    arrayOfTransactions[0].xTrans = arrayOfTransactions[0].x0;
    arrayOfTransactions[0].yTrans = arrayOfTransactions[0].y;
    arrayOfTransactions[arrayOfTransactions.length - 1].xTrans =
      arrayOfTransactions[arrayOfTransactions.length - 1].x0;
    arrayOfTransactions[arrayOfTransactions.length - 1].yTrans =
      arrayOfTransactions[arrayOfTransactions.length - 1].y;


    // filling the objects with their coordinates, colour... on the plot
    for (let i = 0; i < arrayOfTransactions.length - 1; i++) {
      arrayOfTransactions[i].x0 =
        p.map(
          arrayOfTransactions[i].whenValue,
          arrayOfTransactions[0].whenValue,
          arrayOfTransactions[arrayOfTransactions.length - 1].whenValue,
          graphSideMargin,
          width - graphSideMargin
        );
      arrayOfTransactions[i].x =
        sideShifter +
        zoomLoc +
        (arrayOfTransactions[i].x0 + graphSideMargin - zoomLoc) *
        zoomAmount;

      arrayOfTransactions[i].xTrans = arrayOfTransactions[i].x0;
    }

    // last object Xs
    arrayOfTransactions[arrayOfTransactions.length - 1].x =
      sideShifter +
      zoomLoc +
      (arrayOfTransactions[arrayOfTransactions.length - 1].x0 +
        graphSideMargin -
        zoomLoc) *
      zoomAmount;

    // console.log(arrayOfTransactions)
    // console.log(collectionOfFriendsProfilePics)
  }

  p.draw = () => {

    numberOfDotsPerVerticalLine = 30 * Xdistorter;

    // smoothening the zooming in and out's
    for (let i = 0; i < arrayOfTransactions.length; i++) {

      if (transYshifter < finalYshifter && finalYshifter - transYshifter > 1) { transYshifter += (finalYshifter - transYshifter) * 0.05 }
      else if (transYshifter > finalYshifter && finalYshifter - transYshifter < 1) { transYshifter -= (transYshifter - finalYshifter) * 0.05 }

      if (
        arrayOfTransactions[i].x < arrayOfTransactions[i].xTrans &&
        arrayOfTransactions[i].xTrans - arrayOfTransactions[i].x > 1) {
        arrayOfTransactions[i].x += (arrayOfTransactions[i].xTrans - arrayOfTransactions[i].x) * 0.5;
      } else if (arrayOfTransactions[i].x > arrayOfTransactions[i].xTrans &&
        arrayOfTransactions[i].xTrans - arrayOfTransactions[i].x < 1) {
        arrayOfTransactions[i].x -= (arrayOfTransactions[i].x - arrayOfTransactions[i].xTrans) * 0.5;
      }
    }

    // updating the trapezoid coordinates      
    fourCornersOfBackgroundTrapezoid[0] = {
      x: graphSideMargin,
      y: Yorigin - 40 * maxBalanceAdjuster + transYshifter,
    };
    fourCornersOfBackgroundTrapezoid[1] = {
      x: width - graphSideMargin,
      y: Yorigin - 40 * maxBalanceAdjuster + transYshifter,
    };
    fourCornersOfBackgroundTrapezoid[2] = {
      x: width - graphSideMargin,
      y: Yorigin + 40 * maxBalanceAdjuster + transYshifter,
    };
    fourCornersOfBackgroundTrapezoid[3] = {
      x: graphSideMargin,
      y: Yorigin + 40 * maxBalanceAdjuster + transYshifter,
    };

    // working out the verticals (which are subject to the horizontals x)
    for (let i = 0; i < arrayOfTransactions.length; i++) {

      // if maxBalance is zero (if no transactions yet)
      if (!arrayOfTransactions[arrayOfTransactions.length - 1].maxBalance) { arrayOfTransactions[i].y = Yorigin; }
      else {
        arrayOfTransactions[i].y = Yorigin - (p.map(arrayOfTransactions[i].balance * 4, 0, arrayOfTransactions[arrayOfTransactions.length - 1].totalExchangedSoFar, 0, 27)) + transYshifter;
      }

      // Y2
      arrayOfTransactions[i].y2 =
        arrayOfTransactions[i].y +
        ((arrayOfTransactions[i].x - graphSideMargin) * Ydistorter /
          (width - 2 * graphSideMargin)
        );
    }

    // getting the y (which is actually y2, sorry!) for the actual time now (last item on arryOfTransactions)
    if (arrayOfTransactions[arrayOfTransactions.length - 1].balance < 0) {
      arrayOfTransactions[arrayOfTransactions.length - 1].y = Yorigin - (p.map(arrayOfTransactions[arrayOfTransactions.length - 1].balance * maxBalanceAdjuster, 0, arrayOfTransactions[arrayOfTransactions.length - 1].maxBalance, 0, 40)) + transYshifter;
    } else {
      arrayOfTransactions[arrayOfTransactions.length - 1].y = Yorigin + (p.map(arrayOfTransactions[arrayOfTransactions.length - 1].balance * maxBalanceAdjuster, 0, arrayOfTransactions[arrayOfTransactions.length - 1].maxBalance, 0, 40)) + transYshifter;
    }
    // Y2
    arrayOfTransactions[arrayOfTransactions.length - 1].y2 =
      arrayOfTransactions[0].y +
      ((arrayOfTransactions[arrayOfTransactions.length - 1].x - graphSideMargin) * Ydistorter /
        (width - 2 * graphSideMargin)
      );

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------

    // BEGINNING OF ACTUAL DRAWING DRAW!!
    p.clear()
    // noStroke()
    // fill(253, 235, 170, 100)
    // rect(0, 0, 690 * transformer, 500 * transformer, 30 * transformer)

    // BACKGROUND TRAPEZOID
    p.strokeWeight(30 * bannerTransformer);
    p.stroke(250, 216, 140);
    p.fill(250, 216, 140);
    p.beginShape();
    p.vertex(
      (fourCornersOfBackgroundTrapezoid[0].x +
        (Yorigin - fourCornersOfBackgroundTrapezoid[0].y) * Xdistorter) * transformer,
      (fourCornersOfBackgroundTrapezoid[0].y + trapezoidTwister) * transformer
    );
    p.strokeJoin(p.ROUND);
    p.vertex(
      (fourCornersOfBackgroundTrapezoid[1].x +
        (Yorigin - fourCornersOfBackgroundTrapezoid[1].y) * Xdistorter) * transformer,
      ((fourCornersOfBackgroundTrapezoid[1].y +
        ((fourCornersOfBackgroundTrapezoid[1].x - graphSideMargin) *
          Ydistorter) /
        (width - 2 * graphSideMargin) +
        trapezoidTwister)) * transformer
    );
    p.strokeJoin(p.ROUND);
    p.vertex(
      (fourCornersOfBackgroundTrapezoid[2].x +
        (Yorigin - fourCornersOfBackgroundTrapezoid[2].y) * Xdistorter) * transformer,
      (fourCornersOfBackgroundTrapezoid[2].y +
        ((fourCornersOfBackgroundTrapezoid[2].x - graphSideMargin) *
          Ydistorter) /
        (width - 2 * graphSideMargin) -
        trapezoidTwister) * transformer
    );
    p.strokeJoin(p.ROUND);
    p.vertex(
      (fourCornersOfBackgroundTrapezoid[3].x +
        (Yorigin - fourCornersOfBackgroundTrapezoid[3].y) * Xdistorter) * transformer,
      (fourCornersOfBackgroundTrapezoid[3].y - trapezoidTwister) * transformer
    );
    p.strokeJoin(p.ROUND);
    p.vertex(
      (fourCornersOfBackgroundTrapezoid[0].x +
        (Yorigin - fourCornersOfBackgroundTrapezoid[0].y) * Xdistorter) * transformer,
      (fourCornersOfBackgroundTrapezoid[0].y + trapezoidTwister) * transformer
    );
    p.endShape();
    p.noFill();
    p.noStroke();

    // drawing the pic and writing your name
    p.image(
      celina,
      (40 * bannerTransformer) * transformer,
      (height - 195 * bannerTransformer) * transformer,
      (150 * bannerTransformer) * transformer,
      (150 * bannerTransformer) * transformer
    );

    p.textAlign(p.CENTER);
    p.fill(0);
    p.textFont(amaticFont);
    p.textSize(60 * bannerTransformer * transformer);
    p.text("you", (115 * bannerTransformer) * transformer, (height - 210 * bannerTransformer) * transformer);

    if (
      !specificInfoBannerOn ||
      specificInfoBanner === arrayOfTransactions.length - 1
    ) {
      // if (width < height) {    
      p.fill(250, 216, 140)
      p.ellipse(
        (width - 113) * transformer,
        (100) * transformer,
        150 * transformer,
        150 * transformer
      );
      p.fill(241, 184, 88)
      p.ellipse(
        (width - 113) * transformer,
        (100) * transformer,
        75 * transformer,
        75 * transformer
      );
      // }
      // writing "Network"
      p.textAlign(p.CENTER);
      p.fill(0);
      p.textFont(amaticFont);
      p.textSize((48 * 1) * transformer);
      p.text(
        "Network",
        (width - 100 * 1) * transformer,
        (230 * 1) * transformer
      );
    }

    // MIDDLE LINE
    p.stroke(100, 30, 0);
    p.strokeWeight(1 * transformer);
    p.line((graphSideMargin) * transformer,
      (Yorigin + p.map(0, 0, width - 2 * graphSideMargin, 0, Ydistorter)) * transformer,
      (width - graphSideMargin) * transformer,
      (Yorigin + Ydistorter) * transformer);
    p.stroke(150);

    // rectangle bubbles - when you joined
    p.stroke(150, 150, 150);
    p.fill(241, 184, 88, 100);
    p.strokeWeight((4 * 1) * transformer);

    p.rect(
      ((arrayOfTransactions[0].x + (Yorigin - arrayOfTransactions[0].y) * Xdistorter - 120) * 1) * transformer,
      (arrayOfTransactions[0].y2 - 94 * 1) * transformer,
      (200 * 1) * transformer,
      (94 * 1) * transformer,
      (19 * 1) * transformer
    );

    // when you 'signed up' bubble text
    p.noStroke();
    p.fill(0);
    p.textFont(amaticFont);
    p.textSize((40 * 1) * transformer);
    p.textAlign(p.CENTER);

    p.text(
      "You joined WG",
      ((arrayOfTransactions[0].x + (Yorigin - arrayOfTransactions[0].y) * Xdistorter - 20) * 1) * transformer,
      (arrayOfTransactions[0].y2 - 50 * 1) * transformer
    );
    p.textSize((30 * 1) * transformer);
    p.text(
      "On " + dateShortener(arrayOfTransactions[0].when),
      ((arrayOfTransactions[0].x + (Yorigin - arrayOfTransactions[0].y) * Xdistorter - 20) * 1) * transformer,
      (arrayOfTransactions[0].y2 - 15 * 1) * transformer
    );

    // start iterating through all transactions
    for (let i = 0; i < arrayOfTransactions.length - 1; i++) {
      arrayOfTransactions[i].particlePulser = p.map(
        p.sin((-p.frameCount + i * 10) * 0.04),
        0,
        1,
        3,
        3.5
      );

      // stroke();
      p.fill(150);

      // HORIZONTAL LINES (balance) =============================
      p.stroke(
        0,
        arrayOfTransactions[i].colourG,
        arrayOfTransactions[i].colourB
      );
      p.strokeWeight((5 * bannerTransformer) * transformer);

      p.line(
        (arrayOfTransactions[i].x +
          (Yorigin - arrayOfTransactions[i].y) * Xdistorter) * transformer,
        (arrayOfTransactions[i].y2) * transformer,
        (arrayOfTransactions[i + 1].x +
          (Yorigin - arrayOfTransactions[i].y) * Xdistorter) * transformer,
        (arrayOfTransactions[i].y +
          ((arrayOfTransactions[i + 1].x - graphSideMargin) * Ydistorter) /
          (width - 2 * graphSideMargin)) * transformer
      );


      if (i < arrayOfTransactions.length - 2) {
        // VERTICAL LINES ==========================================
        // making more dots if the difference is big
        if (i) {
          numberOfDotsPerVerticalLine = 30 * maxBalanceAdjuster * 0.7;
        }

        for (let j = 0; j < numberOfDotsPerVerticalLine; j++) {
          if (
            arrayOfTransactions[i].balance > arrayOfTransactions[i + 1].balance
          ) {
            colourGgradient =
              Math.floor(
                (Math.abs(
                  arrayOfTransactions[i + 1].colourG -
                  arrayOfTransactions[i].colourG
                ) /
                  numberOfDotsPerVerticalLine) *
                j
              ) + arrayOfTransactions[i].colourG;

            colourBgradient =
              arrayOfTransactions[i].colourB -
              Math.floor(
                (Math.abs(
                  arrayOfTransactions[i + 1].colourB -
                  arrayOfTransactions[i].colourB
                ) /
                  numberOfDotsPerVerticalLine) *
                j
              );
          } else {
            colourGgradient =
              arrayOfTransactions[i].colourG -
              Math.floor(
                (Math.abs(
                  arrayOfTransactions[i + 1].colourG -
                  arrayOfTransactions[i].colourG
                ) /
                  numberOfDotsPerVerticalLine) *
                j
              );

            colourBgradient =
              Math.floor(
                (Math.abs(
                  arrayOfTransactions[i + 1].colourB -
                  arrayOfTransactions[i].colourB
                ) /
                  numberOfDotsPerVerticalLine) *
                j
              ) + arrayOfTransactions[i].colourB;
          }

          p.noStroke();
          p.fill(0, colourGgradient, colourBgradient, 200);

          p.ellipse(
            (arrayOfTransactions[i + 1].x +
              (Yorigin - arrayOfTransactions[i].y) * Xdistorter +
              ((arrayOfTransactions[i + 1].x +
                (Yorigin - arrayOfTransactions[i + 1].y) * Xdistorter -
                (arrayOfTransactions[i + 1].x +
                  (Yorigin - arrayOfTransactions[i].y) * Xdistorter)) /
                numberOfDotsPerVerticalLine) *
              j) * transformer,
            (((arrayOfTransactions[i + 1].y2 -
              (arrayOfTransactions[i].y +
                ((arrayOfTransactions[i + 1].x - graphSideMargin) *
                  Ydistorter) /
                (width - 2 * graphSideMargin))) /
              numberOfDotsPerVerticalLine) *
              j +
              (arrayOfTransactions[i + 1].y +
                ((arrayOfTransactions[i + 1].x - graphSideMargin) *
                  Ydistorter) /
                (width - 2 * graphSideMargin)) -
              (arrayOfTransactions[i + 1].y +
                ((arrayOfTransactions[i + 1].x - graphSideMargin) *
                  Ydistorter) /
                (width - 2 * graphSideMargin)) +
              (arrayOfTransactions[i].y +
                ((arrayOfTransactions[i + 1].x - graphSideMargin) *
                  Ydistorter) /
                (width - 2 * graphSideMargin))) * transformer,
            5 * transformer,
            5 * transformer
          );
        }
      }

      // balance balls --------------------
      // don't draw it in the first instance
      if (i) {
        p.noStroke();
        p.fill(
          0,
          arrayOfTransactions[i].colourG,
          arrayOfTransactions[i].colourB,
          100
        );
        p.ellipse(
          (arrayOfTransactions[i].x +
            (Yorigin - arrayOfTransactions[i].y) * Xdistorter) * transformer,
          (arrayOfTransactions[i].y2) * transformer,
          (10 *
            arrayOfTransactions[i].particlePulser *
            arrayOfTransactions[i].particlePulserEnhancer *
            bannerTransformer) * transformer,
          (10 *
            arrayOfTransactions[i].particlePulser *
            arrayOfTransactions[i].particlePulserEnhancer *
            bannerTransformer) * transformer
        );

        // matt one
        p.fill(
          0,
          arrayOfTransactions[i].colourG,
          arrayOfTransactions[i].colourB
        );
        p.ellipse(
          (arrayOfTransactions[i].x +
            (Yorigin - arrayOfTransactions[i].y) * Xdistorter) * transformer,
          arrayOfTransactions[i].y2 * transformer,
          // map(arrayOfTransactions[i].x - graphSideMargin, 0, width / 2, Yorigin + map(0, 0, width - 2 * graphSideMargin, 0, Ydistorter), Yorigin + Ydistorter),
          22 * bannerTransformer * transformer,
          22 * bannerTransformer * transformer
        );
      }
    }

    // rectangle bubble - NOW
    p.fill(241, 184, 88, 100);
    p.stroke(
      0,
      arrayOfTransactions[arrayOfTransactions.length - 2].colourG,
      arrayOfTransactions[arrayOfTransactions.length - 2].colourB
    );
    p.rect(
      (arrayOfTransactions[arrayOfTransactions.length - 1].x + (Yorigin - arrayOfTransactions[0].y) * Xdistorter) * transformer,
      (arrayOfTransactions[arrayOfTransactions.length - 1].y2 - 17) * transformer,
      90 * bannerTransformer * transformer,
      75 * bannerTransformer * transformer,
      19 * bannerTransformer * transformer
    );

    // NO TRANSACTIONS banner rectangle (if array of Transactions is 2 there are no transactions as the first and last are the signup date and present moment)
    if (arrayOfTransactions.length === 2) {
      p.fill(241, 184, 88, 200);
      p.rect(
        (width * 0.5 - 220 * bannerTransformer) * transformer,
        (height * 0.5 - 100 * bannerTransformer) * transformer,
        440 * bannerTransformer * transformer,
        200 * bannerTransformer * transformer,
        19 * bannerTransformer * transformer
      );
    }

    // 'now' bubble text
    p.noStroke();
    p.fill(0);
    p.textFont(amaticFont);
    p.textSize((45 * bannerTransformer) * transformer);
    p.textAlign(p.CENTER);

    // DESKTOP MODE
    p.text(
      "NOW",
      // arrayOfTransactions[arrayOfTransactions.length - 1].x + 45,
      (arrayOfTransactions[arrayOfTransactions.length - 1].x + (Yorigin - arrayOfTransactions[0].y) * Xdistorter + 45) * transformer,
      (arrayOfTransactions[arrayOfTransactions.length - 1].y2 + 35) * transformer,
    );


    // NO TRANSACTIONS banner text (if array of Transactions is 2 there are no transactions as the first and last are the signup date and present moment)
    if (arrayOfTransactions.length === 2) {
      p.textSize((55 * bannerTransformer) * transformer);
      p.text(
        "You have no exchanges",
        width * 0.5 * transformer,
        (height * 0.5 - 20 * bannerTransformer) * transformer
      );
      p.text(
        "with your network so far.",
        width * 0.5 * transformer,
        (height * 0.5 + 50 * bannerTransformer) * transformer
      );
    }

    // display transactions Info Banner
    for (let i = 1; i < arrayOfTransactions.length - 1; i++) {
      if (
        p.dist(
          (arrayOfTransactions[i].x +
            (Yorigin - arrayOfTransactions[i].y) * Xdistorter) * transformer,
          (arrayOfTransactions[i].y2) * transformer,
          p.mouseX,
          p.mouseY
        ) < 10 * transformer &&
        p.dist(
          (width - graphSideMargin + 25) * transformer,
          (Yorigin + Ydistorter) * transformer,
          p.mouseX,
          p.mouseY
        ) > 25 * transformer
      ) {
        specificInfoBanner = i;
        specificInfoBannerOn = true;
      }
      // the now info banner
      else if (
        p.dist(
          (arrayOfTransactions[arrayOfTransactions.length - 1].x + 45) * transformer,
          (((arrayOfTransactions[arrayOfTransactions.length - 1].x -
            arrayOfTransactions[arrayOfTransactions.length - 1].x0) *
            Ydistorter) /
            (width - 2 * graphSideMargin) +
            Yorigin +
            Ydistorter -
            17 +
            52) * transformer,
          p.mouseX,
          p.mouseY
        ) < 55 * bannerTransformer * transformer
      ) {
        specificInfoBanner = arrayOfTransactions.length - 1;
        specificInfoBannerOn = true;
      }
    }

    // calling the BANNER
    if (
      specificInfoBanner &&
      specificInfoBanner !== arrayOfTransactions.length - 1 &&
      specificInfoBannerOn
    ) {
      displayInfoBanner(specificInfoBanner, p);
    }
    // the now banner
    else if (
      specificInfoBanner === arrayOfTransactions.length - 1 &&
      specificInfoBannerOn
    ) {
      displayInfoBanner(specificInfoBanner, p);
    }
  }

  //  // FUNCTION KEY PRESSED ==========================
  //   function keyPressed () {
  //     // widen
  //     if (key === "]") { maxBalanceAdjuster ++; }
  //     // narrow
  //     else if (key === "[" && maxBalanceAdjuster > 2) { maxBalanceAdjuster--; }

  //     // Y distorter - 
  //     else if (key === "-") {
  //       finalYshifter += 10;
  //     }
  //     // Y distorter + 
  //     else if (key === "=") {
  //       finalYshifter -= 10;
  //     }
  //     // reset values
  //     else if (key === "0") {
  //       zoomAmount = 1;
  //       sideShifter = -150;
  //       if (width < height) { maxBalanceAdjuster = 1.3 }
  //       else { maxBalanceAdjuster = 2; }

  //       for (let i = 0; i < arrayOfTransactions.length; i++) {
  //         arrayOfTransactions[i].xTrans =
  //           sideShifter +
  //           zoomLoc +
  //           (arrayOfTransactions[i].x0 + graphSideMargin - zoomLoc) * zoomAmount;
  //       }
  //     }
  p.doubleClicking = () => {

    let clickedOnAtransaction = false;
    for (let i = 0; i < arrayOfTransactions.length; i++) {

      if (width < height) {
        if (p.dist(
          p.mouseX,
          p.mouseY,
          (arrayOfTransactions[i].x + (Yorigin - arrayOfTransactions[i].y) * Xdistorter) * transformer,
          (p.map(
            arrayOfTransactions[i].x - graphSideMargin,
            0,
            width - graphSideMargin * 2,
            Yorigin + p.map(0, 0, width - 2 * graphSideMargin, 0, Ydistorter),
            Yorigin + Ydistorter
          )) * transformer) < 10) {
          clickedOnAtransaction = true;
          zoomLoc = arrayOfTransactions[i].x
          zoomAmount += 0.1;

          for (let j = 0; j < arrayOfTransactions.length; j++) {
            arrayOfTransactions[j].xTrans =
              arrayOfTransactions[j].x - ((zoomLoc - arrayOfTransactions[j].x) * zoomAmount * 0.4);
          }
        }
      } else
      // DESKTOP MODE
      {
        if (p.dist(
          p.mouseX,
          p.mouseY,
          (arrayOfTransactions[i].x + (Yorigin - arrayOfTransactions[i].y) * Xdistorter) * transformer,
          arrayOfTransactions[i].y2 * transformer) < 10 * transformer) {

          clickedOnAtransaction = true;
          zoomLoc = arrayOfTransactions[i].x
          zoomAmount += 0.1;

          for (let j = 0; j < arrayOfTransactions.length; j++) {
            arrayOfTransactions[j].xTrans =
              arrayOfTransactions[j].x - ((zoomLoc - arrayOfTransactions[j].x) * zoomAmount * 0.4);
          }
        }
      }
      // resetting the values by double-clicking anywhere else
      if (i === arrayOfTransactions.length - 1 && !clickedOnAtransaction) {
        // console.log('here')
        zoomAmount = 1;
        sideShifter = -150;
        finalYshifter = 0;
        // if (width < height) { maxBalanceAdjuster = 1.3 }
        // else { maxBalanceAdjuster = 1.3; }

        for (let i = 0; i < arrayOfTransactions.length; i++) {
          arrayOfTransactions[i].xTrans =
            sideShifter +
            zoomLoc +
            (arrayOfTransactions[i].x0 + graphSideMargin - zoomLoc) *
            zoomAmount;
        }
      }
    }
  }
  // -----------------------------------------------------------------------------
  p.mousePressed = () => {

    if (specificInfoBannerOn && p.dist(p.mouseX, p.mouseY, (width - 187) * transformer * bannerTransformer, 94.5 * transformer) > 100 * transformer) {
      specificInfoBannerOn = false;
      arrayOfTransactions.forEach((element) => {
        element.particlePulserEnhancer = 1;
      });
    }

    if (specificInfoBanner && p.dist(p.mouseX, p.mouseY, (width - 187) * transformer * bannerTransformer, 94.5 * transformer) < 100 * transformer) {

      timeLedgerUserIDnetworkLedger = arrayOfTransactions[specificInfoBanner].fromLedger;
    }

  }

  // -----------------------------------------------------------------------------------------------------

  p.mouseWheel = (event) => {
    verticalScroll = event.delta;

    if (zoomAmount > 1)

      for (let i = 0; i < arrayOfTransactions.length; i++) {
        arrayOfTransactions[i].xTrans += verticalScroll * zoomAmount * 0.5;
      }
  };

}

// -----------------------------------------------------------------------------------------------------


// -----------------------------------------------------------------------------------------------------

function parsingPrivateLedger(datewhenUserSignedUp, usersPrivateLedger) {
  let parsingTheLedgerArray = [];
  let transitionArray = [];
  let p5FriendlyArrayForTheLedgerArray = [];
  let maxBalance = 0;

  // pushing the signUp Date
  parsingTheLedgerArray.push({
    transactionID: "This is actually the signUp date",
    whenValue: Date.parse(datewhenUserSignedUp) / 1000,
    when: datewhenUserSignedUp,
    amount: 0,
    balance: 0,
    totalGiftedSoFar: 0,
    totalReceivedSoFar: 0,
  });

  // pushing the transactions
  Object.keys(usersPrivateLedger).forEach(element0 => {

    // received  (amount in negative as Y increases going down)
    if (usersPrivateLedger[element0].receivedFromItemised) {
      Object.keys(usersPrivateLedger[element0].receivedFromItemised).forEach(
        (element) => {
          let transactionObjectToBePushed = {};
          transactionObjectToBePushed.transactionID = element;
          transactionObjectToBePushed.amount = Math.round(-usersPrivateLedger[element0]
            .receivedFromItemised[element].amount);
          transactionObjectToBePushed.whenValue =
            Date.parse(
              usersPrivateLedger[element0].receivedFromItemised[element].when
            ) * 0.001;
          transactionObjectToBePushed.when =
            usersPrivateLedger[element0].receivedFromItemised[element].when;
          transactionObjectToBePushed.totalGiftedSoFar = 0;
          transactionObjectToBePushed.totalReceivedSoFar = 0;
          transactionObjectToBePushed.requestMessage =
            parsingRequestMessage(usersPrivateLedger[element0].receivedFromItemised[element].requestMessage);
          transactionObjectToBePushed.requestWhen =
            usersPrivateLedger[element0].receivedFromItemised[
              element
            ].requestWhen;
          transactionObjectToBePushed.particlePulserEnhancer = 1;
          transactionObjectToBePushed.userDisplayName =
            usersPrivateLedger[element0].userDisplayName;
          transactionObjectToBePushed.fromLedger = element0;

          parsingTheLedgerArray.push(transactionObjectToBePushed);
        }
      );
    }

    // given
    if (usersPrivateLedger[element0].givenToItemised) {
      Object.keys(usersPrivateLedger[element0].givenToItemised).forEach(
        (element) => {
          let transactionObjectToBePushed = {};
          transactionObjectToBePushed.transactionID = element;
          transactionObjectToBePushed.amount =
            Math.round(usersPrivateLedger[element0].givenToItemised[element].amount);
          transactionObjectToBePushed.whenValue =
            Date.parse(
              usersPrivateLedger[element0].givenToItemised[element].when
            ) * 0.001;
          transactionObjectToBePushed.when =
            usersPrivateLedger[element0].givenToItemised[element].when;
          transactionObjectToBePushed.totalGiftedSoFar = 0;
          transactionObjectToBePushed.totalReceivedSoFar = 0;
          transactionObjectToBePushed.requestMessage =
            transactionObjectToBePushed.requestMessage =
            parsingRequestMessage(usersPrivateLedger[element0].givenToItemised[element].requestMessage);
          transactionObjectToBePushed.requestWhen =
            usersPrivateLedger[element0].givenToItemised[element].requestWhen;
          transactionObjectToBePushed.particlePulserEnhancer = 1;
          transactionObjectToBePushed.userDisplayName =
            usersPrivateLedger[element0].userDisplayName;
          transactionObjectToBePushed.fromLedger = element0;

          parsingTheLedgerArray.push(transactionObjectToBePushed);
        }
      );
    }
  });

  // pushing the last , the current date with max value
  parsingTheLedgerArray.push({
    transactionID: "This is actually the current moment",
    whenValue: Math.floor(Date.parse("Wed Sep 2 2020 18:04:30 GMT+0100 (British Summer Time)") / 1000),
    when: "Wed Sep 2 2020 18:04:30 GMT+0100 (British Summer Time)",
    amount: 0,
    totalGiftedSoFar: 0,
    totalReceivedSoFar: 0,
    userDisplayName: "Network",
  });

  // creating the p5 friendly object: an array of objects with the date in order and the balance amount
  parsingTheLedgerArray.forEach((element) => {
    transitionArray.push(element.whenValue);
  });

  // ordering them:
  transitionArray.sort(function (a, b) {
    return a - b;
  });

  // and calculating the 'evolving balance' as it writes in the final p5 friendly array
  // (reversing the amount from negatives for positives and viceversa as Y goes down)
  for (let i = 0; i < transitionArray.length; i++) {
    parsingTheLedgerArray.forEach((element) => {
      if (element.whenValue === transitionArray[i]) {
        p5FriendlyArrayForTheLedgerArray.push(element);
        if (i === 1) {
          p5FriendlyArrayForTheLedgerArray[
            p5FriendlyArrayForTheLedgerArray.length - 1
          ].balance =
            p5FriendlyArrayForTheLedgerArray[
              p5FriendlyArrayForTheLedgerArray.length - 1
            ].amount;
          p5FriendlyArrayForTheLedgerArray[
            p5FriendlyArrayForTheLedgerArray.length - 1
          ].totalExchangedSoFar = Math.abs(
            p5FriendlyArrayForTheLedgerArray[
              p5FriendlyArrayForTheLedgerArray.length - 1
            ].amount
          );
        }
        if (i > 1) {
          p5FriendlyArrayForTheLedgerArray[
            p5FriendlyArrayForTheLedgerArray.length - 1
          ].balance =
            p5FriendlyArrayForTheLedgerArray[
              p5FriendlyArrayForTheLedgerArray.length - 1
            ].amount +
            p5FriendlyArrayForTheLedgerArray[
              p5FriendlyArrayForTheLedgerArray.length - 2
            ].balance;
          p5FriendlyArrayForTheLedgerArray[
            p5FriendlyArrayForTheLedgerArray.length - 1
          ].totalExchangedSoFar =
            Math.abs(
              p5FriendlyArrayForTheLedgerArray[
                p5FriendlyArrayForTheLedgerArray.length - 1
              ].amount
            ) +
            Math.abs(
              p5FriendlyArrayForTheLedgerArray[
                p5FriendlyArrayForTheLedgerArray.length - 2
              ].totalExchangedSoFar
            );
        }
      }
    });
  }

  // setting the maxBalance
  p5FriendlyArrayForTheLedgerArray.forEach((element) => {
    if (Math.abs(element.balance) > maxBalance) {
      maxBalance = Math.abs(element.balance);
    }
  });
  // and pushing it to the last object of the array
  p5FriendlyArrayForTheLedgerArray[
    p5FriendlyArrayForTheLedgerArray.length - 1
  ].maxBalance = maxBalance;

  arrayOfTransactions = p5FriendlyArrayForTheLedgerArray;
}
// -----------------------------------------------------------------------------------------------------

function displayInfoBanner(indexInArrayOfTransactions, p) {

  arrayOfTransactions.forEach((element) => {
    element.particlePulserEnhancer = 1;
  });
  arrayOfTransactions[indexInArrayOfTransactions].particlePulserEnhancer = 3;

  p.noStroke();
  p.fill(0, arrayOfTransactions[indexInArrayOfTransactions].colourG, arrayOfTransactions[indexInArrayOfTransactions].colourB, 150);

  // for all but the last item in the array (the NOW)
  if (indexInArrayOfTransactions !== arrayOfTransactions.length - 1) {
    if (arrayOfTransactions[indexInArrayOfTransactions].amount < 0) {
      infoBannerXshifter = width - 595 * bannerTransformer;
      infoBannerYshifter = 20;
      helpRequestBannerXShifter = 180 * bannerTransformer;
      helpRequestBannerYShifter = height - 180 * bannerTransformer;
    } else {
      infoBannerXshifter = 180 * bannerTransformer;
      infoBannerYshifter = height - 205 * bannerTransformer;
      helpRequestBannerXShifter = width - 595 * bannerTransformer;
      helpRequestBannerYShifter = 20 + 20 * bannerTransformer;
    }
  } else {
    // if it is the NOW banner (last item in array)
    infoBannerXshifter = width - 450;
    infoBannerYshifter = Yorigin + Ydistorter - 65;

  }
  // friend's pic on top right corner
  if (indexInArrayOfTransactions !== arrayOfTransactions.length - 1)
    p.image(collectionOfFriendsProfilePics[arrayOfTransactions[indexInArrayOfTransactions].fromLedger],
      (width - 187 * bannerTransformer) * transformer,
      25 * transformer,
      150 * bannerTransformer * transformer,
      150 * bannerTransformer * transformer
    );

  // writing the name
  p.textAlign(p.CENTER);
  p.fill(0);
  p.textFont(amaticFont);
  p.textSize(48 * bannerTransformer * transformer);
  p.text(
    nameShortener(arrayOfTransactions[indexInArrayOfTransactions].userDisplayName),
    (width - 100 * bannerTransformer) * transformer,
    230 * bannerTransformer * transformer
  );

  // RECTANGLE
  if (indexInArrayOfTransactions === arrayOfTransactions.length - 1) {
    p.stroke(
      0,
      arrayOfTransactions[indexInArrayOfTransactions].colourG,
      arrayOfTransactions[indexInArrayOfTransactions].colourB
    );
    p.fill(255, 255, 255);
    p.rect(infoBannerXshifter * transformer, infoBannerYshifter * transformer, 420 * bannerTransformer * transformer,
      165 * bannerTransformer * transformer,
      30 * bannerTransformer * transformer);
  } else {
    p.stroke(
      0,
      arrayOfTransactions[indexInArrayOfTransactions].colourG,
      arrayOfTransactions[indexInArrayOfTransactions].colourB
    );
    p.fill(255, 255, 255);
    p.rect(
      infoBannerXshifter * transformer,
      infoBannerYshifter * transformer,
      420 * bannerTransformer * transformer,
      165 * bannerTransformer * transformer,
      30 * bannerTransformer * transformer
    );
  }

  // COLOUR BAR
  // green to turquoise
  // length of bar is 290 * bannerTransformer
  for (let i = 0; i < 135 * bannerTransformer; i++) {
    p.stroke(
      0,
      180,
      p.int(p.map(i, 0, 135 * bannerTransformer, 0, 180)),
      150
    );
    p.line(
      (75 * bannerTransformer + i + infoBannerXshifter) * transformer,
      (111 * bannerTransformer + infoBannerYshifter) * transformer,
      (75 * bannerTransformer + i + infoBannerXshifter) * transformer,
      (131 * bannerTransformer + infoBannerYshifter) * transformer
    );
  }
  // turquoise to blue
  for (let i = 135 * bannerTransformer; i < 270 * bannerTransformer; i++) {
    p.stroke(
      0,
      p.int(
        p.map(i, 135 * bannerTransformer, 270 * bannerTransformer, 180, 50)
      ),
      180,
      150
    );
    p.line(
      (75 * bannerTransformer + i + infoBannerXshifter) * transformer,
      (111 * bannerTransformer + infoBannerYshifter) * transformer,
      (75 * bannerTransformer + i + infoBannerXshifter) * transformer,
      (131 * bannerTransformer + infoBannerYshifter) * transformer
    );
  }

  // FADER - text and fader <<< --------
  p.noStroke();
  p.fill(0);

  p.textFont(cabinSketchFont);
  p.textAlign(p.CENTER);
  p.textSize(22 * bannerTransformer * transformer);

  // fader
  // top triangle gauge
  p.fill(0, arrayOfTransactions[indexInArrayOfTransactions].colourG, arrayOfTransactions[indexInArrayOfTransactions].colourB);
  p.stroke(255);
  p.strokeWeight(3.5 * bannerTransformer * transformer);
  p.triangle(
    (75 * bannerTransformer +
      p.map(
        arrayOfTransactions[indexInArrayOfTransactions].balance,
        0, arrayOfTransactions[indexInArrayOfTransactions].totalExchangedSoFar,
        135 * bannerTransformer,
        270 * bannerTransformer
      ) + infoBannerXshifter) * transformer, // ----

    (102 * bannerTransformer + infoBannerYshifter + 18 * bannerTransformer) * transformer,
    // -----------

    (75 * bannerTransformer +
      p.map(
        arrayOfTransactions[indexInArrayOfTransactions].balance,
        0, arrayOfTransactions[indexInArrayOfTransactions].totalExchangedSoFar,
        135 * bannerTransformer,
        270 * bannerTransformer
      ) + infoBannerXshifter + 17 * bannerTransformer) * transformer, // ----

    (102 * bannerTransformer + infoBannerYshifter) * transformer,
    // ----------

    (75 * bannerTransformer +
      p.map(
        arrayOfTransactions[indexInArrayOfTransactions].balance,
        0, arrayOfTransactions[indexInArrayOfTransactions].totalExchangedSoFar,
        135 * bannerTransformer,
        270 * bannerTransformer
      ) +
      infoBannerXshifter - 17 * bannerTransformer) * transformer, // -----

    (102 * bannerTransformer + infoBannerYshifter) * transformer
  );


  // images and spheres (and user's and friend's names)
  // USER'S BALL AND PHOTO
  p.image(
    celina,
    (infoBannerXshifter + 16 * bannerTransformer) * transformer,
    (infoBannerYshifter + 90 * bannerTransformer) * transformer,
    60 * bannerTransformer * transformer,
    60 * bannerTransformer * transformer
  );


  // triangle hovering switch (distance to bottom vertex of triangle)
  if (p.dist(p.mouseX, p.mouseY,
    // triangle bottomx vertex X
    (75 * bannerTransformer +
      p.map(
        arrayOfTransactions[indexInArrayOfTransactions].balance,
        0,
        arrayOfTransactions[indexInArrayOfTransactions].totalExchangedSoFar,
        135 * bannerTransformer,
        270 * bannerTransformer
      ) + infoBannerXshifter) * transformer,
    // triangle bottomx vertex Y
    (102 * bannerTransformer + infoBannerYshifter + 15 * bannerTransformer) * transformer) < 20 * transformer) {

    if (width < height) { rightShifter = 9 } else { rightShifter = 0 };
    // IF BALANCE IS ZERO
    if (!arrayOfTransactions[indexInArrayOfTransactions].balance) {
      // fader
      // and the rectangle background for the balance number
      p.noStroke()
      p.rect(
        ((64 + rightShifter) * bannerTransformer +
          p.map(
            arrayOfTransactions[indexInArrayOfTransactions].balance,
            0,
            arrayOfTransactions[indexInArrayOfTransactions].totalExchangedSoFar,
            135 * bannerTransformer,
            270 * bannerTransformer
          ) +
          infoBannerXshifter - 20) * transformer,
        (80 * bannerTransformer + infoBannerYshifter) * transformer,
        60 * bannerTransformer * transformer,
        26 * bannerTransformer * transformer,
        4 * bannerTransformer * transformer
      );
      p.fill(255);
      p.text(
        "£ 0",
        75 * bannerTransformer +
        p.map(
          arrayOfTransactions[indexInArrayOfTransactions].balance,
          0, arrayOfTransactions[indexInArrayOfTransactions].totalExchangedSoFar,
          135 * bannerTransformer,
          270 * bannerTransformer
        ) + infoBannerXshifter,
        100 * bannerTransformer + infoBannerYshifter
      );
      // }

      // IF BALANCE IS GREATER THAN ZERO
    } else if (arrayOfTransactions[indexInArrayOfTransactions].balance > 0) {
      // and the rectangle background for the balance number
      p.noStroke();
      p.rect(
        ((64 + rightShifter) * bannerTransformer +
          p.map(
            arrayOfTransactions[indexInArrayOfTransactions].balance,
            0,
            arrayOfTransactions[indexInArrayOfTransactions].totalExchangedSoFar,
            135 * bannerTransformer,
            270 * bannerTransformer
          ) +
          infoBannerXshifter - 20) * transformer,
        (80 * bannerTransformer + infoBannerYshifter) * transformer,
        60 * bannerTransformer * transformer,
        26 * bannerTransformer * transformer,
        4 * bannerTransformer * transformer
      );
      p.fill(255);
      p.text(
        "£" + arrayOfTransactions[indexInArrayOfTransactions].balance + ">",
        (75 * bannerTransformer +
          p.map(
            arrayOfTransactions[indexInArrayOfTransactions].balance,
            0,
            arrayOfTransactions[indexInArrayOfTransactions].totalExchangedSoFar,
            135 * bannerTransformer,
            270 * bannerTransformer
          ) +
          infoBannerXshifter) * transformer,
        (100 * bannerTransformer + infoBannerYshifter) * transformer
      );
      // }

      // IF BALANCE IS LOWER THAN ZERO
    } else if (arrayOfTransactions[indexInArrayOfTransactions].balance < 0) {
      // if (indexInArrayOfTransactions === arrayOfTransactions.length - 1) {
      // and the rectangle background for the balance number
      p.noStroke();
      p.rect(
        ((64 + rightShifter) * bannerTransformer +
          p.map(
            arrayOfTransactions[indexInArrayOfTransactions].balance,
            0,
            arrayOfTransactions[indexInArrayOfTransactions].totalExchangedSoFar,
            135 * bannerTransformer,
            270 * bannerTransformer
          ) +
          infoBannerXshifter - 20) * transformer,
        (80 * bannerTransformer + infoBannerYshifter) * transformer,
        60 * bannerTransformer * transformer,
        26 * bannerTransformer * transformer,
        4 * bannerTransformer * transformer
      );
      p.fill(255);
      p.text(
        "<£" + Math.abs(arrayOfTransactions[indexInArrayOfTransactions].balance),
        (75 * bannerTransformer +
          p.map(
            arrayOfTransactions[indexInArrayOfTransactions].balance,
            0,
            arrayOfTransactions[indexInArrayOfTransactions].totalExchangedSoFar,
            135 * bannerTransformer,
            270 * bannerTransformer
          ) +
          infoBannerXshifter) * transformer,
        (100 * bannerTransformer + infoBannerYshifter) * transformer
      );
      // }
    }
  }

  // network simbol (CF and FF areas)
  // network glow
  //     fill (0, arrayOfTransactions[indexInArrayOfTransactions].colourG,
  //     arrayOfTransactions[indexInArrayOfTransactions].colourB, 180)

  //     noStroke()
  //       ellipse (
  //     (infoBannerXshifter + 375 * bannerTransformer) * transformer,
  //     (infoBannerYshifter + 119 * bannerTransformer) * transformer,
  //         (45 + (8 * arrayOfTransactions[18].particlePulser)) * transformer,
  //         (45 + (8 * arrayOfTransactions[18].particlePulser)) * transformer)
  p.noStroke()
  p.fill(250, 216, 140)
  p.ellipse(
    (infoBannerXshifter + 375 * bannerTransformer) * transformer,
    (infoBannerYshifter + 119 * bannerTransformer) * transformer,
    60 * bannerTransformer * transformer,
    60 * bannerTransformer * transformer
  );
  p.fill(241, 184, 88)
  p.ellipse(
    (infoBannerXshifter + 375 * bannerTransformer) * transformer,
    (infoBannerYshifter + 119 * bannerTransformer) * transformer,
    30 * bannerTransformer * transformer,
    30 * bannerTransformer * transformer
  );
  // amounts exchanged and all that
  p.textFont(amaticFont);
  p.textAlign(p.LEFT);
  p.textSize(32 * transformer);
  p.fill(0);

  if (indexInArrayOfTransactions === arrayOfTransactions.length - 1) {
    p.textSize((32 * bannerTransformer) * transformer);
    p.text(
      `On ${dateShortener(
        arrayOfTransactions[arrayOfTransactions.length - 1].when
      )}: `,
      (30 * bannerTransformer + infoBannerXshifter) * transformer,
      (38 * bannerTransformer + infoBannerYshifter) * transformer
    );

    p.textSize((37 * bannerTransformer) * transformer);
    p.text(
      "GIVEN:",
      (30 * bannerTransformer + infoBannerXshifter) * transformer,
      (75 * bannerTransformer + infoBannerYshifter) * transformer
    );
    p.text(
      "RECEIVED:",
      (215 * bannerTransformer + infoBannerXshifter) * transformer,
      (75 * bannerTransformer + infoBannerYshifter) * transformer
    );
  } else {
    p.textAlign(p.LEFT);
    p.textFont(amaticFont);
    p.fill(30);
    p.noStroke();
    p.textSize((32 * bannerTransformer) * transformer);
    p.text(
      `On ${dateShortener(
        arrayOfTransactions[indexInArrayOfTransactions].when
      )}`,
      (infoBannerXshifter + 30 * bannerTransformer) * transformer,
      (infoBannerYshifter + 37 * bannerTransformer) * transformer
    );
    p.textSize((37 * bannerTransformer) * transformer);

    if (arrayOfTransactions[indexInArrayOfTransactions].amount > 0) {
      p.text(
        `You helped ${nameShortener(arrayOfTransactions[indexInArrayOfTransactions].userDisplayName)} with:`,
        (infoBannerXshifter + 34 * bannerTransformer) * transformer,
        (infoBannerYshifter + 75 * bannerTransformer) * transformer
      );

      p.noStroke()
      p.fill(250, 216, 140)
      p.ellipse(
        (infoBannerXshifter + 375 * bannerTransformer) * transformer,
        (infoBannerYshifter + 119 * bannerTransformer) * transformer,
        60 * bannerTransformer * transformer,
        60 * bannerTransformer * transformer
      );
      p.fill(241, 184, 88)
      p.ellipse(
        (infoBannerXshifter + 375 * bannerTransformer) * transformer,
        (infoBannerYshifter + 119 * bannerTransformer) * transformer,
        30 * bannerTransformer * transformer,
        30 * bannerTransformer * transformer
      );
      p.noFill()
    } else {
      p.text(
        `${nameShortener(arrayOfTransactions[indexInArrayOfTransactions].userDisplayName)} helped you with:`,
        (infoBannerXshifter + 30 * bannerTransformer) * transformer,
        (infoBannerYshifter + 75 * bannerTransformer) * transformer
      );
    }

    // textAlign(LEFT);
    p.textFont(cabinSketchFont);
    p.fill(0)
    p.text(`£${Math.abs(arrayOfTransactions[indexInArrayOfTransactions].amount)}`,
      (infoBannerXshifter + 320 * bannerTransformer) * transformer,
      (infoBannerYshifter + 75 * bannerTransformer) * transformer
    );
  }

  if (indexInArrayOfTransactions === arrayOfTransactions.length - 1) {

    p.textFont(cabinSketchFont);
    p.textAlign(p.LEFT);
    p.textSize(31 * bannerTransformer * transformer);
    p.fill(0, 30, 150)
    p.text(
      "£" + arrayOfTransactions[indexInArrayOfTransactions].totalGiftedSoFar,
      (110 * bannerTransformer + infoBannerXshifter) * transformer,
      (72 * bannerTransformer + infoBannerYshifter) * transformer
    );
    p.fill(0, 150, 30)
    p.text(
      "£" + arrayOfTransactions[indexInArrayOfTransactions].totalReceivedSoFar,
      (310 * bannerTransformer + infoBannerXshifter) * transformer,
      (72 * bannerTransformer + infoBannerYshifter) * transformer
    );
    p.textSize(21 * bannerTransformer);
    p.noFill()
    p.text(
      "£" + arrayOfTransactions[indexInArrayOfTransactions].totalExchangedSoFar,
      (220 * bannerTransformer + infoBannerXshifter) * transformer,
      (155 * bannerTransformer + infoBannerYshifter) * transformer
    );
  }
  p.noStroke();
  p.noFill();

  if (indexInArrayOfTransactions !== arrayOfTransactions.length - 1) {
    // if you are getting money
    if (arrayOfTransactions[indexInArrayOfTransactions].amount < 0) {
      // you speaking bubble
      p.stroke(150, 150, 150);
      p.fill(255);
      // rectangle bubble speaking
      p.rect(helpRequestBannerXShifter * transformer, helpRequestBannerYShifter * transformer, 420 * bannerTransformer * transformer,
        120 * bannerTransformer * transformer,
        30 * bannerTransformer * transformer);

      // text
      p.textAlign(p.LEFT);
      p.textFont(amaticFont);
      p.fill(30);
      p.noStroke();
      p.textSize(32 * bannerTransformer * transformer);
      p.text(
        `On ${dateShortener(
          arrayOfTransactions[indexInArrayOfTransactions].requestWhen
        )} you asked for help`,
        (helpRequestBannerXShifter + 20 * bannerTransformer) * transformer,
        (helpRequestBannerYShifter + 40 * bannerTransformer) * transformer
      );
      p.textSize(49 * bannerTransformer * transformer);

      displayRequestMessage(indexInArrayOfTransactions, p)
    }
    // if you are giving money
    else {
      // your friend speaking bubble
      p.stroke(150, 150, 150);
      p.fill(255);
      // rectangle bubble speaking
      p.rect(helpRequestBannerXShifter * transformer, helpRequestBannerYShifter * transformer, 420 * bannerTransformer * transformer, 120 * bannerTransformer * transformer, 30 * bannerTransformer * transformer);

      // text
      p.textAlign(p.LEFT);
      p.textFont(amaticFont);
      p.fill(30);
      p.noStroke();
      p.textSize(30 * bannerTransformer * transformer);
      p.text(
        `On ${dateShortener(
          arrayOfTransactions[indexInArrayOfTransactions].requestWhen)} ${nameShortener(arrayOfTransactions[indexInArrayOfTransactions].userDisplayName)} asked for help...`,
        (helpRequestBannerXShifter + 20 * bannerTransformer) * transformer,
        (helpRequestBannerYShifter + 40 * bannerTransformer) * transformer);
      p.textSize(49 * bannerTransformer * transformer);
      displayRequestMessage(indexInArrayOfTransactions, p)
    }
    p.noStroke();
    p.noFill();
  }
}

// -----------------------------------------------------------------------------------------------------
function dateShortener(longFormatDate) {
  // shorten the date format
  let shortenedWhen = longFormatDate;
  let counterOfBlankSpaces = 0;

  for (let i = 0; i < shortenedWhen.length; i++) {
    if (shortenedWhen.charAt(i) === " ") {
      counterOfBlankSpaces++;
    }
    if (counterOfBlankSpaces === 4) {
      // change from 4 to 5 to include time
      shortenedWhen = shortenedWhen.slice(0, i + 1);
    }
  }
  return shortenedWhen;
}

// -----------------------------------------------------------------------------------------------------
function nameShortener(nameString) {
  if (nameString.length > 9) {
    if (nameString.includes(" ")) {
      for (let i = 0; i < nameString.length; i++) {
        if (nameString.charAt(i) === " ") {
          return `${nameString.slice(0, i)} ${nameString.charAt(i + 1)}.`;
        }
      }
    } else if (nameString.length === 10) {
      return nameString.slice(0, 10);
    } else {
      return nameString.slice(0, 10) + ".";
    }
  } else {
    return nameString;
  }
}
// -----------------------------------------------------------------------------------------------------
function displayRequestMessage(indexInArrayOfTransactions, p) {
  let message = arrayOfTransactions[indexInArrayOfTransactions].requestMessage;

  p.textFont(josefinSansFont)
  p.textAlign(p.CENTER)
  if (message.splitMessage2) {
    // if it's longer than 30 characters
    p.textSize(20 * bannerTransformer * transformer)
    p.text(
      `"${message.splitMessage1}`,
      (helpRequestBannerXShifter + 200 * bannerTransformer) * transformer,
      (helpRequestBannerYShifter + 70 * bannerTransformer) * transformer
    );
    p.text(
      `${message.splitMessage2}"`,
      (helpRequestBannerXShifter + 200 * bannerTransformer) * transformer,
      (helpRequestBannerYShifter + 100 * bannerTransformer) * transformer
    )
  } else {
    // if it's shorter than 25 characters
    p.textAlign(p.CENTER)
    p.textSize(23 * bannerTransformer * transformer)
    p.text(`"${message.splitMessage1}"`,
      (helpRequestBannerXShifter + 200 * bannerTransformer) * transformer,
      (helpRequestBannerYShifter + 84 * bannerTransformer) * transformer
    );
  }
}

// -----------------------------------------------------------------------------------------------------
function parsingRequestMessage(message) {

  let objectToBeReturned = {}

  if (message.length > 30) {
    // if it's longer than 30 characters
    let splitter
    let splitter2
    // let splitMessage1
    // let splitMessage2
    // let splitMessage3

    for (let i = 30; i > 0; i--) {
      if (message.charAt(i) === " ") {
        splitter = i
        break
      }
    }
    objectToBeReturned.splitMessage1 = message.slice(0, splitter)
    objectToBeReturned.splitMessage2 = message.slice(splitter)

    if (message.length > 60) {
      // if message is longer than 60 characters
      for (let j = 60; j > 30; j--) {
        if (message.charAt(j) === " ") {
          splitter2 = j
          break
        }
      }
      objectToBeReturned.splitMessage2 = message.slice(splitter, splitter2) + "..."
    }
  } else {
    // if it's shorter than 25 characters
    objectToBeReturned.splitMessage1 = message
  }

  return objectToBeReturned
}
// -----------------------------------------------------------------------------------------------------

let privateLedgers = {

  privateLedgerWithUser1: {
    userDisplayName: "Festus",
    receivedFromItemised: {
      transaction1: {
        amount: 34,
        when: "Wed Jul 1 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "I would appreciate help to pay for a really cool training course. Thanks!",
        requestWhen: "Wed Jul 1 2020 12:04:30 GMT+0100 (British Summer Time)"
      },
      transaction2: {
        amount: 16,
        when: "Sun Aug 2 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "I was ill for three days.",
        requestWhen: "Sat Aug 1 2020 18:04:30 GMT+0100 (British Summer Time)"
      },
      transaction3: {
        amount: 9,
        when: "Thu May 21 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "I've had so many unexpected expenses this month!",
        requestWhen: "Mon May 18 2020 18:04:30 GMT+0100 (British Summer Time)"
      },
      transaction4: {
        amount: 4,
        when: "Thu Aug 28 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "Some clients cancelled in advance.",
        requestWhen: "Mon Aug 17 2020 18:04:30 GMT+0100 (British Summer Time)"
      }
    },

    givenToItemised: {
      transaction5: {
        amount: 9,
        when: "Fri Jun 5 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "Help for new laptop. Ta!",
        requestWhen: "Fri Jun 8 2020 18:04:30 GMT+0100 (British Summer Time)"
      },
      transaction7: {
        amount: 5,
        when: "Sat Jun 22 2020 18:04:29 GMT+0100 (British Summer Time)",
        requestMessage: "I was ill for two days and couldn't go to work",
        requestWhen: "Wed Jun 10 2020 18:04:29 GMT+0100 (British Summer Time)"
      },
      transaction8: {
        amount: 12,
        when: "Sat Jul 17 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "Got a bit tight this month. So many unexpected costs",
        requestWhen: "Sat Jul 18 2020 9:04:35 GMT+0100 (British Summer Time)"
      }
    }
  },

  privateLedgerWithUser2: {
    userDisplayName: "Jason",
    receivedFromItemised: {
      transaction1: {
        amount: 6,
        when: "Sun Jul 5 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "I would appreciate help to pay for a really cool training course. Thanks! ",
        requestWhen: "Wed Jul 1 2020 12:04:30 GMT+0100 (British Summer Time)"
      },
      transaction2: {
        amount: 14,
        when: "Mon Aug 3 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "I was ill for three days.",
        requestWhen: "Sat Aug 1 2020 18:04:30 GMT+0100 (British Summer Time)"
      },
      transaction3: {
        amount: 13,
        when: "Sun May 24 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "I've had so many unexpected expenses this month!",
        requestWhen: "Mon May 18 2020 18:04:30 GMT+0100 (British Summer Time)"
      }
    },

    givenToItemised: {
      transaction13: {
        amount: 8,
        when: "Fri Jun 2 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "I'm ill again, arghh!",
        requestWhen: "Fri May 27 2020 18:04:30 GMT+0100 (British Summer Time)"
      },
      transaction14: {
        amount: 7,
        when: "Wed Aug 14 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "Need help to pay for work materials",
        requestWhen: "Wed Aug 10 2020 11:04:30 GMT+0100 (British Summer Time)"
      },
      transaction15: {
        amount: 9,
        when: "Sat Jun 18 2020 18:04:29 GMT+0100 (British Summer Time)",
        requestMessage: "Had to delay some jobs. ",
        requestWhen: "Wed Jun 12 2020 18:04:29 GMT+0100 (British Summer Time)"
      },
      transaction16: {
        amount: 12,
        when: "Sat Jul 12 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "My client left the country without paying.",
        requestWhen: "Sat Jul 10 2020 9:04:30 GMT+0100 (British Summer Time)"
      }
    }
  },

  privateLedgerWithUser3: {
    userDisplayName: "Chloe",
    receivedFromItemised: {
      transaction1: {
        amount: 21,
        when: "Fri Jul 3 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "I would appreciate help to pay for a really cool training course. Thanks!",
        requestWhen: "Wed Jul 1 2020 12:04:30 GMT+0100 (British Summer Time)"
      },
      transaction3: {
        amount: 3,
        when: "Wed May 20 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "I've had so many unexpected expenses this month!",
        requestWhen: "Mon May 18 2020 18:04:30 GMT+0100 (British Summer Time)"
      },
      transaction4: {
        amount: 7,
        when: "Tue Aug 4 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "I was ill for three days.",
        requestWhen: "Sat Aug 1 2020 18:04:30 GMT+0100 (British Summer Time)"
      }
    },

    givenToItemised: {
      transaction4: {
        amount: 3,
        when: "Fri Jun 8 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "Ill again, arghh!",
        requestWhen: "Fri May 02 2020 18:04:30 GMT+0100 (British Summer Time)"
      },
      transaction5: {
        amount: 7,
        when: "Wed Aug 12 2020 18:04:30 GMT+0100 (British Summer Time)",
        requestMessage: "Need help to pay for adobe stuff.",
        requestWhen: "Wed Aug 11 2020 11:04:30 GMT+0100 (British Summer Time)"
      }
    }
  }
}

var myp5 = new p5(main, 'c1');
