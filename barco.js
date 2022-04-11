class Barco{
    constructor(x,y,width,height,barcopos,barcoanimacao){
        this.animation = barcoanimacao
        this.speed= 0.05
        this.width=width;
        this.height=height;
        this.barcoPosition=barcopos
        this.body=Bodies.rectangle(x,y,width,height)
        this.isBroke=false
        World.add(world,this.body)

    }
    animate(){
        this.speed+=0.05
    }
    remove(i){
        this.animation=quebradoanimacao
        this.speed= 0.05
        this.width= 300
        this.height=300
        this.isBroken=true
        setTimeout(()=>{
            Matter.World.remove(world,barcos[i].body)
            delete barcos[i]
        },2000 )
    }
   
    display(){
        var pos = this.body.position
        var angle = this.body.angle
        var index = floor (this.speed%this.animation.length)
      push()
      translate(pos.x,pos.y)
      rotate(angle)
      imageMode(CENTER)
      image(this.animation[index],0,this.barcoPosition, this.width,this.height)
      pop()
    }

}