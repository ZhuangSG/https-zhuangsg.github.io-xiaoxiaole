window.onload = init;
window.onmousemove = mousemove;
var canvas;
var ctx;
var bg,ball,board;
var ballX = 200,ballY = 200,boardX = 200,boardY =650;
var cW = 1024;
var cH = 700;
var speedX = 5,speedY = 5;
var rects =[];
function init(){
	trace("The Game is ready!");
	    canvas = document.getElementById("canvas");
	    canvas.width = cW;
	    canvas.height = cH;
	    ctx = canvas.getContext("2d");
	    if(!ctx){
	    	return false;
	    }
	    bg = addImg("img/bg.png");
	    ball = addImg("img/ball.png");
	    board = addImg("img/board.png");
	    rankSquare();
	    setInterval(gameInterval,1000/60);
}


function addImg(src){
	var img = new Image();
	img.src = src;
	return img;
}

function gameInterval(){
	clearctx(0,0,cW,cH);
	ctx.drawImage(bg,0,0);
	ctx.drawImage(ball,ballX,ballY);
	ctx.drawImage(board,boardX,boardY);
	moveball();
	hit();
    drawReak();
	reactCrash();
}

function moveball(){
	ballX += speedX;
	ballY += speedY;
	if(ballX<0){
		ballX = 0;
		speedX *= -1;
	}else if(ballX>canvas.width-ball.width){
		ballX = canvas.width-ball.width;
		speedX *= -1;
	}
	if(ballY<10){
		ballY =10;
		speedY *= -1;
	}/*else if(ballY>canvas.height){
		setTimeout(function(){trace("游戏结束");},30);
	}*/
}

function hit(){
	if(ballX>boardX-ball.width/2 && ballY == boardY-ball.height && ballX<boardX+board.width+ball.width/2 && ballY == boardY-ball.height){	
		speedY *= -1;
	}
}


function reactCrash(){
	
	for(var i=0;i<rects.length;i++){
		var item = rects[i];
		if(ballX>item.x-ball.width/2 && ballY == item.y+50 && ballX<item.x+ball.width/2 && ballY == item.y+50){
			rects.splice(i,1);
			speedY *= -1;
		}
	}
}




function rankSquare(){
   for(var j=0;j<4;j++){
	  for(var i=0;i<6;i++){	  	  		  
		var num = Math.ceil(Math.random()*6);           
		var str = "img/"+num+".png";
		var imgStr =addImg(str);
		var objs ={item:imgStr,x:(160+10)*i,y:60*j};		
		rects.push(objs);		
	 }		
   }
}


function drawReak(){      
	for(var i=0;i<rects.length;i++){ 
		ctx.drawImage(rects[i].item,rects[i].x,rects[i].y);
	}
}



function clearctx(){
	ctx.clearRect(0,0,cW,cH);
}

function trace(msg){
	console.log(msg);
}
function mousemove(e){	
	boardX = e.clientX-board.width/2;
	if(e.clientX>canvas.width-board.width/2){
		boardX = canvas.width-board.width;
	}else if(e.clientX<board.width/2){
		boardX = 0;
	}
}

