var canv = document.getElementById("canvas");
var ctx = canv.getContext("2d");
var Block = function (col, row, size) {
    this.col = col;
    this.row = row;
    this.size = size;
};

//定义蛇
var snake = {
    body: [
        new Block(20, 20, 10),
        new Block(20, 21, 10),
        new Block(20, 22, 10),
    ],
    direction: "right",
};

var score = 0;
var oTime = 400;
Block.prototype.draw = function () {
    ctx.fillRect(this.col * this.size, this.row * this.size, this.size, this.size);
};

//蛇的绘制
snake.draw = function () {
    for (var i = 0; i < this.body.length; i++) {
        this.body[i].draw();
    }
    oTime = 100 + 30000 / (score + 100)
};
//蛇的运动
snake.move = function () {
    var head = this.body[0];
    if (snake.direction == "right") {
        var newhead = new Block(head.col + 1, head.row, head.size);
    }
    if (snake.direction == "left") {
        var newhead = new Block(head.col - 1, head.row, head.size)
    }
    if (snake.direction == "up") {
        var newhead = new Block(head.col, head.row - 1, head.size)
    }
    if (snake.direction == "down") {
        var newhead = new Block(head.col, head.row + 1, head.size)
    }
    this.body.unshift(newhead);
    //吃苹果
    if (newhead.col == apple.posX && newhead.row == apple.posY) {
        score = score + 100;

        while (true) {
            var checkApple = false;
            apple.posX = Math.floor(Math.random() * 40);
            apple.posY = Math.floor(Math.random() * 40);
            for (var i = 0; i < this.body.length; i++) {
                if (this.body[i].col == apple.posX && this.body[i].row == apple.posY)
                    checkApple = true;
            }
            if (!checkApple)
                break;
        }
    } else {
        this.body.pop();
    };
    //碰撞判断

    if (newhead.col < 0 || newhead.col > 39) {
        clearInterval(intervalId);
        gameOver();
    };
    if (newhead.row < 0 || newhead.row > 39) {
        clearInterval(intervalId);
        gameOver();
    }
    for (var i = 1; i < this.body.length; i++) {
        if (this.body[i].col == newhead.col && this.body[i].row == newhead.row) {
            clearInterval(intervalId);
            gameOver();
        }
    }
};



//添加苹果
var apple = {
    posX: Math.floor(Math.random() * 40),
    posY: Math.floor(Math.random() * 40),
    sizeR: 5
}
//绘制苹果
apple.draw = function () {
    ctx.fillStyle = "Cyan";
    ctx.beginPath();
    ctx.arc((this.posX * 2 + 1) * this.sizeR, (this.posY * 2 + 1) * this.sizeR, this.sizeR, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = "Black";

};
//显示成绩

//游戏结束
var gameOver = function () {
    ctx.font = "55px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#b00"
    ctx.fillText("GAME OVER", 200, 200);
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "#222"
    ctx.fillText("SCORE：" + score, 200, 300);
    ctx.fillStyle = "#000"

}
//贪吃蛇的控制
$("body").keydown(function (event) {
    if (event.keyCode == 37 && snake.body[0].col == snake.body[1].col) {
        snake.direction = "left";
    }
    if (event.keyCode == 38 && snake.body[0].row == snake.body[1].row) {
        snake.direction = "up";
    }
    if (event.keyCode == 39 && snake.body[0].col == snake.body[1].col) {
        snake.direction = "right";
    }
    if (event.keyCode == 40 && snake.body[0].row == snake.body[1].row) {
        snake.direction = "down";
    }
});



//运动刷新

var intervalId = setInterval(function () {

    console.log(oTime)
    ctx.clearRect(0, 0, 400, 400);
    ctx.font = "10px Comic Sans MS";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText("score:" + score, 10, 10);
    snake.move();
    snake.draw();
    apple.draw();
    ctx.strokeRect(0, 0, 400, 400);

}, oTime);
