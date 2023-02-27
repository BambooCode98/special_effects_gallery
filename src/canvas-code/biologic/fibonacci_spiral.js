'use strict';

export default function f_spiral() {
  let canvas = document.querySelector(".canvas"),
      ctx = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      h = document.querySelector('.hue'),
      s = document.querySelector('.sat'),
      l = document.querySelector('.light'),
      dark = document.querySelector('.night'),
      labels = document.getElementsByTagName('label'),
      darkOn = false,
      hideOn = false,
      menu = document.querySelector('.container'),
      opacity = document.querySelector('.opacity'),
      totals = document.querySelector('.totals'),
      disappear = document.querySelector('.dissipate'),
      generate = document.querySelector('.generate'),
      hide = document.querySelector('.hide'),
      dValue = disappear.value,
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
      parts = [];


  // function get_fibonacci_numbers(a,b) {
  //   numbers.push(a);
  //   [a,b] = [b, a+b]
  //   if(a >= 10000) {
  //     return
  //   }
  //   get_fibonacci_numbers(a,b)
  // }
  // get_fibonacci_numbers(a,b)

  window.addEventListener('fullscreenchange', (e) => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  })


  //desktop fullscreen
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if(key === 'f') {
      canvas.requestFullscreen();
    } else if(key === 'e') {
      document.exitFullscreen();
    }
  })

  //mobile fullscreen
  document.addEventListener('touchstart', (e) => {
    // console.log(e.targetTouches.length);
    if (e.targetTouches.length === 2) {
      canvas.requestFullscreen();
    } else if (e.targetTouches.length === 3) {
      document.exitFullscreen();
    }
  })

  // document.addEventListener('mousemove', (e) => {
  //   mx = e.pageX;
  //   my = e.pageY;
  //   parts.push(new Particle(mx,my));
  // })

  document.addEventListener('mousedown', (e) => {
    mx = e.pageX;
    my = e.pageY;
    parts.push(new Particle(mx,my));
  })

  document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    mx = e.touches[0].clientX;
    my = e.touches[0].clientY;
    parts.push(new Particle(mx,my));
  })

  document.addEventListener('touchstart', (e) => {
    e.preventDefault();
    mx = e.touches[0].clientX;
    my = e.touches[0].clientY;
    parts.push(new Particle(mx,my));
  })

  //dark mode
  dark.addEventListener('click', () => {
    if(darkOn === false) {
      canvas.style.backgroundColor = 'black';
      for(let i=0; i < labels.length; i++) {
        labels[i].style.color = 'white';
      }
      darkOn = true;
      ctx.strokeStyle = 'white';
      totals.style.color = 'white';
      l.value = 100;
    } else if (darkOn === true) {
      canvas.style.backgroundColor = 'white';
      for(let i=0; i < labels.length; i++) {
        labels[i].style.color = 'black';
      }
      darkOn = false;
      ctx.strokeStyle = 'black';
      totals.style.color = 'black';
      l.value = 0;
    }
  })

  //hide the menu
  hide.addEventListener('click', () => {
    if(hideOn === false) {
      hideOn = true;
      menu.style.display = "none";
      hide.textContent = "Open UI";
    } else if (hideOn = true) {
      hideOn = false;
      menu.style.display = "flex";
      hide.textContent = "Hide UI";
    }
  })
  
  //set the particle disappearance rate
  if(parts.length >= 0) {
    let dis = function () {
      dValue = disappear.value;
      parts.shift();
      setTimeout(dis, dValue)
    }
    setTimeout(dis, dValue)
  }


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
      ctx.strokeStyle = `hsl(${h.value},${s.value}%,${l.value}%)`

      //increasing the sides variable causes a spiral motion
      //multiply pi by sides for a double loop
      //divide pi by sides for fibonacci spiral/logarithmic spiral
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
    if(darkOn === false) {
      ctx.fillStyle = `rgba(255,255,255,${opacity.value})`;
      ctx.strokeStyle = 'black';
      ctx.fillRect(0,0,canvas.width,canvas.height);
    } else if (darkOn === true) {
      // console.log(ctx.fillStyle);
      // ctx.fillStyle = `rgba(0,0,0,${0.9})`;
      // console.log(ctx.fillStyle);
      ctx.fillStyle = `rgba(0,0,0,${opacity.value})`;
      // opacity.value = 0.01;
      // console.log(ctx.fillStyle);
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle = 'white';
    }
    totals.textContent = `Current Particles: ${parts.length}`;

    ctx.beginPath();

    parts.forEach(part => {
      part.update();
      part.draw();
    })

    ctx.stroke();
    

    requestAnimationFrame(animate)
  }

  animate()
}

