let colors;
let noiseGraphics;
let patternBuffer;
let stripeBuffer;
let time = 0;

let stripeHeight = 7;
let stripeGap = 2.5;

let useKeyframes = false; 
let keyframeTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  
  colors = {
    primary: color(255,255,255)
  };
  
  noiseGraphics = createGraphics(width, height);
  
  patternBuffer = createGraphics(width, height);
  
  stripeBuffer = createGraphics(width, height);
  createStripes();
}

function draw() {
  background(255);
  
  // patternBuffer.clear();
  // patternBuffer.background(245, 240, 220);

  drawOrbit();
  //image(patternBuffer,0,0);
  
  //drawRipplePattern();
  
  //image(patternBuffer, 0, 0);
  
  //image(stripeBuffer, 0, 0);

  if (!useKeyframes) {
    time += 0.02;
  } else {
    time = keyframeTime * TWO_PI;
  }
  
}
function drawOrbit() {
  let centerX = width / 2;
  let centerY = height / 2;
  let a = 100;
  let b = 60;
  let rotation = radians(-20);
  
  let planets = [
    { speed: 1.0, size: 30, color: [0, 0, 0] },
    { speed: 1.0, size: 30, color: [0, 0, 0] },
    { speed: 1.0, size: 30, color: [0, 0, 0] },
    { speed: 1.0, size: 30, color: [0, 0, 0] },
    { speed: 1.0, size: 30, color: [0, 0, 0] },
    { speed: 1.0, size: 30, color: [0, 0, 0] }
  ];
  
  push();
  translate(centerX, centerY);
  rotate(rotation);
  stroke(80);
  strokeWeight(1);
  noFill();
  ellipse(0, 0, a * 2, b * 2);
  pop();
  
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];
    let angle = time * planet.speed + (i * PI / 3);
    let localX = a * cos(angle);
    let localY = b * sin(angle);
    let x = centerX + localX * cos(rotation) - localY * sin(rotation);
    let y = centerY + localX * sin(rotation) + localY * cos(rotation);
    
    fill(planet.color[0], planet.color[1], planet.color[2]);
    noStroke();
    ellipse(x, y, planet.size, planet.size);
    
    stroke(planet.color[0], planet.color[1], planet.color[2], 100);
    strokeWeight(2);
    point(x, y);
  }
}


function drawRipplePattern() {
  let rippleCount = 12;
  let spread = 100;
  
  patternBuffer.noFill();
  patternBuffer.strokeWeight(2);
  
  let centerX = width * 0.6;
  let centerY = height * 0.5;
  
  for(let i = 0; i < rippleCount; i++) {
    let progress = ((time * 2 + i / rippleCount) % 1);
    let alpha = map(progress, 0, 1, 255, 50);
    let diameter = progress * spread * 4;
    
    patternBuffer.stroke(red(colors.primary), green(colors.primary), blue(colors.primary), alpha);
    
    patternBuffer.push();
    patternBuffer.translate(centerX, centerY);
    patternBuffer.rotate(-PI/4);
    patternBuffer.scale(1, 0.6);
    
    patternBuffer.beginShape();
    for(let angle = 0; angle < TWO_PI; angle += TWO_PI/50) {
      let r = diameter/2;
      let xoff = map(cos(angle), -1, 1, 0, 1);
      let yoff = map(sin(angle), -1, 1, 0, 1);
      let variation = map(noise(xoff, yoff, time), 0, 1, -20, 20);
      let x = cos(angle) * (r + variation);
      let y = sin(angle) * (r + variation);
      patternBuffer.curveVertex(x, y);
    }
    patternBuffer.endShape(CLOSE);
    
    patternBuffer.pop();
  }
}

function createStripes() {
  stripeBuffer.clear();
  stripeBuffer.fill(0);
  stripeBuffer.noStroke();
  
  let y = 0;
  while(y < height) {
    stripeBuffer.rect(0, y, width, stripeHeight);
    y += stripeHeight + stripeGap;
  }
}

function setKeyframe(t) {
  keyframeTime = constrain(t, 0, 1);
}

function playAnimation() {
  useKeyframes = false;
}

function stopAnimation() {
  useKeyframes = true;
}

function keyPressed() {
  if (key === 'p' || key === 'P') {
    playAnimation();
  }
  if (key === 's' || key === 'S') {
    stopAnimation();
  }
  if (key === '1') setKeyframe(0.0);
  if (key === '2') setKeyframe(0.125);
  if (key === '3') setKeyframe(0.25);
  if (key === '4') setKeyframe(0.375);
  
  if(key === 'l'){
    // saveCanvas();
    save("moire.svg");
  }
}