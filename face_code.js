/*
 * This file should contain code that draws your faces.
 *
 * Each function takes parameters and draws a face that is within
 * the bounding box (-10, -10) to (10, 10).
 *
 * These functions are used by your final arrangement of faces as well as the face editor.
 */

function blobFace(rotation, circle1_size, circle2_size, circle_distance, hue, eye_selection, mouth_selection) {
  // blob circles
  push();
  colorMode(HSB, 300);
  strokeWeight(0);
  rotate(rotation);
  fill(20);
  blobCircles(circle1_size,  circle2_size, circle_distance, 0.5, true);
  fill(hue, 200, 280);
  blobCircles(circle1_size, circle2_size, circle_distance, 0, true);
  fill(300);
  blobCircles(circle1_size,  circle2_size, circle_distance, -0.5, false);
  fill(0);
  blobCircles(circle1_size,  circle2_size, circle_distance, -1, false);
  pop();

  push();
  rotate(rotation);
  fill(300);
  arc(0, 2, 2.5, 2, 360, 180, CHORD);
  pop();
  
}

function blobCircles(circle1_size, circle2_size, circle_distance, circle_scale_offset, draw_middle) {
  ellipseMode(RADIUS);
  if(draw_middle) ellipse(0, 0, circle_distance + circle_scale_offset);
  ellipse(-circle_distance, 0, circle1_size + circle_scale_offset);
  ellipse(circle_distance, 0, circle2_size + circle_scale_offset);
}