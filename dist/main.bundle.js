/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/canvas-code/confetti.js":
/*!*************************************!*\
  !*** ./src/canvas-code/confetti.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ confetti)\n/* harmony export */ });\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction confetti() {\n  var canvas = document.querySelector(\".canvas\"),\n    ctx = canvas.getContext(\"2d\"),\n    width = ctx.canvas.width = window.innerWidth,\n    height = ctx.canvas.height = window.innerHeight,\n    left_x = width * -0.5,\n    right_x = width * 0.5,\n    top_y = height * -0.5,\n    bottom_y = height * 0.5,\n    scale = width * 0.09,\n    angleX = 0,\n    angleY = 0,\n    mousePush,\n    mx = 0,\n    my = 0,\n    tx = 0,\n    ty = 0,\n    radians = 0,\n    time = 0,\n    grid = [],\n    range = 0,\n    total_cols = right_x - left_x,\n    total_rows = bottom_y - top_y,\n    default_angle = Math.PI;\n\n  // console.log(scale);\n\n  canvas.addEventListener('mousemove', function (e) {\n    mx = e.clientX;\n    my = e.clientY;\n  });\n  canvas.addEventListener('touchmove', function (e) {\n    e.preventDefault();\n    tx = e.touches[0].clientX;\n    ty = e.touches[0].clientY;\n  });\n  var Particle = /*#__PURE__*/function () {\n    function Particle(x, y, radius) {\n      _classCallCheck(this, Particle);\n      this.pos = new Vector(x, y);\n      this.r = radius;\n    }\n    _createClass(Particle, [{\n      key: \"draw\",\n      value: function draw() {\n        // let [red,blue] = [0,0];\n        // ctx.fillStyle = `rgba(${red+=1},${blue+=1},150,0.9)`\n        ctx.fillStyle = 'blue';\n        ctx.beginPath();\n        ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);\n        ctx.fill();\n        ctx.closePath();\n      }\n    }, {\n      key: \"update\",\n      value: function update(t) {\n        // console.log(t);\n        this.pos.x += Math.cos(t);\n        this.pos.y += Math.sin(t);\n        // console.log(this.pos.x,this.pos.y);\n\n        if (this.pos.x > width) this.pos.x = 0;\n        if (this.pos.x < 0) this.pos.x = width;\n        if (this.pos.y < 0) this.pos.y = height;\n        if (this.pos.y > height - 10) this.pos.y = 0;\n      }\n    }]);\n    return Particle;\n  }();\n  var Vector = /*#__PURE__*/function () {\n    function Vector(x, y) {\n      _classCallCheck(this, Vector);\n      this.x = x;\n      this.y = y;\n    }\n    _createClass(Vector, [{\n      key: \"add\",\n      value: function add(v) {\n        return new Vector(this.x + v.x, this.y + v.y);\n      }\n    }, {\n      key: \"magnitude\",\n      value: function magnitude() {\n        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));\n      }\n    }, {\n      key: \"direction\",\n      value: function direction() {\n        //needed to normalize the direction vector\n        //then take the x and y positions and return them\n        //found the endpoint of vector with given length and start point\n        var dirx, diry;\n        var dir = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));\n        dirx = this.x / dir;\n        diry = this.y / dir;\n        return {\n          dirx: dirx,\n          diry: diry\n        };\n      }\n    }, {\n      key: \"dot\",\n      value: function dot() {}\n    }]);\n    return Vector;\n  }();\n  var part = new Particle(width / 2, height / 2, 7);\n  var part2 = new Particle(width / 2.5, height / 3, 7);\n  for (var i = 0; i < width; i += scale) {\n    for (var j = 0; j < height; j += scale) {\n      grid.push(new Vector(i, j));\n    }\n  }\n  function fade(n) {\n    return ((6 * n - 15) * n + 10) * n * n * n;\n  }\n  function lerp(l1, l2, d) {\n    return l1 + d * (l2 - l1);\n  }\n  function smoothstep(d) {\n    var l1 = d * d;\n    var l2 = 1.0 - (1.0 - d) * (1.0 - d);\n    return lerp(l1, l2, d);\n  }\n  var colorgrid = [];\n  function noiset(a, b) {\n    for (var x = 0; x < width; x += 8) {\n      for (var y = 0; y < height; y += 8) {\n        //the y/x times a number is how the pattern is scaled\n        var x2 = x - a,\n          y2 = y - b;\n        var mag1 = Math.sqrt(x * x + y * y);\n        var mag2 = Math.sqrt(x2 * x2 + y2 * y2);\n        var dot = mag1 * mag2 * Math.cos(mag1 - mag2);\n        var ux = fade(x);\n        var uy = fade(y);\n        var f = smoothstep(dot);\n        //range is the result of the noise funtion here, so would return base value\n        //number in the sine is the frequency\n        //amplitude is in front\n        range = Math.sin(f * 50000);\n        // let range = (Math.sin(y)*Math.cos(x));\n        range += 1;\n        range /= 2;\n        var c1 = Math.round(Math.random() * range * 255);\n        var c2 = Math.round(Math.random() * range * 255);\n        var c3 = Math.round(Math.random() * range * 255);\n        colorgrid.push({\n          x: x,\n          y: y,\n          color: \"rgb(\".concat(c1, \",\").concat(c2, \",\").concat(c3, \")\"),\n          width: 2\n        });\n        // return range;\n      }\n    }\n  }\n\n  noiset(5, 5);\n  function animate() {\n    // ctx.fillStyle = 'rgba(255,255,255,0.1)'\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    // console.log(mx*0.005);\n    colorgrid.forEach(function (pixel) {\n      // ctx.fillStyle = pixel.color;\n      // ctx.fillRect(pixel.x,pixel.y,1,1)\n      // ctx.lineWidth = pixel.width;\n      ctx.strokeStyle = pixel.color;\n      // ctx.shadowColor = 'red';\n      // ctx.shadowBlur = 10;\n      ctx.lineWidth = 4;\n      // ctx.lineCap = 'round'\n      var effectRadius = 0.5;\n      var mvx = Math.cos(Math.random() * 10) / 0.4;\n      var mvy = Math.sin(Math.random() * 10) / 0.4;\n      var max = (pixel.x - mx) * Math.random() * 0.05;\n      var may = (pixel.y - my) * Math.random() * 0.05;\n      //changing the final velocity value will affect how fast/slow the particles leave the center\n      var tvx = Math.cos(Math.random() * 10) / 0.4;\n      var tvy = Math.sin(Math.random() * 10) / 0.4;\n      //acceleration, changing the final value will speed up/down\n      var tax = (pixel.x - tx) * Math.random() * 0.05;\n      var tay = (pixel.y - ty) * Math.random() * 0.05;\n      ctx.beginPath();\n      ctx.moveTo(pixel.x, pixel.y);\n      //these are the base states\n      // pixel.x += vx+0.02;\n      // pixel.y += vy + 1;\n      //these are the mouse and touch states\n      if (my && mx) {\n        pixel.x += effectRadius * max + mvx * 0.05;\n        pixel.y += effectRadius * may + mvy * 0.05;\n      }\n      if (tx && ty) {\n        pixel.x += effectRadius * tax + tvx * 0.05;\n        pixel.y += effectRadius * tay + tvy * 0.05;\n      }\n      ctx.lineTo(pixel.x, pixel.y);\n      ctx.stroke();\n      if (pixel.x > width) pixel.x = 0;\n      if (pixel.y > height) pixel.y = 0;\n      if (pixel.x < 0) pixel.x = width;\n      if (pixel.y < 0) pixel.y = height;\n      if (pixel.x === width || pixel.x === 0 || pixel.x === tx) pixel.x = width * Math.random();\n      if (pixel.y === height || pixel.y === 0 || pixel.y === ty) pixel.y = height * Math.random();\n      // tx = 0;\n      // ty = 0;\n    });\n    // console.log(range);\n\n    // grid.forEach(point => {\n    //   angleX = 0.0005;\n    //   angleY = 0.0005;\n    //   let px1 = point.x;\n    //   let py1 = point.y;\n    //   // console.log(angleX);\n    //   let pX = point.x + 10 * Math.cos(angleX);\n    //   let pY = point.y + 10 * Math.sin(angleY);\n    //   // console.log(px1,pX);\n    //   ctx.beginPath();\n    //   ctx.moveTo(px1,py1);\n    //   ctx.lineTo(pX,pY);\n    //   ctx.stroke();\n\n    //   // ctx.fillRect(pX,pY,5,5)\n    //   ctx.beginPath()\n    //   ctx.arc(pX,pY,2,0,Math.PI*2)\n    //   ctx.fillStyle = 'red'\n    //   ctx.fill();\n    // })\n\n    requestAnimationFrame(animate);\n  }\n  animate();\n}\n\n//# sourceURL=webpack://special_effects_gallery/./src/canvas-code/confetti.js?");

/***/ }),

