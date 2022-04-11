class Balacanhao{

constructor(x,y){
 var options={
     isStatic:true
 }
    this.r=30;
    this.body=Bodies.circle(x,y,this.r, options)
this.imagebala=loadImage("assets/bola+canhao.png")
World.add(world,this.body)}
remove(i){
    Matter.Body.setVelocity(this.body,{x:0,y:0})
    setTimeout(()=>{
        Matter.World.remove(world, balas[i].body)
        delete balas[i]
    },1000 )
}
atirar(){
    var newAngle=canhao.angle-28;
    newAngle=newAngle*(3.14/180)
    var velocity=p5.Vector.fromAngle(newAngle)
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body,false)
    Matter.Body.setVelocity(this.body, {x:velocity.x*(180/3.14),
         y:velocity.y*(180/3.14)})

}

display(){
    var pos=this.body.position;
    push()
    imageMode(CENTER)

    image(this.imagebala,pos.x,pos.y,this.r,this.r)
    pop()

   
}
}