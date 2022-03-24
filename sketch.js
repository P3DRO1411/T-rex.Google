var trex;
var trex_animation;
var ground;
var ground_image;


function preload(){
  trex_animation=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_image=loadImage("ground2.png");


}

function pular(){
  if(keyDown("space")){
    trex.velocityY=-5;

  } else{
    trex.velocityY=trex.velocityY+0.5;

  }


}
function chao_se_mexe(){
  ground.velocityX=- 4;
  if(ground.x<0){
    ground.x=ground.width/2;  



  }


}

function setup(){
  createCanvas(600,200);
  trex=createSprite(30,170,30,30);
  trex.addAnimation("correndo",trex_animation);
  trex.scale=0.5;
  ground=createSprite(300,180,600,20);
  ground.addImage("chao",ground_image);

}




function draw(){
  background("white");
  drawSprites();  
  pular();
  trex.collide(ground);
  chao_se_mexe();
}