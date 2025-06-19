let colors;
let noiseGraphics;
let patternBuffer;
let time = 0;

function setup() {
  createCanvas(800, 800);
  
  colors = {
    primary: color(50, 50, 180)
  };
  
  noiseGraphics = createGraphics(width, height);
  createNoiseTexture();
  
  patternBuffer = createGraphics(width, height);
}

function draw() {
  background(245, 240, 220);
  
  patternBuffer.clear();
  patternBuffer.background(245, 240, 220);
  
  drawRipplePattern();
  
  image(patternBuffer, 0, 0);
  
  tint(255, 200);
  image(noiseGraphics, 0, 0);
  noTint();
  
  time += 0.01;
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

function createNoiseTexture() {
  noiseGraphics.loadPixels();
  for(let i = 0; i < noiseGraphics.pixels.length; i += 4) {
    let noiseValue = random(0, 255);
    noiseGraphics.pixels[i] = noiseGraphics.pixels[i + 1] = noiseGraphics.pixels[i + 2] = 255;
    noiseGraphics.pixels[i + 3] = noiseValue;
  }
  noiseGraphics.updatePixels();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}