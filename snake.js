const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// khởi tạo box
const box = 32;

// tải lên ảnh

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// tải lên file audio

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

// tạo đối tượng snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// tạo đối tượng food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}
// tạo biến score

let score = 0;

// điều khiển snake

let move;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && move != "RIGHT"){
        move = "LEFT";
        left.play();
    }else if(key == 38 && move != "DOWN"){
        move = "UP";
        up.play();
    }else if(key == 39 && move != "LEFT"){
        move = "RIGHT";
        right.play();
    }else if(key == 40 && move != "UP"){
        move = "DOWN";
        down.play();
    }
}

// hàm kiểm tra xung đột
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// vẽ trên canvas

function draw(){

    ctx.drawImage(ground,0,0);

    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "red";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "blue";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // vị trí đầu cũ
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // định hướng di chuyển

    if( move == "LEFT") snakeX -= box;
    if( move == "UP") snakeY -= box;
    if( move == "RIGHT") snakeX += box;
    if( move == "DOWN") snakeY += box;

    // điều kiện snake ăn food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        snake.pop();
    }

    // vị trí đầu mới

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // điều kiện trò chơi kết thúc
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();

    }

    snake.unshift(newHead);

    ctx.fillStyle = "yellow";
    ctx.font = "45px Change one";
    ctx.fillText(score,2*box,1.6*box);
}

// gọi hàm vẽ với timeout

let game = setInterval(draw,180);