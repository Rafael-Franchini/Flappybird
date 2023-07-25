class Text{
    text='';
   draw_text(size,font,x,y,cor){
        canvas.font = size+'px'+" "+font;
        canvas.fillStyle = cor;
        canvas.fillText(this.text, x, y);
    }
}
class Obj{
    frame=0;
    timer=0;
    set_visible=true;
    constructor(x,y,width,height,image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }
    draw(){
        if(this.set_visible){
            var img = new Image();
            img.src = this.image;
            canvas.drawImage(img,this.x,this.y,this.width,this.height);
        }
    }
    animate(speed,limit,nome){
        this.timer++;//conta o tempo
        if(this.timer > speed){//se o tempo for maior que 10
            this.timer = 0;//zera o tempo
            this.frame++;//incrementa o frame
        }
        if(this.frame >= limit){//se o frame for maior que 2
            this.frame = 0;//zera o frame
        }
        //altera a imagem
        this.image='assets/images/'+nome+this.frame+'.png';
    }
    colide(obj){
        if(this.x + this.width >= obj.x &&
             this.x <= obj.x + obj.width &&
              this.y + this.height >= obj.y &&
               this.y <= obj.y + obj.height){
            return true;
        }else{
            return false;
        }
    }

}
class Bg extends Obj{
    move(speed,limit,pos){
        this.x -= speed;
        if(this.x <= limit){
            this.x = pos;
        }
    };
}
class Ground extends Bg{

}
class Bird extends Obj{
    vel=2;
    gravity=1;
    move(){
        if(this.vel < 10){
            this.vel += this.gravity;
        }
        this.y += this.vel;
    }
    limit(){
        if(this.y >= 660){
            this.y = 660;
        }
        if(this.y <= -10){
            this.y = -10;
        }
    }
}
class Pipe extends Obj{
    move(speed,limit,pos,pipe2){
        this.x -= speed;
        if(this.x <= limit){
            this.x = pos;
            this.y = Math.random() * (600-400)+400;
        }
        pipe2.x=this.x;
        pipe2.y=this.y-600;
    };
}
class Coin extends Obj{
    move(pipe){
        this.x=pipe.x;
        this.y=pipe.y-150;
        if(this.x <= 0){
            this.set_visible=true;
        }
    }
}
