'use strict';

export default function perlinFlow() {
  
  // let can = document.createElement('canvas');
  let canvas = document.querySelector(".canvas"),
  // let canvas = can,
      ctx = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      opacity = document.querySelector(".opacity"),
      totals = document.querySelector('.totals'),
      disappear = document.querySelector('.dissipate'),
      dValue = disappear.value,
      generate = document.querySelector('.generate'),
      range = 0,
      twoTouches = [];

  
  
  // points that will be used to generate a field the lines will move around
  let ra = Math.random() * 4 - 2;
  let rb = Math.random() * 4 - 2;
  let rc = Math.random() * 4 - 2;
  let rd = Math.random() * 4 - 2;
  let rs = 0;

  ctx.lineWidth = 0.5;
  let points = [];

  const angleArray = [1,5,50,500,300,33,45,77,234,123,89,5,52,23,78,54,23,576,85,34,67,68,45,45,683,83,6,46,768,45,2,35,326,87,4]

  generate.addEventListener('click', () => {
    ra = Math.random() * 4 - 2;
    rb = Math.random() * 4 - 2;
    rc = Math.random() * 4 - 2;
    rd = Math.random() * 4 - 2;
  })

  //the setTimeout functions allow for the dissipation of the particles to appear seamless, does not work with setInterval
  let dis = function () {
  dValue = disappear.value;
  points.shift();
  setTimeout(dis, dValue)
  }
  setTimeout(dis, dValue)

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
    console.log(e.touches);
    twoTouches.push(e.touches)
    if(twoTouches.length === 2) {
      canvas.requestFullscreen();
    } else if (twoTouches.length === 4) {
      document.exitFullscreen();

    }
  })

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    points.push({
    x: e.touches[0].clientX,
    y: e.touches[0].clientY, 
    vx: 0,
    vy: 0
    })
  })

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    points.push({
    x: e.touches[0].clientX,
    y: e.touches[0].clientY, 
    vx: 0,
    vy: 0
    })
  })

  canvas.addEventListener('mousemove', (e) => {
    points.push({
    x: e.pageX,
    y: e.pageY, 
    vx: 0,
    vy: 0
    })
  })

  // console.log(points);

  function fade(n) {
    return ((6*n-15)*n+10)*n*n*n
  }

  function lerp(l1,l2,d) {
    return l1 + d*(l2-l1)
  }

  function smoothstep(d) {
    let l1 = d * d;
    let l2 = 1.0 - (1.0-d) * (1.0-d)
    return lerp(l1,l2,d)
  }

  function noiset(a,b) {
    for(let x=0; x<width;x+=8) {
      for(let y=0; y<height;y+=8) {
        //the y/x times a number is how the pattern is scaled
        let [x2,y2]=[x-a,y-b];
        let mag1 = Math.sqrt(x*x+y*y)
        let mag2 = Math.sqrt(x2*x2+y2*y2)
        let dot = mag1*mag2*Math.cos(mag1-mag2)
        let ux = fade(x);
        let uy = fade(y);
        let f = smoothstep(dot)
        //range is the result of the noise funtion here, so would return base value
        //number in the sine is the frequency
        //amplitude is in front
        range = (Math.sin(f*50000));
        // let range = (Math.sin(y)*Math.cos(x));
        range+=1;
        range/=2;
        let scale = 0.01;
        a = (a-width/2) * scale;
        b = (b-width/2) * scale;
        let newX = Math.sin(ra*a) + rc*(Math.cos(ra*b));
        let newY = Math.sin(rb*b) + rd*(Math.cos(rb*a));
        let angle = Math.atan2(newX-a,newY-b);
        // let c1 = Math.round(Math.random()*range*255);
        // let c2 = Math.round(Math.random()*range*255);
        // let c3 = Math.round(Math.random()*range*255);
        // colorgrid.push({
        //   x: x,
        //   y: y,
        //   color: `rgb(${c1},${c2},${c3})`,
        //   width: 2,
        // })
        return angle;
      }
    }
  }

  function animate() {
    ctx.fillStyle = `rgba(255,255,255,${opacity.value})`;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    totals.textContent = `Current Particles: ${points.length}`;
   
    points.forEach(point => {
      
      
      //clifford attractors
      // let x2 = Math.sin(a*sy) + c*(Math.cos(a*sx));
      // let y2 = Math.sin(b*sx) + d*(Math.cos(b*sy));
      // let angle = Math.atan2(x2-sx,y2-sy);
      // let angle = 0;

      let angle = noiset(point.x,point.y);
      let angleChange = angleArray[Math.floor(Math.random()*angleArray.length)] * 0.1;


      rs += angle * Math.random() * angleChange;
      point.vx += Math.cos(rs) * 0.1 * Math.random();
      point.vy += Math.sin(rs) * 0.1 * Math.random();
  
      point.vx *= 0.97;
      point.vy *= 0.97;

  
      ctx.beginPath();
      ctx.moveTo(point.x,point.y);

      // console.log(point.x,point.y);
      point.x += point.vx;
      point.y += point.vy;
      
      // console.log(point.x,point.y);
      
      ctx.lineTo(point.x,point.y);
      ctx.stroke();


      if(point.x < 0) point.x = width;
      if(point.y < 0) point.y = height;
      if(point.x > width) point.x = 0;
      if(point.y > height) point.y = 0;

    })

    requestAnimationFrame(animate)
  }



  animate()
}