/***/ "./src/canvas-code/explode.js":
/*!************************************!*\
  !*** ./src/canvas-code/explode.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ explosions)\n/* harmony export */ });\n\n\nfunction explosions() {\n  console.log('hi');\n  var canvas = document.querySelector('.canvas');\n  var ctx = canvas.getContext('2d');\n  var particleArray = [];\n  var boxX = 200;\n  var boxY = 200;\n  var boxW = 200,\n    boxH = 200;\n  ctx.canvas.width = window.innerWidth;\n  ctx.canvas.height = window.innerHeight;\n  window.addEventListener('load', function () {\n    // ctx.shadowBlur = 15;\n    // ctx.shadowColor = 'lightblue';\n  });\n  animate();\n  // console.log('works?');\n\n  function Particle(x, y, size, g, w, color) {\n    this.x = x;\n    this.y = y;\n    this.gravity = g;\n    this.wind = w;\n    this.size = size;\n    this.color = color;\n    this.radians = 0;\n    this.update = function () {\n      this.y += this.gravity;\n      this.x += this.wind;\n      this.radians += 0.8;\n      //can be this.x+=Math.etc\n      this.x = this.x + Math.sin(this.radians);\n      this.y = this.y + Math.cos(this.radians);\n      if (this.x + this.size > canvas.width || this.x + this.size < 1 + this.size || this.y + this.size > canvas.height || this.y + this.size < 0) {\n        this.boom(this.x, this.y, 1);\n        // this.x = Math.random()*canvas.width;\n        // this.y = 10;\n        // particleArray.pop();\n        // console.log(particleArray);\n      }\n    };\n\n    this.draw = function () {\n      ctx.fillStyle = this.color;\n      ctx.beginPath();\n      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);\n      // ctx.fillRect(0,0,innerWidth,innerHeight)\n      ctx.closePath();\n      ctx.fill();\n    };\n    this.boom = function (startx, starty, size) {\n      ctx.beginPath();\n      ctx.save();\n      ctx.fillStyle = \"rgba(\".concat(Math.random() * 255, \", \").concat(Math.random() * 255, \", \").concat(Math.random() * 255, \", \").concat(Math.random(), \")\");\n      // console.log(size);\n      // ctx.rotate(angle*Math.PI/180)\n      ctx.arc(startx, starty, size, 0, Math.PI * 2);\n      ctx.closePath();\n      ctx.fill();\n      if (size > 25) {\n        ctx.restore();\n        return;\n      }\n      ctx.restore();\n      this.boom(startx, starty, size * 1.5);\n      // this.boom(startx+2,starty+2,size*2)\n    };\n  }\n\n  function particles() {\n    // for(let i=0; i<75; i++) {\n    //   let x = Math.cos(0);\n    //   let y = Math.sin(0);\n    //   particleArray.push(new Particle(Math.random()*innerWidth,Math.random()*innerHeight,Math.random()*15,Math.random()*2,Math.sin((Math.random()*2)-1),'black'))\n    // }\n\n    //touch method\n    canvas.addEventListener('touchmove', function (e) {\n      e.preventDefault();\n      particleArray.push(new Particle(e.touches[0].clientX, e.touches[0].clientY, Math.random() * 15, Math.random() * 2, Math.sin(Math.random() * 2 - 1), 'black'));\n    });\n    canvas.addEventListener('mousemove', function (e) {\n      particleArray.push(new Particle(e.clientX, e.clientY, Math.random() * 15, Math.random() * 2, Math.sin(Math.random() * 2 - 1), 'black'));\n    });\n  }\n  particles();\n  function animate() {\n    // let [x2,y2] = [Math.random()*window.innerWidth,Math.random()*innerHeight];  //particle flash effect\n    // ctx.fillStyle = 'rgba(255,255,255,0.02)'; //leaves trails behind\n    // ctx.fillStyle = 'red';\n\n    ctx.fillStyle = 'rgba(255,255,255,0.09)';\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    particleArray.forEach(function (particle) {\n      particle.update();\n      particle.draw();\n    });\n    requestAnimationFrame(animate);\n  }\n}\n\n//# sourceURL=webpack://special_effects_gallery/./src/canvas-code/explode.js?");

/***/ }),

/***/ "./src/canvas-code/flow_examples.js":
/*!******************************************!*\
  !*** ./src/canvas-code/flow_examples.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ practice1)\n/* harmony export */ });\n\n\nfunction practice1() {\n  // let can = document.createElement('canvas');\n  var canvas = document.querySelector(\".canvas\"),\n    ctx = canvas.getContext(\"2d\"),\n    width = canvas.width = window.innerWidth,\n    height = canvas.height = window.innerHeight,\n    opacity = document.querySelector('.opacity'),\n    totals = document.querySelector('.totals'),\n    disappear = document.querySelector('.dissipate'),\n    dValue = disappear.value,\n    generate = document.querySelector('.generate'),\n    range = 0,\n    h = document.querySelector('.hue'),\n    s = document.querySelector('.sat'),\n    l = document.querySelector('.light'),\n    dark = document.querySelector('.night'),\n    labels = document.getElementsByTagName('label'),\n    darkOn = false;\n\n  // points that will be used to generate a field the lines will move around\n  var ra = Math.random() * 8 - 4;\n  var rb = Math.random() * 4 - 2;\n  var rc = Math.random() * 4 - 2;\n  var rd = Math.random() * 4 - 2;\n  // let rs = 0;\n  var ma = width / 2;\n  var mb = height / 2;\n  ctx.lineWidth = 0.5;\n  var points = [];\n  generate.addEventListener('click', function () {\n    ra = Math.random() * 4 - 2;\n    rb = Math.random() * 4 - 2;\n    rc = Math.random() * 4 - 2;\n    rd = Math.random() * 4 - 2;\n  });\n  dark.addEventListener('click', function () {\n    if (darkOn === false) {\n      canvas.style.backgroundColor = 'black';\n      for (var i = 0; i < labels.length; i++) {\n        labels[i].style.color = 'white';\n      }\n      darkOn = true;\n      ctx.strokeStyle = 'white';\n      totals.style.color = 'white';\n    } else if (darkOn === true) {\n      canvas.style.backgroundColor = 'white';\n      for (var _i = 0; _i < labels.length; _i++) {\n        labels[_i].style.color = 'black';\n      }\n      darkOn = false;\n      ctx.strokeStyle = 'black';\n      totals.style.color = 'black';\n    }\n  });\n\n  //the setTimeout functions allow for the dissipation of the particles to appear seamless, does not work with setInterval\n  var dis = function dis() {\n    dValue = disappear.value;\n    points.shift();\n    setTimeout(dis, dValue);\n  };\n  setTimeout(dis, dValue);\n  canvas.addEventListener('touchstart', function (e) {\n    e.preventDefault();\n    points.push({\n      x: e.touches[0].clientX,\n      y: e.touches[0].clientY,\n      vx: 0,\n      vy: 0\n    });\n  });\n  canvas.addEventListener('touchmove', function (e) {\n    e.preventDefault();\n    points.push({\n      x: e.touches[0].clientX,\n      y: e.touches[0].clientY,\n      vx: 0,\n      vy: 0\n    });\n  });\n  canvas.addEventListener('mousemove', function (e) {\n    points.push({\n      x: e.pageX,\n      y: e.pageY,\n      vx: 0,\n      vy: 0\n    });\n  });\n\n  // console.log(points);\n\n  function fade(n) {\n    return ((6 * n - 15) * n + 10) * n * n * n;\n  }\n  function lerp(l1, l2, d) {\n    return l1 + d * (l2 - l1);\n  }\n  function smoothstep(d) {\n    var l1 = d * d;\n    var l2 = 1.0 - (1.0 - d) * (1.0 - d);\n    return lerp(l1, l2, d);\n  }\n  function noiset(a, b) {\n    for (var x = 0; x < width; x += 8) {\n      for (var y = 0; y < height; y += 8) {\n        //the y/x times a number is how the pattern is scaled\n        var x2 = x - a,\n          y2 = y - b;\n        var mag1 = Math.sqrt(x * x + y * y);\n        var mag2 = Math.sqrt(x2 * x2 + y2 * y2);\n        var dot = mag1 * mag2 * Math.cos(mag1 - mag2);\n        var ux = fade(x);\n        var uy = fade(y);\n        var f = smoothstep(dot);\n        //range is the result of the noise funtion here, so would return base value\n        //number in the sine is the frequency\n        //amplitude is in front\n        range = Math.sin(f * 50000);\n        // let range = (Math.sin(y)*Math.cos(x));\n        range += 1;\n        range /= 2;\n        var scale = 0.01;\n        a = (a - width / 2) * scale;\n        b = (b - height / 2) * scale;\n        var newX = Math.sin(ra * a) + rc * Math.cos(ra * b);\n        var newY = Math.sin(rb * b) + rd * Math.cos(rb * a);\n        var angv = 2 * Math.PI * range;\n        var angle = angv * Math.atan2(newX - a, newY - b);\n        // let c1 = Math.round(Math.random()*range*255);\n        // let c2 = Math.round(Math.random()*range*255);\n        // let c3 = Math.round(Math.random()*range*255);\n        // colorgrid.push({\n        //   x: x,\n        //   y: y,\n        //   color: `rgb(${c1},${c2},${c3})`,\n        //   width: 2,\n        // })\n        return angle;\n      }\n    }\n  }\n  function animate() {\n    if (darkOn === false) {\n      ctx.fillStyle = \"rgba(255,255,255,\".concat(opacity.value, \")\");\n      ctx.strokeStyle = 'black';\n      ctx.fillRect(0, 0, canvas.width, canvas.height);\n    } else if (darkOn === true) {\n      ctx.fillStyle = \"rgba(0,0,0,\".concat(opacity.value, \")\");\n      ctx.strokeStyle = 'white';\n      ctx.fillRect(0, 0, canvas.width, canvas.height);\n    }\n    totals.textContent = \"Current Particles: \".concat(points.length);\n    points.forEach(function (point) {\n      var h2 = h.value;\n      var s2 = s.value;\n      var l2 = l.value;\n      var angle = noiset(point.x, point.y);\n\n      // rs += angle * Math.random();\n      point.vx += Math.cos(angle) * 0.1;\n      point.vy += Math.sin(angle) * 0.1;\n      point.vx *= 0.97;\n      point.vy *= 0.97;\n      ctx.beginPath();\n      ctx.moveTo(point.x, point.y);\n      // console.log(h);\n      ctx.strokeStyle = \"hsl(\".concat(h2, \",\").concat(s2, \"%,\").concat(l2, \"%)\");\n      point.x += point.vx;\n      point.y += point.vy;\n      ctx.lineTo(point.x, point.y);\n      ctx.stroke();\n      if (point.x < 0) point.x = width;\n      if (point.y < 0) point.y = height;\n      if (point.x > width) point.x = 0;\n      if (point.y > height) point.y = 0;\n    });\n    requestAnimationFrame(animate);\n  }\n  animate();\n}\n\n//# sourceURL=webpack://special_effects_gallery/./src/canvas-code/flow_examples.js?");

/***/ }),

