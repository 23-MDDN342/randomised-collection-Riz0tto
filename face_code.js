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

function blobbyFace(eye1_x, eye1_y, eye1_r, eye2_x, eye2_y, eye2_r, hue, eye_selection, mouth_selection) {
  var head = 
  {
    x: min(eye1_x, eye2_x) + (abs(eye1_x - eye2_x)/2),
    y: min(eye1_y, eye2_y) + (abs(eye1_y - eye2_y)/2),
    r: dist(eye1_x, eye1_y, eye2_x, eye2_y)/2
  };

  // finding the rotation of the head so facial features can be rotated with it, head rotation is based on the position of the eyes - it is not created and then rotated
  var eye1_v = createVector(eye1_x, eye1_y);
  var eye2_v = createVector(eye2_x, eye2_y);
  var head_tilt = atan2(eye2_y - eye1_y, eye2_x - eye1_x); // I used ChatGPT 3.5 to get this function, the prompt was: "I need to get get the rotation between two points in p5.js"
  

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

  fill(hue, 60, 95);
  ellipse(head.x, head.y, head.r);
  fill(hue, 60, 100);
  ellipse(eye1_x, eye1_y, eye1_r);
  ellipse(eye2_x, eye2_y, eye2_r);  

  // draw eyes
  fill(100);
  ellipse(eye1_x, eye1_y, eye1_r*0.8);
  ellipse(eye2_x, eye2_y, eye2_r*0.8);
  fill(20);
  ellipse(eye1_x, eye1_y, eye1_r*0.6);
  ellipse(eye2_x, eye2_y, eye2_r*0.6);
  fill(100);
  ellipse(eye1_x-(eye1_r/4), eye1_y-(eye1_r/4), eye1_r*0.2);
  ellipse(eye2_x-(eye2_r/4), eye2_y-(eye2_r/4), eye2_r*0.2);

  // draw mouth

  push();
  translate(head.x, head.y);
  rotate(head_tilt); 
  strokeWeight(width/300);
  line(-head.r/3, head.r/2, head.r/3, head.r/2);
  pop();

  pop();
}