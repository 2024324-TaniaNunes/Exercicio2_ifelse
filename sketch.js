let estrelas = [];
let pac;                // posição e ângulo do pacman
let distancia = 120;    // distância que o pacman mantém do rato
let ratoMexeu = false;
let corAtual;
let corAlvo;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  criarEstrelas();

  pac = { x: width / 2, y: height / 2, angulo: 0 };
  corAtual = color(255);
  corAlvo = color(255);
}

function mouseMoved() {
  ratoMexeu = true;
}

function draw() {
  background(0);

  // 1) cor das estrelas conforme o quadrante onde está o rato
  if (ratoMexeu) {
    if (mouseX < width / 2 && mouseY < height / 2) {
      corAlvo = color(255, 60, 60);    // vermelho
    } else if (mouseX >= width / 2 && mouseY < height / 2) {
      corAlvo = color(255, 220, 0);    // amarelo
    } else if (mouseX < width / 2 && mouseY >= height / 2) {
      corAlvo = color(60, 220, 100);   // verde
    } else {
      corAlvo = color(170, 80, 255);   // roxo
    }
  }

  // a cor atual aproxima-se devagar da cor alvo (transição suave)
  corAtual = lerpColor(corAtual, corAlvo, 0.08);

  desenharEstrelas();

  // 2) pacman anda atrás do rato sem nunca o apanhar
  if (ratoMexeu) {
    let dx = pac.x - mouseX;
    let dy = pac.y - mouseY;
    let d = dist(pac.x, pac.y, mouseX, mouseY);

    // se estiverem exatamente no mesmo sítio, escolhe uma direção qualquer
    if (d < 1) {
      dx = -1;
      dy = 0;
      d = 1;
    }

    // ponto que está à distância fixa do rato, na linha rato -> pacman
    let alvoX = mouseX + (dx / d) * distancia;
    let alvoY = mouseY + (dy / d) * distancia;

    // desliza para esse ponto
    pac.x = lerp(pac.x, alvoX, 0.1);
    pac.y = lerp(pac.y, alvoY, 0.1);
    pac.x = constrain(pac.x, 0, width);
    pac.y = constrain(pac.y, 0, height);

    // olha sempre para o rato
    pac.angulo = atan2(mouseY - pac.y, mouseX - pac.x);
  }

  desenharPacman();
  desenharIsco();
}

function desenharPacman() {
  push();
  translate(pac.x, pac.y);
  rotate(pac.angulo);

  // a boca abre e fecha
  let abertura = map(sin(frameCount * 0.25), -1, 1, 0.05, 0.7);

  noStroke();
  fill(255, 220, 0);
  arc(0, 0, 60, 60, abertura, TWO_PI - abertura, PIE);

  // olho
  fill(0);
  circle(5, -15, 7);
  pop();
}

// bolinha a brilhar no lugar do rato
function desenharIsco() {
  let r = red(corAtual);
  let g = green(corAtual);
  let b = blue(corAtual);
  let pulso = 4 * sin(frameCount * 0.15);

  noStroke();
  fill(r, g, b, 50);
  circle(mouseX, mouseY, 40 + pulso);
  fill(r, g, b, 120);
  circle(mouseX, mouseY, 24 + pulso);
  fill(255);
  circle(mouseX, mouseY, 10);
}

function desenharDivisorias() {
  stroke(255, 25);
  strokeWeight(1);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
}

function criarEstrelas() {
  estrelas = [];
  for (let i = 0; i < 300; i++) {
    estrelas.push({
      x: random(width),
      y: random(height),
      tam: random(1, 2.5),
      fase: random(TWO_PI)
    });
  }
}

function desenharEstrelas() {
  noStroke();
  let r = red(corAtual);
  let g = green(corAtual);
  let b = blue(corAtual);

  for (let e of estrelas) {
    // brilho que oscila devagar (cintilar)
    fill(r, g, b, 150 + 105 * sin(frameCount * 0.03 + e.fase));
    circle(e.x, e.y, e.tam);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  criarEstrelas();
}