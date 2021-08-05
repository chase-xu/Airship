let draw = document.getElementById("drawing");
let ctx = draw.getContext("2d");
let x_ = 500;
let y_ = 700;
let bullets = [];
let main;
let on = 0;
let explosive = new Image();
explosive.src = "image/explosion.png";
let lost = new Image();
lost.src ="image/lost.png";
let off = 0;
let hit = 0;
let bullet_time = 1;
let bullet_ = true;
let defeated = 0;
let angle = 0;
let xx = 0;
let yy = 0;

function control(event) {
    let key = event.keyCode;
    if(on == 1) {
        if (key == 38) { //up
            ctx.clearRect(x_-25, y_-25, 50, 90);
            y_ -= 20;
            aircraft(x_, y_);
        } else if (key == 37) { //left
            ctx.clearRect(x_-25, y_-25, 50, 90);
            x_ -= 20;
            aircraft(x_, y_);
        } else if (key == 39) { // right
            ctx.clearRect(x_-25, y_-25, 50, 90);
            x_ += 20;
            aircraft(x_, y_);
        } else if (key == 40) { //down
            ctx.clearRect(x_-25, y_-25, 50, 90);
            y_ += 20;
            aircraft(x_, y_);
        } else if (key == 32) { //space bar
            let pos = [x_, y_-10];
            if (bullet_ == true) {
                bullets.push(pos);
                bullet_ = false;
                bullet_time = 1;
            }
        }
    }   
}
window.onload = function () {
    aircraft(500, 700);
}
function bullet (x,y) {
    let bullet_x;
    let bullet_y;
    bullet_x = x;
    bullet_y = y;
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(x, y, 3, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();   
}
let pos_x = 500;
let pos_y = 0;
function wave1(x, y) {
    enemy(x, y+40);
    enemy(x-40, y+40);
    enemy(x-40, y+50);
    enemy(x+40, y+40);
    enemy(x+40, y+50);
    ctx.beginPath();  
    ctx.stroke(); 
}
function aircraft (x, y) {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.moveTo(x-10, y+10);
    ctx.lineTo(x+10, y+10);
    ctx.lineTo(x, y);
    ctx.lineTo(x-10, y+10);
    ctx.lineTo(x-20, y+20);
    ctx.lineTo(x-10, y+30);
    ctx.lineTo(x, y+60);
    ctx.lineTo(x+10, y+30);
    ctx.lineTo(x+20, y+20);
    ctx.lineTo(x+10, y+10);
    ctx.lineTo(x-10, y+30);
    ctx.lineTo(x+10, y+30);
    ctx.lineTo(x-10, y+10);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function enemy (x, y) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo(x-10, y+10);
    ctx.lineTo(x+10, y+10);
    ctx.lineTo(x, y);
    ctx.lineTo(x-10, y+10);
    ctx.lineTo(x-20, y+20);
    ctx.lineTo(x-10, y+30);
    ctx.lineTo(x, y+60);
    ctx.lineTo(x+10, y+30);
    ctx.lineTo(x+20, y+20);
    ctx.lineTo(x+10, y+10);
    ctx.lineTo(x-10, y+30);
    ctx.lineTo(x+10, y+30);
    ctx.lineTo(x-10, y+10);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
function Enemy () {
    if (timer < 100){       
        pos_x += 2;
        pos_y += 2;
        wave1(pos_x, pos_y); 
        
     } else if (timer <280) {        
        pos_x -= 3;
         pos_y += 3;
         wave1(pos_x, pos_y);
        
     }
}
function Enemy2() {
    if (290 < timer && timer <= 330) {
        pos_x += 0;
        pos_y += 4;
        wave1(pos_x, pos_y);
    
    } else if (330 < timer && timer <= 380) {
        pos_x += 10;
        pos_y += 0;
        wave1(pos_x, pos_y);
    } else if (380<timer && timer< 440) {
        pos_y += 10;
        wave1(pos_x, pos_y);
    }
}
function Enemy3() {
    if (440 < timer && timer <= 480 ) {
        yy += 3;
        xx -= 3;
        pos_x = 80 * Math.sin(angle) + xx;
        pos_y = 80 * Math.cos(angle) + yy;
        angle += 15 * Math.PI / 180;
        wave1(pos_x, pos_y);
    } else if (480 < timer && timer <= 650) {
        xx += 3;
        yy += 3;
        pos_x = 80 * Math.sin(angle) + xx;
        pos_y = 80 * Math.cos(angle) + yy;
        angle += 20 * Math.PI / 180;      
        wave1(pos_x, pos_y); 
    }
}


let timer = 0;
function drawAircraft() {
    ctx.clearRect(0, 0, 1000, 750);
    //console.log (1);

    if (off == 0 && timer < 290) {
        Enemy();
    } else if (timer == 290) {
        off = 0;
        pos_x = 100;
        pos_y = 0;
        console.log(timer);
    } else if (off == 0 && timer > 290 && timer <440 ) {
        Enemy2();
        console.log("enemy");
    } else if (timer == 440) {
        off = 0;
        pos_x = 0;
        pos_y = 0;
        xx = 500;
        yy = 0;
    } else if (timer > 440 && timer < 650 && off == 0) {
        Enemy3();
    }
    shoot();
    if (bullet_ == false){
        bullet_time ++;
        console.log("bullet_time");
    } 
    if (bullet_time == 13) {
        bullet_ = true;
    }
    collision();
    //console.log(timer);
    aircraft(x_, y_);
    timer++;
    if (defeated == 2) {
        clearInterval(main);
        alert("YOU WON !!!");
    }
    if (defeated < 2 && timer >650) {
        clearInterval(main);
        ctx.drawImage(lost,100,100);
    } 

}

function shoot () {
    for (let i = 0; i < bullets.length; i++) {
        bullet(bullets[i][0], bullets[i][1]);
        bullets[i][1] -= 15;
        if (hit == 3 && off == 0) {
            ctx.clearRect(0, 0, 1000, 750);
            aircraft(x_, y_);
            ctx.drawImage(explosive, pos_x-30, pos_y);
            ctx.drawImage(explosive, pos_x-30, pos_y);
            off = 1;
            hit = 0;
            defeated ++;
            console.log("explosion");
        } else if (pos_x+55 >= bullets[i][0] && bullets[i][0] >= pos_x-55 && pos_y +15 <= bullets[i][1] && bullets[i][1] <= pos_y+115 && off == 0 && hit < 5) {
            console.log(0);
            for (let j=0; j < bullets.length; j++) {
                if (j >= i) {
                    bullets[j] = bullets[j+1];
                }
            }
            bullets.pop();               
            ctx.clearRect(0, 0, 1000, 750);
            aircraft(x_, y_);
            hit ++;
            console.log("out");
        }
    }
    for (let k = 0; k < bullets.length; k++) {
        if (bullets[k][1] >= 750) {
            for (let j=0; j < bullets.length; j++) {
                if (j >= i) {
                    bullets[j] = bullets[j+1];
                }
            }
            bullets.pop();
            }        
    }
}
function collision () {
    if ((x_ - 20 < pos_x + 55 && x_-20 > pos_x - 55 && y_ > pos_y + 15 && y_ < pos_y + 115) ||(x_ - 20 < pos_x + 55 && x_-20 > pos_x - 55 && y_ +25 > pos_y + 15 && y_ + 25 < pos_y + 115) ||
    (x_ < pos_x +55 && x_ > pos_x - 55 && y_+60 < pos_y + 115 && y_ +60 > pos_y + 15) || (x_+20 < pos_x+55 && x_+ 20 > pos_x - 55 && y_-10 > pos_y + 15 && y_-10 < pos_y + 115) || 
    (x_+20 < pos_x+55 && x_+ 20 > pos_x - 55 && y_ +25 > pos_y + 15 && y_ + 25 < pos_y + 115) ){
        ctx.clearRect(0, 0, 1000, 750);
        clearInterval(main);
        ctx.drawImage(explosive, x_-15, y_+10);
        ctx.drawImage(explosive, x_-15, y_+10);
        ctx.drawImage(lost, 100, 100);
    }
}

function play(event) {
    if( on == 0) {
     main = setInterval(drawAircraft, 50); 
     on = 1;
    }
}
function pause() {
    clearInterval(main);
    on = 0;
}




