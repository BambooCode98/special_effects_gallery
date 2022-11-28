'use strict';

export default function vortex() {
  
  // let can = document.createElement('canvas');
  let canvas = document.querySelector(".canvas"),
  // let canvas = can,
      ctx = canvas.getContext("2d"),
      width = window.innerWidth,
      height = window.innerHeight,
      opacity = document.querySelector(".opacity"),
      totals = document.querySelector('.totals'),
      disappear = document.querySelector('.dissipate'),
      dValue = disappear.value,
      generate = document.querySelector('.generate'),
      range = 0,
      random = Math.random()*16-8,
      gravity = 9.8,
      cx = width/2,
      cy = height/2,
      labels = document.getElementsByTagName('label');

  canvas.width = width;
  canvas.height = height;
  let circle = {
    x: cx,
    y: cy,
    mass: 20
  }
  // points that will be used to generate a field the lines will move around
  // let ra = Math.random() * 8 - 4;
  // let rb = Math.random() * 4 - 2;
  // let rc = Math.random() * 4 - 2;
  // let rd = Math.random() * 4 - 2;
  // let ma = width/2;
  // let mb = height/2;

  ctx.lineWidth = 0.5;
  let particles = [];
  totals.style.color = 'white';
  for(let i=0; i < labels.length; i++) {
    labels[i].style.color = 'white';
  }

  // generate.addEventListener('click', () => {
  //   ra = Math.random() * 4 - 2;
  //   rb = Math.random() * 4 - 2;
  //   rc = Math.random() * 4 - 2;
  //   rd = Math.random() * 4 - 2;
  // })

  //the setTimeout functions allow for the dissipation of the particles to appear seamless, does not work with setInterval
  let dis = function () {
  dValue = disappear.value;
  particles.shift();
  setTimeout(dis, dValue)
  }
  setTimeout(dis, dValue)

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    particles.push(new Particle(e.touches[0].clientX,e.touches[0].clientY))
  })

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    particles.push(new Particle(e.touches[0].clientX,e.touches[0].clientY))
  })

  canvas.addEventListener('mousemove', (e) => {
    particles.push(new Particle(e.clientX,e.clientY))
  })


  class Particle{
    constructor(x,y) {
      this.x = x,
      this.y = y,
      this.theta = 0,
      this.vx = 0.01,
      this.vy = 0.01,
      this.x2 = 0
      this.y2 = 0,
      this.radius = 5,
      this.mass = Math.random()*4-2
    }

    update() {
      let angle = Math.atan2(circle.y-this.y,circle.x-this.x)
      let r = Math.sqrt(((this.x-circle.x)*(this.x-circle.x))+((this.y-circle.y)*(this.y-circle.y)));
      //Fg is the gravity vector
      const Fg = ((circle.mass*this.mass)/r*r)
  
      // console.log(Fg);
      // this.theta += angle;
      this.vx += Math.cos(angle)
      this.vy += Math.sin(angle)
      // this.vx += Fg
      // this.vy += Fg
      this.vx += Fg*0.01*Math.random();
      this.vy += Fg*0.01*Math.random();
  
      this.vx *= 0.95;
      this.vy *= 0.95;

    }

    draw() {
      // this.vx += (gravity*this.mass*500)/(cx-this.x)*(cx-this.x);
      // this.vy += (gravity*this.mass*500)/(cy-this.y)*(cy-this.y);
      // console.log(this.vx*0.01);
      // console.log(this.vx);

      ctx.moveTo(this.x, this.y);
      this.x += this.vx;
      this.y += this.vy;
      // console.log(this.x,'0');
      // this.x = width/2 + 50 * Math.cos(this.theta);
      // this.y = height/2 + 50 * Math.sin(this.theta);
      // this.x*=this.vx;
      // this.y*=this.vy;
      // console.log(this.x, '1');
      
      ctx.lineTo(this.x,this.y);
    }

  }



  
  function animate() {
    ctx.fillStyle = `rgba(0,0,0,${opacity.value})`;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    totals.textContent = `Current Particles: ${particles.length}`;
    
    ctx.save();
    ctx.beginPath();
    ctx.arc(width/2,height/2,5,0, Math.PI*2)
    ctx.fillStyle = "black"
    ctx.shadowBlur = 5;
    ctx.shadowColor = "red";
    ctx.fill();
    ctx.restore();
    
    ctx.save();
    ctx.shadowColor='#a6a8ff';
    ctx.shadowBlur = 2;
    // ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.beginPath();
    particles.forEach(p => {
      p.update();
      p.draw();
      
      if(p.x < 0) p.x = width;
      if(p.y < 0) p.y = height;
      if(p.x > width) p.x = 0;
      if(p.y > height) p.y = 0;
    })
    ctx.stroke();
    ctx.restore();
    
    
    
    requestAnimationFrame(animate)
  }
  
  animate()
}