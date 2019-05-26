let rockImg = new Image();
rockImg.src = "img/rock.png";
let explodeImg = new Image();
explodeImg.src = "img/explosion.png";

let Obstacle = function (context, mapWidth, mapHeight, gameSpeed) {
    this.halfSize = Math.floor(Math.random()*30)+30;
    this.size =  this.halfSize*2;

    this.left = Math.floor(Math.random() * (mapWidth - this.size)) + 1;
    this.top = -Math.floor(Math.random() * mapHeight);

    this.speedY = Math.floor(Math.random() * 4) + 1 + gameSpeed;
    this.speedX = Math.floor(Math.random() * 3) - 3 + gameSpeed;

    this.angle = (Math.PI/180) * Math.floor(Math.random() * 360);
    this.isExploded = false;
    this.isCollided = false;
    this.explosionCounter = 3;

    // Vẽ chướng ngại vật
    this.draw = function () {
        let img = this.isCollided ? explodeImg : rockImg;
        context.save();
        context.translate(this.left + this.halfSize, this.top + this.halfSize);
        context.rotate(this.angle);
        context.drawImage(img, -this.halfSize, -this.halfSize, this.size, this.size);
        context.restore();
    };

    this.update = function () {
        // Delay để hiển thị rõ vụ nổ
        if(this.isCollided)
            this.explosionCounter--;
        if(this.explosionCounter == 0)
            this.isExploded = true;

        // chạm thành map thì nảy lại
        if(this.left < 0 || this.right > mapWidth)
            this.speedX = -this.speedX;
        // chạm đáy map thì nổ
        if(this.bottom > mapHeight) {
            this.explode();
        }

        this.top += this.speedY;
        this.left += this.speedX;
        this.right = this.left + this.size;
        this.bottom = this.top + this.size;
    };

    this.collide = function (x, y) {
        return this.left <= x && this.right >= x &&
            this.top <= y && this.bottom >= y;
    };

    this.explode = function () {
        this.isCollided = true;
    };
};