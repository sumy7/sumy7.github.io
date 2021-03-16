'use strict';
var WINDOWS_HEIGHT;
var WINDOWS_WIDTH;

var lastTime;
var canvasElement = [];
var acc = 0;
var dt = 1000 / 60;

var canvas;
var context;

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

var backgroundElement = (function() {
    var backgroundImg = new Image();
    var imgHeight = 0;
    var imgWidth = 0;
    var drawHeight = 0;
    var drawWidth = 0;
    backgroundImg.onload = function() {
        imgHeight = this.height;
        imgWidth = this.width;
        reSize();
    }
    backgroundImg.src = "background.png";

    function reSize() {
        if (imgWidth * WINDOWS_HEIGHT < imgHeight * WINDOWS_WIDTH) {
            drawHeight = WINDOWS_WIDTH / imgWidth * imgHeight;
            drawWidth = WINDOWS_WIDTH;
        } else {
            drawHeight = WINDOWS_HEIGHT;
            drawWidth = WINDOWS_HEIGHT / imgHeight * imgWidth;
        }
    }

    return {
        init: function() {

        },
        update: function(deltatime) {

        },
        draw: function(deltatime) {
            context.drawImage(backgroundImg, (WINDOWS_WIDTH -
                drawWidth) / 2, (WINDOWS_HEIGHT -
                drawHeight) / 2, drawWidth, drawHeight);
        },
        resize: function() {
            reSize();
        }
    };
})();
canvasElement.push(backgroundElement);

