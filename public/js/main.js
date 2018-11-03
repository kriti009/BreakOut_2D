var canvas = document.querySelector("#myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 5;
var paddleHeight = 7;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
// Two variables for storing information on whether the left or right control button is pressed.
var rightBtn = false;
var leftBtn = false;
//setup variable for bricks
var brickRow = 3;
var brickcol = 5;
var brickWidth = 45;
var brickHeight = 5;
var brickPadding = 6;
var brickOffSetTop = 20;
var brickOffSetLeft = 20;
//score counter
var score = 0;
//aading variable for lives
var lives = 3;

var bricks = [];
for(var c=0; c<brickcol; c++){
	bricks[c] = [];
	for(var r=0; r<brickRow; r++){
		bricks[c][r] = {
			x: 0,
			y: 0,
			status: 1
		};
	}
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawScore(){
	ctx.beginPath();
	ctx.font = "10px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score : "+score, 8, 10);
}
function drawLives(){
	ctx.beginPath();
	ctx.font = "10px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives : "+lives, canvas.width-45 , 10);
	ctx.closePath();
}

function drawBrick(){
	for(var c=0; c<brickcol; c++){
		for(var r=0; r<brickRow; r++){
			if(bricks[c][r].status ==1){
			var brickX = (c*(brickWidth + brickPadding))+brickOffSetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffSetTop;
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			ctx.beginPath();
			ctx.rect(brickX, brickY, brickWidth, brickHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
			}
		}
	}
}

function collisionDetector(){
	for(var c=0; c<brickcol; c++){
		for(var r=0; r<brickRow; r++){
			var b = bricks[c][r];
			if(b.status==1){
				if(x>b.x && x< b.x+brickWidth && y>b.y && y< b.y+brickHeight){
					dy=-dy;
					b.status = 0;
					score++;
					if(score == brickcol*brickRow){
						alert("You Won, CONGRATULATION!!");
						document.location.reload();
					}
				}	
			}
			
		}
	}
}
function keyDownHandler(e){
	if(e.keyCode == 39){
		rightBtn= true;
	}
	if(e.keyCode ==37){
		leftBtn= true;
	}
};
function keyUpHandler(e){
	if(e.keyCode == 39){
		rightBtn= false;
	}
	if(e.keyCode ==37){
		leftBtn=false;
	}
};


function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth , paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}
function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
}
function bounce(){
	if(y+dy < ballRadius){
		dy=-dy;
	}else if(y+dy >canvas.height-ballRadius){
		if(x > paddleX && x < paddleX+paddleWidth){
			dy=-dy;
		}
		else{
			lives--;
			if(lives>0){
				x = canvas.width/2;
				y = canvas.height-30;
				dx=-3;
				dy=-3;
				paddleX = (canvas.width-paddleWidth)/2;
			}else{
				alert("gameOver");
				document.location.reload();	
			}
			
		}
	}
	if(x+dx > canvas.width-ballRadius || x+dx < ballRadius){
		dx=-dx;
	}
}
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBrick();
	drawBall();
	drawPaddle();
	collisionDetector();
	drawBrick();	
	drawScore();
	drawLives();
	bounce();
	if(rightBtn && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
	}
	else if(leftBtn && paddleX > 0) {
	    paddleX -= 7;
	}
	x= x+dx;
	y= y+dy;

}
setInterval(draw, 20);

