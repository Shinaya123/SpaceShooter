var shooter, shooterImg;
var rock1, rockGroup;
var gameOver;
var red;
var bullets = 10;
var hearts = 3;
var redGroup;
var earth;
var no;
var gameState = "play";
var timer;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var d = new Date();
var n = d.getTime();
var velocity = 1;



function preload() {
  earth = loadImage("bg.png.jpg");
  shooterImg = loadImage("shooter.png.png");
  rock1 = loadImage("arock.png.png");
  heart1Img = loadImage("heart_1.png")
  heart2Img = loadImage("heart_2.png")
  heart3Img = loadImage("heart_3.png")
  
  }
function setup(){
  createCanvas(displayWidth-50,displayHeight-150);
  rockGroup = new Group();
  redGroup = new Group();
  shooter = createSprite(displayWidth/2, displayHeight-300);
  shooter.addImage(shooterImg);
  shooter.scale = 0.3;
  shooter.setCollider("circle",0,0,200);
  shooter.debug = true;

  heart1 = createSprite(displayWidth-150,40,20,20);
  heart1.visible = false;
  heart1.addImage("heart_1.png",heart1Img);
  heart1.scale = 0.4;
  heart2 = createSprite(displayWidth-100,40,20,20);
  heart2.visible = false;
  heart2.addImage("heart_2.png",heart2Img);
  heart2.scale = 0.4;
  heart3 = createSprite(displayWidth-150,40,20,20);
  heart3.addImage("heart_3.png",heart3Img);
  heart3.scale = 0.4;
}

function draw() {
  background(earth);
if(gameState === "play"){  
  console.log(hearts);
  if(hearts === 3){
    heart1.visible = true;
    heart2.visible = true;
    heart3.visible = true;
  } else  if(hearts === 2){
    heart1.visible = true;
    heart2.visible = true;
    heart3.visible = false;
  } else  if(hearts === 1){
    heart1.visible = true;
    heart2.visible = false;
    heart3.visible = false;
  } else  if(hearts === 0){
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = false;
    gameState = "end";
  }
  
  no = createSprite(1000,1000-80,100000,10);
  no.shapeColor = "red";

  if (keyDown("LEFT_ARROW")){
    shooter.x -= 10;
  }
  if (keyDown("RIGHT_ARROW")){
    shooter.x += 10;
  }
  


 if(rockGroup.isTouching(no)){
  for(var i=0;i<rockGroup.length;i++){     
    if(rockGroup[i].isTouching(no)){
  rockGroup[i].destroy();
  hearts =hearts - 1;
    }
}

}

 if (rockGroup.isTouching(redGroup)){
    for(var i=0;i<rockGroup.length;i++){     
      if(rockGroup[i].isTouching(redGroup)){
    rockGroup[i].destroy();
    redGroup.destroyEach();
  }
}
 }

  createRock();

  if (keyWentDown("space")){
        bulletss();
  }           
}

if(gameState === "end"){
  rockGroup.destroyEach();
  shooter.destroy();
  redGroup.destroyEach();
  textSize(100);
  fill("Red");
  text("GameOver!",200,200);
}
  drawSprites();
}

function createRock(){
  if(frameCount%60===0){
    rock = createSprite(200,-10);
    rock.addImage(rock1);
    rock.x = Math.round(random(0,displayWidth-50));
    rockGroup.add(rock);
    rock.lifetime = 800;
    
    if(Math.abs(new Date().getTime() - n) >= 30000) {
      velocity = velocity + 1;
      n = new Date().getTime();
    } 
    rock.velocityY = velocity;
    //console.log("Velocity - " + rock.velocityY);
    rock.scale = 0.1;
  }  
}

function bulletss(){
  red = createSprite(200,200,5, 20);
  red.shapeColor = "red";
  red.x = shooter.x;
  red.y = shooter.y;
  red.velocityY = -6;
  red.lifetime = 200;
  redGroup.add(red);
  return red;
}


