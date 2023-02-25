'use strict';

export default function f_spiral() {
  let canvas = document.querySelector(".canvas"),
      ctx = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      angle = 0,
      a = 0,
      b = 1,
      numbers = [],
      c = 0,
      dx = 0,
      dy = 0,
      d = 1,
      x = width/2,
      y = height/2,
      mx = 0.01,
      my = 0.01,
      parts = [],
      dValue = 1000;


  // function get_fibonacci_numbers(a,b) {
  //   numbers.push(a);
  //   [a,b] = [b, a+b]
  //   if(a >= 10000) {
  //     return
  //   }
  //   get_fibonacci_numbers(a,b)
  // }
  // get_fibonacci_numbers(a,b)

  document.addEventListener('mousemove', (e) => {
    mx = e.pageX;
    my = e.pageY;
    parts.push(new Particle(mx,my));
  })

  document.addEventListener('touchmove', (e) => {
    mx = e.touches[0].clientX;
    my = e.touches[0].clientY;
    parts.push(new Particle(mx,my));
  })
  
  if(parts.length >= 0) {
    let dis = function () {
      // dValue = 100;
      // dValue = disappear.value;
      parts.shift();
      setTimeout(dis, dValue)
    }
    setTimeout(dis, dValue)
  }

  let sides = 1;

  class Particle{
    constructor(x,y) {
      this.x = x;
      this.y = y;
      this.r = 0.01;
      this.sides = 0;
      this.theta = 0;
      this.dx = 0;
      this.dy = 0;
    }

    update() {
      // d += 1;
      // //increasing the sides variable causes a spiral motion
      // sides += (0.09)
      // //multiply pi by sides for a double loop
      // //divide pi by sides for fibonacci spiral/logarithmic spiral
      // angle += Math.PI/sides;
      // dx = d*Math.cos(angle);
      // dy = d*Math.sin(angle);
      this.r += 1;
      this.sides += 0.05;
      this.theta += Math.PI/this.sides;
      this.dx = this.r*Math.cos(this.theta)
      this.dy = this.r*Math.sin(this.theta)


      if(this.x > width) this.x = 0;
      if(this.y > height) this.y = 0;
      if(this.x < 0) this.x = width;
      if(this.y < 0) this.y = height;

    }

    draw() {
      ctx.moveTo(this.x,this.y);


      this.x += this.dx*0.01;
      this.y += this.dy*0.01;
      
      ctx.lineTo(this.x,this.y);
    }
  }

  // document.addEventListener('keydown',(e) => {
  //   if(e.key === 'ArrowDown') {
  //     sides -= 1;
  //   }
  // })

  // document.addEventListener('keydown',(e) => {
  //   if (e.key === 'ArrowUp') {
  //     sides += 1;
  //   }
  // })




  function animate() {
    ctx.fillStyle = `rgba(255,255,255,${0.09})`;
    ctx.strokeStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height)
    // ctx.lineWidth = 5;
    // ctx.lineCap = 'round';

    ctx.beginPath();

    parts.forEach(part => {
      part.update();
      part.draw();
    })
    
    // ctx.moveTo(x,y);

    // d += 1;
    //increasing the sides variable causes a spiral motion
    // sides += (0.09)
    //multiply pi by sides for a double loop
    //divide pi by sides for fibonacci spiral/logarithmic spiral
    // angle += Math.PI/sides;
    // dx = d*Math.cos(angle);
    // dy = d*Math.sin(angle);

    // x += dx*0.01;
    // y += dy*0.01;


    // x *= 0.97
    // y *= 0.97

    // ctx.lineTo(x,y);

    ctx.stroke();

    if(x > width) x = 0;
    if(y > height) y = 0;
    if(y < 0) y = height;
    if(x < 0) x = width;
    

    requestAnimationFrame(animate)
  }

  animate()
}

