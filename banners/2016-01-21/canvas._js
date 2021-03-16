var WINDOWS_HEIGHT;
var WINDOWS_WIDTH;

var lastTime;

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

    timeInit();
    textInit();

    mainLoop();

    $(window).resize(function() {
        WINDOWS_HEIGHT = $('.index-header').height();
        WINDOWS_WIDTH = $('.index-header').width();
        canvas.width = WINDOWS_WIDTH;
        canvas.height = WINDOWS_HEIGHT;

        timeResize();
        textResize();
    });

});

function mainLoop() {
    window.requestAnimationFrame(mainLoop);

    var now = Date.now();
    var deltaTime = now - lastTime;
    lastTime = now;

    update(deltaTime);
    draw(deltaTime);
}

function update(deltatime) {
    timeUpdate(deltatime);
    textUpdate(deltatime);
}

function draw(deltatime) {
    context.clearRect(0, 0, WINDOWS_WIDTH, WINDOWS_HEIGHT);
    timeDraw(deltatime);
    textDraw(deltatime);
}

// -----------------------------Time and ball-----------------------------------
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00",
    "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"
];
digit = [
    [
        [0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 0, 1, 1, 0],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0]
    ], //0
    [
        [0, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1]
    ], //1
    [
        [0, 1, 1, 1, 1, 1, 0],
        [1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1]
    ], //2
    [
        [1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 1, 1, 1, 0]
    ], //3
    [
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0],
        [0, 1, 1, 0, 1, 1, 0],
        [1, 1, 0, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 1]
    ], //4
    [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 1, 1, 1, 0]
    ], //5
    [
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 0],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 1, 1, 1, 0]
    ], //6
    [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0]
    ], //7
    [
        [0, 1, 1, 1, 1, 1, 0],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 1, 1, 1, 0]
    ], //8
    [
        [0, 1, 1, 1, 1, 1, 0],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0, 0, 0]
    ], //9
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ] //:
];

const endTime = new Date(2016, 1, 8, 0, 0, 0);
var RADIUS = 8;
var MARGIN_LEFT = 0;
var MARGIN_TOP = 0;
var balls = [];
var curShowTimeSeconds = 0;


function timeInit() {
    MARGIN_TOP = Math.round(WINDOWS_HEIGHT / 5);
    MARGIN_LEFT = Math.round(WINDOWS_WIDTH / 10);
    RADIUS = Math.round(WINDOWS_WIDTH * 4 / 5 / 147) - 1
}

function timeUpdate(deltatime) {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextDays = parseInt(nextShowTimeSeconds / 86400);
    var nextHours = parseInt((nextShowTimeSeconds - nextDays * 86400) / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600 -
        nextDays * 86400) / 60);
    var nextSeconds = parseInt(nextShowTimeSeconds % 60);

    var curDays = parseInt(curShowTimeSeconds / 86400);
    var curHours = parseInt((curShowTimeSeconds - curDays * 86400) / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600 - curDays *
            86400) /
        60);
    var curSeconds = parseInt(curShowTimeSeconds % 60);

    if (nextSeconds != curSeconds) {
        if (parseInt(curDays / 10) != parseInt(nextDays / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curDays / 10));
        }
        if (parseInt(curDays % 10) != parseInt(curDays % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(
                curDays % 10));
        }
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(
                curHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(
                curHours % 10));
        }

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(
                curMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(
                curMinutes % 10));
        }

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 117 * (RADIUS + 1), MARGIN_TOP, parseInt(
                curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 132 * (RADIUS + 1), MARGIN_TOP, parseInt(
                nextSeconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }


    for (var i = 0; i < balls.length; i++) {

        balls[i].x += balls[i].vx * deltatime / 100.0;
        balls[i].y += balls[i].vy * deltatime / 100.0;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOWS_HEIGHT - RADIUS) {
            balls[i].y = WINDOWS_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.8;
        }
    }

    var cnt = 0
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS < 0 || balls[i].x - RADIUS > WINDOWS_WIDTH ||
            balls[i].y - RADIUS >= WINDOWS_HEIGHT) {
            balls[i].islive = false;
        }
    }
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].islive === true) {
            balls[cnt++] = balls[i];
        }
    }
    while (balls.length > cnt) {
        balls.pop();
    }
}

