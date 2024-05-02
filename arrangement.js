/*
 * This program draws your arrangement of faces on the canvas.
 */
const canvasWidth = 960;
const canvasHeight = 500;
let curRandomSeed = 0;

let lastSwapTime = 0;
const millisPerSwap = 3000;

var layer_opacity = 0.7; // opacity of the background drawn over each layer

// circle generation variables - these are the basis of the eyes which the faces are built around

var maxNumCircles = 1000;     // number of circles to try and place
var circleTryLimit = 10000;   // number of tries to place circles, stops while loop
var circleScaleDivisor = 30;  // how much to divide the canvas by to determine scale of circles
var circleSizeVariance = 1.6; // max size difference between generated circles
var circleSizeFactor = 0.7;   // adjusts radius of generated circles - useful for preventing some overlap 

var circleTries = 0;
var circles = [];
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

  // colour mode
  colorMode(HSB);

  background(0);

}

function changeRandomSeed() {
  curRandomSeed = curRandomSeed + 1;
  lastSwapTime = millis();
  
  // translucent background - creates stacking effect
  push();
  rectMode(CORNERS);
  strokeWeight(0);
  fill(0, 0, 0, layer_opacity);
  rect(0, 0, width, height);
  pop();
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

  // reset circle array so it doesn't persist
  circles = [];
  circlePairs = [];
  
  // create random circles such that they don't overlap, this is the basis for the eyes and therefore the faces
  generateRandomCircles();
  
  // find pairs of circles, these are connected to create faces with two eyes
  findCirclePairs();

  // go through all the circle pairs and create faces using them
  for (var i = 0; i < circlePairs.length; i++) {
    var pair = circlePairs[i];

    // face parameter randomisation

    var face_type = random([0, 0, 1]); // face type - weighted random with 2/3 chance to be circular
    var face_hue = random(360); // face hue - simple random in full hue spectrum
    var mouth_selection = random([0, 1, 2, 2]); // mouth selection - weighted random with 1/4 chance to be neutral, 1/4 chance to be wobbly, 1/2 chance to be smiling
    var eye_selection; // eye selection - conditional random
    if(mouth_selection == 2) {
      eye_selection = random([0, 0, 0, 1, 1, 2]); // if the mouth is a smile 1/2 chance to be wide eyed, 1/3 chance to be bored/sleepy, 1/6 chance to be squinty
    } else {
      eye_selection = random([0, 1, 2]); // even chance for each eye type if not smiling
    }
    var pupil_ratio = getAveragedRandom(10, 90, 2); // pupil ratio - averaged random between 10% and 90% of the white of the eye
    var iris_hue = random(360); // iris hue - simple random in full hue spectrum

    // draw the face using randomised parameters
    blobbyFace(face_type, pair.x1, pair.y1, pair.r1*circleSizeFactor, pair.x2, pair.y2, pair.r2*circleSizeFactor, face_hue, eye_selection, pupil_ratio, iris_hue, mouth_selection);
  }
  
}

// creates circles in random places on the canvas, with random radii, that don't overlap
// lots of help from a Coding Train tutorial: https://www.youtube.com/watch?v=XATr_jdh-44&ab_channel=TheCodingTrain
function generateRandomCircles() {
  var minCircleSize = width/circleScaleDivisor;
  var maxCircleSize = minCircleSize*circleSizeVariance;

  while (circles.length < maxNumCircles && circleTries < circleTryLimit) {
    circleTries++; // limit while loop

    var circle = { // circle object has x, y and radius
      x: random(width),
      y: random(height),
      r: random(minCircleSize, maxCircleSize)  
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
            dupePairIndex = j;
          }
        }        
      }        
    }

    if (foundDupePair) {
      circlePairs.splice(dupePairIndex, 1);
    } else break;
  }
}

// returns an averaged random between two values, n being the number of random numbers averaged between
// increasing n makes the average more average basically
// this function was provided in class
function getAveragedRandom(min, max, n) {  
  let sum = 0;

  for(let i = 0; i < n; i++) {
    sum += random(min, max);
  }

  return sum/n;
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
