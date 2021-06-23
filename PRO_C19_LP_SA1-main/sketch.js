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
  tower.velocityY = 2;

  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.5

  doorsGroup = createGroup()
  climbersGroup = createGroup()

}

function draw() {
  background(200);
  
  hax()

  if(keyDown("space")){
    ghost.velocityY = -5
  }
  ghost.velocityY = ghost.velocityY + 1

  if(keyDown("D")){
    ghost.x = ghost.x + 3
  }

  if(keyDown("A")){
    ghost.x = ghost.x - 3
  }

  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY = 0
  }

  if(ghost.y > 600){
  gameState = "end"
  }

  if(gameState === "end"){
    ghost.destroy()
    climbersGroup.destroyEach()
    doorsGroup.destroyEach()
    tower.destroy()
    fill("cyan")
    textSize(40)
    text("GAME OVER KID...", 100, 300)
  }

  if(tower.y > 400){
      tower.y = 300
    }
    drawSprites()
}

function hax() {
if(frameCount % 200 === 0){
  door = createSprite(round(random(0,600)), -50)
  door.addImage(doorImg)
  door.velocityY = 2
  ghost.depth = door.depth + 1
  doorsGroup.add(door)

  climber = createSprite(door.x, 10)
  climber.addImage(climberImg)
  climber.velocityY = 2
  climbersGroup.add(climber)
}
}