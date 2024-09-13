const fish = document.getElementById('fish');
const fishWidth = 120;
const fishHeight = 288;
const imageWidth = 1920;
const imageHeight = 1080;
const speed =  5;   // Vertical one way duration. 15 means it will take 15 seconds

let headWidth= 0.30  * fishWidth;
let headOffset = (fishWidth-headWidth)/ 2;
let YOffset = 20;
let stepSize = 2;
let positionX = -1 * headOffset;
let positionY = (-1 * stepSize) - YOffset;
let direction = 'down';

let calculatedSpeedTime = speed / (imageHeight / stepSize) * 1000;

function moveFish() {
	let transitionDuration = calculatedSpeedTime;
	fish.classList.remove('transition');
    if (direction === 'down') {  // going down
		positionY += stepSize;
        if (positionY > imageHeight-YOffset) {  // switch to up
			transitionDuration = 1000;
            direction = 'up';
			fish.classList.add('transition');
            positionX += headOffset;
            positionY = imageHeight-YOffset;
        }
    } else { // going up
        positionY -= stepSize;
        if (positionY < -1 * headOffset) { // switch to down
			transitionDuration = 1000;
            direction = 'down';
			fish.classList.add('transition');
            positionX += headOffset;
            positionY = (-1 * stepSize) - YOffset;
        }
    }

    fish.style.transform = `translate(${positionX}px, ${positionY}px)`;

	const cleanedArea = document.createElement('div');
	cleanedArea.classList.add('cleaned');
	cleanedArea.style.left = `${positionX+headOffset}px`;
	cleanedArea.style.top = `${positionY+YOffset}px`;
	cleanedArea.style.backgroundPosition = `-${positionX+headOffset}px -${positionY+YOffset}px`;
	document.body.appendChild(cleanedArea);

    if (positionX < imageWidth) {
        setTimeout(moveFish,transitionDuration);
    }
}

moveFish();
