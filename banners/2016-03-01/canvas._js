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

// ------------------text animation-----------------
var textElement = {
    init: function() {

    },
    update: function(deltatime) {

    },
    draw: function(deltatime) {
        context.font = "bold 80px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#123";
        context.fillText("SumyBlog", WINDOWS_WIDTH / 2 + 2,
            WINDOWS_HEIGHT / 2 + 2);
        context.fillStyle = "rgba(115,146,29,.9)";
        context.fillText("SumyBlog", WINDOWS_WIDTH / 2, WINDOWS_HEIGHT /
            2);

        context.font =
            "50px Comic Sans MS, cursive, TSCu_Comic, sans-serif";
        context.textAlign = "end";
        context.textBaseline = "bottom";
        context.fillText("三月是愚人节的前奏", WINDOWS_WIDTH - 55,
            WINDOWS_HEIGHT - 5);
    },
    resize: function() {

    }
}
canvasElement.push(textElement);

var leafurls = ["1.png", "2.png", "3.png", "4.png",
    "5.png", "6.png", "7.png", "8.png"
];
var leafimgs = [];
var leafs = [];
var firstLoad = false;
var leafElement = {
    init: function() {
        for (i = 0; i < leafurls.length; i++) {
            leafimgs[i] = new Image();
            leafimgs[i].src = leafurls[i];
        }
        firstLoad = true;
    },
    update: function(deltatime) {
        while (leafs.length < 30) {
            var leaf = {
                img: leafimgs[Math.floor((Math.random() * leafimgs.length))],
                x: Math.random(),
                y: -50,
                v: WINDOWS_HEIGHT / 20 + Math.random() *
                    WINDOWS_HEIGHT / 20,
                delay: Math.random() * 15000,
                angle: Math.random() * 90 - 45,
                vangle: Math.random() * 20 - 10,
                alpha: firstLoad ? 1.0 : 0,
                valpha: 0.25,
                isfall: false,
                islive: true
            }
            leafs.push(leaf);
        }
        firstLoad = false;
        for (i = 0; i < leafs.length; i++) {
            var item = leafs[i];
            if (item.islive) {
                if (item.isfall && item.alpha >= 1.0) {
                    item.y = item.y + item.v * deltatime / 900;
                    item.angle = item.angle + item.vangle * deltatime /
                        1000;
                } else {
                    item.delay = item.delay - deltatime;
                    if (item.delay <= 0) {
                        item.isfall = true;
                    }
                }
                item.alpha = item.alpha + item.valpha * deltatime /
                    1000;
            }
        }

        var cnt = 0
        for (var i = 0; i < leafs.length; i++) {
            if (leafs[i].y >= WINDOWS_HEIGHT) {
                leafs[i].islive = false;
            }
        }
        for (var i = 0; i < leafs.length; i++) {
            if (leafs[i].islive === true) {
                leafs[cnt++] = leafs[i];
            }
        }
        while (leafs.length > cnt) {
            leafs.pop();
        }
    },
    draw: function(deltatime) {
        leafs.forEach(function(item) {
            var drawx = item.x * WINDOWS_WIDTH - 50 + item.img.width /
                2;
            var drawy = item.y + item.img.height / 2;
            var angle = item.angle;
            context.save();
            context.translate(drawx, drawy);
            context.rotate(angle * Math.PI / 180);
            context.globalAlpha = item.alpha;
            //context.translate(-drawx, -drawy);
            context.drawImage(item.img, -item.img.width / 2, -
                item.img.height / 2);
            context.restore();
        })
    },
    resize: function() {

    }
}
canvasElement.push(leafElement);
