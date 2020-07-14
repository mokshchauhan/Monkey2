//Global Variables

var PLAY=1;
var END=0;
var gameState=PLAY;

var player_running,bananaImage,obstacleImage;

var monkey,banana,obstacle,ground,invisibleGround;

var backImage;

var gameOver,restart;
var gameOverImage,restartImage;

var score;

var bananaGroup,obstacleGroup;

function preload(){
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backImage=loadImage("jungle.jpg");
  
  bananaImage=loadImage("Banana.png");
  obstacleImage=loadImage("stone.png");
  
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
}


function setup() {
  createCanvas(600,300);
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  ground=createSprite(300,50);
  ground.addImage(backImage);
  ground.scale=1.2;
  ground.x=ground.width/2;
  
  invisibleGround=createSprite(300,274,1200,5);
  invisibleGround.visible=false;
  
  monkey=createSprite(120,240,10,10);
  monkey.addAnimation("monkey",player_running);
  monkey.scale=0.1;
}


function draw(){
 background(255);
  
  displayScore();
  
  if(gameState===PLAY){
    
    ground.velocityX=-8;
    
    if(ground.x<0){
      ground.x=ground.width/2;
    }

    if(keyDown("space") && monkey.collide(invisibleGround)){
      monkey.velocityY=-15;

      if(monkey.scale>=0.16){
        monkey.velocityY=-18;
      }
    }

    spawnFood();
    spawnObstacles();

    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      monkey.scale=monkey.scale+0.02;
      score=score+2;
    }

    if(obstacleGroup.isTouching(monkey)){
      monkey.scale=monkey.scale-0.01;
    }

    if(monkey.scale<=0.07){
      gameState=END;
    }
  
    monkey.velocityY=monkey.velocityY+0.8;
  }
  
  if(gameState===END){
    ground.velocityX=0;
    monkey.velocityY=0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    gameOver=createSprite(300,50,10,10);
    gameOver.addImage(gameOverImage);
    restart=createSprite(300,100,10,10);
    restart.addImage(restartImage);
    
    //gameOver.visible=true;
    //restart.visible=true;
    
    if(mousePressedOver(restart)){
      reset();
      gameOver.visible=false;
      restart.visible=false;
    }
  }
  
  monkey.collide(invisibleGround);
  
  drawSprites();
}

function spawnFood(){
  if(frameCount%100===0){
    banana=createSprite(600,random(120,180),10,10);
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX=-10;
    banana.lifetime=80;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%170===0){
    obstacle=createSprite(600,240,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.14;
    obstacle.velocityX=-8;
    obstacle.lifetime=120;
    obstacleGroup.add(obstacle);
  }
}

function displayScore(){
  stroke("white");
  fill("white");
  textSize(20);
  text("YOUR SCORE IS "+score,500,20);
}

function reset(){
  gameState=PLAY;
  
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  monkey.scale=0.1;
}