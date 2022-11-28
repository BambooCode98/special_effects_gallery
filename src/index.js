import mainHTML from './html-components/main.html';
import flowHTML from './html-components/flow-particles.html';
import flowHTML2 from './html-components/flow-particles2.html';
import canvasHTML from './html-components/canvas-only.html';
import flowParticles from './canvas-code/flow_examples';
import explodeParticles from './canvas-code/explode.js';
import confetti from './canvas-code/confetti';
import perlinFlow from './canvas-code/perlin-flow';
import vortex from './canvas-code/vortex';


import hero from './images/special_effects_gallery_hero.png';
import './home.css';
import flowParts from './images/flow_parts.png';
import explosions from './images/explode.png';
import conf from './images/confetti.png';
import perlinFlowField from './images/perlin_flow_field.png';
import bh from './images/blackhole.png'


const root = document.querySelector('#root');

let numArray = [];
let tiles = [];
let h = tiles[0];

let canvasCodePage = [];
let heightPos = window.innerHeight;
let footerPos;

let heroVideo;
let gallery;

console.log(tiles);

let footer;

window.addEventListener('load', () => {

  // if(window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname === '/special_effects_gallery/') {

  // } else {
  //   // console.log(tiles);
  //   root.innerHTML = h;
  //   root.style.backgroundColor = 'white';
    
  // }
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

  tiles.forEach(tile => {
    tile.createtile();
  })
  

  mainContent.append(footer);
  footer.append(footerText);

  for(let i=0; i<numArray.length; i++) {
    footer.style.bottom = `-${numArray[i]*50}%`;
  
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
    tiles.push(this);
  }

  createtile() {
    let newTile = document.createElement('div');
    let title = document.createElement('h1');
    let desc = document.createElement('p');
    let image = document.createElement('img');
    newTile.classList.add(`card`);
    title.classList.add('title');
    desc.classList.add('desc');

    // if(this.number === 1) newTile.style.marginTop = '15%';
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
      // window.location.pathname = `/${this.title}`;
      
      root.innerHTML = this.html;
      root.style.backgroundColor = 'white';
      this.code();

      let homeButton = document.createElement('button');
      homeButton.classList.add('goHome');
      homeButton.textContent = 'Return To Gallery';
      root.append(homeButton);
      homeButton.addEventListener('click', () => {
        // root.innerHTML = mainHTML + footer;
        location.reload();
      })
    })
  }

  giveHtml() {
    return this.html;
  }

  loadCanvasCode() {
    // explodeParticles()
    this.code();
  }
}




const flow_particles = new Tile('Flow Particles', 1, 'A particle field the user can make by hovering. The particles move toward certain points.','rgba(255,255,255,0.7)',flowParts,flowParticles,flowHTML2)

const explode = new Tile('Mini-Explosions', 2, 'A simple program that lets a user create particles that spin and explode upon contact with the screen edges.','rgba(255,255,255,0.7)',explosions,explodeParticles,canvasHTML)

const confettiField = new Tile('Confetti Field',3,'A field of particles that look like confetti. The center point of low speed follows the user.','null',conf, confetti, canvasHTML)

const PerlinFlow = new Tile('Perlin Flow', 4, 'A field similar to the particle flow, but with perlin noise applied to it.', null, perlinFlowField, perlinFlow, flowHTML)

const Vortex = new Tile('Blackhole', 5, "A simple program that emulates a blackhole. The user can create particles that will flow into the middle.", "no color", bh, vortex, flowHTML)