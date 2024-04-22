/*
 * This program draws your arrangement of faces on the canvas.
 */
const canvasWidth = 960;
const canvasHeight = 500;
let curRandomSeed = 0;

let lastSwapTime = 0;
const millisPerSwap = 3000;

// circle generation variables
var circles = [];
var circleTryLimit = 5000; // circle try limit stops while loop
var circleTries = 0;

var circlePairs = [];


function setup () {
  // create the drawing canvas, save the canvas element
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  curRandomSeed = int(random(0, 1000));

  // rotation in degrees
  angleMode(DEGREES);

  // ellipse mode
  ellipseMode(RADIUS);
}

function changeRandomSeed() {
  curRandomSeed = curRandomSeed + 1;
  lastSwapTime = millis();
}

function mouseClicked() {
  changeRandomSeed();
}

function draw () {
  if(millis() > lastSwapTime + millisPerSwap) {
    changeRandomSeed();
  }

  // reset the random number generator each time draw is called
  randomSeed(curRandomSeed);

  // clear screen - reset circle array so it doesn't persist
  background(255);
  circles = [];
  circlePairs = [];
  
  generateRandomCircles();  
  findCirclePairs();
  
}

// creates circles in random places on the canvas, with random radii, that don't overlap
// lots of help from a Coding Train tutorial: https://www.youtube.com/watch?v=XATr_jdh-44&ab_channel=TheCodingTrain
function generateRandomCircles() {
  while (circles.length < 100 && circleTries < circleTryLimit) {
    circleTries++; // limit while loop

    var circle = { // circle object has x, y and radius
      x: random(width),
      y: random(height),
      r: random(20, 60)  
    };

    // check if new circle overlaps any existing circles, adds it to the array if it doesn't
    var overlapping = false;
    for (var j = 0; j < circles.length; j++) {
      var other = circles[j];
      var d = dist(circle.x, circle.y, other.x, other.y);
      if(d < other.r + circle.r) overlapping = true;
    } 

    if(!overlapping) circles.push(circle);
  }
 
  // draw circles - this will be replaced by faces
  for (var i = 0; i < circles.length; i++) {
        fill(50, 50, 50, 50);
        ellipse(circles[i].x, circles[i].y, circles[i].r)
  }

  circleTries = 0; // reset while loop limit
}


// finds the nearest neighbour of each circle to form circle pair objects
function findCirclePairs() {
  for (var i = 0; i < circles.length; i++) {
    var closestCircleIndex = 0;

    for (var j = 0; j < circles.length; j++) { // narrows down to the nearest circle that isn't itself
      if(i != j){

        var d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);

        if(d < dist(circles[i].x, circles[i].y, circles[closestCircleIndex].x, circles[closestCircleIndex].y) || i == closestCircleIndex) {          
          closestCircleIndex = j;
        }
      }      
    }

    var circlePair = { // circle pair object stores circle info for each circle in pair
        x1: circles[i].x,
        y1: circles[i].y,
        r1: circles[i].r,
        x2: circles[closestCircleIndex].x,
        y2: circles[closestCircleIndex].y,
        r2: circles[closestCircleIndex].r
    };

    circlePairs.push(circlePair);   

  }

  // cull shared pairs
  while(true) {
    var foundDupePair = false;
    var dupePairIndex = 0;

    for(var i = 0; i < circlePairs.length; i++) {        
      for(var j = 0; j < circlePairs.length; j++) {
        if(i != j && !foundDupePair){
          var pair1 = circlePairs[i];
          var pair2 = circlePairs[j];
          if((pair1.x1 == pair2.x1 && pair1.y1 == pair2.y1) || (pair1.x2 == pair2.x2 && pair1.y2 == pair2.y2) || (pair1.x1 == pair2.x2 && pair1.y1 == pair2.y2) || (pair1.x2 == pair2.x1 && pair1.y2 == pair2.y1)) {
            foundDupePair = true;
            dupePairIndex = i;
          }
        }        
      }        
    }

    if (foundDupePair) {
      circlePairs.splice(dupePairIndex, 1);
    } else break;
  }

  // draw lines between pairs - just for visualisation
  strokeWeight(2);
  for(var i = 0; i < circlePairs.length; i ++) {
    var pair = circlePairs[i];
    line(pair.x1, pair.y1, pair.x2, pair.y2);
  }

}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
