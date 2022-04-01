var trex;
var trex_animation;
var ground;
var ground_image;
var ground_invisivel;
var cloud;
var cloud_image;
var numero_aleatorio;



function preload(){
  trex_animation=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_image=loadImage("ground2.png");
  cloud_image=loadImage("cloud.png");

}

function pular(){
  if(keyDown("space") && trex.y>=161){
    trex.velocityY=-7;

  } else{
    trex.velocityY=trex.velocityY+0.5;

  }
  //console.log(trex.y);



}
function chao_se_mexe(){
  ground.velocityX=- 4;
  if(ground.x<0){
    ground.x=ground.width/2;  



  }


} 

function criar_nuvens(){
  if(frameCount%60===0){
    cloud=createSprite(650,numero_aleatorio,15,10);
    cloud.addImage("nuvens", cloud_image);
    cloud.velocityX=-5;
    cloud.depth=1;
    console.log(trex.depth,cloud.depth);

  }

}




function ver_o_mouse(){
  text("X:"+ mouseX+" | Y:"+ mouseY,mouseX,mouseY);



}

function setup(){
  createCanvas(600,200);
  trex=createSprite(30,170,30,30);
  trex.addAnimation("correndo",trex_animation);
  trex.scale=0.5;
  trex.depth=2;
  ground=createSprite(300,180,600,20);
  ground.addImage("chao",ground_image);
  ground_invisivel=createSprite(300,195,600,20);
  ground_invisivel.visible=false;
  

}




function draw(){ 
  background("white");
  drawSprites();  
  pular();
  trex.collide(ground_invisivel);
  chao_se_mexe();
  ver_o_mouse();
  criar_nuvens();
  numero_aleatorio=Math.round(random(20,80));
}