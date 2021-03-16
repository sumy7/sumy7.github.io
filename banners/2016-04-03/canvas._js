var WINDOWS_HEIGHT;
var WINDOWS_WIDTH;

var lastTime;
var canvasElement = [];
var acc = 0;
var dt = 1000 / 60;

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */
            element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

$(function() {
    WINDOWS_HEIGHT = $('.index-header').height();
    WINDOWS_WIDTH = $('.index-header').width();

    canvas = document.getElementById('index-header-canvas');
    context = canvas.getContext("2d");

    canvas.width = WINDOWS_WIDTH;
    canvas.height = WINDOWS_HEIGHT;

    lastTime = Date.now();

    canvasElement.forEach(function(item) {
        item.init();
    });

    mainLoop();

    $(window).resize(function() {
        WINDOWS_HEIGHT = $('.index-header').height();
        WINDOWS_WIDTH = $('.index-header').width();
        canvas.width = WINDOWS_WIDTH;
        canvas.height = WINDOWS_HEIGHT;

        resize();
    });

});

function mainLoop() {
    window.requestAnimationFrame(mainLoop);

    var now = Date.now();
    var deltaTime = now - lastTime;
    lastTime = now;
    acc += deltaTime;

    while (acc >= dt) {
        update(dt);
        acc -= dt;
    }
    draw(deltaTime);
}

function update(deltatime) {
    canvasElement.forEach(function(item) {
        item.update(deltatime);
    });
}

function draw(deltatime) {
    context.clearRect(0, 0, WINDOWS_WIDTH, WINDOWS_HEIGHT);
    canvasElement.forEach(function(item) {
        item.draw(deltatime);
    });
}

function resize() {
    canvasElement.forEach(function(item) {
        item.resize();
    });
}

// ------------------animation element-----------------
var textElement = {
    init: function() {

    },
    update: function(deltatime) {

    },
    draw: function(deltatime) {
        context.font = "bold 80px Arial";
        context.textAlign = "left";
        context.textBaseline = "top";
        context.fillStyle = "#123";
        context.fillText("SumyBlog", 0 + 2, 0 + 2);
        context.fillStyle = "orange";
        context.fillText("SumyBlog", 0, 0);

        context.font =
            "50px Comic Sans MS, cursive, TSCu_Comic, sans-serif";
        context.textAlign = "end";
        context.textBaseline = "bottom";
        context.fillText("四月，花开花落", WINDOWS_WIDTH - 50, WINDOWS_HEIGHT -
            5);
    },
    resize: function() {

    }
}
canvasElement.push(textElement);

