var bullet, b1, b2, b3, wall, wallImg,replay, replayImg, shooterImg, shooter, guImg, canImg;
var bg, bgImg;
var weight, speed, thikness;
var gu, cancel;

function preload(){
  bgImg = loadImage("bg.jpg");
  wallImg = loadImage("wood wall.png");
  replayImg = loadImage("re.png");
  b1 = loadAnimation("b1.png");
  b2 = loadAnimation("b2.png");
  b3 = loadAnimation("b3.png");
  shooterImg = loadImage("man.png");
  canImg = loadImage("cancel.png");
  guImg = loadImage("guidelines.png");
}

function setup() {
  createCanvas(1600,400);
  bg = createSprite(800,100,1600,400);
  bg.addImage(bgImg);
  bg.scale = 2;
  thikness = random(22,83);
  speed = random(223,321);
  bullet = createSprite(350, 250, 50, 50);
  bullet.addAnimation("shot", b1);
  bullet.addAnimation("stopped", b2);
  bullet.addAnimation("stopped", b3);
  bullet.visible = false;

  shooter = createSprite(150,330, 50, 100);
  shooter.addImage(shooterImg);
  shooter.scale = 2.5;

  wall = createSprite(1420, 200, thikness, 300);
  wall.addImage(wallImg);
  wall.scale = 0.7;
  weight = random(30, 52);
  replay = createSprite(800,300);
  replay.addImage(replayImg);
  replay.scale = 0.7;

  gu = createSprite(800,200);
  gu.addImage(guImg);
  gu.scale = 0.8;
  cancel = createSprite(800,50);
  cancel.addImage(canImg);
  cancel.scale = 0.1;

  textSize(40);
  textFont("Edwardian Script ITC");
  textStyle(BOLD);
}

function draw() {
  background(0,0,0); 
  console.log(speed);
  guide();
  reset();
  down();
  ve();
  drawSprites();
}

function ve(){
  if(keyDown("space") && bullet.x<600){
  bullet.velocityX = speed;
  bullet.visible = true;
  }
}

function down(){
  if(isTouching(bullet, wall)){
    var damage=0.5* weight * speed * speed/(thikness *thikness *thikness);
    if(damage>10){
      bullet.changeAnimation("stopped", b2);
    }

    if(damage<10){
      bullet.changeAnimation("collided", b3);
    }
    bullet.velocityX = -10;
    bullet.velocityY = 10;

  }

  if(bullet.y>395 && bullet.x>900){
    bullet.velocityY = 0;
    bullet.velocityX = 0;
  }
}

function reset(){
  if(mousePressedOver(replay)){
    bullet.x = 350;
    bullet.y = 250;
    bullet.visible = false;
    bullet.changeAnimation("shot", b1);
  }
}

function guide(){
  if(mousePressedOver(cancel)){
    gu.destroy();
    cancel.destroy();
  }
}