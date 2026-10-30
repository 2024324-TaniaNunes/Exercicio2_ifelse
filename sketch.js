let estrelas = [];
let estrelasCadentes = [];
let bolinhas = [];       // bolinhas espalhadas pelo ecrã
let cauda = [];          // bolinhas já apanhadas

let pac;
let distancia = 180;     // distância entre o pacman e o rato
let espaco;         // espaço entre as bolinhas da cauda
let maxCauda = 10;        // bolinhas apanhadas até o pacman as comer
let totalBolinhas = 17;  // bolinhas espalhadas no ecrã
let comendo = false;     // o pacman está a comer a cauda?

let tremor = 0;             // força do tremor do ecrã quando cai uma estrela cadente

let ratoMexeu = false;
let corAtual;
let corAlvo;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  criarEstrelas();

  // a cauda inteira fica sempre mais curta do que a distância do pacman
  espaco = (distancia - 40) / maxCauda;

  pac = { x: width / 2, y: height / 2, angulo: 0 };
  corAtual = color(255);
  corAlvo = color(255);

  for (let i = 0; i < totalBolinhas; i++) {
    bolinhas.push(novaBolinha());
  }
}

function mouseMoved() {
  ratoMexeu = true;
}

// clique esquerdo -> o ecrã treme e cai uma estrela cadente
function mousePressed(evento) {
  if (evento.button === 0) {      //0 = botão esquerdo do rato
    tremor = 18;
    criarEstrelaCadente();
  }
}

function draw() {
  background(0);

// tremor do ecrã: desloca o desenho todo um pouco, e vai dimimuindo
  if (tremor > 0.5) {
    translate(random(-tremor, tremor), random(-tremor, tremor));
  }
  tremor *= 0.9;

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
  corAtual = lerpColor(corAtual, corAlvo, 0.08);

  desenharEstrelas();
  desenharEstrelasCadentes();

  // 2) pacman anda atrás do rato sem nunca o apanhar
  if (ratoMexeu) {
    seguir(pac, mouseX, mouseY, distancia, 0.1);
    pac.x = constrain(pac.x, 0, width);
    pac.y = constrain(pac.y, 0, height);
    pac.angulo = atan2(mouseY - pac.y, mouseX - pac.x);
  }

  // 3) o isco apanha bolinhas
  for (let i = bolinhas.length - 1; i >= 0; i--) {
    let bol = bolinhas[i];

    if (!comendo && cauda.length < maxCauda && dist(mouseX, mouseY, bol.x, bol.y) < 22) {
      cauda.push({ x: bol.x, y: bol.y });  // passa para a cauda
      bolinhas.splice(i, 1);               // sai das bolinhas livres
      bolinhas.push(novaBolinha());        // aparece outra noutro sítio

      if (cauda.length === maxCauda) {
        comendo = true;                    // cauda cheia: o pacman vai comer
      }
    }
  }

  // 4) a cauda segue o isco, ou vai para a boca do pacman
  if (comendo) {
    let todasPerto = true;

    for (let d of cauda) {
      d.x = lerp(d.x, pac.x, 0.1);
      d.y = lerp(d.y, pac.y, 0.1);

      if (dist(d.x, d.y, pac.x, pac.y) > 20) {
        todasPerto = false;
      }
    }

    // quando chegam todas à boca, são comidas e o ciclo recomeça
    if (todasPerto) {
      cauda = [];
      comendo = false;
    }
  } else {
    for (let i = 0; i < cauda.length; i++) {
      // cada bolinha segue a anterior (a primeira segue o rato)
      let refX = mouseX;
      let refY = mouseY;

      if (i > 0) {
        refX = cauda[i - 1].x;
        refY = cauda[i - 1].y;
      }

      seguir(cauda[i], refX, refY, espaco, 0.3);
    }
  }

  desenharBolinhas();
  desenharCauda();
  desenharPacman();
  desenharIsco();

  pop();
}

// faz um objeto (com x e y) seguir um ponto, ficando sempre a uma distância fixa dele
function seguir(obj, refX, refY, distanciaFixa, velocidade) {
  let dx = obj.x - refX;
  let dy = obj.y - refY;
  let d = dist(obj.x, obj.y, refX, refY);

  // se estiverem no mesmo sítio, escolhe uma direção qualquer
  if (d < 1) {
    dx = -1;
    dy = 0;
    d = 1;
  }

  // ponto à distância fixa, na linha entre o ponto e o objeto
  let alvoX = refX + (dx / d) * distanciaFixa;
  let alvoY = refY + (dy / d) * distanciaFixa;

  obj.x = lerp(obj.x, alvoX, velocidade);
  obj.y = lerp(obj.y, alvoY, velocidade);
}

function novaBolinha() {
  return {
    x: random(40, width - 40),
    y: random(40, height - 40)
  };
}

// nasce no topo do ecrã e cai na diagonal
function criarEstrelaCadente() {
  let ang = random(PI * 0.6, PI * 0.72); // para baixo e para a esquerda
  let vel = random(14, 18);

  estrelasCadentes.push({
    x: random(width * 0.4, width * 1.1),
    y: -30,
    vx: cos(ang) * vel,
    vy: sin(ang) * vel,
  });
}

// usa a cor atual das estrelas, com a transparência que quisermos
function preencherCorAtual(alfa) {
  fill(red(corAtual), green(corAtual), blue(corAtual), alfa);
}

// ---------- desenho ----------

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

// bolinha no lugar do rato
function desenharIsco() {
  noStroke();
  preencherCorAtual(120);
  circle(mouseX, mouseY, 30);
  fill(255);
  circle(mouseX, mouseY, 10);
}

// bolinhas espalhadas pelo ecrã
function desenharBolinhas() {
  noStroke();
  for (let bol of bolinhas) {
    preencherCorAtual(70);
    circle(bol.x, bol.y, 24);
    fill(255);
    circle(bol.x, bol.y, 8);
  }
}

// bolinhas já apanhadas
function desenharCauda() {
  noStroke();
  for (let d of cauda) {
    preencherCorAtual(90);
    circle(d.x, d.y, 20);
    fill(255);
    circle(d.x, d.y, 10);
  }
}

function desenharEstrelasCadentes() {
  for (let i = estrelasCadentes.length - 1; i >= 0; i--) {
    let e = estrelasCadentes[i];

    // cauda: vários segmentos cada vez mais finos e transparentes
    let n = 14;
    for (let k = 0; k < n; k++) {
      let alfa = map(k, 0, n, 255, 0);
      let espessura = map(k, 0, n, 5, 0.5);
      stroke(255, alfa);
      strokeWeight(espessura);
      line(
        e.x - e.vx * k, e.y - e.vy * k,
        e.x - e.vx * (k + 1), e.y - e.vy * (k + 1)
      );
    }

    // cabeça com brilho na cor atual
    noStroke();
    preencherCorAtual(100);
    circle(e.x, e.y, 24);
    fill(255);
    circle(e.x, e.y, 9);

    // move
    e.x += e.vx;
    e.y += e.vy;

    // remove quando já saiu do ecrã (com a cauda toda)
    if (e.y > height + 250 || e.x < -250) {
      estrelasCadentes.splice(i, 1);
    }
  }
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
  for (let e of estrelas) {
    // brilho que oscila devagar (cintilar)
    preencherCorAtual(150 + 105 * sin(frameCount * 0.03 + e.fase));
    circle(e.x, e.y, e.tam);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  criarEstrelas();
}