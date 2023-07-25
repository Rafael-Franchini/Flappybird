var canvas=document.getElementById("canvas").getContext("2d");

//objects

//background
var bg = new Bg(0,0,500,900,'assets/images/sky.png');
var bg2 = new Bg(500,0,500,900,'assets/images/sky.png');

//chao
var ground = new Ground(0,700,500,200,'assets/images/ground.png');
var ground2 = new Ground(500,700,500,200,'assets/images/ground.png');

//passaro
var bird = new Bird(120,300,63,51,'assets/images/bird0.png');

//canos
var pipe1=new Pipe(450,500,96,358,'assets/images/pipe1.png');
var pipe2=new Pipe(450,0,96,358,'assets/images/pipe2.png');

//moeda
var coin = new Coin(300,300,45,65,'assets/images/0.png');

//sons
var coin_pick = new Audio('assets/sounds/point.ogg');
var bonk = new Audio('assets/sounds/hit.ogg');

//texto
var text_score = new Text();
var game_over = new Text();

//variaveis
var pts=0;
var gameover=false;

//movimentos
document.addEventListener('click',function(e){
    bird.vel -= 12;
});

function colide(){
    if(bird.colide(pipe1) ||
    bird.colide(pipe2)){
        if(!gameover){
            bonk.play();
            gameover=true;
    }
    }
    if(bird.colide(coin)){
        if(coin.set_visible){
            coin.set_visible=false;
            pts++;
            coin_pick.play();
        }
    }
}

//desenha objs na tela
function draw(){
    bg.draw();
    bg2.draw();
    pipe1.draw();
    pipe2.draw();
    ground.draw();
    ground2.draw();
    if(!gameover){
        bird.draw();
        coin.draw();
        text_score.draw_text(40,'tahoma',190,100,'white');
    }else{
        game_over.draw_text(40,'tahoma',150,300,'white');
    }
}

//update 
function update(){
    if(!gameover){
        //itens em movimento
        bg.move(3,-500,0);
        bg2.move(3,0,500);
        //chao
        ground.move(3,-500,0);
        ground2.move(3,0,500);
        
        //passaro
        bird.animate(10,4,'bird');
        bird.move();
        bird.limit();

        //canos
        pipe1.move(3,-100,600,pipe2);

        //moeda
        coin.move(pipe1);
        coin.animate(6,6,'');
        colide();

        text_score.text='Score: '+pts;
    }
    else{
        game_over.text='Game Over';
    }
}

//principal
function main(){
    canvas.clearRect(0,0,500,900);
    draw();
    update();
    requestAnimationFrame(main);
};
main();
