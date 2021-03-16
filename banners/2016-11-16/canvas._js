'use strict';
var WINDOWS_HEIGHT;
var WINDOWS_WIDTH;

var lastTime;
var canvasElement = [];
var acc = 0;
var dt = 1000 / 60;

var cubeGroup = new THREE.Object3D();
var scene;
var CUBE_SIZE = 25;

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

    // scene and camera
    scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(WINDOWS_WIDTH / -2,
        WINDOWS_WIDTH / 2, WINDOWS_HEIGHT / 2, WINDOWS_HEIGHT /
        -2, -500, 1000);
    camera.position.x = 0;
    camera.position.y = CUBE_SIZE * 2;
    camera.position.z = CUBE_SIZE * 2;

    // renderer
    var renderer = new THREE.WebGLRenderer();
    //var renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xefede0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WINDOWS_WIDTH, WINDOWS_HEIGHT);
    document.getElementById('index-canvas-container').appendChild(
        renderer.domElement);

    // line table
    var widthsize = 24 * CUBE_SIZE,
        heightsize = 5 * CUBE_SIZE,
        step = CUBE_SIZE;

    var geometry = new THREE.Geometry();
    for (var i = -heightsize; i <= heightsize; i += step) {
        geometry.vertices.push(new THREE.Vector3(-widthsize, 0, i));
        geometry.vertices.push(new THREE.Vector3(widthsize, 0, i));
    }
    for (var i = -widthsize; i <= widthsize; i += step) {
        geometry.vertices.push(new THREE.Vector3(i, 0, -heightsize));
        geometry.vertices.push(new THREE.Vector3(i, 0, heightsize));
    }
    var material = new THREE.LineBasicMaterial({
        color: 0xa0a0a0,
        opacity: 0.2
    });

    var line = new THREE.LineSegments(geometry, material);
    scene.add(line);

    // light
    var ambientLight = new THREE.AmbientLight(Math.random() * 0x10);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.x = -0.3;
    directionalLight.position.y = 0.8;
    directionalLight.position.z = 0.3;
    directionalLight.position.normalize();
    scene.add(directionalLight);

    // update
    lastTime = Date.now();

    canvasElement.forEach(function(item) {
        item.init();
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
        // scene.remove(cubeGroup);
        // cubeGroup = new THREE.Object3D();

        draw(deltaTime);

        camera.lookAt(scene.position);
        //camera.lookAt(new THREE.Vector3(0, 0, 0));
        renderer.render(scene, camera);
    }

    mainLoop();

    $(window).resize(function() {
        WINDOWS_HEIGHT = $('.index-header').height();
        WINDOWS_WIDTH = $('.index-header').width();
        renderer.setSize(WINDOWS_WIDTH, WINDOWS_HEIGHT);
        resize();
    });

});

function update(deltatime) {
    canvasElement.forEach(function(item) {
        item.update(deltatime);
    });
}

function draw(deltatime) {
    //context.clearRect(0, 0, WINDOWS_WIDTH, WINDOWS_HEIGHT);
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

// t: current time（当前时间）；
// b: beginning value（初始值）；
// c: change in value（变化量）；
// d: duration（持续时间）。
function CubiceaseOut(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}

function Cube(x, y, z, a, color, t) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.a = a;
    this.color = color;

    this.t = t;
    this.time = 0;

    if (cubeGroup == undefined) {
        cubeGroup = new THREE.Object3D();
    }

    var geometry = new THREE.BoxGeometry(this.a, this.a, this.a);
    var material = new THREE.MeshLambertMaterial({
        color: this.color,
        overdraw: 0.5
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.x = this.x;
    this.cube.position.y = CubiceaseOut(this.time, this.y, this.a - this.y, this.t);
    this.cube.position.z = this.z;
    cubeGroup.add(this.cube);
    scene.add(cubeGroup);
}

Cube.prototype.draw = function(time) {
    // do nothing
}

Cube.prototype.update = function(time) {
    this.time += time;
    if (this.time > this.t) {
        this.time = this.t;
    }

    this.cube.position.x = this.x;
    this.cube.position.y = CubiceaseOut(this.time, this.y, this.a - this.y, this.t);
    this.cube.position.z = this.z;
}


var AlphabetElement = (function() {
    var smap = [
        [0, 1, 1, 1],
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
        [1, 1, 1, 0]
    ];
    var umap = [
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [0, 1, 1, 0]
    ];
    var mmap = [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
    ];
    var ymap = [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ];
    var bmap = [
        [1, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 0]
    ];
    var lmap = [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 1]
    ];
    var omap = [
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [0, 1, 1, 0]
    ];
    var gmap = [
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 0],
        [1, 0, 1, 1],
        [1, 0, 0, 1],
        [0, 1, 1, 0]
    ];
    var sumyblog = [smap, umap, mmap, ymap, bmap, lmap, omap, gmap];
    var cubes = [];
    
    return {
        init: function() {
            var start = [-22.5 * CUBE_SIZE, -2 * CUBE_SIZE];
            for (var x = 0; x < sumyblog.length; x++) {
                var map = sumyblog[x];
                for (var i = 0; i < map.length; i++) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (map[i][j] == 1) {
                            cubes.push(new Cube(start[0] + CUBE_SIZE * j,
                                CUBE_SIZE * Math.floor(Math.random() *
                                    15 + 10), start[1] + CUBE_SIZE * i,
                                CUBE_SIZE, Math.floor(Math.random( ) * 0xFFFFFF), Math.random() *
                                7000 + 3000));
                        }
                    }
                }
                start[0] += (CUBE_SIZE * 6);
            }
        },
        update: function(deltatime) {
            cubes.forEach(function(item) {
                item.update(deltatime);
            })
        },
        draw: function(deltatime) {
            cubes.forEach(function(item) {
                item.draw();
            });
        },
        resize: function() {

        }
    }
})();
canvasElement.push(AlphabetElement);
