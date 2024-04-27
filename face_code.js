/*
 * This file should contain code that draws your faces.
 *
 * Each function takes parameters and draws a face that is within
 * the bounding box (-10, -10) to (10, 10).
 *
 * These functions are used by your final arrangement of faces as well as the face editor.
 */

// function blobFace(rotation, circle1_size, circle2_size, circle_distance, hue, eye_selection, mouth_selection) {
//   // blob circles
//   push();
//   colorMode(HSB);
//   strokeWeight(0);
//   rotate(rotation);
//   fill(20);
//   blobCircles(circle1_size,  circle2_size, circle_distance, 0.5, true);
//   fill(hue, 255, 255);
//   blobCircles(circle1_size, circle2_size, circle_distance, 0, true);
//   fill(255);
//   blobCircles(circle1_size,  circle2_size, circle_distance, -0.5, false);
//   fill(0);
//   blobCircles(circle1_size,  circle2_size, circle_distance, -1, false);
//   pop();

//   push();
//   rotate(rotation);
//   fill(255);
//   arc(0, 2, 2.5, 2, 360, 180, CHORD);
//   pop();
  
// }

// function blobCircles(circle1_size, circle2_size, circle_distance, circle_scale_offset, draw_middle) {
//   ellipseMode(RADIUS);
//   if(draw_middle) ellipse(0, 0, circle_distance + circle_scale_offset);
//   ellipse(-circle_distance, 0, circle1_size + circle_scale_offset);
//   ellipse(circle_distance, 0, circle2_size + circle_scale_offset);
// }

function blobbyFace(eye1_x, eye1_y, eye1_r, eye2_x, eye2_y, eye2_r, face_hue, eye_selection, pupil_ratio, iris_colour, mouth_selection) {
  var head = 
  {
    x: min(eye1_x, eye2_x) + (abs(eye1_x - eye2_x)/2),
    y: min(eye1_y, eye2_y) + (abs(eye1_y - eye2_y)/2),
    r: dist(eye1_x, eye1_y, eye2_x, eye2_y)/2
  };

  // finding the rotation of the head so facial features can be rotated with it, head rotation is based on the position of the eyes - it is not created and then rotated
  var eye1_v = createVector(eye1_x, eye1_y);
  var eye2_v = createVector(eye2_x, eye2_y);
  var head_tilt = atan2(eye2_y - eye1_y, eye2_x - eye1_x); // I used ChatGPT 3.5 to find this function atan2, the prompt was: "I need to get get the rotation between two points in p5.js"
  

  push();
  colorMode(HSB);
  ellipseMode(RADIUS);
  strokeWeight(0);
  
  // draw head with black outline
  let outlineOffset = width/200;
  
  fill(20);
  ellipse(eye1_x, eye1_y, eye1_r + outlineOffset);
  ellipse(eye2_x, eye2_y, eye2_r + outlineOffset);
  ellipse(head.x, head.y, head.r + outlineOffset);

  fill(face_hue, 60, 95);
  ellipse(head.x, head.y, head.r); 

  // draw eyes
  drawEye(eye1_x, eye1_y, eye1_r, head_tilt, face_hue, eye_selection, pupil_ratio, iris_colour);
  drawEye(eye2_x, eye2_y, eye2_r, head_tilt, face_hue, eye_selection, pupil_ratio, iris_colour);

  // draw mouth

  push();
  translate(head.x, head.y);
  rotate(head_tilt); 
  strokeWeight(width/300);
  line(-head.r/3, head.r/2, head.r/3, head.r/2);
  pop();

  pop();
}

function drawEye(eye_x, eye_y, eye_r, rotation, face_hue, eye_selection, pupil_ratio, iris_colour) { 
  var eye_circle_colour = color(face_hue, 60, 100);
  var white_size = eye_r * 0.8; // amount of the eye space that the white takes up
  var iris_size = white_size * 0.8; // amount of the white of the eye that the iris takes up
  var pupil_size = map(pupil_ratio, 0 , 1, 0, iris_size); // mapping pupil size from 0-1 to 0-iris-ratio, changes how much of the iris the pupil takes up
 

  push();

  translate(eye_x, eye_y);

  // eye circle
  fill(eye_circle_colour);
  ellipse(0, 0, eye_r);

  push();

  rotate(rotation);

  // white
  strokeWeight(0);
  fill(100);
  ellipse(0, 0, white_size);

  // iris
  strokeWeight(0);
  fill(iris_colour);
  ellipse(0, 0, iris_size);

  // pupil
  strokeWeight(0);
  fill(20);
  ellipse(0, 0, pupil_size);

  pop();

  // glint - excluded from eye rotation as it's simulating the reflection of a fixed lightsource 
  strokeWeight(0);
  fill(100);
  ellipse(0-(eye_r/4), 0-(eye_r/4), eye_r*0.2);

  push();

  rotate(rotation);

  if(eye_selection == 1) { // tired look eyelids
    strokeWeight(0);
    fill(eye_circle_colour)
    arc(0, 0, eye_r, eye_r, 200, 340, OPEN);
  }

  else if(eye_selection == 2) { // squint eyelids
    strokeWeight(0);
    fill(eye_circle_colour)
    arc(0, 0, eye_r, eye_r, 190, 350, OPEN);
    arc(0, 0, eye_r, eye_r, 10, 170, OPEN);
  }

  pop();

  pop();  
}