function timeDraw(deltatime) {
    var days = parseInt(curShowTimeSeconds / 86400);
    var hours = parseInt((curShowTimeSeconds - days * 86400) / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600 - days *
            86400) /
        60);
    var seconds = parseInt(curShowTimeSeconds % 60);

    var day = [];
    while (days >= 10) {
        day.push(parseInt(days % 10));
        days = parseInt(days / 10);
    }
    day.push(days);
    for (var i = 0; i < day.length; i++) {
        renderDigit(MARGIN_LEFT - 15 * (RADIUS + 1) * (i - 1), MARGIN_TOP,
            parseInt(day[i]), context);
    }

    // renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(days / 10), context)
    // renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(days % 10), context)
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, context)
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(hours /
        10), context);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(hours %
        10), context);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, context);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(
        minutes /
        10), context);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(
        minutes %
        10), context);
    renderDigit(MARGIN_LEFT + 108 * (RADIUS + 1), MARGIN_TOP, 10, context);
    renderDigit(MARGIN_LEFT + 117 * (RADIUS + 1), MARGIN_TOP, parseInt(
        seconds /
        10), context);
    renderDigit(MARGIN_LEFT + 132 * (RADIUS + 1), MARGIN_TOP, parseInt(
        seconds %
        10), context);

    for (var i = 0; i < balls.length; i++) {
        context.fillStyle = balls[i].color;

        context.beginPath();
        context.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        context.closePath();

        context.fill();
    }
}

function timeResize() {
    MARGIN_TOP = Math.round(WINDOWS_HEIGHT / 5);
    MARGIN_LEFT = Math.round(WINDOWS_WIDTH / 10);
    RADIUS = Math.round(WINDOWS_WIDTH * 4 / 5 / 147) - 1
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000);

    return ret >= 0 ? ret : -ret;
}

function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 *
                    (
                        RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math
                    .PI)
                cxt.closePath()

                cxt.fill()
            }
}

function addBalls(x, y, num) {

    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) *
                        4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    islive: true
                }

                balls.push(aBall)
            }
}


//--------------------------- text -------------------------------------
var textfontsize = 0;
var textnamecolorindex = 0;
var textdaycolorindex = 0;
var texthourcolorindex = 0;
var textminuscolorindex = 0;
var textsecondcolorindex = 0;
var textupdatedelay = 0;

function textInit() {
    textfontsize = Math.round(WINDOWS_HEIGHT / 6) - 10;
    textupdatedelay = 0;
}

function textUpdate(deltatime) {
    textupdatedelay += deltatime;
    if (textupdatedelay >= 1000) {
        textupdatedelay %= 1000;
        textnamecolorindex = Math.floor(Math.random() * colors.length);
        textdaycolorindex = Math.floor(Math.random() * colors.length);
        texthourcolorindex = Math.floor(Math.random() * colors.length);
        textminuscolorindex = Math.floor(Math.random() * colors.length);
        textsecondcolorindex = Math.floor(Math.random() * colors.length);
    }
}

function textDraw(deltatime) {
    context.font = "bold " + textfontsize + "px Arial";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = "#000";
    context.fillText("SumyBlog", MARGIN_LEFT + 2, 0 + 2);

    context.textBaseline = "bottom";
    context.fillStyle = "red";
    context.fillText("新年快乐", MARGIN_LEFT, WINDOWS_HEIGHT - 20);

    context.font = "bold " + textfontsize + "px Arial";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = colors[textnamecolorindex];
    context.fillText("SumyBlog", MARGIN_LEFT, 0);

    context.font = "bold " + (RADIUS * 2 * 7) + "px 微软雅黑";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = colors[textdaycolorindex];
    context.fillText("天", MARGIN_LEFT + 5 * (RADIUS * 2 + 1), MARGIN_TOP + (
        RADIUS * 2 + 1) * 10 + 20);
    context.fillStyle = colors[texthourcolorindex];
    context.fillText("时", MARGIN_LEFT + 25 * (RADIUS * 2 + 1), MARGIN_TOP + (
        RADIUS * 2 + 1) * 10 + 20);
    context.fillStyle = colors[textminuscolorindex];
    context.fillText("分", MARGIN_LEFT + 47 * (RADIUS * 2 + 1), MARGIN_TOP + (
        RADIUS * 2 + 1) * 10 + 20);
    context.fillStyle = colors[textsecondcolorindex];
    context.fillText("秒", MARGIN_LEFT + 69 * (RADIUS * 2 + 1), MARGIN_TOP + (
        RADIUS * 2 + 1) * 10 + 20);

}

function textResize() {
    textfontsize = Math.round(WINDOWS_HEIGHT / 5) - 10;
}
