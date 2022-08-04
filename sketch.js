var monster,tank,ammo,ammoGroup,shield,box,win,lose;
var PLAY=1;
var END=0;
var hits,hitsGroup;

 var monsterLives=100;

 var gameState=PLAY;
 
 var shooter= true;

function preload(){
  monsterNorm=loadImage("./assets/bossNormal.png");
  monsterMad=loadImage("./assets/bossMad.png");
  monsterHurt=loadImage("./assets/bossHurt.png");
  tankImg=loadImage("./assets/tank.webp");
  bgImg=loadImage("./assets/bg.jpg");
  ammoImg=loadImage("./assets/ammos.png");
  gooImg=loadImage("./assets/gooimg.png")
  shieldImg=loadImage("./assets/sheildimg.png")
  uWinImg=loadImage("./assets/uwin.png")
  uLoseImg=loadImage("./assets/ulose.jpg")
  tryAgainImg=loadImage("./assets/trygain.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  tank=createSprite(300,400);
  tank.addImage("tank", tankImg);
  tank.scale=0.5;

  monster=createSprite(1150,170);
  monster.addImage("monster", monsterNorm);
  monster.scale=0.4;

  ammoGroup = new Group();
  hitsGroup = new Group()
  
 
}

function draw() {
  background(bgImg);
  
 if(gameState===PLAY){
  shoot();
  mousePressed();
   handleMonsterSad();
   monsterAttack();

   textSize(15)
   text("Press the mouse over the tank to get a shield. How many more hits needed to win: " + monsterLives, 90,20);


   if(monsterLives===0 || hitsGroup.isTouching(tank)){
    gameState=END
   }
 }

  if(gameState === END){
  box = createSprite(width/2,height/2+200);
  box.addImage("box",tryAgainImg);
  box.scale=0.5;
  

  if(mousePressedOver(box)){
    window.location.reload();
  }
 }

 drawSprites();
}


 


function shoot(){
  if(shooter=true){
  if(keyIsDown(32)){
    ammo = createSprite(tank.x+160,tank.y-50);
    ammo.velocityX=60;
    ammo.velocityY=-18;
    ammo.addImage("ammo",ammoImg);
    ammo.scale=0.1;
    ammoGroup.add(ammo);
  }
 }
}

function handleMonsterSad(){
  if(ammoGroup.isTouching(monster)){
    monster.addImage("monster",monsterHurt);
    ammoGroup.destroyEach();
    monster.scale=0.7;
    monsterLives=monsterLives-1;
  }
  else{
    monster.addImage("monster",monsterNorm);
    monster.scale=0.4;
  }
}

function monsterAttack(){
if(frameCount % 30 === 0){
  hits = createSprite(monster.x,monster.y,100,100);
  hits.velocityX=-90;
  hits.velocityY=27;
  hits.addImage("hits",gooImg);
  hits.scale=0.6;
  monster.addImage("monster",monsterMad);
  monster.scale=0.3;
  hitsGroup.add(hits);
} 
}

function mousePressed(){
  if(mousePressedOver(tank)){
     shield=createSprite(tank.x,tank.y,10,200);
     shield.addImage("shield",shieldImg);
     shield.scale=1.5; 
     shield.lifetime=1;
     shooter=false;
     if(hitsGroup.isTouching(shield)){
     hitsGroup.destroyEach();
    }
}
else{
  shooter=true;
}
}