var drawTree = (function() {
    var treeline = [];
    var that = this;

    function clearTreeLine() {
        treeline = [];
    }

    //t: current time（当前时间）；
    //b: beginning value（初始值）；
    //c: change in value（变化量）；
    //d: duration（持续时间）。
    function easeOut(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }

    function addNewTreeLine(father, angle, thickness, depth) {
        var length = random(0, WINDOWS_HEIGHT / 35);
        var growtime = random(500, 1000);
        var newLine = {
            childs: [], // 子树干
            angle: angle, // 生长角度
            thickness: thickness, // 树干半径
            length: length, // 树干长度
            time: 0, // 生长时间
            depth: depth, //深度
            growtime: growtime //生长时间
        };
        treeline.push(newLine);
        if (father != null) {
            father.childs.push(newLine);
        }
    }

    function drawFlowers(x, y) {
        context.beginPath();
        context.arc(x, y, 5, Math.PI * 2, false);
        context.fillStyle = 'rgb(255, 255, 0)';
        context.fill();
    }

    function drawTree(item, x1, y1) {
        if (item.depth != 0) {
            // var stage = item.time / item.growtime;
            var stage = easeOut(item.time, 0, 1.0, item.growtime);
            var x2 = x1 + (cos(item.angle) * item.depth * item.length *
                stage);
            var y2 = y1 + (sin(item.angle) * item.depth * item.length *
                stage);

            drawLine(x1, y1, x2, y2, item.thickness * stage);
            item.childs.forEach(function(child) {
                drawTree(child, x2, y2);
            });
        } else {
            drawFlowers(x1, y1);
        }
    }

    function drawLine(x1, y1, x2, y2, thickness) {
        context.fillStyle = '#000';
        context.strokeStyle = 'rgb(139,126, 102)';
        context.lineWidth = thickness * 1.5;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke();
    }

    function cos(angle) {
        return Math.cos(deg_to_rad(angle));
    }

    function sin(angle) {
        return Math.sin(deg_to_rad(angle));
    }

    function deg_to_rad(angle) {
        return angle * (Math.PI / 180.0);
    }

    function random(min, max) {
        return min + Math.floor(Math.random() * (max + 1 - min));
    }

    return {
        init: function() {
            clearTreeLine();
            addNewTreeLine(null, -90, 9, 9);
        },
        update: function(deltatime) {
            treeline.forEach(function(item) {
                item.time += deltatime;
                if (item.time > item.growtime)
                    item.time = item.growtime;
                if (item.time > item.growtime / 2 && item.childs
                    .length == 0) {
                    if (item.depth > 0) {
                        addNewTreeLine(item, item.angle -
                            random(15, 20), item.thickness -
                            1, item.depth - 1);
                        addNewTreeLine(item, item.angle +
                            random(15, 20), item.thickness -
                            1, item.depth - 1);
                    }
                }
            });
        },
        draw: function(deltatime) {
            drawTree(treeline[0], WINDOWS_WIDTH / 2, WINDOWS_HEIGHT);
        },
        resize: function() {
            clearTreeLine();
            addNewTreeLine(null, -90, 9, 9);
        }
    };
})();
canvasElement.push(drawTree);

// 参考 snowfall http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect
var flowerFall = (function() {
    var flowerImg = new Image();
    var mp = 25; // 最大花瓣数
    var particles = [];
    var angle = 0;

    function initflower() {
        for (var i = 0; i < mp; i++) {
            particles.push({
                x: Math.random() * WINDOWS_WIDTH, //x-coordinate
                y: Math.random() * WINDOWS_HEIGHT, //y-coordinate
                r: Math.random() * 4 + 1, //radius
                d: Math.random() * mp, //density
                rr: random(10, 20)
            });
        }
        flowerImg.src = 'huaban.png';
    }

    function random(min, max) {
        return min + Math.floor(Math.random() * (max + 1 - min));
    }

    function drawflower() {
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            context.drawImage(flowerImg, p.x, p.y, p.rr, p.rr);
        }
    }

    function updateflower() {
        angle += 0.01;
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;

            if (p.x > WINDOWS_WIDTH + 5 || p.x < -5 || p.y >
                WINDOWS_HEIGHT) {
                if (i % 3 > 0) //66.67% of the flakes
                {
                    particles[i] = {
                        x: Math.random() * WINDOWS_WIDTH,
                        y: -10,
                        r: p.r,
                        d: p.d,
                        rr: p.rr
                    };
                } else {
                    if (Math.sin(angle) > 0) {
                        particles[i] = {
                            x: -5,
                            y: Math.random() * WINDOWS_HEIGHT,
                            r: p.r,
                            d: p.d,
                            rr: p.rr
                        };
                    } else {
                        particles[i] = {
                            x: WINDOWS_WIDTH + 5,
                            y: Math.random() * WINDOWS_HEIGHT,
                            r: p.r,
                            d: p.d,
                            rr: p.rr
                        };
                    }
                }
            }
        }
    }

    return {
        init: function() {
            initflower();
        },
        update: function(deltatime) {
            updateflower();
        },
        draw: function(deltatime) {
            drawflower();
        },
        resize: function() {

        }
    };
})();

canvasElement.push(flowerFall);
