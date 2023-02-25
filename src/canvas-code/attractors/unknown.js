'use strict';


export default function unkown() {

  let wx = width,
      wy = height,
      z = 5,
      thetax = 0,
      thetay = 0,
      theta = Math.PI,
      angle = 0,
      px = 0,
      py = 0,
      mx = 0,
      my = 0,
      a = 0,
      b = 0,
      c = 0,
      iter = 0,
      scale = 0.01,
      canvas = document.querySelector(".canvas"),
      ctx = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      menu = document.querySelector('.container'),
      opacity = document.querySelector('.opacity'),
      totals = document.querySelector('.totals'),
      disappear = document.querySelector('.dissipate'),
      generate = document.querySelector('.generate'),
      hide = document.querySelector('.hide'),
      dValue = disappear.value,
      range = 0,
      h = document.querySelector('.hue'),
      s = document.querySelector('.sat'),
      l = document.querySelector('.light'),
      dark = document.querySelector('.night'),
      labels = document.getElementsByTagName('label'),
      darkOn = false,
      hideOn = false,
      p = [],
      twoTouches = [];




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
    if (e.targetTouches.length === 2) {
      canvas.requestFullscreen();
    } else if (e.targetTouches.length === 3) {
      document.exitFullscreen();
    }
  })

  canvas.addEventListener('mousemove', (e) => {
    p.push(new Particle(e.pageX,e.pageY));
    mx = e.pageX;
    my = e.pageY;
  })

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    p.push(new Particle(e.touches[0].clientX,e.touches[0].clientY))
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

  if(p.length >= 0) {
    let dis = function () {
      dValue = disappear.value;
      p.shift();
      setTimeout(dis, dValue)
    }
    setTimeout(dis, dValue)
  }


  class Particle{
    constructor(x,y) {
      this.x = x;
      this.y = y;
      this.vx;
      this.vy;
    }

    // direction(dx,dy) {
    //   this.vx = dx;
    //   this.vy = dy;
    // }

    update(dx,dy,dz) {
      ctx.strokeStyle = `hsl(${h.value},${s.value}%,${l.value}%)`


      // let mutatedx = Math.tan(dx*this.x);
      // let mutatedy = Math.tan(dy*this.y);
      // console.log(dz);
      let value = Math.atan2(this.y-dy*dz,this.x-dx*dz)
      
      this.vx = Math.cos(value*dx)*0.5
      this.vy = Math.sin(value*dy)*0.5
      
      // console.log(this.vx,this.vy);

      this.vx *= 0.97;
      this.vy *= 0.97;

      if(this.x > width) this.x = 0;
      if(this.y > height) this.y = 0;
      if(this.x < 0) this.x = width;
      if(this.y < 0) this.y = height;
    }

    draw() {
      ctx.moveTo(this.x,this.y)
      this.x += this.vx
      this.y += this.vy
      // console.log(this.x,this.y);
      ctx.lineTo(this.x,this.y)
    }
  }

 

  // for(let i = 0; i < 100; i++) {
  //   p.push(new Particle(Math.random()*width,Math.random()*height))
  // }
  // console.log();

  function animate() {
    if(darkOn === false) {
      ctx.fillStyle = `rgba(255,255,255,${opacity.value})`;
      ctx.strokeStyle = 'black';
      ctx.fillRect(0,0,canvas.width,canvas.height);
    } else if (darkOn === true) {
      ctx.fillStyle = `rgba(0,0,0,${opacity.value})`;
      ctx.strokeStyle = 'white';
      ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    // ctx.lineWidth = 2;
    // ctx.lineCap = 'round';
    totals.textContent = `Current Particles: ${p.length}`;
    
    ctx.beginPath();
    
    // theta+=0.03
    
    //these are attractors/repellors
    a = (width)*0.01;
    b = (height)*0.01;
    c = 2500*0.01;
    
    
    
    p.forEach(p => {
      p.update(a,b,c);
      p.draw();
    })

    
    // theta += 1*Math.PI/180;

    // x=width/2+((200+100*Math.cos(theta))*Math.sin(theta))
    // y=height/2+((250+1*Math.sin(theta))*Math.cos(theta)*Math.tan(theta))
    
    
    // ctx.lineTo(x,y);
    ctx.stroke();

    // ctx.fillRect(9,9,10,10)
    // if(x > width) x = 0;
    // if(y > height) y = 0;
    // if(x < 0) x = width;
    // if(y < 0) y = height;

    requestAnimationFrame(animate)
  }

  animate()

  





}