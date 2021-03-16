'use strict';

function CanvasAnimation(canvas, options) {
    // ============== 辅助函数 =================
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */
                element) {
                return window.setTimeout(callback, 1000 / 60);
            };
    })();

    var extend = function (o, n) {
        for (var p in n) {
            if (n.hasOwnProperty(p) && o.hasOwnProperty(p)) {
                o[p] = n[p];
            }
        }
    }

    this.delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
    // ========================================
    this.opts = {
        width: 800,
        height: 600,
        dt: 1000 / 60
    }

    extend(this.opts, options);

    canvas.width = this.opts.width;
    canvas.height = this.opts.height;

    this.objs = {};
    this.objs.canvas = canvas;
    this.objs.context = canvas.getContext("2d");
    this.objs.canvasElement = [];
    this.objs.lastTime = 0;
    this.objs.acc = 0;
    this.objs.isRunning = false;

    var that = this;
    this.mainLoop = function () {
        if (that.objs.isRunning) {
            window.requestAnimationFrame(that.mainLoop);
        }

        var now = Date.now();
        var deltaTime = now - that.objs.lastTime;
        that.objs.lastTime = now;
        that.objs.acc += deltaTime;

        while (that.objs.acc >= that.opts.dt) {
            update(that.opts.dt);
            that.objs.acc -= that.opts.dt;
        }
        draw(deltaTime);
        cleanup();
    }

    function update(deltatime) {
        that.objs.canvasElement.forEach(function (item) {
            item.update(deltatime);
        });
    }

    function draw(deltatime) {
        that.objs.context.clearRect(0, 0, that.opts.width, that.opts.height);
        that.objs.canvasElement.forEach(function (item) {
            item.draw(deltatime, that.objs.context);
        });
    }

    function cleanup() {
        for (var i = that.objs.canvasElement.length - 1; i >= 0; i--) {
            if (that.objs.canvasElement[i].isDead()) {
                that.objs.canvasElement.splice(i, 1);
            }
        }
    }
}

CanvasAnimation.prototype.getHeight = function () {
    return this.opts.height;
}

CanvasAnimation.prototype.getWidht = function () {
    return this.opts.width;
}

CanvasAnimation.prototype.withSize = function (width, height) {
    this.opts.width = width;
    this.opts.height = height;

    this.objs.canvas.width = width;
    this.objs.canvas.height = height;

    var that = this;
    this.delay(function () {
        that.objs.canvasElement.forEach(function (item) {
            item.resize(width, height);
        });
    }, 200);
}

CanvasAnimation.prototype.start = function () {
    this.objs.canvasElement.forEach(function (item) {
        item.init();
    });
    this.objs.isRunning = true;
    this.objs.lastTime = Date.now();
    this.mainLoop();
}

CanvasAnimation.prototype.addSpirit = function (spirit) {
    this.objs.canvasElement.push(spirit);
}

//================管理器=====================

