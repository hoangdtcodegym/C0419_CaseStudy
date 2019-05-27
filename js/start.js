function startGame() {
    let game = new Game();
    game.start();
    game.canvas.onmousemove = function (event) {
        game.mouseMove(event);
    };
    game.canvas.onkeydown = function (event) {
        game.keyDown(event);
    };
    game.canvas.onmousedown = function (event) {
        game.tank.fire();
    };
}