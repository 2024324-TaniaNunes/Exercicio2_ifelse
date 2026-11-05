# Reflexão: Ex02 if/else

A IDEIA
O enunciado pedia uma composição interativa que usasse condicionais (if/else) para mudar o comportamento visual com base no rato, nas teclas ou noutros inputs. Queria criar algo com um pouco de "história" e que fosse visualmente apelativo. Após passar por várias experiências diferentes cheguei à ideia final onde me inspirei no jogo Pac-Man.


COMO FUNCIONA
O rato é o "isco" e um pacman persegue-o sem nunca o apanhar, num céu estrelado preto. O ecrã está dividido em quatro quadrantes e as estrelas mudam de cor consoante o quadrante onde está o rato (vermelho, amarelo, verde e roxo). Há bolinhas espalhadas pelo ecrã que o isco pode apanhar. As bolinhas apanhadas formam uma fila à frente do pacman e, ao chegar às 10, o pacman come-as e o ciclo recomeça. Por fim, cada clique com o botão esquerdo faz o ecrã tremer e cair uma estrela cadente.


A CONDICIONAL (O IF / ELSE IF / ELSE)
É o elemento principal deste trabalho. É utilizado para: 
-> Determinar a cor das estrelas e dos quadrantes: comparo a posição do rato (mouseX e mouseY) com metade da largura (width / 2) e da altura (height / 2) do ecrã:
Se o rato está à esquerda e em cima, a cor-alvo é vermelha;
senão, se está à direita e em cima, é amarela;
senão, se está à esquerda e em baixo, é verde;
nos restantes casos (à direita e em baixo), é roxa.
-> Apanhar bolinhas: Apanhar bolinhas: if (!comendo && cauda.length < maxCauda && dist(...) < 22) só deixa o isco apanhar uma bolinha se não estiver a decorrer a “refeição”, se a cauda ainda não estiver cheia e se o rato estiver perto da bolinha.
-> Estado do jogo: if (comendo) { ... } else { ... } muda o comportamento das bolinhas apanhadas: ou seguem o isco, ou vão para a boca do pacman.
-> Fim da refeição: if (todasPerto) limpa a cauda quando todas as bolinhas chegaram ao pacman, e recomeça o ciclo.
-> Clique esquerdo: if (evento.button === 0) garante que só o botão esquerdo faz tremer o ecrã e lançar a estrela cadente.
-> Primeiro movimento do rato: if (ratoMexeu) impede que o pacman e as cores reajam antes de o rato se mexer.
-> Tremor: if (tremor > 0.5) só desloca o desenho enquanto o tremor ainda for perceptível.
-> Limpeza de estrelas cadentes: if (e.y > height + 250 || e.x < -250) remove-as quando saem do ecrã.
-> Caso especial: em seguir(), if (d < 1) evita uma divisão por zero quando dois objetos estão exatamente no mesmo sítio.


O QUE USEI DE NOVO E A SUA UTILIZAÇÃO
-> let (variáveis) - guarda valores que o programa usa e altera, como a distância do pacman, a cor atual ou o nível do tremor;
-> Arrays ([]) - listas de elementos: as estrelas de fundo, as bolinhas, a cauda e as estrelas cadentes;
-> Objetos ({ x, y, ...}) - agrupam as propriedades de uma coisa, como a posição e o tamanho de cada estrela;
-> for e for ... of - repetem um bloco de código para cada elemento de uma lista (por exemplo, desenhar 300 estrelas);
-> Funções próprias (seguir, desenharPacman,...) - dividem o código em blocos com nome, mais fáceis de ler e utilizar;
-> push() / pop() - isolam as transformações (rotação, deslocamento) para só afetarem o que está entre eles;
-> lerp() - aproxima um valor ao seu destino, uma fração de cada vez, é p que faz o pacman deslizar atrvés do rato;
-> lepColor() - o mesmo, mas para as cores, as estrelas mudam de cor de forma suave em vez de saltarem;
-> color(), red(), green(), blue() - criam uma cor e extraem os seus componentes, para a poder usar com transparência;
-> dist() - calcula a distância entre dois pontos, usei-a para a distância do pacman ao rato e para apanhar as bolinhas;
-> atan2() - calcula o ângulo entre dois pontos, para o pacman olhar para o rato;
-> sin() e cos() - sin cria uma oscilação suave (boca do pacman, cintilar das estrelas). sin e cos juntos dão a direção da estrela cadente;
-> map() - converte um valor de uma escala para outra, por exemplo a oscilação da boca ou a transparência da cauda;
-> constrain - impede que um valor saia de um intervalo, para o pacman não sair do ecrã;
-> random() - gera valores aleatórios, como a posição das estrelas e das bolinhas, direção e velocidade das estrelas cadentes;
-> frameCount - contador de frames desde o início, usado como "relógio" para animações;
-> arc(..., PIE) - desenha um arco em forma de fatia, que é o corpo do pacman com a boca aberta;
-> stroke (), strokeWeight(), line() - desenham linhas com espessuras e transparências, usadas na cauda da estrela cadente;
-> noStroke() - desenha formas sem contorno;
-> noCursor() - esconde o cursor, que é substituído pelo meu isco;
-> mouseMoved() - função especial que deteta sempre que o rato mexe;
-> mousePressesd(evento) - função especial que ativa a cada clique, o evento.button diz qual foi o botão (0=esquerdo);
-> splice(), push(), pop() - métodos dos arrays: push acrescenta ao fim, pop tira o último e splice tira um elemento de uma posição.


COMO FUNCIONA A IDEIA PRINCIPAL
O pacman fica sempre à mesma distância do rato graças à função seguir(). Em cada frame calculo um ponto que está a uma distância fixa do rato, na linha que o une ao pacman, e o pacman desliza para esse ponto com lerp. Se o rato pára, o pacman pára à distância de segurança. Se o rato se mexe depressa, o pacman fica um pouco para trás, como se o perseguisse. Usei a mesma função para as bolinhas da cauda, em que cada uma segue a anterior (e a primeira segue o rato). O espaço entre elas é calculado automaticamente ((distancia - 40) / maxCauda) para que a cauda nunca ultrapasse o pacman.

O tremor funciona assim: cada clique dá um valor à variável tremor, que depois desce 10% em cada frame (tremor = tremor * 0.9). Enquanto for maior que 0.5, todo o desenho é deslocado aleatoriamente com translate.


USO DE INTELIGÊNCIA ARTIFICIAL
Utilizei o Claude, um assistente de inteligência artificial, para me ajudar a desenvolver este trabalho. As ideias e as decisões criativas foram minhas: a divisão do ecrã em quatro quadrantes, as cores, o pacman que persegue o isco, as bolinhas e a cauda, a regra das 10 bolinhas, o tremor e as estrelas cadentes. A IA ajudou-me a transformar essas ideias em código p5.js, a corrigir erros e a ajustar detalhes (velocidades, distâncias, quantidades), e explicou-me como funciona cada parte do código, o que me permitiu perceber e conseguir ajustar o que lá está.


CONCLUSÃO
Este exercício mostrou-me que as condicionais são o que permite a uma composição reagir ao utilizador e mudar de comportamento consoante a situação (a posição do rato, o estado do jogo ou o clique). Aprendi também conceitos novos que não conhecia, como lerp para criar movimentos suaves, as transformações com push, translate e rotate, e a organização do código com arrays, objetos e funções. O que mais me custou foi [escreve aqui a tua experiência], e se continuasse o projeto gostava de [por exemplo: acrescentar sons, ou fantasmas que fogem do pacman].