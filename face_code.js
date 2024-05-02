/*
 * This file should contain code that draws your faces.
 *
 * Each function takes parameters and draws a face that is within
 * the bounding box (-10, -10) to (10, 10).
 *
 * These functions are used by your final arrangement of faces as well as the face editor.
 */

function blobbyFace(face_type, eye1_x, eye1_y, eye1_r, eye2_x, eye2_y, eye2_r, face_hue, eye_selection, pupil_ratio, iris_hue, mouth_selection) {
  var head = 
  {
    x: min(eye1_x, eye2_x) + (abs(eye1_x - eye2_x)/2),
    y: min(eye1_y, eye2_y) + (abs(eye1_y - eye2_y)/2),
    r: dist(eye1_x, eye1_y, eye2_x, eye2_y)/2
  };

  // finding the rotation of the head so facial features can be rotated with it, head rotation is based on the position of the eyes - it is not created and then rotated
  var head_tilt = atan2(eye2_y - eye1_y, eye2_x - eye1_x); // I used ChatGPT 3.5 to find this function atan2, the prompt was: "I need to get get the rotation between two points in p5.js"

  push();
  colorMode(HSB);
  ellipseMode(RADIUS);
  rectMode(CENTER);
  strokeWeight(0);
  
  // draw head with black outline
  var outline_offset = ((head.r + eye1_r + eye2_r) /20);
  
  if (face_type == 0) { // circular head
    fill(20);

    ellipse(eye1_x, eye1_y, eye1_r + outline_offset);
    ellipse(eye2_x, eye2_y, eye2_r + outline_offset);
    ellipse(head.x, head.y, head.r + outline_offset);

    fill(face_hue, 60, 95);

    ellipse(head.x, head.y, head.r); 

  } else if (face_type == 1) { // diamond head
    fill(20);

    ellipse(eye1_x, eye1_y, eye1_r + outline_offset);
    ellipse(eye2_x, eye2_y, eye2_r + outline_offset);

    push();

    rectMode(CENTER);
    translate(head.x, head.y);
    rotate(head_tilt+45)
    rect(0, 0, 1.5*head.r + outline_offset*2, 1.5*head.r + outline_offset*2, head.r/4);
    fill(face_hue, 60, 95);
    rect(0, 0, 1.5*head.r, 1.5*head.r, head.r/4);

    pop();
  }

  // draw mouth
  push();

  translate(head.x, head.y);
  rotate(head_tilt); 
  strokeWeight(outline_offset);

  if(mouth_selection == 0) { // straight mouth
    line(-head.r/4, min(eye1_r, eye2_r)/1.5, head.r/4, min(eye1_r, eye2_r)/1.5);
  } 
  else if (mouth_selection == 1) { // wobbly mouth
    beginShape();
    curveVertex(-head.r, min(eye1_r, eye2_r)*1.5);
    curveVertex(-head.r/4, min(eye1_r, eye2_r)/1.5);
    curveVertex(0, min(eye1_r, eye2_r)/1.5);
    curveVertex(head.r/4, min(eye1_r, eye2_r)/1.5);
    curveVertex(head.r, min(eye1_r, eye2_r)*1.5);
    endShape();
  }
  else if (mouth_selection == 2) { // smile mouth
    beginShape();
    curveVertex(-head.r/4, min(eye1_r, eye2_r)/2.5);
    curveVertex(-head.r/4, min(eye1_r, eye2_r)/1.5);
    curveVertex(0, min(eye1_r, eye2_r)/1.3);
    curveVertex(head.r/4, min(eye1_r, eye2_r)/1.5);
    curveVertex(head.r/4, min(eye1_r, eye2_r)/2.5);
    endShape();
  }

  pop();  

  // draw eyes
  drawEye(eye1_x, eye1_y, eye1_r, head_tilt, face_hue, eye_selection, pupil_ratio, iris_hue);
  drawEye(eye2_x, eye2_y, eye2_r, head_tilt, face_hue, eye_selection, pupil_ratio, iris_hue);

  pop();
}

function drawEye(eye_x, eye_y, eye_r, rotation, face_hue, eye_selection, pupil_ratio, iris_hue) { 
  var eye_circle_colour = color(face_hue, 50, 100);
  var white_size = eye_r * 0.8; // amount of the eye space that the white takes up
  var iris_size = white_size * 0.8; // amount of the white of the eye that the iris takes up
  var pupil_size = map(pupil_ratio, 0 , 100, 0, iris_size); // mapping pupil size from 0-1 to 0-iris-ratio, changes how much of the iris the pupil takes up

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
  fill(iris_hue, 50, 50);
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
    arc(0, 0, eye_r, eye_r, 200, 340, OPEN);
    arc(0, 0, eye_r, eye_r, 20, 160, OPEN);
  }

  pop();

  pop();  
}