function Manager(canvasWidth, canvasHeight) {
    // 球球
    this._balls = {
        opts: {
            nums: 10,             // 球球数量
            defaultSpeed: 0.5,    // 球球运动基础速度
            variantSpeed: 0.5,    // 球球运动速度的变量
            defaultRadius: 10,    // 球球初始半径
            variantRadius: 10,    // 球球变化半径
            protectedAge: 200,    // 保护周期
            G: 0.01,              // 万有引力常数
            colors: ["rgba(255, 0, 0, 0.4)",
                "rgba(255, 165, 0, 0.4)",
                "rgba(93, 203, 219, 0.4)",
                "rgba(0, 128, 0, 0.4)",
                "rgba(75, 218, 76, 0.4)",
                "rgba(72, 232, 186, 0.4)",
                "rgba(128, 0, 128, 0.3)"]
        },
        list: [],
    }
    this._balls.list = []

    // 食物，很好吃
    this._foods = {
        opts: {
            nums: 30,            // 食物数量
            defaultRadius: 2,    // 食物初始半径
            variantRadius: 3,    // 食物变化半径
        },
        list: []
    }

    // 刺球，被扎到很疼
    this._prick = {
        opts: {
            nums: 5,             // 刺球数量
            defaultRadius: 15,   // 刺球初始半径
            variantRadius: 10,   // 刺球变化半径
        },
        list: []
    }

    this.width = canvasWidth;
    this.height = canvasHeight;
}
Manager.prototype.newBall = function (x, y, size) {
    var speed = this._balls.opts.defaultSpeed + this._balls.opts.variantSpeed * Math.random();
    var directionAngle = Math.floor(Math.random() * 360);
    if (!x) {
        x = Math.random() * this.width;
    }
    if (!y) {
        y = Math.random() * this.height;
    }
    if (!size) {
        var radius = this._balls.opts.defaultRadius + Math.random() * this._balls.opts.variantRadius;
        var lsize = radius * radius * Math.PI;
    } else {
        var lsize = size;
        var radius = Math.sqrt(lsize / Math.PI);
    }
    return {
        type: 'ball',
        x: x,
        y: y,
        vx: speed * Math.cos(directionAngle),
        vy: speed * Math.sin(directionAngle),
        size: lsize,
        radius: radius,
        isDead: false,
        age: 0,
        color: this._balls.opts.colors[Math.round(Math.random() * this._balls.opts.colors.length)]
    };
}
Manager.prototype.newFood = function () {
    var radius = this._foods.opts.defaultRadius + Math.random() * this._foods.opts.variantRadius;
    var size = radius * radius * Math.PI;
    return {
        type: 'food',
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: size,
        radius: radius,
        isDead: false
    };
}
Manager.prototype.newPrick = function () {
    var radius = this._prick.opts.defaultRadius + Math.random() * this._prick.opts.variantRadius;
    var size = radius * radius * Math.PI;
    return {
        type: 'prick',
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: size,
        radius: radius,
        isDead: false
    };
}
Manager.prototype.init = function () {
    // 初始化球球
    for (var i = 0; i < this._balls.opts.nums; i++) {
        this._balls.list.push(this.newBall());
    }

    // 初始化食物
    for (var i = 0; i < this._foods.opts.nums; i++) {
        this._foods.list.push(this.newFood());
    }

    // 初始化刺球
    for (var i = 0; i < this._prick.opts.nums; i++) {
        this._prick.list.push(this.newPrick());
    }

}
Manager.prototype.update = function (deltatime) {
    // 清理出界的食物 
    for (var i = 0; i < this._foods.list.length; i++) {
        var food = this._foods.list[i];
        if (food.x <= 0 || food.x > this.width || food.y <= 0 || food.y > this.height) {
            food.isDead = true;
        }
    }

    // 清理出界的刺球
    for (var i = 0; i < this._prick.list.length; i++) {
        var prick = this._prick.list[i];
        if (prick.x <= 0 || prick.x > this.width
            || prick.y <= 0 || prick.y > this.height) {
            prick.isDead = true;
        }
    }

    // 更新球球的位置
    for (var i = 0; i < this._balls.list.length; i++) {
        var ball = this._balls.list[i];
        ball.age++;
        ball.x += ball.vx;
        ball.y += ball.vy;
        if (ball.x + ball.radius < 0) {
            ball.x = this.width + ball.radius;
        } else if (ball.x > this.width + ball.radius) {
            ball.x = -ball.radius;
        }
        if (ball.y + ball.radius < 0) {
            ball.y = this.height + ball.radius;
        } else if (ball.y > this.height + ball.radius) {
            ball.y = -ball.radius;
        }
    }

    // 球球吃食物
    for (var i = 0; i < this._balls.list.length; i++) {
        var ball = this._balls.list[i];
        for (var j = 0; j < this._foods.list.length; j++) {
            var food = this._foods.list[j];
            if (food.isDead) continue;
            if (Math.sqrt((ball.x - food.x) * (ball.x - food.x) + (ball.y - food.y) * (ball.y - food.y)) + food.radius <= ball.radius) {
                ball.size += food.size;
                ball.radius = Math.sqrt(ball.size / Math.PI);
                food.isDead = true;
            }
        }
    }

    // 球球相互吸引 - 太难放弃
    /*
        for (var i = 0; i < this._balls.list.length; i++) {
            var balla = this._balls.list[i];
            for (var j = i + 1; j < this._balls.list.length; j++) {
                var ballb = this._balls.list[j];
                var dis = (balla.x - ballb.x) * (balla.x - ballb.x) + (balla.y - ballb.y) * (balla.y - ballb.y);
                if (dis > 1500) continue;
    
                balla.vx += this._balls.opts.G * ballb.size / dis * Math.cos(Math.atan((balla.y - ballb.y) / (balla.x - ballb.x)));
                balla.vy += this._balls.opts.G * ballb.size / dis * Math.sin(Math.atan((balla.y - ballb.y) / (balla.x - ballb.x)));
                ballb.vx += this._balls.opts.G * ballb.size / dis * Math.cos(Math.atan((ballb.x - balla.x) / (ballb.y - balla.y)));
                ballb.vy += this._balls.opts.G * ballb.size / dis * Math.cos(Math.atan((ballb.x - balla.x) / (ballb.y - balla.y)));
            }
        }
    */
    // 球球吃球球
    for (var i = 0; i < this._balls.list.length; i++) {
        var balla = this._balls.list[i];
        if (balla.age < this._balls.opts.protectedAge) continue;
        for (var j = i + 1; j < this._balls.list.length; j++) {
            var ballb = this._balls.list[j];
            if (ballb.isDead) continue;
            if (balla.isDead) break;
            if (ballb.age < this._balls.opts.protectedAge) continue;
            var dis = Math.sqrt((balla.x - ballb.x) * (balla.x - ballb.x) + (balla.y - ballb.y) * (balla.y - ballb.y));
            if (balla.radius < ballb.radius && dis + balla.radius <= ballb.radius) {
                ballb.size += balla.size;
                ballb.radius = Math.sqrt(ballb.size / Math.PI);
                balla.isDead = true;
            } else if (ballb.radius < balla.radius && dis + ballb.radius <= balla.radius) {
                balla.size += ballb.size;
                balla.radius = Math.sqrt(balla.size / Math.PI);
                ballb.isDead = true;
            }
        }
    }

    // 刺球判断
    for (var i = 0; i < this._prick.list.length; i++) {
        var prick = this._prick.list[i];
        for (var j = 0; j < this._balls.list.length; j++) {
            var ball = this._balls.list[j];
            if (ball.isDead) continue;
            if (prick.isDead) break;
            if (prick.size > ball.size) continue;
            if (Math.sqrt((ball.x - prick.x) * (ball.x - prick.x) + (ball.y - prick.y) * (ball.y - prick.y)) < ball.radius + prick.radius) {
                ball.isDead = true;
                prick.isDead = true;
                for (var k = 0; k < 5; k++) {
                    this._balls.list.push(this.newBall(ball.x, ball.y, (ball.size / 3 * 2) / 5.0));
                }
            }
        }
    }

    // 清理食物
    for (var i = 0; i < this._foods.list.length; i++) {
        if (this._foods.list[i].isDead) {
            this._foods.list.splice(i, 1);
        }
    }

    // 清理球球
    for (var i = 0; i < this._balls.list.length; i++) {
        if (this._balls.list[i].isDead) {
            this._balls.list.splice(i, 1);
        }
    }

    // 清理刺球
    for (var i = 0; i < this._prick.list.length; i++) {
        if (this._prick.list[i].isDead) {
            this._prick.list.splice(i, 1);
        }
    }

    // 添加新的食物
    for (var i = this._foods.list.length; i < this._foods.opts.nums; i++) {
        this._foods.list.push(this.newFood());
    }

    // 添加新的食物
    for (var i = this._balls.list.length; i < this._balls.opts.nums; i++) {
        this._balls.list.push(this.newBall());
    }

    // 添加新的刺球
    for (var i = this._prick.list.length; i < this._prick.opts.nums; i++) {
        this._prick.list.push(this.newPrick());
    }
}
Manager.prototype.draw = function (deltatime, ctx) {
    // 背景网格
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#eee";
    ctx.beginPath();
    for (var i = 0; i <= this.width; i += 20) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, this.height);
    }
    for (var i = 0; i <= this.height; i += 20) {
        ctx.moveTo(0, i);
        ctx.lineTo(this.width, i);
    }
    ctx.stroke();

    // 绘制食物
    for (var i = 0; i < this._foods.list.length; i++) {
        var food = this._foods.list[i];
        ctx.beginPath();
        ctx.arc(food.x, food.y, food.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "rgba(165, 42, 42, 0.4)";
        ctx.fill();
    }

    // 绘制球球
    for (var i = 0; i < this._balls.list.length; i++) {
        var ball = this._balls.list[i];
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = ball.color;
        ctx.fill();

        // 在保护时间内绘制保护罩
        if (ball.age < this._balls.opts.protectedAge) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255, 255, 0, 0.33)";
            ctx.lineWidth = 5;
            ctx.arc(ball.x, ball.y, ball.radius + 2, 0, (this._balls.opts.protectedAge - ball.age) / this._balls.opts.protectedAge * Math.PI * 2, false);
            ctx.stroke();
        }
    }
    // 绘制刺球
    for (var i = 0; i < this._prick.list.length; i++) {
        var prick = this._prick.list[i];
        ctx.beginPath();
        ctx.arc(prick.x, prick.y, prick.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "#fff";
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 0, 0, 0.4)";
        ctx.lineWidth = 2;
        ctx.moveTo(prick.x + prick.radius * Math.cos(0), prick.y + prick.radius * Math.sin(0));
        for (var a = 0; a < 360; a++) {
            ctx.lineTo(prick.x + (prick.radius + 2 * Math.sin(a * 2)) * Math.cos(Math.PI / 180.0 * a),
                prick.y + (prick.radius + 2 * Math.sin(a * 2)) * Math.sin(Math.PI / 180.0 * a));
        }
        ctx.stroke();
    }
};
Manager.prototype.resize = function (width, height) {
    this.width = width;
    this.height = height;
};
Manager.prototype.isDead = function () {
    return false;
};

