let canvas = document.getElementById("myGame");
let ctx = canvas.getContext("2d");
let ball = {
    radius : 10,
    x : canvas.width/2,
    y : canvas.height - 30,
    dx : 5,
    dy : 2
};

// Khởi tạo thanh chắn.
let paddle = {
    height : 10,
    width : 70,
    x: canvas.width/2,
    y: canvas.height - 10,
    speed: 10,
    Ismovingleft : false,
    Ismovingright : false
};

// Khoi tao cac vien gach
let bricks = {
      rows : 3,
      cols : 5,
      width: 70,
      height: 10,
      offsetX: 25,
      offsetY: 25,
      margin: 25
};
let IsBroken = false;
let IsGameOver = false;
let IsGameWin = false;
let Score = 0;
let MaxScore = bricks.rows * bricks.cols;

let bricksList = [];
for (let i = 0; i < bricks.rows; i++){
    for ( let j = 0; j < bricks.cols; j++){
        bricksList.push({
            x: bricks.offsetX + j*(bricks.width + bricks.margin),
            y: bricks.offsetY + i*(bricks.height + bricks.margin),
            isBroken : false
            });
    }
}

// Bat su kien ban phim
    document.addEventListener("keyup", function (e) {
    if(e.keyCode == 37){
      paddle.Ismovingleft = false;
    } else if (e.keyCode == 39){
        paddle.Ismovingright = false;
    }
    });
    document.addEventListener("keydown", function (e) {
    if(e.keyCode == 37){
        paddle.Ismovingleft = true;
    } else if (e.keyCode == 39){
        paddle.Ismovingright = true;
    }
    });

// Ve qua bong
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
// Ve thanh chan:
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Vẽ các viên gạch
function drawBricks() {
    bricksList.forEach(function (b) {
       if(!b.IsBroken){
           ctx.beginPath();
           ctx.rect(b.x, b.y, bricks.width, bricks.height);
           ctx.fill();
           ctx.closePath();
       }
    });
}


// Hàm xử lý va chạm với đường biên
function BallCollideBounds() {
    if (ball.x > canvas.width - ball.radius || ball.x < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius) {
        ball.dy = -ball.dy;
    }
}

// Hàm xử lý va chạm với thanh chắn
    function BallCollidePaddle() {
        if (ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width && ball.y + ball.radius >= canvas.height - paddle.height) {
            ball.dy = -ball.dy;
        }
    }

    // Tọa độ của bóng khi di chuyển
    function movePositionBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;
    }

    // toa do cua thanh chan khi di chuyen
    function movepaddlePosition() {
        if (paddle.Ismovingleft) {
            paddle.x -= paddle.speed;
        } else if (paddle.Ismovingright) {
            paddle.x += paddle.speed;
        }
        if (paddle.x < 0) {
            paddle.x = 0;
        } else if (paddle.x > canvas.width - paddle.width) {
            paddle.x = canvas.width - paddle.width;
        }
    }

    // Kiem tra va cham bong voi gach
function BallcollideBricks() {
    bricksList.forEach(function (b) {
        if (!b.IsBroken){
            if(ball.x >= b.x && ball.x <= b.x + bricks.width && ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + bricks.height){
                ball.dy = -ball.dy;
                b.IsBroken = true;
                Score += 1;
                if (Score >= MaxScore){
                    IsGameOver = true;
                    IsGameWin = true;
                }
            }
        }
    });
}

    // Kiem tra game over
    function checkGameOver() {
        if (ball.y > canvas.height - ball.radius) {
            IsGameOver = true;
        }
    }
    function EndGame() {
        if(IsGameWin){
            alert("You Win !");
        } else {
            alert("You lose!");
        }
    }
    function draw() {
        if (!IsGameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            drawPaddle();
            BallCollideBounds();
            BallCollidePaddle();
            movePositionBall();
            movepaddlePosition();
            checkGameOver();
            requestAnimationFrame(draw);
            BallcollideBricks();
            drawBricks();
        } else {
            EndGame();
        }
    }

    draw();
