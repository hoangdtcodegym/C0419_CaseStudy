let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let d;
let score = 0;
let gameOver = false;
//audio
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
let Snake = function () {
    this.spees = 10;
    this.array = [];
    this.radius = 10;
    this.getArray = function () {
        this.array[0] = {
            x: 8 * 10, y: 8 * 10
        }
    };
    this.taoSnake = taoSnake;
    this.taoDuoi = taoDuoi;
    this.headVsArray = headVsArray;

    function taoSnake() {
        ctx.beginPath();
        ctx.arc(this.array[0].x, this.array[0].y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.stroke();
    }

    function taoDuoi() {
        for (let i = this.array.length - 1; i > 0; i--) {
            ctx.beginPath();
            this.array[i].x = this.array[i - 1].x;
            this.array[i].y = this.array[i - 1].y;
            ctx.arc(this.array[i].x, this.array[i].y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "#2a3cff";
            ctx.fill();
        }
    }

    function headVsArray() {
        for (let i = 2; i < this.array.length; i++) {
            if (this.array[0].x == this.array[i].x && this.array[0].y == this.array[i].y) {
                gameOver = true;
            }
        }
    }
};


let Food = function () {
    this.x = Math.floor(Math.random() * 101)*3;
    this.y = Math.floor(Math.random() * 101)*3;
    this.radius = 10;
    this.taoFood = taoFood;

    function taoFood() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#27ff5d";
        ctx.fill();
        ctx.stroke();
    }
};
let snake = new Snake();
snake.getArray();


let food = new Food();

document.addEventListener('keydown', logic);

function logic(event) {
    if (event.keyCode == 37 && d != "sangPhai") {
        d = 'sangTrai';
    } else if (event.keyCode == 38 && d != "xuongDuoi") {
        d = 'lenTren';
    } else if (event.keyCode == 39 && d != "sangTrai") {
        d = 'sangPhai';
    } else if (event.keyCode == 40 && d != "lenTren") {
        d = 'xuongDuoi';
    } else if (event.keyCode == 17) {
        d = 'tangToc';
    }
}


function snakeVsFood() {
    if (Math.abs(snake.array[0].x - food.x) <= 20 && Math.abs(snake.array[0].y - food.y) <= 20) {
        score++;
        eat.play();
        snake.array.push({x: food.x, y: food.y});
        food.x = Math.floor(Math.random() * 10 + 10) * 10;
        food.y = Math.floor(Math.random() * 10 + 10) * 10;
    }
}

function tao() {
    ctx.clearRect(0, 0, 360, 360);
    snake.taoSnake();
    food.taoFood();
    snakeVsFood();
    snake.taoDuoi();
    snake.headVsArray();
    //chuyen dong
    if (d == 'sangTrai') {
        snake.array[0].x -= snake.spees;
        left.play();
    }
    if (d == 'sangPhai') {
        snake.array[0].x += snake.spees;
        right.play();
    }
    if (d == 'lenTren') {
        snake.array[0].y -= snake.spees;
        up.play();
    }
    if (d == 'xuongDuoi') {
        snake.array[0].y += snake.spees;
        down.play();
    }
    if (d == 'tangToc') {
        snake.spees++;
    }
    //cham vien
    if (snake.array[0].x < 10 || snake.array[0].x > 360 - 10 || snake.array[0].y < 10 || snake.array[0].y > 360 - 10 || gameOver == true) {
        dead.play();
        clearInterval(game);
        alert("game over");
    }
    document.getElementById("score").innerHTML = 'Score: ' + score;
}


let game = setInterval(tao, 100);
