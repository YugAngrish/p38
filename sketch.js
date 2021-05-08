var mario , marioJump, marioRun ;
var marioSong , marioJumpSound , gameOverSound ,gameOver , gameOverImage ;
var plant , plantsImage;
var enemies , enemyImage ;
var coins , coinsImage , coinsSound;
var walls , wallsImage;
var backGround, backgroundImage ;
var invisibleGround1 , invisibleGround2;
var coinsGroup, plantsGroup , enemysGroup;
var score = 0
var gameState = 1
var PLAY = 1
var END = 0
var highScore = 0
var retry , retryImage;

function preload(){
 marioRun = loadAnimation("m1.png","m2.png","m3.png","m4.png","m5.png","m6.png","m7.png");
 marioJump = loadAnimation("mJ8.png");
 plantsImage = loadAnimation("p1.png","p2.png");
 coinsImage = loadAnimation("c1.png","c2.png","c3.png","c4.png","c5.png","c6.png");
  enemyImage = loadAnimation("e1.png","e2.png","e3.png")
  backgroundImage = loadAnimation("mBG.png")
  wallsImage = loadImage("brick.jpg")
  coinsSound = loadSound("coinSound.mp3")
  marioJumpSound = loadSound("jumpSound.wav")
  gameOverSound = loadSound("gameover.wav")
  gameOverImage = loadImage("g1.png")
  retryImage = loadImage("r1.png")
}

function setup() {
 createCanvas(windowWidth,windowHeight)
  
  
  backGround = createSprite(width/2,height-580,width,600)
  backGround.addAnimation("background",backgroundImage)
  backGround.scale = 6.8
  backGround.velocityX = -5 
 
 

 
  mario = createSprite(100,height-100,3,3)
  mario.addAnimation("running",marioRun)
//  mario.debug = true
  mario.scale = 1
 // mario.velocityY = mario.velocityY+0.8

  
  invisibleGround1 = createSprite(300,height-45,600,20)
  invisibleGround1.velocityX = -5
  invisibleGround1.visible = false
  
   gameOver = createSprite(width/2,height/2-80,3,3)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.7
  gameOver.visible = false
  
  retry = createSprite(width/2,height/2+90,3,3)
  retry.addImage(retryImage)
  retry.scale = 0.7
  retry.visible = false
  
  coinsGroup = new Group()
  plantsGroup = new Group()
  enemysGroup = new Group()
  
  edges = createEdgeSprites()
  invisibleGround1.collide(mario);
  
}

function draw() {
  background("backgroundImage")
  
  
  if(backGround.x < 500){
    backGround.x = backGround.width + backGround.width/2 + 270
  }
  if(gameState===PLAY){
  if(mario.isTouching(coinsGroup)){
    coinsSound.play()
    score = score+2
    coinsGroup.destroyEach()
  }
   if(keyDown("space")&&mario.y>=height-100||touches.length>0){
     marioJumpSound.play()
     mario.changeAnimation("jump",marioJump)
     mario.velocityY= -17
     touches = []
   }
 /* if(keyWentUp("space")){
     mario.changeAnimation("running",marioRun)
     mario.velocityY= 10               
   }*/
 if(mario.isTouching(enemysGroup)){
   gameState = END
 }   
  }
  else if(gameState===END){
    gameOver.visible = true
    retry.visible = true
    
    coinsGroup.setLifetimeEach(-1)
   // plantsGroup.setLifetimeEach(-1)
    enemysGroup.setLifetimeEach(-1)
    
      coinsGroup.setVelocityXEach(0)
  //  plantsGroup.setVelocityX(0)
    enemysGroup.setVelocityXEach(0)
    
    backGround.velocityX = 0
    
    frameCount = 20
    
    gameOverSound.play()
    
    if(mousePressedOver(retry)||touches.length>0){
      gameState=PLAY
      reset();
      touches = []
    }
    
  }
  if(invisibleGround1.x<0){
    invisibleGround1.x = invisibleGround1.width/2
  }
  
 
 mario.collide(invisibleGround1) 
 
  mario.velocityY = mario.velocityY+0.6
 // mario.velocityY = 10
 coins()
  enemy()
 camera.position.x =  windowWidth/2
  camera.position.y = mario.position.y/3 +200
 drawSprites()
  
  fill(0)
  stroke(0)
  strokeWeight(1)
  textSize(30)
  text("Score = "+ score,width/2-50,60)
  
   fill(0)
  stroke(0)
  strokeWeight(1)
  textSize(30)
  text("HighScore = "+ highScore,width/2-70,30)
}
function coins(){
  if(frameCount%250===0){
  var coins 
  coins = createSprite(width,height-250,3,3)
  coins.addAnimation("coins", coinsImage)
    coins.scale = 0.5
   coins.velocityX = -(5 + score/2)
    coins.depth = mario.depth +1
    mario.depth = mario.depth + 1
    coinsGroup.add(coins)
    coins.lifetime = 500
 //   coins.debug = true
}
}
function enemy(){
  if(frameCount%300===0){
  var enemy 
  enemy = createSprite(width,height-90,3,3)
  //enemy.debug = true
    enemysGroup.add(enemy)
    var enemy1 = Math.round(random(1,2))
    enemy.depth = mario.depth +1
    mario.depth = mario.depth + 1
  switch(enemy1){
      case 1:
 enemy.addAnimation("plant",plantsImage)
       enemy.scale = 0.39
      enemy.velocityX = -(5 + score/2)
      enemy.depth = mario.depth -1
    mario.depth = mario.depth + 1
      enemy.lifetime = 500
      
    
      break;
      case 2:
    enemy.addAnimation("enemy",enemyImage)
      enemy.scale = 0.3
      enemy.velocityX = -(5 + score/2)
      enemy.depth = mario.depth -1
    mario.depth = mario.depth + 1
      enemy.lifetime = 500
        break;
        default:
        break;
    }
}
}
function reset(){
  gameState = PLAY
  
  gameOver.visible = false
  retry.visible = false
  
  if(highScore<score){
    highScore = score
  }
  score = 0;
  enemysGroup.destroyEach()
  coinsGroup.destroyEach()
  
  backGround.velocityX = -5
}
