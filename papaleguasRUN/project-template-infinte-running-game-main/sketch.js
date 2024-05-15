var ppleguas, trap, anvil, cactosem, cena, coyot, boom, invisibleGround, street, ceu, tnt;
var boomend, trapimg, ppleguasrun, cactoimg, cctcoyotimg, coyotimg, anvilimg, rocketimg, cenaimg, endimg, tntimg, cenaimg2, ceuimg;
var score = 0;
var PLAY=1;
var END=0;
var gameState=1;
var score=0;
var trapG, coyotG, cactoG, anvilG, tntG;


function preload(){
ppleguasrun = loadAnimation("papaL.png", "papaLL.png");
boomend = loadAnimation("BOOM.png");
endimg = loadAnimation("end.png");

cenaimg = loadImage("desertocena.jpg");
trapimg = loadImage("armadilha.png");
cactoimg = loadImage("cactosem.png");
cctcoyotimg = loadImage("cacto.png");
coyotimg = loadImage("coioteCenário.png");
anvilimg = loadImage("bigorna.png");
rocketimg = loadImage("foguete.png");
tntimg = loadImage("TNT.png");
cenaimg2 = loadImage("desertocena2.jpg")
ceuimg = loadImage("ceu.jpg");
}

function setup() {
createCanvas(windowWidth,windowHeight);
console.log(gameState)

ceu = createSprite(windowWidth/2, windowHeight/2-425);
ceu.addImage(ceuimg);
ceu.velocityX=-2.5;

cena = createSprite(900, 540, 400, 20);
cena.addImage(cenaimg);
cena.scale=3;
cena.lifetime=375;

ppleguas = createSprite(windowWidth-1200,windowHeight/2+100,20,50);
ppleguas.addAnimation("running", ppleguasrun);
ppleguas.addAnimation("collided" ,boomend);
ppleguas.addAnimation("captured" ,endimg);
ppleguas.scale = 0.75;
ppleguas.debug = false;
ppleguas.setCollider("circle", 0, 0, 75);

invisibleGround = createSprite(windowWidth-1200,windowHeight/2+150 ,windowWidth,10);
invisibleGround.visible = false;
invisibleGround.debug = false;
street = createSprite(windowWidth-1200,windowHeight/2+125,400,10);
street.visible = false;

trapG = createGroup();
coyotG = createGroup();
cactoG = createGroup();
anvilG = createGroup();
tntG = createGroup();
}

function draw() {
    background(255);
    
    ppleguas.collide(invisibleGround);
    
    if(anvilG.isTouching(invisibleGround)){
        anvilG.setVelocityYEach(0);
    }


if(gameState === PLAY){
    if(keyDown("space") && ppleguas.isTouching(street)) {
        ppleguas.velocityY = -30 ;
    }
    
    ppleguas.velocityY = ppleguas.velocityY + 1.5;
    score = score + Math.round(frameCount/60);
    cena.velocityX= -(10 + score/10000)
    
    if(ceu.x<600){
        ceu.x = windowWidth-600
    }
    
    if(cena.x < 620){
        cena.x = windowWidth-620;
        var rand = Math.round(random(1,2));
        switch(rand) {
            case 1: cena.addImage(cenaimg);
            break;
            case 2: cena.addImage(cenaimg2);
            break;
            default: break;
        }
        cena.lifetime=675;
}

spawntrap();
spawnCoyot();
spawnCactus();
spawnTNT();
spawnAnvil();

if(trapG.isTouching(ppleguas) || coyotG.isTouching(ppleguas)){
gameState = END;
ppleguas.changeAnimation("captured", endimg);
coyotG.destroyEach();
}

if(tntG.isTouching(ppleguas) || anvilG.isTouching(ppleguas)){
gameState = END;
ppleguas.changeAnimation("collided" ,boomend);
tntG.destroyEach();
anvilG.destroyEach();
}

}
else if (gameState === END) {
    cena.velocityX = 0;
    ppleguas.velocityY = 0;
    ceu.velocityX= 0;
    trapG.setVelocityXEach(0);
    coyotG.setVelocityXEach(0);
    tntG.setVelocityXEach(0);
    cactoG.setVelocityXEach(0);
    anvilG.setVelocityXEach(0);
    anvilG.setVelocityYEach(0);
    cena.lifetime=-1;
    trapG.setLifetimeEach(-1);
    tntG.setLifetimeEach(-1);
    cactoG.setLifetimeEach(-1);
    coyotG.setLifetimeEach(-1);
    anvilG.setLifetimeEach(-1);
    
if(keyDown("SPACE")) {      
reset();
}
}

drawSprites();
textSize(20);
fill(0);
text("Score: "+ score,width-150,30);
}