/***/ "./src/canvas-code/perlin-flow.js":
/*!****************************************!*\
  !*** ./src/canvas-code/perlin-flow.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ perlinFlow)\n/* harmony export */ });\n\n\nfunction perlinFlow() {\n  // let can = document.createElement('canvas');\n  var canvas = document.querySelector(\".canvas\"),\n    // let canvas = can,\n    ctx = canvas.getContext(\"2d\"),\n    width = canvas.width = window.innerWidth,\n    height = canvas.height = window.innerHeight,\n    opacity = document.querySelector(\".opacity\"),\n    totals = document.querySelector('.totals'),\n    disappear = document.querySelector('.dissipate'),\n    dValue = disappear.value,\n    generate = document.querySelector('.generate'),\n    range = 0;\n\n  // points that will be used to generate a field the lines will move around\n  var ra = Math.random() * 4 - 2;\n  var rb = Math.random() * 4 - 2;\n  var rc = Math.random() * 4 - 2;\n  var rd = Math.random() * 4 - 2;\n  var rs = 0;\n  ctx.lineWidth = 0.5;\n  var points = [];\n  generate.addEventListener('click', function () {\n    ra = Math.random() * 4 - 2;\n    rb = Math.random() * 4 - 2;\n    rc = Math.random() * 4 - 2;\n    rd = Math.random() * 4 - 2;\n  });\n\n  //the setTimeout functions allow for the dissipation of the particles to appear seamless, does not work with setInterval\n  var dis = function dis() {\n    dValue = disappear.value;\n    points.shift();\n    setTimeout(dis, dValue);\n  };\n  setTimeout(dis, dValue);\n  canvas.addEventListener('touchstart', function (e) {\n    e.preventDefault();\n    points.push({\n      x: e.touches[0].clientX,\n      y: e.touches[0].clientY,\n      vx: 0,\n      vy: 0\n    });\n  });\n  canvas.addEventListener('touchmove', function (e) {\n    e.preventDefault();\n    points.push({\n      x: e.touches[0].clientX,\n      y: e.touches[0].clientY,\n      vx: 0,\n      vy: 0\n    });\n  });\n  canvas.addEventListener('mousemove', function (e) {\n    points.push({\n      x: e.pageX,\n      y: e.pageY,\n      vx: 0,\n      vy: 0\n    });\n  });\n\n  // console.log(points);\n\n  function fade(n) {\n    return ((6 * n - 15) * n + 10) * n * n * n;\n  }\n  function lerp(l1, l2, d) {\n    return l1 + d * (l2 - l1);\n  }\n  function smoothstep(d) {\n    var l1 = d * d;\n    var l2 = 1.0 - (1.0 - d) * (1.0 - d);\n    return lerp(l1, l2, d);\n  }\n  function noiset(a, b) {\n    for (var x = 0; x < width; x += 8) {\n      for (var y = 0; y < height; y += 8) {\n        //the y/x times a number is how the pattern is scaled\n        var x2 = x - a,\n          y2 = y - b;\n        var mag1 = Math.sqrt(x * x + y * y);\n        var mag2 = Math.sqrt(x2 * x2 + y2 * y2);\n        var dot = mag1 * mag2 * Math.cos(mag1 - mag2);\n        var ux = fade(x);\n        var uy = fade(y);\n        var f = smoothstep(dot);\n        //range is the result of the noise funtion here, so would return base value\n        //number in the sine is the frequency\n        //amplitude is in front\n        range = Math.sin(f * 50000);\n        // let range = (Math.sin(y)*Math.cos(x));\n        range += 1;\n        range /= 2;\n        var scale = 0.01;\n        a = (a - width / 2) * scale;\n        b = (b - width / 2) * scale;\n        var newX = Math.sin(ra * a) + rc * Math.cos(ra * b);\n        var newY = Math.sin(rb * b) + rd * Math.cos(rb * a);\n        var angle = Math.atan2(newX - a, newY - b);\n        // let c1 = Math.round(Math.random()*range*255);\n        // let c2 = Math.round(Math.random()*range*255);\n        // let c3 = Math.round(Math.random()*range*255);\n        // colorgrid.push({\n        //   x: x,\n        //   y: y,\n        //   color: `rgb(${c1},${c2},${c3})`,\n        //   width: 2,\n        // })\n        return angle;\n      }\n    }\n  }\n  function animate() {\n    ctx.fillStyle = \"rgba(255,255,255,\".concat(opacity.value, \")\");\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    totals.textContent = \"Current Particles: \".concat(points.length);\n    points.forEach(function (point) {\n      //clifford attractors\n      // let x2 = Math.sin(a*sy) + c*(Math.cos(a*sx));\n      // let y2 = Math.sin(b*sx) + d*(Math.cos(b*sy));\n      // let angle = Math.atan2(x2-sx,y2-sy);\n      // let angle = 0;\n\n      var angle = noiset(point.x, point.y);\n      rs += angle * Math.random();\n      point.vx += Math.cos(rs) * 0.1;\n      point.vy += Math.sin(rs) * 0.1;\n      point.vx *= 0.97;\n      point.vy *= 0.97;\n      ctx.beginPath();\n      ctx.moveTo(point.x, point.y);\n\n      // console.log(point.x,point.y);\n      point.x += point.vx;\n      point.y += point.vy;\n\n      // console.log(point.x,point.y);\n\n      ctx.lineTo(point.x, point.y);\n      ctx.stroke();\n      if (point.x < 0) point.x = width;\n      if (point.y < 0) point.y = height;\n      if (point.x > width) point.x = 0;\n      if (point.y > height) point.y = 0;\n    });\n    requestAnimationFrame(animate);\n  }\n  animate();\n}\n\n//# sourceURL=webpack://special_effects_gallery/./src/canvas-code/perlin-flow.js?");

/***/ }),

