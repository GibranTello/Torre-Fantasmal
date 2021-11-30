var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"



function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup=new Group();
  climberGroup=new Group();
  invisibleClimberGroup=new Group();
  ghost = createSprite(200,200,20,30);
  ghost.addImage(ghostImg);
  ghost.scale=.35;
}

function draw() {
  background(200);
  if(gameState === "play"){

    spookySound.loop();

  if(tower.y > 400){
      tower.y = 300
    }
    
   if(keyDown("left_arrow")){
     ghost.x=ghost.x-5;
   }
   if(keyDown("right_arrow")){
    ghost.x=ghost.x+5;
   }
   if(keyDown("up_arrow")){
    ghost.velocityY=-10;
   }
  
   ghost.velocityY=ghost.velocityY+0.5;

    spawnDoor();

    if(climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }

    if(invisibleClimberGroup.isTouching(ghost)){
      ghost.destroy();
      gameState="end";
    }
    
    drawSprites();
  }  
   if(gameState === "end" ){
    stroke("yellow");
    fill("red");
    textSize(30);
    text("Game Over", width/2,height/2);
   }

}
  function spawnDoor() {

     if(frameCount % 240 === 0){
      var door=createSprite(200,-80)
      door.x=Math.round(random(120, 400))
      door.addImage(doorImg);
      door.velocityY=1;
      door.lifeTime=800;
      doorsGroup.add(door);

      var climber=createSprite(200,-15)
      climber.x=door.x
      climber.addImage(climberImg);
      climber.velocityY=1;
      climber.lifeTime=800;
      climberGroup.add(climber);

      var invisibleClimber=createSprite(200,-23);
      invisibleClimber.width=climber.width;
      invisibleClimber.height=2;
      invisibleClimber.x=door.x
      invisibleClimber.velocityY=1;
      invisibleClimber.lifeTime=800;
      invisibleClimberGroup.add(invisibleClimber)
      invisibleClimber.visible=false;
      invisibleClimber.debug=true;
     
      ghost.depth=door.depth
      ghost.depth=ghost.depth+1; 

      ghost.depth=climber.depth
      ghost.depth=ghost.depth+1;     
}
}