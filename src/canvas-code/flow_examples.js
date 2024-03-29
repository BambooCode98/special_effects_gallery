'use strict';

export default function practice1() {
  
  // let can = document.createElement('canvas');
  let canvas = document.querySelector(".canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    menu = document.querySelector('.container'),
    opacity = document.querySelector('.opacity'),
    totals = document.querySelector('.totals'),
    disappear = document.querySelector('.dissipate'),
    hide = document.querySelector('.hide'),
    generate = document.querySelector('.generate'),
    checkHue = document.querySelector('.checkboxh'),
    checkSat = document.querySelector('.checkboxs'),
    checkLight = document.querySelector('.checkboxl'),
    getLineWidth = document.querySelector('.width'),
    testBox = document.querySelector('.testBox'),
    dValue = disappear.value,
    changeHue = false,
    changeSat = false,
    changeLight = false,
    decl = false,
    decs = false,
    changingHue = 0,
    changingSat = 0,
    changingLight = 0,
    range = 0,
    h = document.querySelector('.hue'),
    s = document.querySelector('.sat'),
    l = document.querySelector('.light'),
    dark = document.querySelector('.night'),
    labels = document.getElementsByTagName('label'),
    darkOn = false,
    hideOn = false,
    twoTouches = [];

  
  
  // points that will be used to generate a field the lines will move around
  let ra = Math.random() * 8 - 4;
  let rb = Math.random() * 4 - 2;
  let rc = Math.random() * 4 - 2;
  let rd = Math.random() * 4 - 2;
  // let rs = 0;
  // let ma = width/2;
  // let mb = height/2;

  ctx.lineWidth = 0.5;
  let points = [];


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

  generate.addEventListener('click', () => {
    ra = Math.random() * 4 - 2;
    rb = Math.random() * 4 - 2;
    rc = Math.random() * 4 - 2;
    rd = Math.random() * 4 - 2;
  })

  dark.addEventListener('click', (e) => {
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
      opacity.value = 0.1;
    }
  })

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

  checkHue.addEventListener("click", e => {
    changeHue = e.target.checked;
    l.value = 50;
    s.value = 50;
  })

  checkSat.addEventListener("click", e => {
    changeSat = e.target.checked;
    l.value = 50;
    s.value = 50;
  })

  checkLight.addEventListener("click", e => {
    changeLight = e.target.checked;
    l.value = 50;
    s.value = 50;
  })
  //the setTimeout functions allow for the dissipation of the particles to appear seamless, does not work with setInterval
  if(points.length >= 0) {
    let dis = function () {
      dValue = disappear.value;
      points.shift();
      setTimeout(dis, dValue)
    }
    setTimeout(dis, dValue)
  }

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
        //range is the result of the noise function here, so would return base value
        //number in the sine is the frequency
        //amplitude is in front
        range = (Math.sin(f*50000));
        // let range = (Math.sin(y)*Math.cos(x));
        range+=1;
        range/=2;
        let scale = 0.01;
        a = (a-width/2) * scale;
        b = (b-height/2) * scale;
        let newX = Math.sin(ra*a) + rc*(Math.cos(ra*b));
        let newY = Math.sin(rb*b) + rd*(Math.cos(rb*a));
        let angv = 2*Math.PI*range;
        let angle = angv * Math.atan2(newX-a,newY-b);
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

  // ctx.globalCompositeOperation = "destination-out";
  // ctx.fillStyle = 'rgb(255,255,255)'
  // ctx.fillRect(0,0,canvas.width,canvas.height);
  // ctx.lineCap = "round";

  let lastCall;
  let frames;
  let delta;

  function animate() {

    if(lastCall !== lastCall) {
      lastCall = performance.now();
      frames=0;
      return;
    }
    if(changeHue) {
      changingHue+=1;
    }

    if(changeSat) {
      if(changingSat >= 100) decs = true;
      if(changingSat <= 0) decs = false;

      if(!decs) {
        changingSat+=0.1;
      } else {
        changingSat-=0.1;
      }

    }
    
    if(changeLight) {
      if(changingLight >=100) {
        decl = true;
      }

      if(changingLight <= 0) decl = false;
      // if(dec) {
      //   changingLight-=0.1;
      // }
      // console.log(dec, changingLight);
      if(!decl) {
        changingLight+=0.1;
      } else {
        changingLight-=0.1;
      }
    }

    if(darkOn === false) {
      ctx.fillStyle = `rgba(255,255,255,${opacity.value})`;
      ctx.strokeStyle = 'black';
      ctx.fillRect(0,0,canvas.width,canvas.height);
    } else if (darkOn === true) {
      ctx.fillStyle = `rgba(0,0,0,${opacity.value})`;
      ctx.strokeStyle = 'white';
      // ctx.globalCompositeOperation = "destination-out"
      ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    totals.textContent = `Current Particles: ${points.length}`;
    ctx.lineWidth = getLineWidth.value;

    // let h2 = changeHue ? changingHue : h.value;
    // let s2 = changeSat ? changingSat : s.value;
    // let l2 = changeLight ? changingLight : l.value;
    let h2, s2, l2;

    if(changeHue === true) {
      h2 = changingHue;
    } else {
      h2 = h.value;
    }

    if(changeSat === true) {
      s2 = changingSat;
    } else {
      s2 = s.value;
    }

    if(changeLight === true) {
      l2 = changingLight;
    } else {
      l2 = l.value;
    }
    ctx.strokeStyle = `hsl(${h2},${s2}%,${l2}%)`


    
    points.forEach(point => {
      
      // let glw = getLineWidth;
      
      let angle = noiset(point.x,point.y);
      
      // rs += angle * Math.random();
      point.vx += Math.cos(angle) * 0.1;
      point.vy += Math.sin(angle) * 0.1;
      
      point.vx *= 0.97;
      point.vy *= 0.97;
      
      
      ctx.beginPath();
      ctx.moveTo(point.x,point.y);
      // console.log(h);
      
      point.x += point.vx;
      point.y += point.vy;
      
      ctx.lineTo(point.x,point.y);
      ctx.stroke();


      if(point.x < 0) point.x = width;
      if(point.y < 0) point.y = height;
      if(point.x > width) point.x = 0;
      if(point.y > height) point.y = 0;

    })

    delta = (performance.now() - lastCall)/1000;
    lastCall = performance.now();
    frames = 1/delta;
    testBox.textContent = Math.round(frames);
    requestAnimationFrame(animate)
  }


  animate()
}