/***/ "./src/canvas-code/vortex.js":
/*!***********************************!*\
  !*** ./src/canvas-code/vortex.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ vortex)\n/* harmony export */ });\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction vortex() {\n  // let can = document.createElement('canvas');\n  var canvas = document.querySelector(\".canvas\"),\n    // let canvas = can,\n    ctx = canvas.getContext(\"2d\"),\n    width = window.innerWidth,\n    height = window.innerHeight,\n    opacity = document.querySelector(\".opacity\"),\n    totals = document.querySelector('.totals'),\n    disappear = document.querySelector('.dissipate'),\n    dValue = disappear.value,\n    generate = document.querySelector('.generate'),\n    range = 0,\n    random = Math.random() * 16 - 8,\n    gravity = 9.8,\n    cx = width / 2,\n    cy = height / 2,\n    labels = document.getElementsByTagName('label');\n  canvas.width = width;\n  canvas.height = height;\n  var circle = {\n    x: cx,\n    y: cy,\n    mass: 20\n  };\n  // points that will be used to generate a field the lines will move around\n  // let ra = Math.random() * 8 - 4;\n  // let rb = Math.random() * 4 - 2;\n  // let rc = Math.random() * 4 - 2;\n  // let rd = Math.random() * 4 - 2;\n  // let ma = width/2;\n  // let mb = height/2;\n\n  ctx.lineWidth = 0.5;\n  var particles = [];\n  totals.style.color = 'white';\n  for (var i = 0; i < labels.length; i++) {\n    labels[i].style.color = 'white';\n  }\n\n  // generate.addEventListener('click', () => {\n  //   ra = Math.random() * 4 - 2;\n  //   rb = Math.random() * 4 - 2;\n  //   rc = Math.random() * 4 - 2;\n  //   rd = Math.random() * 4 - 2;\n  // })\n\n  //the setTimeout functions allow for the dissipation of the particles to appear seamless, does not work with setInterval\n  var dis = function dis() {\n    dValue = disappear.value;\n    particles.shift();\n    setTimeout(dis, dValue);\n  };\n  setTimeout(dis, dValue);\n  canvas.addEventListener('touchstart', function (e) {\n    e.preventDefault();\n    particles.push(new Particle(e.touches[0].clientX, e.touches[0].clientY));\n  });\n  canvas.addEventListener('touchmove', function (e) {\n    e.preventDefault();\n    particles.push(new Particle(e.touches[0].clientX, e.touches[0].clientY));\n  });\n  canvas.addEventListener('mousemove', function (e) {\n    particles.push(new Particle(e.clientX, e.clientY));\n  });\n  var Particle = /*#__PURE__*/function () {\n    function Particle(x, y) {\n      _classCallCheck(this, Particle);\n      this.x = x, this.y = y, this.theta = 0, this.vx = 0.01, this.vy = 0.01, this.x2 = 0;\n      this.y2 = 0, this.radius = 5, this.mass = Math.random() * 4 - 2;\n    }\n    _createClass(Particle, [{\n      key: \"update\",\n      value: function update() {\n        var angle = Math.atan2(circle.y - this.y, circle.x - this.x);\n        var r = Math.sqrt((this.x - circle.x) * (this.x - circle.x) + (this.y - circle.y) * (this.y - circle.y));\n        //Fg is the gravity vector\n        var Fg = circle.mass * this.mass / r * r;\n\n        // console.log(Fg);\n        // this.theta += angle;\n        this.vx += Math.cos(angle);\n        this.vy += Math.sin(angle);\n        // this.vx += Fg\n        // this.vy += Fg\n        this.vx += Fg * 0.01 * Math.random();\n        this.vy += Fg * 0.01 * Math.random();\n        this.vx *= 0.95;\n        this.vy *= 0.95;\n      }\n    }, {\n      key: \"draw\",\n      value: function draw() {\n        // this.vx += (gravity*this.mass*500)/(cx-this.x)*(cx-this.x);\n        // this.vy += (gravity*this.mass*500)/(cy-this.y)*(cy-this.y);\n        // console.log(this.vx*0.01);\n        // console.log(this.vx);\n\n        ctx.moveTo(this.x, this.y);\n        this.x += this.vx;\n        this.y += this.vy;\n        // console.log(this.x,'0');\n        // this.x = width/2 + 50 * Math.cos(this.theta);\n        // this.y = height/2 + 50 * Math.sin(this.theta);\n        // this.x*=this.vx;\n        // this.y*=this.vy;\n        // console.log(this.x, '1');\n\n        ctx.lineTo(this.x, this.y);\n      }\n    }]);\n    return Particle;\n  }();\n  function animate() {\n    ctx.fillStyle = \"rgba(0,0,0,\".concat(opacity.value, \")\");\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    totals.textContent = \"Current Particles: \".concat(particles.length);\n    ctx.save();\n    ctx.beginPath();\n    ctx.arc(width / 2, height / 2, 5, 0, Math.PI * 2);\n    ctx.fillStyle = \"black\";\n    ctx.shadowBlur = 5;\n    ctx.shadowColor = \"red\";\n    ctx.fill();\n    ctx.restore();\n    ctx.save();\n    ctx.shadowColor = '#a6a8ff';\n    ctx.shadowBlur = 2;\n    // ctx.strokeStyle = 'rgba(0,0,0,1)';\n    ctx.beginPath();\n    particles.forEach(function (p) {\n      p.update();\n      p.draw();\n      if (p.x < 0) p.x = width;\n      if (p.y < 0) p.y = height;\n      if (p.x > width) p.x = 0;\n      if (p.y > height) p.y = 0;\n    });\n    ctx.stroke();\n    ctx.restore();\n    requestAnimationFrame(animate);\n  }\n  animate();\n}\n\n//# sourceURL=webpack://special_effects_gallery/./src/canvas-code/vortex.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _html_components_main_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html-components/main.html */ \"./src/html-components/main.html\");\n/* harmony import */ var _html_components_flow_particles_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./html-components/flow-particles.html */ \"./src/html-components/flow-particles.html\");\n/* harmony import */ var _html_components_flow_particles2_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./html-components/flow-particles2.html */ \"./src/html-components/flow-particles2.html\");\n/* harmony import */ var _html_components_canvas_only_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./html-components/canvas-only.html */ \"./src/html-components/canvas-only.html\");\n/* harmony import */ var _canvas_code_flow_examples__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./canvas-code/flow_examples */ \"./src/canvas-code/flow_examples.js\");\n/* harmony import */ var _canvas_code_explode_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./canvas-code/explode.js */ \"./src/canvas-code/explode.js\");\n/* harmony import */ var _canvas_code_confetti__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./canvas-code/confetti */ \"./src/canvas-code/confetti.js\");\n/* harmony import */ var _canvas_code_perlin_flow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./canvas-code/perlin-flow */ \"./src/canvas-code/perlin-flow.js\");\n/* harmony import */ var _canvas_code_vortex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./canvas-code/vortex */ \"./src/canvas-code/vortex.js\");\n/* harmony import */ var _images_special_effects_gallery_hero_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./images/special_effects_gallery_hero.png */ \"./src/images/special_effects_gallery_hero.png\");\n/* harmony import */ var _home_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./home.css */ \"./src/home.css\");\n/* harmony import */ var _images_flow_parts_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./images/flow_parts.png */ \"./src/images/flow_parts.png\");\n/* harmony import */ var _images_explode_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./images/explode.png */ \"./src/images/explode.png\");\n/* harmony import */ var _images_confetti_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./images/confetti.png */ \"./src/images/confetti.png\");\n/* harmony import */ var _images_perlin_flow_field_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./images/perlin_flow_field.png */ \"./src/images/perlin_flow_field.png\");\n/* harmony import */ var _images_blackhole_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./images/blackhole.png */ \"./src/images/blackhole.png\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar root = document.querySelector('#root');\nvar numArray = [];\nvar tiles = [];\nvar h = tiles[0];\nvar canvasCodePage = [];\nvar heightPos = window.innerHeight;\nvar footerPos;\nvar heroVideo;\nvar gallery;\nconsole.log(tiles);\nvar footer;\nwindow.addEventListener('load', function () {\n  if (window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname === '/special_effects_gallery/') {\n    root.innerHTML = _html_components_main_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"] + footer;\n    var mainContent = document.querySelector(\".mainArea\");\n    footer = document.createElement('footer');\n    footer.classList.add('footer');\n    var footerText = document.createElement('p');\n    footerText.textContent = \"\\xA9 2022 BambooCode98\";\n    heroVideo = document.querySelector(\".confetti\");\n    gallery = document.querySelector('.galleryContainer');\n    heroVideo.height = window.innerHeight / 2;\n    heroVideo.width = window.innerWidth;\n    tiles.forEach(function (tile) {\n      tile.createtile();\n    });\n    mainContent.append(footer);\n    footer.append(footerText);\n    for (var i = 0; i < numArray.length; i++) {\n      footer.style.bottom = \"-\".concat(numArray[i] * 50, \"%\");\n    }\n  } else {\n    // console.log(tiles);\n    root.innerHTML = h;\n    root.style.backgroundColor = 'white';\n  }\n});\nvar Tile = /*#__PURE__*/function () {\n  function Tile(title, number, text, color, image, code, html) {\n    _classCallCheck(this, Tile);\n    this.title = title;\n    this.text = text;\n    this.number = number;\n    this.color = color;\n    this.image = image;\n    this.code = code;\n    this.html = html;\n    tiles.push(this);\n  }\n  _createClass(Tile, [{\n    key: \"createtile\",\n    value: function createtile() {\n      var _this = this;\n      var newTile = document.createElement('div');\n      var title = document.createElement('h1');\n      var desc = document.createElement('p');\n      var image = document.createElement('img');\n      newTile.classList.add(\"card\");\n      title.classList.add('title');\n      desc.classList.add('desc');\n\n      // if(this.number === 1) newTile.style.marginTop = '15%';\n      newTile.style.top = \"\".concat(this.number * 50, \"%\");\n      newTile.style.backgroundImage = \"url(\".concat(this.image, \")\");\n      title.textContent = this.title;\n      desc.textContent = this.text;\n\n      // image.src = this.image;\n      // image.classList.add('images')\n      footer.style.bottom = \"\".concat(this.number * 50);\n      newTile.append(title, desc, image);\n      gallery.append(newTile);\n      numArray.push(this.number);\n      newTile.addEventListener('click', function (e) {\n        // window.location.pathname = `/${this.title}`;\n\n        root.innerHTML = _this.html;\n        root.style.backgroundColor = 'white';\n        _this.code();\n        var homeButton = document.createElement('button');\n        homeButton.classList.add('goHome');\n        homeButton.textContent = 'Return To Gallery';\n        root.append(homeButton);\n        homeButton.addEventListener('click', function () {\n          // root.innerHTML = mainHTML + footer;\n          location.reload();\n        });\n      });\n    }\n  }, {\n    key: \"giveHtml\",\n    value: function giveHtml() {\n      return this.html;\n    }\n  }, {\n    key: \"loadCanvasCode\",\n    value: function loadCanvasCode() {\n      // explodeParticles()\n      this.code();\n    }\n  }]);\n  return Tile;\n}();\nvar flow_particles = new Tile('Flow Particles', 1, 'A particle field the user can make by hovering. The particles move toward certain points.', 'rgba(255,255,255,0.7)', _images_flow_parts_png__WEBPACK_IMPORTED_MODULE_11__, _canvas_code_flow_examples__WEBPACK_IMPORTED_MODULE_4__[\"default\"], _html_components_flow_particles2_html__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\nvar explode = new Tile('Mini-Explosions', 2, 'A simple program that lets a user create particles that spin and explode upon contact with the screen edges.', 'rgba(255,255,255,0.7)', _images_explode_png__WEBPACK_IMPORTED_MODULE_12__, _canvas_code_explode_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"], _html_components_canvas_only_html__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\nvar confettiField = new Tile('Confetti Field', 3, 'A field of particles that look like confetti. The center point of low speed follows the user.', 'null', _images_confetti_png__WEBPACK_IMPORTED_MODULE_13__, _canvas_code_confetti__WEBPACK_IMPORTED_MODULE_6__[\"default\"], _html_components_canvas_only_html__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\nvar PerlinFlow = new Tile('Perlin Flow', 4, 'A field similar to the particle flow, but with perlin noise applied to it.', null, _images_perlin_flow_field_png__WEBPACK_IMPORTED_MODULE_14__, _canvas_code_perlin_flow__WEBPACK_IMPORTED_MODULE_7__[\"default\"], _html_components_flow_particles_html__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nvar Vortex = new Tile('Blackhole', 5, \"A simple program that emulates a blackhole. The user can create particles that will flow into the middle.\", \"no color\", _images_blackhole_png__WEBPACK_IMPORTED_MODULE_15__, _canvas_code_vortex__WEBPACK_IMPORTED_MODULE_8__[\"default\"], _html_components_flow_particles_html__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n//# sourceURL=webpack://special_effects_gallery/./src/index.js?");

/***/ }),

