var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score, survivalTime;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(500,400);
  
  monkey = createSprite(40,350,20,0);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(200,380,900,40);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.shapeColor = "green";
  console.log(ground.x);
  
   FoodGroup = createGroup();
   obstacleGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
}


function draw() {
background(3900);
  
  monkey.collide(ground);
  
  if(gameState===PLAY){
    
  stroke("black");
  textSize(22);
  fill("black");
  text("score: "+score, 300,50);
    
  fill("black");
  textSize(22);
  survivalTime=Math.ceil(frameCount/30);
  text("Survival Time: "+survivalTime, 20,50);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    survivalTime = survivalTime + Math.round(getFrameRate()/30);
  
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY+0.8;
    
    spawnBanana();
    spawnRock();
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score+5;
    }
    if(obstacleGroup.isTouching(monkey)){
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      gameState = END;
    }
    }
  
  if(gameState===END){
    monkey.visible = false;
    ground.visible = false;
    
    fill("red");
    textSize(30);
    text("GAME OVER", 150,200);
  }
drawSprites();
}

function spawnBanana(){
  if(World.frameCount%80===0){
    banana = createSprite(480,120,40,10);
    banana.y = Math.round(random(120, 200));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -20;
    banana.lifetime = 50;
    
    FoodGroup.add(banana);
  }
}
function spawnRock(){
  if(World.frameCount%200===0){
  rock = createSprite(480,340,40,10);
  rock.addImage("stone", obstacleImage);
  rock.scale = 0.18;
  rock.velocityX = -20;
  rock.lifetime = 50;
    
  obstacleGroup.add(rock);
 }
}