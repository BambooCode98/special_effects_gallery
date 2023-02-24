'use strict';

export default function shapes() {
  ctx.beginPath();

  ctx.moveTo(x,y);

  d = 75;
  angle += Math.PI/2;

  dx = d*Math.cos(angle);
  dy = d*Math.sin(angle);
  x += dx;
  y += dy;

  // console.log(x,y);

  ctx.lineTo(x,y);

  ctx.stroke();
}