[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/uYb6fuja)
# 2024 MDDN342 Assignment 2: Randomised Collections

## Idea:

My initial idea for this project revolved around using 3 circles as the foundation for each face. The rule I came up with for how these circles are generated is that two circles with random radii would be connected by another circle, with a diameter equal to the distance between the centre of each circle. From that point the outside circles are to be used as the bounds of the eyes and the inside circle would contain the mouth. In my sketch the rotation of the eyes and mouth are random, however in order to make them more readable I later made them rotate with the face.

I started by first creating the circles, each drawn first in black with a larger radius, then in colour. This is how I was able to create a stroke effect around the whole face shape. Then I added some basic eyes by creating white circles scaled to the radius of each eye, with pupils.


## Arrangement:

Now that I had the basic shape it was time to think about the arrangement. It was suggested to me that they should sort of fill the screen randomly, without overlapping. This was a fairly difficult task, as each face needs to check if it's overlapping with another, which means their space on the canvas has to be stored somehow. I was able to find a solution, referring to a youtube video I found by Coding Train : https://www.youtube.com/watch?v=XATr_jdh-44&ab_channel=TheCodingTrain. It's a way to do circle packing by creating circle objects that have a position and a radius, checking them against all other circle objects that have been created and stored in a list, then only adding them if they don't overlap. It's purely random and works by trying over and over again until either it's created all the circles or reached the try limit. If all the values are set nicely, the result is a screen packed with circles.

The next step, now that I had a canvas full of circles that didn't overlap, was to create pairs that would form each face. To do this I wrote some code to go through the list of all circles and create a new list of pairs, with the pair of each circle being the nearest other circle. This worked well, however inevitably it created chains and branches of circles, where two or more pairs shared a circle. My faces are created using only two circles as a base, so I needed to cull the list of pairs to only contain unique pairs. The method I used to cull these pairs was to iterate through the pairs and delete other pairs if they contained one of the same circles. I'm not certain this was the best approach as it left a lot of circles left over that could have formed new pairs, but it works well enough. I included a lot of variables that allow me to control the arrangement, such as the scale of the faces on the canvas, size of the eyes, and various controls over the density of the circle generation.


## Randomisation:

Each face has 12 parameters: face type, x and y positions of each eye, radius of each eye, face hue, eye and mouth selection, pupil ratio and iris hue. All of which are determined randomly in the arrangement.

**Discrete:**
- Face type - weighted random with 2/3 chance to be circular
- Mouth selection - weighted random with 1/4 chance to be neutral, 1/4 chance to be wobbly, 1/2 chance to be smiling
- Eye selection - conditional random
  - if the mouth is a smile 1/2 chance to be wide eyed, 1/3 chance to be bored/sleepy, 1/6 chance to be squinty
  - even chance for each eye type if not smiling

**Continuous:**
- Face hue - simple random in full hue spectrum
- Pupil ratio - averaged random between 10% and 90% of the white of the eye
- Iris hue - simple random in full hue spectrum

The positions and radii are determined by the circle packing in the arrangement.

## Use of AI:

I generally don't use AI generally but there was one point where I needed help that I wasn't immediately able to find online. 

The faces are generated based on the position of the eye circles in the arrangement, which means they are created with a rotation that I didn't set. In order for features to rotate with the faces I needed to find the rotation of the face. I wasn't sure how to get the rotation of a line drawn between two 2D coordinates. At first I tried using the angleBetween() function however it wasn't doing what I wanted. I used Chat GPT 3.5 with the prompt: "I need to get get the rotation between two points in p5.js" and it used the function atan2(). I'm sure I could have found this function on my own eventually but using AI to interpret what I wanted when I didn't quite know what I was looking for saved a lot of time. I didnt use it for anything else and copied no code other than the function.