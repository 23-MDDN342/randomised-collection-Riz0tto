[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/uYb6fuja)
## 2024 MDDN342 Assignment 2: Randomised Collections

**This is where you talk about your project!**

My initial idea for this project revolved around using 3 circles as the foundation for each face. The rule I came up with for how these circles are generated is that two circles with random radii would be connected by another circle, with a diameter equal to the distance between the centre of each circle. From that point the outside circles are to be used as the bounds of the eyes and the inside circle would contain the mouth. In my sketch the rotation of the eyes and mouth are random, however in order to make them more readable I later made them rotate with the face.

I started by first creating the circles, each drawn first in black with a larger radius, then in colour. This is how I was able to create a stroke effect around the whole face shape. Then I added some basic eyes by creating white circles scaled to the radius of each eye, with pupils.

Now that I had the basic shape it was time to think about the arrangement. It was suggested to me that they should sort of fill the screen randomly, without overlapping. This was a fairly difficult task, as each face needs to check if it's overlapping with another, which means their space on the canvas has to be stored somehow. I was able to find a solution, referring to a youtube video I found by Coding Train : https://www.youtube.com/watch?v=XATr_jdh-44&ab_channel=TheCodingTrain. It's a way to do circle packing by creating circle objects that have a position and a radius, checking them against all other circle objects that have been created and stored in a list, then only adding them if they don't overlap. It's purely random and works by trying over and over again until either it's created all the circles or reached the try limit. If all the values are set nicely, the result is a screen packed with circles.

The next step, now that I had a canvas full of circles that didn't overlap, was to create pairs that would form each face. To do this I wrote some code to go through the list of all circles and create a new list of pairs, with the pair of each circle being the nearest other circle. This worked well, hoever inevitably it created chains and branches of circles, where they two or more pairs shared a circle. My faces are created using only two circles as a base, so I needed to cull the list of pairs to only contain unique pairs. The method I used to cull these pairs was to iterate through the pairs and delete other pairs if they contained one of the same circles. I'm not certain this was the best approach as it left a lot of circles left over that could have formed new pairs, but it works well enough.