function spawntrap(){
    if (frameCount % 250 === 0){
        trap = createSprite(random(windowWidth-50,windowWidth+50),windowHeight/2+150,10,40);
        trap.velocityX = -(11.5 + score/10000);
        trap.addImage(trapimg);
        trap.scale = 0.25;
        trap.lifetime = 700;
        trap.setCollider("circle");
        trap.debug=false;
        
        trapG.add(trap);
    }
}

function spawnCoyot(){
    if (frameCount % 400 === 0){
        coyot = createSprite(random(windowWidth-50,windowWidth+50), windowHeight/2-25,10,40);
        
        var rand2 = Math.round(random(1,3));
        switch(rand2) {
            case 1: coyot.addImage(rocketimg);
            coyot.velocityX = -(15 + score/10000);
            coyot.scale = 0.75;
            coyot.y = windowHeight/2+100
            coyot.setCollider("circle", 0, 0, 150)
            break;
            case 2: coyot.addImage(cctcoyotimg);
            coyot.scale = 0.75;  
            coyot.velocityX = -(10 + score/10000);
            coyot.setCollider("rectangle", 0, -50, 100, 200)
            break;
            case 3: coyot.addImage(coyotimg);
            coyot.velocityX = -(10 + score/10000);
            coyot.scale = 0.8; 
            coyot.y = windowHeight/2+175;
            coyot.setCollider("rectangle", 0, 10);
            break;
            default: break;
        }
        
        coyot.lifetime = 600;
        coyot.debug=false;
        coyotG.add(coyot);
    }
}

function spawnCactus(){
    if (frameCount % 325 === 0){
        cactosem = createSprite(random(windowWidth-50,windowWidth+50),windowHeight/2-25,10,40);
        cactosem.velocityX = -(10 + score/10000);
        cactosem.addImage(cactoimg);
        cactosem.scale = 0.75;
        cactosem.lifetime = 700;
        
        cactoG.add(cactosem);
    }
}

function spawnTNT(){
    if (frameCount % 625 === 0){
        tnt = createSprite(random(windowWidth-50,windowWidth+50),windowHeight/2-95,10,40);
        tnt.velocityX = -(10 + score/10000);
        tnt.addImage(tntimg);
        tnt.scale = 0.75;
        tnt.lifetime = 700;
        tnt.debug=false;
        tnt.setCollider("rectangle", -175, 40, 100, 200)
        
        tntG.add(tnt);
    }
}

function spawnAnvil(){
    if (frameCount % 500 === 0){
        anvil = createSprite(random(windowWidth-50,windowWidth+50),windowHeight/2-200,10,40);
        anvil.velocityX = -(12.5 + score/10000);
        anvil.velocityY = (5 + score/11111);
        anvil.addImage(anvilimg);
        anvil.scale = 1;
        anvil.lifetime = 700;
        anvil.debug=false;
        anvil.setCollider("circle", 0, -40, 75)
        
        anvilG.add(anvil);
    }
}


function reset(){
    gameState = PLAY;
    
    cactoG.destroyEach();
    tntG.destroyEach();
    coyotG.destroyEach();
    trapG.destroyEach();
    anvilG.destroyEach();
    
    ppleguas.changeAnimation("running", ppleguasrun);
    
    score = 0;
    
  }