var blurElement = (function() {
    /**
     * Implements the Stack Blur Algorithm (@see http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html).
     * @param width width of the canvas
     * @param height height of the canvas
     * @param radius blur radius
     */
    function stackBlurCanvasRGB(context, width, height, radius) {

        var shgTable = [
            [0, 9],
            [1, 11],
            [2, 12],
            [3, 13],
            [5, 14],
            [7, 15],
            [11, 16],
            [15, 17],
            [22, 18],
            [31, 19],
            [45, 20],
            [63, 21],
            [90, 22],
            [127, 23],
            [181, 24]
        ];

        var mulTable = [
            512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271,
            456, 388, 335, 292, 512,
            454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360,
            335, 312, 292, 273, 512,
            482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284,
            271, 259, 496, 475, 456,
            437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302,
            292, 282, 273, 265, 512,
            497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373,
            364, 354, 345, 337, 328,
            320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507,
            496, 485, 475, 465, 456,
            446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367,
            360, 354, 347, 341, 335,
            329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278,
            273, 269, 265, 261, 512,
            505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435,
            428, 422, 417, 411, 405,
            399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350,
            345, 341, 337, 332, 328,
            324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287,
            284, 281, 278, 274, 271,
            268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480,
            475, 470, 465, 460, 456,
            451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408,
            404, 400, 396, 392, 388,
            385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350,
            347, 344, 341, 338, 335,
            332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304,
            302, 299, 297, 294, 292,
            289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267,
            265, 263, 261, 259
        ];

        radius |= 0;

        var context = context;
        var imageData = context.getImageData(0, 0, width, height);
        var pixels = imageData.data;
        var x,
            y,
            i,
            p,
            yp,
            yi,
            yw,
            rSum,
            gSum,
            bSum,
            rOutSum,
            gOutSum,
            bOutSum,
            rInSum,
            gInSum,
            bInSum,
            pr,
            pg,
            pb,
            rbs;
        var radiusPlus1 = radius + 1;
        var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

        var stackStart = new BlurStack();
        var stackEnd = new BlurStack();
        var stack = stackStart;
        for (i = 1; i < 2 * radius + 1; i++) {
            stack = stack.next = new BlurStack();
            if (i === radiusPlus1) {
                stackEnd = stack;
            }
        }
        stack.next = stackStart;
        var stackIn = null;
        var stackOut = null;

        yw = yi = 0;

        var mulSum = mulTable[radius];
        var shgSum;
        for (var ssi = 0; ssi < shgTable.length; ++ssi) {
            if (radius <= shgTable[ssi][0]) {
                shgSum = shgTable[ssi - 1][1];
                break;
            }
        }

        for (y = 0; y < height; y++) {
            rInSum = gInSum = bInSum = rSum = gSum = bSum = 0;

            rOutSum = radiusPlus1 * (pr = pixels[yi]);
            gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
            bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);

            rSum += sumFactor * pr;
            gSum += sumFactor * pg;
            bSum += sumFactor * pb;

            stack = stackStart;

            for (i = 0; i < radiusPlus1; i++) {
                stack.r = pr;
                stack.g = pg;
                stack.b = pb;
                stack = stack.next;
            }

            for (i = 1; i < radiusPlus1; i++) {
                p = yi + ((width - 1 < i ? width - 1 : i) << 2);
                rSum += (stack.r = (pr = pixels[p])) * (rbs =
                    radiusPlus1 - i);
                gSum += (stack.g = (pg = pixels[p + 1])) * rbs;
                bSum += (stack.b = (pb = pixels[p + 2])) * rbs;

                rInSum += pr;
                gInSum += pg;
                bInSum += pb;

                stack = stack.next;
            }

            stackIn = stackStart;
            stackOut = stackEnd;
            for (x = 0; x < width; x++) {
                pixels[yi] = (rSum * mulSum) >> shgSum;
                pixels[yi + 1] = (gSum * mulSum) >> shgSum;
                pixels[yi + 2] = (bSum * mulSum) >> shgSum;

                rSum -= rOutSum;
                gSum -= gOutSum;
                bSum -= bOutSum;

                rOutSum -= stackIn.r;
                gOutSum -= stackIn.g;
                bOutSum -= stackIn.b;

                p = (yw + ((p = x + radius + 1) < (width - 1) ? p : (
                    width - 1))) << 2;

                rInSum += (stackIn.r = pixels[p]);
                gInSum += (stackIn.g = pixels[p + 1]);
                bInSum += (stackIn.b = pixels[p + 2]);

                rSum += rInSum;
                gSum += gInSum;
                bSum += bInSum;

                stackIn = stackIn.next;

                rOutSum += (pr = stackOut.r);
                gOutSum += (pg = stackOut.g);
                bOutSum += (pb = stackOut.b);

                rInSum -= pr;
                gInSum -= pg;
                bInSum -= pb;

                stackOut = stackOut.next;

                yi += 4;
            }
            yw += width;
        }

        for (x = 0; x < width; x++) {
            gInSum = bInSum = rInSum = gSum = bSum = rSum = 0;

            yi = x << 2;
            rOutSum = radiusPlus1 * (pr = pixels[yi]);
            gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
            bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);

            rSum += sumFactor * pr;
            gSum += sumFactor * pg;
            bSum += sumFactor * pb;

            stack = stackStart;

            for (i = 0; i < radiusPlus1; i++) {
                stack.r = pr;
                stack.g = pg;
                stack.b = pb;
                stack = stack.next;
            }

            yp = width;

            for (i = 1; i < radiusPlus1; i++) {
                yi = (yp + x) << 2;

                rSum += (stack.r = (pr = pixels[yi])) * (rbs =
                    radiusPlus1 - i);
                gSum += (stack.g = (pg = pixels[yi + 1])) * rbs;
                bSum += (stack.b = (pb = pixels[yi + 2])) * rbs;

                rInSum += pr;
                gInSum += pg;
                bInSum += pb;

                stack = stack.next;

                if (i < (height - 1)) {
                    yp += width;
                }
            }

            yi = x;
            stackIn = stackStart;
            stackOut = stackEnd;
            for (y = 0; y < height; y++) {
                p = yi << 2;
                pixels[p] = (rSum * mulSum) >> shgSum;
                pixels[p + 1] = (gSum * mulSum) >> shgSum;
                pixels[p + 2] = (bSum * mulSum) >> shgSum;

                rSum -= rOutSum;
                gSum -= gOutSum;
                bSum -= bOutSum;

                rOutSum -= stackIn.r;
                gOutSum -= stackIn.g;
                bOutSum -= stackIn.b;

                p = (x + (((p = y + radiusPlus1) < (height - 1) ? p : (
                    height - 1)) * width)) << 2;

                rSum += (rInSum += (stackIn.r = pixels[p]));
                gSum += (gInSum += (stackIn.g = pixels[p + 1]));
                bSum += (bInSum += (stackIn.b = pixels[p + 2]));

                stackIn = stackIn.next;

                rOutSum += (pr = stackOut.r);
                gOutSum += (pg = stackOut.g);
                bOutSum += (pb = stackOut.b);

                rInSum -= pr;
                gInSum -= pg;
                bInSum -= pb;

                stackOut = stackOut.next;

                yi += width;
            }
        }

        context.putImageData(imageData, 0, 0);

    };

    /**
     * Defines a new helper object for Stack Blur Algorithm.
     */
    function BlurStack() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.next = null;
    }

    return {
        init: function() {

        },
        update: function(deltatime) {

        },
        draw: function(deltatime) {
            stackBlurCanvasRGB(context, WINDOWS_WIDTH,
                WINDOWS_HEIGHT, 20);
        },
        resize: function() {

        }
    };
})();
canvasElement.push(blurElement);

var textElement = {
    init: function() {

    },
    update: function(deltatime) {

    },
    draw: function(deltatime) {
        context.font = "bold 80px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#111";
        context.fillText("SumyBlog", WINDOWS_WIDTH / 2, WINDOWS_HEIGHT /
            2);
    },
    resize: function() {

    }
}
canvasElement.push(textElement);
