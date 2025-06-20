let time = 0;
let useKeyframes = false; 
let keyframeTime = 0;

let letterPaths = [];
let dotSize = 8;
let spacing = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 각 글자의 동그라미 패스 생성
  createLetterPaths();
}

function draw() {
  background(255);
  
  // 4개 레이어의 흐르는 타이포그래피
  drawFlowingText(0.0, 0);    // 1번
  drawFlowingText(0.125, 1);  // 2번
  drawFlowingText(0.25, 2);   // 3번
  drawFlowingText(0.375, 3);  // 4번

  if (!useKeyframes) {
    time += 0.02;
  } else {
    time = keyframeTime * TWO_PI;
  }
}

function createLetterPaths() {
  let startX = width / 2 - 300;
  let startY = height / 2;
  let letterWidth = 60;
  
  let text = "yewon.calli";
  
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let x = startX + i * letterWidth;
    let points = createLetterPoints(char, x, startY);
    letterPaths.push({
      char: char,
      points: points,
      index: i
    });
  }
}

function createLetterPoints(char, centerX, centerY) {
  let points = [];
  
  switch(char) {
    case 'y':
      // y 모양: 두 대각선 + 아래 세로선
      for (let i = 0; i < 8; i++) {
        points.push({x: centerX - 20 + i * 2.5, y: centerY - 30 + i * 4}); // 왼쪽 대각선
        points.push({x: centerX + 20 - i * 2.5, y: centerY - 30 + i * 4}); // 오른쪽 대각선
      }
      for (let i = 0; i < 6; i++) {
        points.push({x: centerX, y: centerY + i * 5}); // 아래 세로선
      }
      break;
      
    case 'e':
      // e 모양: 세로선 + 가로선들
      for (let i = 0; i < 10; i++) {
        points.push({x: centerX - 15, y: centerY - 25 + i * 5}); // 왼쪽 세로선
      }
      for (let i = 0; i < 6; i++) {
        points.push({x: centerX - 15 + i * 4, y: centerY - 25}); // 위 가로선
        points.push({x: centerX - 15 + i * 4, y: centerY}); // 중간 가로선
        points.push({x: centerX - 15 + i * 4, y: centerY + 25}); // 아래 가로선
      }
      break;
      
    case 'w':
      // w 모양: 네 개의 대각선
      for (let i = 0; i < 8; i++) {
        points.push({x: centerX - 25, y: centerY - 25 + i * 6}); // 첫 번째 선
        points.push({x: centerX - 8, y: centerY + 15 - i * 3}); // 두 번째 선
        points.push({x: centerX + 8, y: centerY + 15 - i * 3}); // 세 번째 선
        points.push({x: centerX + 25, y: centerY - 25 + i * 6}); // 네 번째 선
      }
      break;
      
    case 'o':
      // o 모양: 원
      for (let angle = 0; angle < TWO_PI; angle += 0.4) {
        points.push({
          x: centerX + cos(angle) * 18,
          y: centerY + sin(angle) * 18
        });
      }
      break;
      
    case 'n':
      // n 모양: 두 세로선 + 대각선
      for (let i = 0; i < 10; i++) {
        points.push({x: centerX - 15, y: centerY - 25 + i * 5}); // 왼쪽 세로선
        points.push({x: centerX + 15, y: centerY - 25 + i * 5}); // 오른쪽 세로선
        if (i < 8) {
          points.push({x: centerX - 15 + i * 3.75, y: centerY - 25 + i * 3}); // 대각선
        }
      }
      break;
      
    case '.':
      // 점
      points.push({x: centerX, y: centerY + 20});
      break;
      
    case 'c':
      // c 모양: 반원
      for (let angle = PI * 0.2; angle < PI * 1.8; angle += 0.3) {
        points.push({
          x: centerX + cos(angle) * 18,
          y: centerY + sin(angle) * 18
        });
      }
      break;
      
    case 'a':
      // a 모양: 삼각형 + 가로선
      for (let i = 0; i < 8; i++) {
        points.push({x: centerX - 15 + i * 1.875, y: centerY - 25 + i * 6}); // 왼쪽 대각선
        points.push({x: centerX + 15 - i * 1.875, y: centerY - 25 + i * 6}); // 오른쪽 대각선
      }
      for (let i = 0; i < 6; i++) {
        points.push({x: centerX - 10 + i * 3.33, y: centerY}); // 가로선
      }
      break;
      
    case 'l':
      // l 모양: 세로선
      for (let i = 0; i < 12; i++) {
        points.push({x: centerX, y: centerY - 30 + i * 5});
      }
      break;
      
    case 'i':
      // i 모양: 세로선 + 점
      for (let i = 0; i < 10; i++) {
        points.push({x: centerX, y: centerY - 15 + i * 3});
      }
      points.push({x: centerX, y: centerY - 25}); // 위 점
      break;
  }
  
  return points;
}

function drawFlowingText(keyframe, layerIndex) {
  // 레이어별 설정
  let speeds = [1.0, 1.4, 0.7, 1.8];
  let sizes = [6, 4, 8, 5];
  let offsets = [0, 0.3, 0.6, 0.9];
  
  let speed = speeds[layerIndex];
  let currentDotSize = sizes[layerIndex];
  let timeOffset = offsets[layerIndex];
  
  fill(0, 150);
  noStroke();
  
  // 각 글자별로 처리
  for (let letter of letterPaths) {
    let points = letter.points;
    
    // 각 포인트에서 흐르는 동그라미들
    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      let nextPoint = points[(i + 1) % points.length]; // 다음 점 (순환)
      
      // 현재 점에서 다음 점으로의 방향과 거리
      let dx = nextPoint.x - point.x;
      let dy = nextPoint.y - point.y;
      let distance = sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        // 정규화된 방향 벡터
        dx /= distance;
        dy /= distance;
        
        // 이 선분을 따라 움직이는 여러 개의 동그라미들
        let dotsOnSegment = max(1, floor(distance / 10));
        
        for (let d = 0; d < dotsOnSegment; d++) {
          // 시간에 따른 진행도
          let progress = (time * speed + timeOffset + i * 0.1 + d * 0.2) % 1;
          
          // 선분 상의 위치
          let segmentProgress = (d + progress) / dotsOnSegment;
          if (segmentProgress > 1) segmentProgress -= 1;
          
          let x = point.x + dx * distance * segmentProgress;
          let y = point.y + dy * distance * segmentProgress;
          
          // 약간의 웨이브 효과
          let waveOffset = sin(time * 3 + i + d + layerIndex) * 2;
          
          ellipse(x + waveOffset, y, currentDotSize, currentDotSize);
        }
      }
    }
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
}