/***/ "./src/html-components/canvas-only.html":
/*!**********************************************!*\
  !*** ./src/html-components/canvas-only.html ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<canvas class=\\\"canvas\\\"></canvas>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://special_effects_gallery/./src/html-components/canvas-only.html?");

/***/ }),

/***/ "./src/html-components/flow-particles.html":
/*!*************************************************!*\
  !*** ./src/html-components/flow-particles.html ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div class=\\\"container\\\"> <h1 class=\\\"totals\\\"></h1> <label>Length:</label> <input placeholder=\\\"Length\\\" type=\\\"number\\\" class=\\\"opacity\\\" value=\\\"0.9\\\" step=\\\"0.001\\\" min=\\\"0\\\" max=\\\"1\\\"> <label>Dissipation:</label> <input placeholder=\\\"Dissipation\\\" type=\\\"number\\\" class=\\\"dissipate\\\" value=\\\"100\\\" step=\\\"10\\\" min=\\\"0\\\" max=\\\"10000\\\"> <button class=\\\"generate\\\">Generate New Pattern</button> </div> <canvas class=\\\"canvas\\\"></canvas>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://special_effects_gallery/./src/html-components/flow-particles.html?");

/***/ }),

/***/ "./src/html-components/flow-particles2.html":
/*!**************************************************!*\
  !*** ./src/html-components/flow-particles2.html ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div class=\\\"container\\\"> <h1 class=\\\"totals\\\"></h1> <label>Opacity:</label> <input placeholder=\\\"Length\\\" type=\\\"number\\\" class=\\\"opacity\\\" value=\\\"0.9\\\" step=\\\"0.001\\\" min=\\\"0\\\" max=\\\"1\\\"> <label>Dissipation:</label> <input placeholder=\\\"Dissipation\\\" type=\\\"number\\\" class=\\\"dissipate\\\" value=\\\"100\\\" step=\\\"10\\\" min=\\\"0\\\" max=\\\"10000\\\"> <label>Hue:</label> <input placeholder=\\\"Hue\\\" type=\\\"number\\\" class=\\\"hue\\\" value=\\\"0\\\" step=\\\"1\\\" min=\\\"0\\\" max=\\\"360\\\"> <label>Saturation:</label> <input placeholder=\\\"Saturation\\\" type=\\\"number\\\" class=\\\"sat\\\" value=\\\"0\\\" step=\\\"1\\\" min=\\\"0\\\" max=\\\"100\\\"> <label>Lightness:</label> <input placeholder=\\\"Lightness\\\" type=\\\"number\\\" class=\\\"light\\\" value=\\\"0\\\" step=\\\"1\\\" min=\\\"0\\\" max=\\\"100\\\"> <button class=\\\"generate\\\">Generate New Pattern</button> <button class=\\\"night\\\">Dark Mode</button> </div> <canvas class=\\\"canvas\\\"></canvas>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://special_effects_gallery/./src/html-components/flow-particles2.html?");

/***/ }),

