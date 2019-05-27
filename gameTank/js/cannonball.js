let CannonBall = function (mapWidth, mapHeight, tank) {
    this.radius = 4;

    // giới hạn tối thiểu và tối đa của tọa độ viên đạn
    this.minX = this.radius;
    this.minY = this.radius;
    this.maxX = mapWidth - this.radius;
    this.maxY = mapHeight - this.radius;

    // tốc độ bay của đạn
    this.speedX = Math.cos(tank.cannonAngle) * tank.cannonPower;
    this.speedY = Math.sin(tank.cannonAngle) * tank.cannonPower;

    // tọa độ khởi tạo của đạn bằng vị trí đầu nòng súng
    this.cx = tank.cannonHeadX;
    this.cy = tank.cannonHeadY;

    this.draw = function (context) {
        context.fillStyle = "red";
        context.beginPath();
        context.arc(this.cx, this.cy, this.radius,0,Math.PI * 2,true);
        context.closePath();
        context.fill();
    };

    // hàm update trả về trạng thái chạm giới hạn của đạn
    this.update = function () {
        this.cx += this.speedX;
        this.cy += this.speedY;

        // đạn chạm giới hạn
        return this.cx < this.minX || this.cx > this.maxX ||
            this.cy < this.minY || this.cy > this.maxY;

    };
};