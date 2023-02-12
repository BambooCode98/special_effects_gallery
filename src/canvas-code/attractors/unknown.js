'use strict';

import vortex from "../vortex";


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
      rx = 0,
      ry = 0,
      a = 0,
      b = 0,
      c = 0,
      iter = 0,
      scale = 0.01,
      canvas = document.querySelector(".canvas"),
      ctx = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;


  canvas.addEventListener('mousemove', (e) => {
    p.push(new Particle(e.pageX,e.pageY))
  })

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    p.push(new Particle(e.touches[0].clientX,e.touches[0].clientY))
  })

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

  let part1 = new Particle(width/2,height/3);
  let part2 = new Particle(width/2.5,height/3.5);

  let p = [];
  for(let i = 0; i < 100; i++) {
    p.push(new Particle(Math.random()*width,Math.random()*height))
  }
  // console.log();

  function animate() {
    // ctx.fillStyle = 'rgba(255,255,255,0.1)'
    // ctx.fillRect(0,0,canvas.width,canvas.height);
    // ctx.lineWidth = 2;
    // ctx.lineCap = 'round';

    
    ctx.beginPath();
    
    // theta+=0.03
    
    //these are attractors/repellors
    a = (width)*0.01;
    b = (height)*0.01;
    c = 2500*0.01;
    
    // console.log(a,b);
    // console.log(part1.x);
    
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