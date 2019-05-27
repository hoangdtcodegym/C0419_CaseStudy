let Tank = function (context, mapWidth, mapHeight) {
    // chiều rộng của Tank
    let width = 20;
    this.x = mapWidth / 2;
    this.y = mapHeight - width;
    this.cannonballs = [];
    this.cannonAngle = -Math.PI / 2;
    let cannonHeight = width / 2;
    this.cannonWidth = cannonHeight * 3;
    this.cannonPower = 7;
    this.cannonHeadX = 0;
    this.cannonHeadY = 0;
    this.movingSpeed = 3;
    this.isDestroyed = false;
    this.scores = 0;

    this.draw = function () {

        // vẽ thân xe tăng
        context.save();
        context.fillStyle = "green";
        context.beginPath();
        context.arc(this.x, this.y, width,0,Math.PI*2,true);
        context.closePath();
        context.fill();

        // súng
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.cannonAngle);
        context.fillStyle = "red";
        context.beginPath();
        context.rect(0, -cannonHeight / 2, this.cannonWidth, cannonHeight);
        context.closePath();
        context.fill();
        context.restore();

        // bệ súng
        context.fillStyle = "yellow";
        context.beginPath();
        context.arc(this.x, this.y,width / 2,0,Math.PI*2,true);
        context.closePath();
        context.fill();
        context.restore();

        // vẽ đạn
        for(let i = 0;i < this.cannonballs.length; i++)
        {
            this.cannonballs[i].draw(context);
        }
    };

    this.update = function (obstacles) {
        for(let i = 0; i < this.cannonballs.length; i++)
        {
            let ball = this.cannonballs[i];
            // nếu đạn chạm giới hạn (viền map hoặc viền chướng ngại vật)
            // thì đạn biến mất, số đạn của tank giảm đi 1
            if(ball.update())
            {
                this.cannonballs.splice(i--, 1);
            } else {
                // duyệt mảng các đối tượng chướng ngại vật
                for(let j = 0; j < obstacles.length; j++)
                {
                    let obstacle = obstacles[j];
                    // nếu va chạm tại tọa độ của đạn
                    // thì chướng ngại vật nổ, đạn biến mất và được cộng điểm
                    if(obstacle.collide(ball.cx, ball.cy))
                    {
                        obstacle.explode();
                        this.cannonballs.splice(i--,1);
                        this.scores++;
                        break;
                    }
                }
            }
        }
        for(let i = 0; i < obstacles.length; i++)
        {
            let obstacle = obstacles[i];
            if(obstacle.collide(this.x, this.y))
            {
                obstacle.explode();
                this.isDestroyed = true;
                break;
            }
        }
    };

    this.move = function (direction) {
        switch (direction) {
            case DIRECTIONS.LEFT:
                this.x -= this.movingSpeed;
                break;
            case DIRECTIONS.RIGHT:
                this.x += this.movingSpeed;
                break;
        }
        this.left = this.x - width;
        this.right = this.x + width;
    };

    this.fire = function () {
        // được bắn tối đa 5 viên một lúc
        if (this.cannonballs.length > 4)
            return;

        let ball = new CannonBall(mapWidth, mapHeight, this);
        this.cannonballs.push(ball);
    };

    this.rotateCannon = function (targetX, targetY) {
        // tính góc của nòng súng
        this.cannonAngle = Math.atan2(targetY - this.y, targetX - this.x);

        // tính tọa độ đầu súng
        this.cannonHeadX = this.x + this.cannonWidth * Math.cos(this.cannonAngle);
        this.cannonHeadY = this.y + this.cannonWidth * Math.sin(this.cannonAngle);
    };
};