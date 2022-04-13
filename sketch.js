var trex;
var trex_animation;
var ground;
var ground_image;
var ground_invisivel;
var cloud;
var cloud_image;
var numero_aleatorio;
var numero_aleatorio2;
var cactos;
var cactos_image;
var cactos_image2;
var cactos_image3;
var cactos_image4;
var cactos_image5;
var cactos_image6;
var grupo_nuvens;
var grupo_cactos;
var INICIO=1;
var JOGANDO=2;
var FIM=3;
var estados_de_jogo=INICIO;
var trex_parado;
var trex_morreu;
var game_over;
var reset;
var game_over_image;
var reset_image;


function preload(){
  trex_animation=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_image=loadImage("ground2.png");
  cloud_image=loadImage("cloud.png");
  cactos_image=loadImage("obstacle1.png");
  cactos_image2=loadImage("obstacle2.png");
  cactos_image3=loadImage("obstacle3.png");
  cactos_image4=loadImage("obstacle4.png");
  cactos_image5=loadImage("obstacle5.png");
  cactos_image6=loadImage("obstacle6.png");
  trex_parado=loadAnimation("trex1.png");
  trex_morreu=loadAnimation("trex_collided.png");
  game_over_image=loadImage("gameOver.png");
  reset_image=loadImage("restart.png");
}

function pular(){
  if(keyDown("space") && trex.y>=161){
    trex.velocityY=-8;

  } else{
    trex.velocityY=trex.velocityY+0.5;

  }
}

function chao_se_mexe(){
  ground.velocityX=- 5;
  if(ground.x<0){
    ground.x=ground.width/2;  

  }

} 

function criar_cactos(){
  if(frameCount%100===0){
    cactos=createSprite(620,173,10,10);
    cactos.velocityX=-5;
    
    cactos.depth=1;
    cactos.lifetime=170;
    cactos.scale=0.70;
    switch(numero_aleatorio2){
      case 1:
        cactos.addImage(cactos_image);
        break;
      case 2:
        cactos.addImage(cactos_image2);  
        break;
      case 3:
        cactos.addImage(cactos_image3);
        break;
      case 4:
        cactos.addImage(cactos_image4);    
        break;
      case 5:
        cactos.addImage(cactos_image5);
        break;
      case 6:
        cactos.addImage(cactos_image6);     
        break; 
    }
    grupo_cactos.add(cactos);
  }
}

function criar_nuvens(){
  if(frameCount%200===0){
    cloud=createSprite(650,numero_aleatorio,15,10);
    cloud.addImage("nuvens", cloud_image);
    cloud.velocityX=-2;
    cloud.depth=1;
    cloud.lifetime=350;
    grupo_nuvens.add(cloud);
  }

}


function ver_o_mouse(){
  text("X:"+ mouseX+" | Y:"+ mouseY,mouseX,mouseY);
}

function setup(){
  createCanvas(600,200);
  trex=createSprite(30,170,30,30);
  trex.addAnimation("parado",trex_parado);
  trex.addAnimation("correndo",trex_animation);
  trex.addAnimation("morto",trex_morreu);
  trex.scale=0.5;
  trex.depth=2;
  ground=createSprite(300,180,600,20);
  ground.addImage("chao",ground_image);
  ground_invisivel=createSprite(300,195,600,20);
  ground_invisivel.visible=false;
  grupo_cactos=new Group();
  grupo_nuvens=new Group();
  game_over=createSprite(312,46,10,10);
  reset=createSprite(288,120,10,10);
  game_over.addImage("perdeu", game_over_image);
  reset.addImage("reset",reset_image);
  game_over.visible=false;
  reset.visible=false;
  trex.debug=true;
  trex.setCollider("circle",0,0,44);
}

function inicio(){
  if(keyDown("space")){
    estados_de_jogo=JOGANDO;
    pular();
  }
}

function jogando(){
  criar_nuvens();
  numero_aleatorio=Math.round(random(20,80));
  numero_aleatorio2=Math.round(random(1,6));
  criar_cactos();
  pular();
  trex.collide(ground_invisivel);
  chao_se_mexe();
  trex.changeAnimation("correndo",trex_animation);
  if(trex.isTouching(grupo_cactos)){
    estados_de_jogo=FIM;
  }


}

function fim(){
  ground.velocityX=0;
  grupo_nuvens.setVelocityXEach(0);
  grupo_cactos.setVelocityXEach(0);
  trex.velocityY=0;
  trex.changeAnimation("morto",trex_morreu);
  game_over.visible=true;
  reset.visible=true;
  grupo_cactos.setLifetimeEach(-1);
  grupo_nuvens.setLifetimeEach(-1);
}

function draw(){ 
  background("white");
  drawSprites();  
  ver_o_mouse();
  if(estados_de_jogo===FIM){
    fim();


  }
  
  if(estados_de_jogo===INICIO){
    inicio();
  }
  if(estados_de_jogo===JOGANDO){
    jogando();
  }
}