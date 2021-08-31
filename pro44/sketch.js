var pc, pc_running;
var ground, invisibleGround, groundImage; 
var obstacle,obstacleImg,obstaclesGroup;
var score;
var jumpSound;
var PLAY = 1;
var END = 0;
var gameState = play;

function preload() {
  pc_running = loadAnimation("2.png", "3.png", "4.png");
  groundImage = loadImage("1.png");
  obstacleImg = loadImage("5.png");
  jumpSound = loadSound("jump.mp3");
}

function setup() {
  createCanvas(600, 200);

  ground = createSprite(300, 100, 600, 20);
  ground.addImage("ground", groundImage);
  ground.scale=2;
  ground.x = ground.width / 2;
  ground.velocityX = -4;
  
  invisibleGround=createSprite(300,190,600,10);
  invisibleGround.visible=false;

  pc = createSprite(50, 160, 20, 50);
  pc.addAnimation("running", pc_running);

  obstaclesGroup = createGroup();
  
  score=0;
   
}


function draw() {
  background(220);

  

  if (keyDown("space")&&pc.y>=100) {
    pc.velocityY = -10;
    jumpSound.play();
  }

 pc.velocityY = pc.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  pc.collide( invisibleGround);

  spawnObstacles();

  drawSprites();

  text("Score: "+ score, 550,10);

}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,160,10,40);
    obstacle.addImage(obstacleImg)
    obstacle.velocityX = -(6 + score/100); 
    
     //generate random obstacles
     var rand = Math.round(random(1,6));
             
     obstacle.scale = 0.1;
     obstacle.lifetime = 300;
    
     obstaclesGroup.add(obstacle);
  }
 }