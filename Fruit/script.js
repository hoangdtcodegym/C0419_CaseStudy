var timebanana = 1300;
var timeapple = 4000;
var timedownspeed = 30000;
var timelife = 15000;
var timelvup = 20000;

function Basket(left, top, size, speed) {
    this.left = left;
    this.top = top;
    this.size = size;
    this.speed = speed;
    this.basketHTML = function () {
        let basket = '<img src="basket.jpeg" style="position:absolute;left: ' + this.left + 'px;top:' + this.top + 'px; width:' + this.size + 'px;height: ' + this.size + 'px">';
        return basket;
    };
    this.moveLeft = function () {
        if (this.left > 0) {
            this.left -= this.speed;
        }
    };
    this.moveRight = function () {
        if (this.left < 400) {
            this.left += this.speed;
        }
    };
}

function Items(width, height, speed, name) {
    this.left = Math.floor(Math.random() * 400);
    this.name = name;
    this.top = 0;
    this.height = height;
    this.width = width;
    this.speed = speed;
    this.itemHTML = function () {
        let item = '<img src="' + this.name + '.png" style="position: absolute; width:' + this.width + 'px; height:' + this.height + 'px; left: ' + this.left + 'px;top: ' + this.top + 'px">'
        return item;
    };
    this.moveDown = function () {
        if (this.top <= 900) {
            this.top += this.speed;
        }
    };
}

function GameBoard() {
    this.speedbanana = 2;
    this.speedapple = 3;
    this.speeddownspeed = 5;
    this.life = 3;
    this.time = 0;
    this.score = 0;
    this.isOver = false;
    this.basket = new Basket(0, 900, 100, 4);
    this.arrbana = [];
    this.arrapple = [];
    this.arrdownspeed = [];
    this.getTime = function () {
        this.time++;
        document.getElementById('time').innerHTML = this.time
    };
    this.levelUp = function () {
        this.speedbanana++;
        this.speedapple++;
        console.log(this.speedapple);
        console.log(this.speedbanana);
        timeapple -= 300;
        timebanana -= 100;
    };
    this.getLife = function () {
        this.life++;
        document.getElementById('life').innerHTML = this.life;
    };
    this.getBanana = function () {
        let banana = new Items(50, 100, this.speedbanana, 'banana');
        this.arrbana.push(banana);
    };
    this.getApple = function () {
        let apple = new Items(70, 70, this.speedapple, 'apple');
        this.arrapple.push(apple);
    };
    this.getdownspeed = function () {
        let dospeed = new Items(40, 40, this.speeddownspeed, 'downspeed');
        this.arrapple.push(dospeed);
    };
    this.movebananadown = function () {
        if (this.isOver) {
            return;
        } else {
            document.getElementById('game').innerHTML = '';
            for (let i = 0; i < this.arrbana.length; i++) {
                document.getElementById('game').innerHTML += this.arrbana[i].itemHTML();
                this.arrbana[i].moveDown();
            }
            document.getElementById('game').innerHTML += this.basket.basketHTML();
        }
    };
    this.moveappledown = function () {
        if (this.isOver) {
            return;
        } else {
            document.getElementById('game').innerHTML = '';
            for (let j = 0; j < this.arrbana.length; j++) {
                document.getElementById('game').innerHTML += this.arrbana[j].itemHTML();
            }
            for (let i = 0; i < this.arrapple.length; i++) {
                document.getElementById('game').innerHTML += this.arrapple[i].itemHTML();
                this.arrapple[i].moveDown();
            }
            document.getElementById('game').innerHTML += this.basket.basketHTML();
        }
    };
    this.moveBasketleft = function () {
        if (this.isOver) {
            return;
        } else {
            this.basket.moveLeft();
            document.getElementById('game').innerHTML = this.basket.basketHTML();
        }
    };
    this.moveBasketright = function () {
        if (this.isOver) {
            return;
        } else {
            this.basket.moveRight();
            document.getElementById('game').innerHTML = this.basket.basketHTML();
        }
    };
    this.movespeeddown = function () {
        if (this.isOver) {
            return;
        } else {
            document.getElementById('game').innerHTML = '';
            for (let j = 0; j < this.arrbana.length; j++) {
                document.getElementById('game').innerHTML += this.arrbana[j].itemHTML();
            }
            for (let i = 0; i < this.arrapple.length; i++) {
                document.getElementById('game').innerHTML += this.arrapple[i].itemHTML();
            }
            for (let k = 1; k < this.arrdownspeed.length; k++) {
                document.getElementById('game').innerHTML += this.arrdownspeed[k].itemHTML();
                this.arrdownspeed[k].moveDown();
            }
            document.getElementById('game').innerHTML += this.basket.basketHTML();
        }
    };
    this.successbanana = function () {
        for (let i = 0; i < this.arrbana.length; i++) {
            let top = this.basket.top - this.arrbana[i].top;
            if (top < this.arrbana[i].height && this.arrbana[i].left > this.basket.left &&
                this.arrbana[i].left < (this.basket.left + this.basket.size)) {
                this.score += 10;
                this.arrbana.shift();
                document.getElementById('Score').innerHTML = this.score;
            }
        }
    };
    this.successapple = function () {
        for (let i = 0; i < this.arrapple.length; i++) {
            let top = this.basket.top - this.arrapple[i].top;
            if (top < this.arrapple[i].height && this.arrapple[i].left > this.basket.left &&
                this.arrapple[i].left < (this.basket.left + this.basket.size)) {
                this.score += 20;
                this.arrapple.shift();
                document.getElementById('Score').innerHTML = this.score;
            }
        }
    };

    this.gameOver = function () {
        for (let i = 0; i < this.arrbana.length; i++) {
            if (this.arrbana[i].top >= 900) {
                this.life--;
                this.arrbana.shift();
                document.getElementById('life').innerHTML = this.life;
            }
        }
        for (let i = 0; i < this.arrapple.length; i++) {
            if (this.arrapple[i].top >= 900) {
                this.life--;
                this.arrapple.shift();
                document.getElementById('life').innerHTML = this.life;
            }
        }
        if (this.life <= 0) {
            this.isOver = true;
            document.getElementById('game').innerHTML = 'You lose'
        }
    };

    this.successdownspeed = function () {
        for (let i = 0; i < this.arrdownspeed.length; i++) {
            let top = this.basket.top - this.arrdownspeed[i].top;
            if (top < this.arrdownspeed[i].height && this.arrdownspeed[i].left > this.basket.left &&
                this.arrdownspeed[i].left < (this.basket.left + this.basket.size)) {
                this.speedapple--;
                this.speedbanana--;
                this.arrdownspeed.shift();
                console.log(this.speedapple);
                console.log(this.speedbanana);
                timeapple += 300;
                timebanana += 100;
                console.log(timeapple);
                console.log(timebanana)
            }
        }
    };
}