/***/ "./src/html-components/main.html":
/*!***************************************!*\
  !*** ./src/html-components/main.html ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/html-loader/dist/runtime/getUrl.js */ \"./node_modules/html-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../videos/Confetti_field.webM */ \"./src/videos/Confetti_field.webM\"), __webpack_require__.b);\n// Module\nvar ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);\nvar code = \"<div class=\\\"hero\\\"> <div class=\\\"heroTcontainer\\\"> <h1 class=\\\"heroTitle\\\">Special Effects Gallery</h1> <h3 class=\\\"heroSub\\\">A gallery of interesting patterns made with Javascript.</h3> </div> <div class=\\\"videoWrap\\\"> <video class=\\\"confetti\\\" autoplay loop muted disablePictureInPicture> <source src=\\\"\" + ___HTML_LOADER_REPLACEMENT_0___ + \"\\\" type=\\\"video/webM\\\"/> </video> </div> </div> <main class=\\\"mainArea\\\"> <div class=\\\"galleryContainer\\\"> </div> </main>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://special_effects_gallery/./src/html-components/main.html?");

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    // eslint-disable-next-line no-param-reassign\n    options = {};\n  }\n\n  if (!url) {\n    return url;\n  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n\n\n  url = String(url.__esModule ? url.default : url);\n\n  if (options.hash) {\n    // eslint-disable-next-line no-param-reassign\n    url += options.hash;\n  }\n\n  if (options.maybeNeedQuotes && /[\\t\\n\\f\\r \"'=<>`]/.test(url)) {\n    return \"\\\"\".concat(url, \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://special_effects_gallery/./node_modules/html-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* eslint-env browser */\n\n/*\n  eslint-disable\n  no-console,\n  func-names\n*/\n\n/** @typedef {any} TODO */\nvar normalizeUrl = __webpack_require__(/*! ./normalize-url */ \"./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js\");\n\nvar srcByModuleId = Object.create(null);\nvar noDocument = typeof document === \"undefined\";\nvar forEach = Array.prototype.forEach;\n/**\n * @param {function} fn\n * @param {number} time\n * @returns {(function(): void)|*}\n */\n\nfunction debounce(fn, time) {\n  var timeout = 0;\n  return function () {\n    // @ts-ignore\n    var self = this; // eslint-disable-next-line prefer-rest-params\n\n    var args = arguments;\n\n    var functionCall = function functionCall() {\n      return fn.apply(self, args);\n    };\n\n    clearTimeout(timeout); // @ts-ignore\n\n    timeout = setTimeout(functionCall, time);\n  };\n}\n\nfunction noop() {}\n/**\n * @param {TODO} moduleId\n * @returns {TODO}\n */\n\n\nfunction getCurrentScriptUrl(moduleId) {\n  var src = srcByModuleId[moduleId];\n\n  if (!src) {\n    if (document.currentScript) {\n      src =\n      /** @type {HTMLScriptElement} */\n      document.currentScript.src;\n    } else {\n      var scripts = document.getElementsByTagName(\"script\");\n      var lastScriptTag = scripts[scripts.length - 1];\n\n      if (lastScriptTag) {\n        src = lastScriptTag.src;\n      }\n    }\n\n    srcByModuleId[moduleId] = src;\n  }\n  /**\n   * @param {string} fileMap\n   * @returns {null | string[]}\n   */\n\n\n  return function (fileMap) {\n    if (!src) {\n      return null;\n    }\n\n    var splitResult = src.split(/([^\\\\/]+)\\.js$/);\n    var filename = splitResult && splitResult[1];\n\n    if (!filename) {\n      return [src.replace(\".js\", \".css\")];\n    }\n\n    if (!fileMap) {\n      return [src.replace(\".js\", \".css\")];\n    }\n\n    return fileMap.split(\",\").map(function (mapRule) {\n      var reg = new RegExp(\"\".concat(filename, \"\\\\.js$\"), \"g\");\n      return normalizeUrl(src.replace(reg, \"\".concat(mapRule.replace(/{fileName}/g, filename), \".css\")));\n    });\n  };\n}\n/**\n * @param {TODO} el\n * @param {string} [url]\n */\n\n\nfunction updateCss(el, url) {\n  if (!url) {\n    if (!el.href) {\n      return;\n    } // eslint-disable-next-line\n\n\n    url = el.href.split(\"?\")[0];\n  }\n\n  if (!isUrlRequest(\n  /** @type {string} */\n  url)) {\n    return;\n  }\n\n  if (el.isLoaded === false) {\n    // We seem to be about to replace a css link that hasn't loaded yet.\n    // We're probably changing the same file more than once.\n    return;\n  }\n\n  if (!url || !(url.indexOf(\".css\") > -1)) {\n    return;\n  } // eslint-disable-next-line no-param-reassign\n\n\n  el.visited = true;\n  var newEl = el.cloneNode();\n  newEl.isLoaded = false;\n  newEl.addEventListener(\"load\", function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.addEventListener(\"error\", function () {\n    if (newEl.isLoaded) {\n      return;\n    }\n\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.href = \"\".concat(url, \"?\").concat(Date.now());\n\n  if (el.nextSibling) {\n    el.parentNode.insertBefore(newEl, el.nextSibling);\n  } else {\n    el.parentNode.appendChild(newEl);\n  }\n}\n/**\n * @param {string} href\n * @param {TODO} src\n * @returns {TODO}\n */\n\n\nfunction getReloadUrl(href, src) {\n  var ret; // eslint-disable-next-line no-param-reassign\n\n  href = normalizeUrl(href);\n  src.some(\n  /**\n   * @param {string} url\n   */\n  // eslint-disable-next-line array-callback-return\n  function (url) {\n    if (href.indexOf(src) > -1) {\n      ret = url;\n    }\n  });\n  return ret;\n}\n/**\n * @param {string} [src]\n * @returns {boolean}\n */\n\n\nfunction reloadStyle(src) {\n  if (!src) {\n    return false;\n  }\n\n  var elements = document.querySelectorAll(\"link\");\n  var loaded = false;\n  forEach.call(elements, function (el) {\n    if (!el.href) {\n      return;\n    }\n\n    var url = getReloadUrl(el.href, src);\n\n    if (!isUrlRequest(url)) {\n      return;\n    }\n\n    if (el.visited === true) {\n      return;\n    }\n\n    if (url) {\n      updateCss(el, url);\n      loaded = true;\n    }\n  });\n  return loaded;\n}\n\nfunction reloadAll() {\n  var elements = document.querySelectorAll(\"link\");\n  forEach.call(elements, function (el) {\n    if (el.visited === true) {\n      return;\n    }\n\n    updateCss(el);\n  });\n}\n/**\n * @param {string} url\n * @returns {boolean}\n */\n\n\nfunction isUrlRequest(url) {\n  // An URL is not an request if\n  // It is not http or https\n  if (!/^[a-zA-Z][a-zA-Z\\d+\\-.]*:/.test(url)) {\n    return false;\n  }\n\n  return true;\n}\n/**\n * @param {TODO} moduleId\n * @param {TODO} options\n * @returns {TODO}\n */\n\n\nmodule.exports = function (moduleId, options) {\n  if (noDocument) {\n    console.log(\"no window.document found, will not HMR CSS\");\n    return noop;\n  }\n\n  var getScriptSrc = getCurrentScriptUrl(moduleId);\n\n  function update() {\n    var src = getScriptSrc(options.filename);\n    var reloaded = reloadStyle(src);\n\n    if (options.locals) {\n      console.log(\"[HMR] Detected local css modules. Reload all css\");\n      reloadAll();\n      return;\n    }\n\n    if (reloaded) {\n      console.log(\"[HMR] css reload %s\", src.join(\" \"));\n    } else {\n      console.log(\"[HMR] Reload all css\");\n      reloadAll();\n    }\n  }\n\n  return debounce(update, 50);\n};\n\n//# sourceURL=webpack://special_effects_gallery/./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

