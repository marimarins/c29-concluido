const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var fundo
var torre
var torreimg
var canhao 
var angle=20
var baladecanhao
var balas = []
var navio
var barcos = []
var barco
var barcoanimacao = []
var barcospritedata, barcospritesheet
var quebradoanimacao = []
var quebradospritedata,quebradospritesheet
var isGameOver = false
var isRisada = false 
var somblup, somkabum, somrisada, musicatema
var score = 0 
function preload() {
  fundo= loadImage("assets/background.gif")
  torreimg= loadImage("assets/tower.png")
  barcospritedata = loadJSON ("assets/boat/boat.json")
  barcospritesheet = loadImage("assets/boat/boat.png")
  quebradospritedata = loadJSON("assets/boat/brokenBoat.json")
  quebradospritesheet = loadImage("assets/boat/brokenBoat.png")
  somblup = loadSound("assets/cannon_water.mp3")
  somkabum = loadSound("assets/cannon_explosion.mp3")
  somrisada = loadSound("assets/pirate_laugh.mp3")
  musicatema = loadSound("assets/background_music.mp3")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
 angle=15
 var options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 torre= Bodies.rectangle(160,350,160,310,options)
 World.add(world,torre)
canhao=new Canhao(180,110,130,100,angle)

var barcoframes = barcospritedata.frames;
for(var i = 0; i<barcoframes.length; i++){
  var pos = barcoframes[i].position

var ing= barcospritesheet.get(pos.x, pos.y, pos.w, pos.h)
barcoanimacao.push(ing)
}

var quebradoframes = quebradospritedata.frames;
for(var i = 0; i<quebradoframes.length; i++){
  var pos= quebradoframes[i].position
  var img = quebradospritesheet.get(pos.x,pos.y,pos.w,pos.h)
  quebradoanimacao.push(img)
}
}

function draw() {
image(fundo,0,0,1200,600)
if (!musicatema.isPlaying()){
  musicatema.play();
  musicatema.setVolume(0.1)
}
textSize(40)
fill("black")
text("pontuação: "+score,width-400,50)
  Engine.update(engine);
 console.log(quebradoanimacao)
 rect(ground.position.x, ground.position.y,width*2,1);
  push()
  imageMode(CENTER)
   image(torreimg,torre.position.x, torre.position.y, 160, 310)
  pop()
  showBarcos();
  for(var i=0; i<balas.length; i++){
    showbalas(balas[i]);
    colisaobarco(i)
  }
  canhao.display();
console.log(barcos.lenght)
}
function keyPressed(){
  if(keyCode===DOWN_ARROW){
    var baladecanhao= new Balacanhao(canhao.x,canhao.y);
    balas.push(baladecanhao);
  }
}
function showbalas(bala,i){
  if (bala){
    bala.display();
    if(bala.body.position.x>= width || bala.body.position.y>= height-50 )
    if(!bala.isSink){
    somblup.play()
    bala.remove(i)
  }
  }
}
function keyReleased(){
  if (keyCode===DOWN_ARROW){
    somkabum.play();
    balas[balas.length-1].atirar();
  }
}
function showBarcos(){
if (barcos.length>0) {
  if(barcos[barcos.length-1] === undefined || barcos[barcos.length-1].body.position.x<width-300){
    var posicoes=[-40, -60, -70, -20]
    var posicao= random(posicoes)
     var barco=new Barco(width, height -100, 170, 170, posicao, barcoanimacao)
    barcos.push(barco)
  }
  
  for (var i=0;i<barcos.length; i++){
    if (barcos[i]){
      Matter.Body.setVelocity(barcos[i].body,{x:-0.9,y:0})
      barcos[i].display();
      barcos[i].animate();
      var colisao = Matter.SAT.collides(torre,barcos[i].body)
      if(colisao.collided && !barcos[i].isBroken){
        if (!isRisada && !somrisada.isPlaying()){
         somrisada.play()
         isRisada = true 
        }
        isGameOver= true
        gameOver();
      }
    }
    else {barcos[i]}
  }
}
else {var barco= new Barco(width,height-60,170,170,-60, barcoanimacao)
barcos.push(barco)}
}
function colisaobarco(index){
  for(var i = 0 ;i<barcos.length; i++){
    if(balas[index] !== undefined && barcos[i] !== undefined){
      var colisao= Matter.SAT.collides(balas[index].body,barcos[i].body)
      if(colisao.collided){
      
        score+=5
        barcos[i].remove(i);
        Matter.World.remove(world,balas[index].body);
        delete balas[index]
      
      }
    }
  }
}
function gameOver(){
swal({
  title: "fim de jogo",
  text:"obrigado por jogar", 
  imageURL:"https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
  imageSize:"150x150",
  confirmButtomText: "jogar novamente"
},
function (isConfirm){
  if(isConfirm){location.reload();}
})
}