function start() {
    var gameboard = new GameBoard();
    let dem;
    gameboard.isOver = false;
    gameboard = new GameBoard();

    function move(evt) {
        switch (evt.keyCode) {
            case 37:
                dem = 'left';
                break;
            case 39:
                dem = 'right';
                break;
        }
    }

    function moveDown() {
        gameboard.successbanana();
        gameboard.successapple();
        gameboard.movebananadown();
        gameboard.moveappledown();
        gameboard.gameOver();
        gameboard.movespeeddown();
        gameboard.successdownspeed();
    }

    function moveBasket() {
        if (dem == 'right') {
            gameboard.moveBasketright();
        } else if (dem == 'left') {
            gameboard.moveBasketleft();
        }
    }

    let adddownspeed = setInterval(function () {
        gameboard.getdownspeed();
        if (gameboard.isOver) {
            clearInterval(adddownspeed);
        }
    }, timedownspeed);
    let addBanana = setInterval(function () {
        gameboard.getBanana();
        if (gameboard.isOver) {
            clearInterval(addBanana)
        }
    }, timebanana);
    let addApple = setInterval(function () {
        gameboard.getApple();
        if (gameboard.isOver) {
            clearInterval(addApple)
        }
    }, timeapple);

    let moBasket = setInterval(function () {
        moveBasket();
        if (gameboard.isOver) {
            clearInterval(moBasket);
        }
    }, 10);

    let a = setInterval(function () {
        moveDown();
        if (gameboard.isOver) {
            clearInterval(a);
        }
    }, 10);
    let runTime = setInterval(function () {
        gameboard.getTime();
        if (gameboard.isOver) {
            clearInterval(runTime)
        }
    }, 1000);
    let runSpeed = setInterval(function () {
        gameboard.levelUp();
        if (gameboard.isOver) {
            clearInterval(runTime)
        }
    }, timelvup);
    let runLife = setInterval(function () {
        gameboard.getLife();
        if (gameboard.isOver) {
            clearInterval(runLife)
        }
    }, timelife);
    window.addEventListener('keydown', move);
}

start();