eval("\n\n/* eslint-disable */\n\n/**\n * @param {string[]} pathComponents\n * @returns {string}\n */\nfunction normalizeUrl(pathComponents) {\n  return pathComponents.reduce(function (accumulator, item) {\n    switch (item) {\n      case \"..\":\n        accumulator.pop();\n        break;\n\n      case \".\":\n        break;\n\n      default:\n        accumulator.push(item);\n    }\n\n    return accumulator;\n  },\n  /** @type {string[]} */\n  []).join(\"/\");\n}\n/**\n * @param {string} urlString\n * @returns {string}\n */\n\n\nmodule.exports = function (urlString) {\n  urlString = urlString.trim();\n\n  if (/^data:/i.test(urlString)) {\n    return urlString;\n  }\n\n  var protocol = urlString.indexOf(\"//\") !== -1 ? urlString.split(\"//\")[0] + \"//\" : \"\";\n  var components = urlString.replace(new RegExp(protocol, \"i\"), \"\").split(\"/\");\n  var host = components[0].toLowerCase().replace(/\\.$/, \"\");\n  components[0] = \"\";\n  var path = normalizeUrl(components);\n  return protocol + host + path;\n};\n\n//# sourceURL=webpack://special_effects_gallery/./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js?");

/***/ }),

/***/ "./src/home.css":
/*!**********************!*\
  !*** ./src/home.css ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n    if(true) {\n      // 1669618593169\n      var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ \"./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js\")(module.id, {\"locals\":false});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack://special_effects_gallery/./src/home.css?");

/***/ }),

