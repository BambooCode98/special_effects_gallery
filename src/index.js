import hero from './images/special_effects_gallery_hero.png';
import flowParticles from './flow_field_examples/flow_examples';
import './home.css';
import flowParts from './images/flow_parts.png';
import explosions from './images/explode.png';
import conf from './images/confetti.png';

const heroVideo = document.querySelector(".confetti");
const gallery = document.querySelector('.galleryContainer');
const root = document.querySelector('.mainArea');

let numArray = [];
let heightPos = window.innerHeight;
let footerPos;



const footer = document.createElement('footer');
footer.classList.add('footer');
const footerText = document.createElement('p');
footerText.textContent = '\u00A9 2022 BambooCode98';

root.append(footer);
footer.append(footerText);

class Tile {
  constructor(title, number, text, color, image, code) {
    this.title = title;
    this.text = text;
    this.number = number;
    this.color = color;
    this.image = image;
    this.code = code;
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
    newTile.style.height = '250px';
    newTile.style.width = '250px';
    newTile.style.top = `${this.number*50}%`;
    newTile.style.position = 'absolute';
    // newTile.style.border = `white 1px solid`;
    // newTile.style.borderRadius = `5px`;
    newTile.style.color = 'black';
    newTile.style.backgroundImage = `url(${this.image})`;
    newTile.style.backgroundSize = 'cover';
    newTile.style.backgroundRepeat = 'no-repeat';
    // newTile.style.paddingLeft = '1%';
    newTile.style.overflow = 'hidden';

    title.textContent = this.title;
    desc.textContent = this.text;

    // image.src = this.image;
    // image.classList.add('images')

    newTile.append(title, desc,image);
    gallery.append(newTile);
    numArray.push(this.number);

    newTile.addEventListener('click',(e) => {

    })
  }

}


heroVideo.height = window.innerHeight/2;
heroVideo.width = window.innerWidth;

const flow_particles = new Tile('Flow Particles', 1, 'A particle field the user can make by hovering. The particles move toward certain points.','rgba(255,255,255,0.7)',flowParts)

const explode = new Tile('Mini-Explosions', 2, 'A simple program that lets a user create particles that spin and explode upon contact with the screen edges.','rgba(255,255,255,0.7)',explosions)

const confettiField = new Tile('Confetti Field',3,'A field of particles that look like confetti. The center point of low speed follows the user.','null',conf)

flow_particles.createtile();
explode.createtile();
confettiField.createtile();


for(let i=0; i<numArray.length; i++) {
  footer.style.bottom = `-${numArray[i]*50}%`;

}