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
      switchItemPlace = false;

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
        this.x = Math.random()*width-5;
        this.y = Math.random()*height-5;
        switchItemPlace = false;
      }
    }

    draw() {
      ctx.fillStyle = 'green'
      ctx.fillRect(this.x,this.y,10,10)
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

    // addPart() {
      
    // }
    
    lastPosition(x,y) {
      this.parts.push({x: this.x, y: this.y})
      
      if(this.parts.length > this.scoreCount.length) {
        this.parts.shift();
      }


    }

    update(x,y) {
      this.x = x;
      this.y = y;
      if(this.x > item.x-5 && this.x < item.x+5 &&
        this.y > item.y-5 && this.y < item.y+5) {
          this.scoreCount.push(1)
          switchItemPlace = true;
      }

      totals.textContent = `Score: ${this.scoreCount.length}`;
    }

    draw() {
      ctx.fillRect(this.x-5,this.y-5,10,10)
      this.parts.forEach(part => {
        ctx.fillRect(part.x-5,part.y-5,10,10)
        
      })
    }
  }
  
  let snake1 = new Snake(mx,my,5)
  let item = new Item(width/2-5,height/2-5)
  
  function animate() {
    snake1.update(mx,my)
    item.update();
    ctx.clearRect(0,0,width,height);
    snake1.draw();
    item.draw();
    
    snake1.lastPosition(mx,my)

    ctx.fillStyle = 'black';

    requestAnimationFrame(animate)
  }


  animate()

}