let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 0; i < 100; i++) {
	let excel = document.createElement('div');
	field.appendChild(excel);
	excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1, y = 10;

for (let i = 0; i < excel.length; i++) {
	if(x > 10) {
		x = 1;
		y--;
	}
	excel[i].setAttribute('posX', x);
	excel[i].setAttribute('posY', y);
	x++;
}


//----Snake----
function generateSnake() {
	let posX = Math.round(Math.random() * (10 - 3) + 3);
	let posY = Math.round(Math.random() * (10 - 1) + 1);
	return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), 
					 document.querySelector('[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'),
					 document.querySelector('[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]')];

for (let i = 0; i < snakeBody.length; i++) {
	snakeBody[i].classList.add('snakeBody');
} 

snakeBody[0].classList.add('snakeHead');

//----Mouse----
let mouse;

function creatMouse() {
	function generateMouse() {
	let posX = Math.round(Math.random() * (10 - 3) + 3);
	let posY = Math.round(Math.random() * (10 - 1) + 1);
	return [posX, posY];
	}

	let mouseCoordinates = generateMouse();
  mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');

  while(mouse.classList.contains('snakeBody')) {
  	let mouseCoordinates = generateMouse();
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
  }
 
  mouse.classList.add('mouse');
}

creatMouse();

let direction = 'right';
let steps = false;
let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 30px;
display: block;
`;

let score = 0;
input.value = `Ваши очки: ${score}`; 

//----Move----
function move() {
	let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
	snakeBody[0].classList.remove('snakeHead');
	snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
	snakeBody.pop();

	if (direction == 'right') {
			if (snakeCoordinates[0] < 10){
				snakeBody.unshift(document.querySelector('[posX = "' + (+ snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
			} else {
				snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
			}
  } else if (direction == 'left') {
			if (snakeCoordinates[0] > 1){
				snakeBody.unshift(document.querySelector('[posX = "' + (+ snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
			} else {
				snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
			}
  } else if (direction == 'up') {
			if (snakeCoordinates[1] < 10){
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + ( + snakeCoordinates[1] +1) + '"]'));
			} else {
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
			}
  } else if (direction == 'down') {
			if (snakeCoordinates[1] > 1){
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1] - 1) + '"]'));
			} else {
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
			}
  }

  if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && 
  	  snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
  	mouse.classList.remove('mouse');
    let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
    snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
    creatMouse();
    score++;
    input.value = `Ваши очки: ${score}`;
  }

  if (snakeBody[0].classList.contains('snakeBody')) {
  	setTimeout(() => {
  		alert('Хабиж РАК');
  	}, 200);
  	
  	clearInterval(interval);
  	snakeBody[0].style.background = 'url(csd.jpg) center no-repeat';
  	snakeBody[0].style.backgroundSize = "cover"; 
  }


	snakeBody[0].classList.add('snakeHead');
	for (let i = 0; i < snakeBody.length; i++) {
			snakeBody[i].classList.add('snakeBody');
	}  

	steps = true;
}

let interval = setInterval(move, 350);


//----KeyCode----
window.addEventListener('keydown', function(e) {
	if (steps == true) {
		if (e.keyCode == 65 && direction != 'right') {
			direction = 'left';
			steps = false;
		} else if (e.keyCode == 87 && direction != 'down') {
			direction = 'up';
			steps = false;
		} else if (e.keyCode == 68 && direction != 'left') {
			direction = 'right';
			steps = false;
		} else if (e.keyCode == 83 && direction != 'up') {
			direction = 'down';
			steps = false;
		}
	}
	
});
