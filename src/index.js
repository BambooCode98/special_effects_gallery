import mainHTML from './html-components/main.html';
import flowHTML from './html-components/flow-particles.html';
import canvasHTML from './html-components/canvas-only.html';
import flowParticles from './canvas-code/flow_examples';
import explodeParticles from './canvas-code/explode.js';
import confetti from './canvas-code/confetti';


import hero from './images/special_effects_gallery_hero.png';
import './home.css';
import flowParts from './images/flow_parts.png';
import explosions from './images/explode.png';
import conf from './images/confetti.png';


const root = document.querySelector('#root');

let numArray = [];
let tiles = [];
let canvasCodePage = [];
let heightPos = window.innerHeight;
let footerPos;

let heroVideo;
let gallery;



let footer;

window.addEventListener('load', () => {

  if(window.location.pathname === '/index.html' || window.location.pathname === '/') {

    root.innerHTML = mainHTML + footer;
    let mainContent = document.querySelector(".mainArea");
    footer = document.createElement('footer');
  
    footer.classList.add('footer');
    const footerText = document.createElement('p');
    footerText.textContent = '\u00A9 2022 BambooCode98';
  
    heroVideo = document.querySelector(".confetti");
    gallery = document.querySelector('.galleryContainer');
  
    heroVideo.height = window.innerHeight/2;
    heroVideo.width = window.innerWidth;
  
    console.log(numArray);
    tiles.push(flow_particles,explode,confettiField, confettiField2)
    console.log(tiles);
    // flow_particles.createtile();
    // explode.createtile();
    // confettiField.createtile();
    // confettiField2.createtile();
    // console.log(flow_);
    tiles.forEach(tile => {
      tile.createtile();
    })
  
    mainContent.append(footer);
    footer.append(footerText);
  
    for(let i=0; i<numArray.length; i++) {
      footer.style.bottom = `-${numArray[i]*50}%`;
    
    }
  } else {
    root.innerHTML = canvasHTML;
    root.style.backgroundColor = 'white';
    tiles.forEach(tile => {
      if(window.location.pathname === tile.title) {

      }
        
    })
  }
})

class Tile {
  constructor(title, number, text, color, image, code, html) {
    this.title = title;
    this.text = text;
    this.number = number;
    this.color = color;
    this.image = image;
    this.code = code;
    this.html = html;
  }

  createtile() {
    let newTile = document.createElement('div');
    let title = document.createElement('h1');
    let desc = document.createElement('p');
    let image = document.createElement('img');
    newTile.classList.add(`card`);
    title.classList.add('title');
    desc.classList.add('desc');

    if(this.number === 1) newTile.style.marginTop = '15%';
    newTile.style.top = `${this.number*50}%`;
    newTile.style.backgroundImage = `url(${this.image})`;

    title.textContent = this.title;
    desc.textContent = this.text;

    // image.src = this.image;
    // image.classList.add('images')
    footer.style.bottom = `${this.number*50}`;

    newTile.append(title, desc,image);
    gallery.append(newTile);
    numArray.push(this.number);

    newTile.addEventListener('click',(e) => {
      window.location = `/${this.title}`;
      
    })
  }

  loadCanvasCode() {
    // explodeParticles()
    this.code();
  }
}




const flow_particles = new Tile('Flow Particles', 1, 'A particle field the user can make by hovering. The particles move toward certain points.','rgba(255,255,255,0.7)',flowParts,flowParticles)

// console.log(flow_particles.title);

const explode = new Tile('Mini-Explosions', 2, 'A simple program that lets a user create particles that spin and explode upon contact with the screen edges.','rgba(255,255,255,0.7)',explosions,explodeParticles)

const confettiField = new Tile('Confetti Field',3,'A field of particles that look like confetti. The center point of low speed follows the user.','null',conf, confetti)

const confettiField2 = new Tile('Confetti Field',4,'A field of particles that look like confetti. The center point of low speed follows the user.','null',conf, confetti)

