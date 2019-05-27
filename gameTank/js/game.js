let Game = function () {
    let currentGame = this;
    currentGame.canvas = document.getElementById('myCanvas');
    currentGame.context = currentGame.canvas.getContext('2d');
    currentGame.context.font = "20px Verdana";

    currentGame.tank = new Tank(currentGame.context, currentGame.canvas.width, currentGame.canvas.height);
    currentGame.obstacles = [];
    //currentGame.halloffame = [];
    let backgroundImage = new Image();
    backgroundImage.src = "img/space.png";
    currentGame.intervalCount = 0;
    currentGame.speed = 0;

    currentGame.start = function() {
        document.getElementById('startScreen').style.display = 'none';
        currentGame.canvas.style.display = 'block';
        currentGame.canvas.focus();
        currentGame.interval = setInterval(update, 50);
    };

    // vẽ các đối tượng trong game
    function draw() {
        currentGame.context.clearRect(0, 0, currentGame.canvas.width, currentGame.canvas.height);
        currentGame.context.drawImage(backgroundImage,0,0,currentGame.canvas.width,currentGame.canvas.height);
        for (let i = 0; i < currentGame.obstacles.length; i++)
            currentGame.obstacles[i].draw();
        currentGame.tank.draw();
        currentGame.context.fillText("Scores: " + currentGame.tank.scores,10,20);
    }
    
    function update() {
        currentGame.intervalCount++;
        // 10s tăng speed 1 lần
        if (currentGame.intervalCount % 200 == 0) {
            currentGame.speed += 1;
        }
        // nếu xe tăng bị đụng thì end game
        if (currentGame.tank.isDestroyed) {
            setTimeout(endGame, 100);
            return;
        }
        // số chướng ngại vật tối đa là 10
        if (currentGame.obstacles.length < 10) {
            currentGame.obstacles.push(new Obstacle(currentGame.context, currentGame.canvas.width, currentGame.canvas.height, currentGame.speed));
        }

        for (let i = 0; i < currentGame.obstacles.length; i++) {
            let obstacle = currentGame.obstacles[i];
            obstacle.update();
            if (obstacle.isExploded) {
                currentGame.obstacles.splice(i--, 1);
            }
        }
        currentGame.tank.update(currentGame.obstacles);
        draw();
    }

    function endGame() {
        currentGame.canvas.style.display = 'none';
        document.getElementById('startScreen').style.display = 'block';
        document.getElementById('startButton').style.display = 'none';
        let endGameText = document.getElementById('endGameText');
        endGameText.style.display = 'block';
        endGameText.innerText = 'Scores: ' + currentGame.tank.scores;
        clearInterval(currentGame.interval);
    }

    currentGame.keyDown = function (event) {
        // chỉ chấp nhận 2 phím A và D
        if (event.keyCode != AVAILABLE_KEYS.A && event.keyCode != AVAILABLE_KEYS.D)
            return;
        let direction = event.keyCode == AVAILABLE_KEYS.A ? DIRECTIONS.LEFT : DIRECTIONS.RIGHT;
        currentGame.tank.move(direction);
    };

    currentGame.mouseMove = function (event) {
        currentGame.tank.rotateCannon(event.pageX - currentGame.canvas.offsetLeft, event.pageY - currentGame.canvas.offsetTop);
    };

    currentGame.mouseDown = function () {
        currentGame.tank.fire();
    };
};