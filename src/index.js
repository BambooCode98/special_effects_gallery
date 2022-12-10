import mainHTML from './html-components/main.html';
import flowHTML from './html-components/flow-particles.html';
import flowHTML2 from './html-components/flow-particles2.html';
import canvasHTML from './html-components/canvas-only.html';
import titleHTML from './html-components/title-only.html';
import flowParticles from './canvas-code/flow_examples';
import explodeParticles from './canvas-code/explode.js';
import confetti from './canvas-code/confetti';
import perlinFlow from './canvas-code/perlin-flow';
import blackhole from './canvas-code/blackhole';
import vortex from './canvas-code/vortex';
import mandelSet from './canvas-code/mandlebrotSet';


import hero from './images/special_effects_gallery_hero.png';
import './home.css';
import flowParts from './images/flow_parts.png';
import explosions from './images/explode.png';
import conf from './images/confetti.png';
import perlinFlowField from './images/perlin_flow_field.png';
import bh from './images/blackhole.png'
import mandelbrot from './images/MandelbrotSet.png'
import snake from './canvas-code/snakeGame';


const root = document.querySelector('#root');

let numArray = [];
let tiles = [];
// let h = tiles[0];

// let canvasCodePage = [];
// let heightPos = window.innerHeight;
// let footerPos;

let heroVideo;
let gallery;


let footer;

window.addEventListener('load', () => {

  root.innerHTML = mainHTML;
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

  // footer.style.marginTop = '5%'

  // if(width < 760) {
  //   for(let i=0; i<numArray.length; i++) {
  //     footer.style.bottom = `-${numArray[i]*25.5}%`;
    
  //   }
  // } else if(width >= 760) {
  //   for(let i=0; i<numArray.length; i++) {
  //     footer.style.bottom = `-${numArray[i]*5}%`;
    
  //   }
  // }
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
    newTile.classList.add(`card${this.number}`);
    title.classList.add('title');
    desc.classList.add('desc');

    // if(this.number === 1) newTile.style.marginTop = '15%';
    // newTile.style.top = `${this.number*50}%`;
    newTile.style.width = `250px`;
    newTile.style.height = `250px`;
    newTile.style.backgroundSize = 'cover';
    newTile.style.backgroundRepeat = 'no-repeat';
    newTile.style.cursor = 'pointer';
    newTile.style.overflow = 'hidden';
    newTile.style.boxShadow = '2px 1px 10px white';
    newTile.style.borderRadius = '2px';

    newTile.style.backgroundImage = `url(${this.image})`;

    title.textContent = this.title;
    desc.textContent = this.text;

    // image.src = this.image;
    // image.classList.add('images')
    // footer.style.bottom = `${this.number*50}`;

    newTile.append(title, desc,image);
    gallery.append(newTile);
    numArray.push(this.number);

    newTile.addEventListener('click',(e) => {
      
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




const flow_particles = new Tile('Flow Particles', 1, 'A particle field the user can make by hovering. The particles move toward certain points.','',flowParts,flowParticles,flowHTML2)

const explode = new Tile('Mini-Explosions', 2, 'A simple program that lets a user create particles that spin and explode upon contact with the screen edges.','rgba(255,255,255,0.7)',explosions,explodeParticles,canvasHTML)

const confettiField = new Tile('Confetti Field',3,'A field of particles that look like confetti. The center point of low speed follows the user.','null',conf, confetti, canvasHTML)

const PerlinFlow = new Tile('Perlin Flow', 4, 'A field similar to the particle flow, but with perlin noise applied to it.', null, perlinFlowField, perlinFlow, flowHTML)

const Blackhole = new Tile('Blackhole', 5, "A simple program that emulates a blackhole. The user can create particles that will flow into the middle.", "no color", bh, blackhole, flowHTML)

const Vortex = new Tile('Vortex', 6, "A program that emulates a cylone.", "", "", vortex, flowHTML)

const MandelbrotSet = new Tile("Mandelbrot Set", 7, "The generation of the Mandelbrot Set. Currently has different transformations applied to it.", "", mandelbrot, mandelSet, flowHTML)

const Snake = new Tile("Snake Game", 8, "The snake game with dfferent controls.", "", mandelbrot, snake, titleHTML)