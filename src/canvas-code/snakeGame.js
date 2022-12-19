'use strict';

export default  function snake() {
  let canvas = document.querySelector(".canvas"),
      ctx = canvas.getContext("2d"),
      width = window.innerWidth,
      height = window.innerHeight,
      opacity = document.querySelector(".opacity"),
      totals = document.querySelector('.totals2'),
      generate = document.querySelector('.generate'),
      labels = document.getElementsByTagName('label'),
      mx = 0,
      my = 0,
      switchItemPlace = false,
      totalScore = 0,
      hx = 0,
      hy = 0,
      range = 0;

  totals.style.color = 'black';
  totals.style.position = 'absolute';
  
  canvas.width = width;
  canvas.height = height;

  canvas.addEventListener('mousemove', e => {
    mx = e.pageX;
    my = e.pageY;

  })

  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    mx = e.touches[0].pageX;
    my = e.touches[0].pageY;

  })

  class Item {
    constructor(x,y) {
      this.x = x,
      this.y = y
    }

    update() {
      if(switchItemPlace) {
        this.x = Math.random()*(width-10);
        this.y = Math.random()*(height-10);
        switchItemPlace = false;
      }
    }

    draw() {
      ctx.fillStyle = 'green'
      ctx.fillRect(this.x,this.y,10,10)
    }
  }

  class Enemy{
    constructor(x,y) {
      this.x = x,
      this.y = y
    }

    update(x,y) {

      hx = (this.x-x)*(this.x-x)
      hy = (this.y-y)*(this.y-y)
      // console.log(hx);
      this.x += hx*0.00001;
      this.y += hy*0.00001;

      if(this.x > width) this.x = 0;
      if(this.y > height) this.y = 0;
      if(this.x < 0) this.x = width;
      if(this.y < 0) this.y = height;
    }

    spawn() {
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.arc(this.x,this.y,10,0,Math.PI*2);
      ctx.fill();
    }
  }
 
  
  class Snake {
    constructor(x,y,score) {
      this.x = x, 
      this.y = y,
      this.score = score,
      this.parts = [],
      this.scoreCount = [],
      this.max = 2
    }
    
    lastPosition() {
      this.parts.push({x: this.x, y: this.y})
      
      if(this.parts.length > this.scoreCount.length) {
        this.parts.shift();
      }


    }

    update(x,y) {
      this.x = x;
      this.y = y;
      if(this.x > item.x-7 && this.x < item.x+7 &&
        this.y > item.y-7 && this.y < item.y+7) {
          this.scoreCount.push(1)
          switchItemPlace = true;
      }
      totalScore = this.scoreCount.length;
      totals.textContent = `Score: ${totalScore}`;
    }

    draw() {
      ctx.fillRect(this.x,this.y,20,20)
      this.parts.forEach(part => {
        ctx.fillRect(part.x,part.y,10,10)
        
      })
    }
  }
  
  let snake1 = new Snake(mx,my,5)
  let item = new Item(width/2-5,height/2-5)
  // let enemy = new Enemy(10,10)

  // function lerp(l1,l2,d) {
  //   return l1 + d*(l2-l1)
  // }

  // function smoothstep(d) {
  //   let l1 = d * d;
  //   let l2 = 1.0 - (1.0-d) * (1.0-d)
  //   return lerp(l1,l2,d)
  // }

  // function noise(a,b) {
  //   for(let x=0; x<width;x+=8) {
  //     for(let y=0; y<height;y+=8) {
  //       //the y/x times a number is how the pattern is scaled
  //       let [x2,y2]=[x-a,y-b];
  //       let mag1 = Math.sqrt(x*x+y*y)
  //       let mag2 = Math.sqrt(x2*x2+y2*y2)
  //       let dot = mag1*mag2*Math.cos(mag1-mag2)
  //       // let ux = fade(x);
  //       // let uy = fade(y);
  //       let f = smoothstep(dot)
  //       //range is the result of the noise funtion here, so would return base value
  //       //number in the sine is the frequency
  //       //amplitude is in front
  //       range = (Math.sin(f*50000));
  //       // let range = (Math.sin(y)*Math.cos(x));
  //       range+=1;
  //       range/=2;
  //       return range;
  //     }
  //   }
  // }

  
  function animate() {
    // let num = noise(mx,my)
    // console.log(num);

    snake1.update(mx,my)
    item.update();
    // enemy.update(Math.random()*num*mx,Math.random()*num*my);
    ctx.clearRect(0,0,width,height);
    snake1.draw();
    item.draw();
   
    // enemy.spawn()
    
    snake1.lastPosition(mx,my)

    ctx.fillStyle = 'black';

    requestAnimationFrame(animate)
  }


  animate()

}