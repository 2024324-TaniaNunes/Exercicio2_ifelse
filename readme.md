# Reflexão: Ex02 if/else

A IDEIA
O enunciado pedia uma composição interativa que usasse condicionais (if/else) para mudar o comportamento visual com base no rato, nas teclas ou noutros inputs. Comecei por dividir o ecrã em quatro quadrantes invisíveis e acrescentar várias estrelas que cintilam lentamente. A cor das estrelas muda consoante o quadrante onde o rato se encontra. A ideia central foi inspirada no jogo do Pac-Man: o rato funciona como “isco” e o Pac-Man persegue-o sem nunca o apanhar, num céu estrelado preto.


COMO FUNCIONA
O ecrã está dividido em quatro quadrantes invisíveis. Quando o rato está no quadrante superior esquerdo, as estrelas ficam vermelhas; no superior direito, amarelas; no inferior esquerdo, verdes; e no inferior direito, roxas. O Pac-Man persegue o rato, olha na sua direção e abre e fecha a boca, mas mantém alguma distância, por isso nunca o come. A composição funciona quase como um jogo inverso, em que também podemos perseguir o Pac-Man.


A CONDICIONAL (O IF / ELSE IF / ELSE)
É o elemento principal deste trabalho. Para determinar a cor das estrelas, comparo a posição do rato (mouseX e mouseY) com metade da largura (width / 2) e da altura (height / 2) do ecrã:

Se o rato está à esquerda e em cima, a cor-alvo é vermelha;
senão, se está à direita e em cima, é amarela;
senão, se está à esquerda e em baixo, é verde;
nos restantes casos (à direita e em baixo), é roxa.

O operador && (“e”) serve para juntar duas condições. Uso também um if (ratoMexeu) para que o programa só comece a reagir depois de o rato se mexer pela primeira vez, e um if (d < 1) para tratar o caso em que o Pac-Man e o rato estão praticamente no mesmo sítio.


COMANDOS E FUNÇÕES UTILIZADOS
Estrutura base do p5.js
setup(): é executada uma vez no início. Aqui crio o canvas, escondo o cursor e preparo as estrelas.
draw(): corre continuamente, normalmente cerca de 60 vezes por segundo. É aqui que acontece a animação do céu estrelado a "piscar".
createCanvas(windowWidth, windowHeight): cria o canvas com o tamanho da janela.
windowResized() e resizeCanvas(): ajustam o canvas quando a janela muda de tamanho.
mouseMoved(): função especial usada para saber se o utilizador já mexeu no rato.


RATO
mouseX e mouseY: posição atual do rato.
noCursor(): esconde o cursor normal, que é substituído pelo isco.


DESENHO E COR
background(0): pinta o fundo de preto em cada frame.
fill(), noStroke(): definem a cor de preenchimento e removem o contorno.
circle(): desenha as estrelas, o Pac-Man e o isco.
stroke(), strokeWeight(), line(): estão na função desenharDivisorias(), que desenharia as linhas divisórias, acabei por retirar esta função para não serem visíveis as linhas de divisão.
arc(..., PIE): desenha um arco em forma de “fatia”, que é o corpo do Pac-Man com a boca aberta.
color(): cria uma cor para guardar numa variável.
lerpColor(): calcula uma cor intermédia entre duas, e é o que faz as estrelas mudarem de cor suavemente em vez de saltarem.
red(), green(), blue(): extraem os componentes de uma cor, que são usados para criar o isco e as estrelas com transparência.


MOVIMENTO E MATEMÁTICA
lerp(): aproxima um valor do seu destino numa fração (por exemplo, 10%) em cada frame. É o que dá o efeito de deslizar ao Pac-Man.
dist(): calcula a distância entre dois pontos.
atan2(): calcula o ângulo entre dois pontos, para o Pac-Man olhar para o rato.
sin(): gera uma oscilação suave, usada na boca do pacman e no cintilar das estrelas.
map(): converte um valor de uma escala para outra (por exemplo, do intervalo -1 a 1 para a abertura da boca).
constrain(): limita a posição do Pac-Man aos limites do canvas.
frameCount: contador de frames desde o início, usado como “relógio” para as animações.
random(): gera valores aleatórios para a posição, o tamanho e a fase de cada estrela.


TRANSFORMAÇÕES
push() e pop(): isolam as transformações, para que só afetem o Pac-Man e não o resto do desenho.
translate() e rotate(): mudam a origem do desenho para o Pac-Man e rodam-no na direção do rato.


ESTRUTURAS DE PROGRAMAÇÃO
Variáveis (let): guardam valores como a distância do Pac-Man, a cor atual e a cor-alvo.
Array (estrelas): lista com as 300 estrelas.
Objetos ({ x, y, tam, fase }): cada estrela e o Pac-Man guardam as suas propriedades.
Ciclo for ... of: percorre todas as estrelas para as desenhar.
Funções próprias (desenharPacman, desenharIsco, desenharEstrelas, criarEstrelas): organizam o código em blocos mais fáceis de ler.
O TRUQUE DA “DISTÂNCIA FIXA”

Em cada frame, calculo a direção do rato para o Pac-Man e defino um ponto-alvo que está a uma distância fixa do rato, ao longo dessa direção. O Pac-Man desliza para esse ponto com lerp. Se o rato pára, o Pac-Man pára a essa distância. Se o rato se mexe depressa, o Pac-Man fica um bocadinho para trás, como se o estivesse a perseguir. Por isso parece que anda sempre a tentar apanhá-lo, mas nunca consegue.


USO DE INTELIGÊNCIA ARTIFICIAL
Para desenvolver este trabalho, utilizei o Claude, um assistente de inteligência artificial, para concretizar as minhas ideias, ajustar diversos pontos e condições ao longo das várias experiências e compreender como cada parte funciona através das explicações que me foi dando.


CONCLUSÃO
Este exercício ajudou-me a compreender como as condicionais permitem que uma composição reaja ao utilizador e como um if / else pode controlar diferentes aspetos visuais (cor, forma e comportamento) consoante a zona do ecrã. Aprendi também conceitos que não conhecia, como o lerp para criar movimentos suaves e as transformações com push, translate e rotate. Se continuasse o projeto, gostaria de acrescentar a possibilidade de o Pac-Man comer as estrelas por onde passa e de usar o teclado para explorar outros comportamentos na composição.