/***/ "./src/images/blackhole.png":
/*!**********************************!*\
  !*** ./src/images/blackhole.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"06b66fa0c4846cae0cc7.png\";\n\n//# sourceURL=webpack://special_effects_gallery/./src/images/blackhole.png?");

/***/ }),

/***/ "./src/images/confetti.png":
/*!*********************************!*\
  !*** ./src/images/confetti.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"227951f091a0b010ba7b.png\";\n\n//# sourceURL=webpack://special_effects_gallery/./src/images/confetti.png?");

/***/ }),

/***/ "./src/images/explode.png":
/*!********************************!*\
  !*** ./src/images/explode.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"071a6e07c44e3bd431c5.png\";\n\n//# sourceURL=webpack://special_effects_gallery/./src/images/explode.png?");

/***/ }),

/***/ "./src/images/flow_parts.png":
/*!***********************************!*\
  !*** ./src/images/flow_parts.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"a62c53c6ff9edf12c5e4.png\";\n\n//# sourceURL=webpack://special_effects_gallery/./src/images/flow_parts.png?");

/***/ }),

/***/ "./src/images/perlin_flow_field.png":
/*!******************************************!*\
  !*** ./src/images/perlin_flow_field.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"8eb653b50647e3a155fa.png\";\n\n//# sourceURL=webpack://special_effects_gallery/./src/images/perlin_flow_field.png?");

/***/ }),

/***/ "./src/images/special_effects_gallery_hero.png":
/*!*****************************************************!*\
  !*** ./src/images/special_effects_gallery_hero.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"8e9d4d0c7a6bcca38208.png\";\n\n//# sourceURL=webpack://special_effects_gallery/./src/images/special_effects_gallery_hero.png?");

/***/ }),

/***/ "./src/videos/Confetti_field.webM":
/*!****************************************!*\
  !*** ./src/videos/Confetti_field.webM ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"454785ae285f68b18d55.webM\";\n\n//# sourceURL=webpack://special_effects_gallery/./src/videos/Confetti_field.webM?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("a50ae8590864c6e786a8")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "special_effects_gallery:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			};
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		var createStylesheet = (chunkId, fullhref, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatespecial_effects_gallery"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;