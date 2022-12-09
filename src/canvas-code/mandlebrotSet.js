'use strict';



export default function mandelSet() {
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
      labels = document.getElementsByTagName('label'),
      rdomain = {left: -2, right: 1},
      ry = 0,
      ix = -1,
      irange = {top: 1, bottom: -1},
      mx = 0,
      my = 0,
      n = 1,
      complex = 0;

    canvas.width = width;
    canvas.height = height;
  let loop = 1;

  canvas.addEventListener('click', e => {
    mx = e.clientX;
    my = e.clientY;

    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = 'white'
    // ctx.scale(2,2)
    draw(mx/5,my/5,0.1)
    // console.log(mx - canvas.offsetLeft);
    // console.log(mx*0.01);
  })

  generate.addEventListener('click', () => {
    my = 0;
    // ctx.scale(1,1);
    draw(5,5,0.1)
    mx = 0;
  })

  generate.textContent = "Reset"


  function draw(sx,sy,ls) {
    // console.log(Math.sqrt());
    for(let i=0; i< width; i++) {
      for(let j=0; j<height; j++) {
        //dividing by 2-3 here is best
        let scaleR = sx/width;
        let scaleI = sy/height;
        //subtracting on outside of equation only moves the image around
        // let realC = ((i-width/2)*scaleR)-(sx/i);
        let realC = ((i-width/2)*(scaleR));
        // let realC2 = realC/(i-sx);
        // console.log(realC/450);
        let imC = ((j - height/2)*(scaleI));
        // let imC2 = imC/(j-sy);
        //max number determines the detail of the iterations
        let max = 150;
        let x = 0 , y = 0;
        let loop = 0;

        while(x*x+y*y < 4 && loop<max) {
          let x2 = x*x - y*y + realC;
          y = 2*x*y + imC;
          x = x2;
          // x = Math.cos(x2)+0.01*Math.sin(y);
          loop++;
          // console.log(x2);
        }

        if(loop<max) {
          ctx.fillRect(i,j,1,1);
          ctx.fillStyle = `hsl(${loop/ls+360},${loop/ls+80}%,${loop+50}%)`
        } else {
          ctx.fillRect(i,j,10,100)
          ctx.fillStyle = 'black';
        }
      }
    }
    
  }
  
 

  
  //the larger the first two numbers get, the smaller and less zoomed in the image will be after getting drawn
  draw(5,5,0.1)
}