var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Circle(x,y,dx,dy,rad,xtra) {
    this.x = x;
    this.y = y;
    this.dx  = dx;
    this.dy = dy;
    this.rad = rad;
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y, this.rad,6.3,false);
        c.strokeStyle = 'black';
        c.stroke();
        c.fill();
    }
    this.update = function() {
        if (this.x + this.rad + xtra >= innerWidth || this.x - this.rad < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.rad >= innerHeight || this.y - this.rad < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let mouse = {
    x: undefined,
    y:  undefined,
}


window.addEventListener('mousemove',function (evt){
    mouse.x = evt.x - 110;
    mouse.y = evt.y;
});

let speed = 1;
let size = 100;
let circleArr = [];

for (let i = 0; i < 100; i++) {
    circleArr.push(new Circle(
    Math.random() * innerWidth,
    Math.random() * innerHeight,
    (Math.random() * speed) - (speed/2),
    (Math.random() * speed) - (speed/2),
    (Math.random() * size) + 5,110
    ))
}

function addCir (x,y) {
    circleArr.push(new Circle(
    x,y,(Math.random() * speed) - (speed/2),
    (Math.random() * speed) - (speed/2),
    (Math.random() * size) + 5,110
    ))
} 

canvas.onmousedown = function(){addCir(mouse.x,mouse.y)};

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(let i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
    }
    console.log('There are ' + circleArr.length + ' circles.')
}

animate();