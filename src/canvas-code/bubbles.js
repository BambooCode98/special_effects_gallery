'use strict';

export default function bubbles() {

  let canvas = document.querySelector(".canvas"),
      ctx = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      floaty = 0,
      floatx = 0,
      theta = 0;


  let ex = document.createElement('h1');
  ex.style.color = 'black';
  ex.style.position = 'absolute';
  canvas.append(ex);

  class Bubbles{ 
    constructor(x,y,r) {
      this.x = x;
      this.y = y;
      this.rand = r
    }

    update(x,y,r) {
      this.x = x;
      this.y = y;
      // this.rand = r;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.rand,0,Math.PI*2)
      ctx.stroke();
    }

  }


  const accel = new Accelerometer({ frequency: 60});
  
  const bubbles = [];
  
  
  accel.addEventListener('reading', () => {
    if(accel.x || accel.y || accel.z) {
      bubbles.push(new Bubbles(width*Math.random(),height*Math.random(),5*Math.random()))
      ex.textContent = `${accel.x}`
    }
  })
  
  
  function animate() {
    ctx.fillStyle = 'rgba(255,255,255,0.1)'
    ctx.fillRect(0,0,canvas.width,canvas.height);

    accel.start();


    theta += Math.PI/8;

    floaty += 0.5;
    floatx += Math.sin(theta);

    ctx.strokeStyle = 'lightblue';
    bubbles.forEach(bubble => {
      bubble.update(floatx,floaty)
      bubble.draw();
    })
    

    requestAnimationFrame(animate)
  }

  animate()

}