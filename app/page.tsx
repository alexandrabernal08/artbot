"use client";
import { useState, useCallback } from "react";

// ─── LISTAS ───────────────────────────────────────────────────────────────────

const VERBOS = [
  "rasgar","colar","cortar","amassar","pressionar","apertar","alisar","furar",
  "perfurar","marcar","riscar","dobrar","torcer","esticar","comprimir","encaixar",
  "juntar","separar","empilhar","equilibrar","sobrepor","entrelaçar","costurar",
  "conectar","articular","combinar","recompor","reorganizar","fragmentar","recombinar",
  "agrupar","dispersar","deformar","distorcer","dissolver","fundir","desgastar",
  "corroer","quebrar","interromper","alterar","transformar","tensionar","desestabilizar",
  "revelar","ocultar","sugerir","simular","registrar","repetir","prolongar","inverter",
  "traduzir","narrar","investigar","questionar","colecionar","arquivar","mapear",
  "reinterpretar","situar","posicionar","confrontar","documentar","circular",
  "traçar","derivar","gesticular","percorrer","inscrever","hesitar","abandonar",
  "vagar","pulsar","brotar","escutar","rastrear","ler","contextualizar","ressignificar",
  "citar","comparar","interpretar","apropriar","dialogar","problematizar","homenagear",
  "experimentar","refletir","testar","errar","recomeçar","observar","concluir",
  "perceber","calibrar","afinar","contrastar","intensificar","apreciar","qualificar","contemplar",
];

const MATERIAIS_CERAMICA = [
  "argila crua modelada com os dedos",
  "placa de argila prensada contra tecido",
  "acordelado construído serpentina por serpentina",
  "esmalte cerâmico em camadas sobrepostas",
  "biscoito lixado até revelar a textura interna",
  "tecido enrolado em argila fresca",
  "aquarela sobre argila biscoitada",
  "nanquim e argila juntos",
  "colagem fotográfica dentro de forma cerâmica",
  "carvão sobre superfície de argila seca",
  "carimbo com argila sobre papel",
  "esmalte e aquarela na mesma composição",
];

const MATERIAIS_DESENHO = [
  "grafite sobre papel muito rugoso",
  "nanquim com pena improvisada",
  "carvão vegetal que apaga e volta",
  "giz pastel sobre papel preto",
  "aquarela deixada escorrer sem controle",
  "carimbo feito com borracha recortada",
  "monotipia com tinta sobre vidro",
  "estêncil cortado em papel cartão",
  "fotografia impressa e intervinda à mão",
  "linha costurada sobre papel ou tecido",
  "bordado livre sobre tela crua",
  "papel rasgado e remontado",
];

const MATERIAIS_ARTESVISUAIS = [
  "tinta acrílica aplicada com espátula",
  "tinta guache misturada com areia",
  "aquarela e nanquim na mesma folha",
  "colagem com recortes de revistas antigas",
  "impressão em xilogravura sobre tecido",
  "tela crua preparada com gesso e pigmento",
  "assemblagem de objetos descartados",
  "fotografia analógica revelada à mão",
  "serigrafia com tinta caseira",
  "monotipia com rolo e tinta offset",
  "intervenção em fotografia impressa",
  "mosaico com fragmentos de cerâmica e vidro",
];

const MATERIAIS_CRAZY = [
  "bala mastigada como escultura",
  "café derramado como aquarela",
  "terra molhada modelada no chão",
  "plástico derretido com isqueiro",
  "folhas de árvore costuradas com linha",
  "espelho partido remontado em novo formato",
  "jornal dobrado e pintado por cima",
  "areia colorida sobre superfície com cola",
  ...MATERIAIS_CERAMICA,
  ...MATERIAIS_DESENHO,
  ...MATERIAIS_ARTESVISUAIS,
];

const RESTRICOES_INICIANTE = [
  "usando apenas uma linha contínua sem levantar a mão",
  "com a mão não dominante durante todo o processo",
  "em menos de 4 minutos",
  "usando apenas uma cor em todos os seus valores",
  "em escala mínima que cabe na palma da mão",
  "em escala máxima maior que seu rosto",
  "sem planejamento — cada passo decide o próximo",
  "copiando fielmente algo da natureza sem interpretar",
  "usando apenas três movimentos diferentes",
  "repetindo o mesmo gesto exatamente 20 vezes",
];

const RESTRICOES_INTERMEDIARIO = [
  "sem olhar para o que está fazendo",
  "com os olhos fechados na metade do processo",
  "usando apenas materiais encontrados no chão da sala",
  "usando apenas ferramentas que não foram feitas para arte",
  "fazendo o oposto do que você faria naturalmente",
  "trabalhando de costas para a própria obra",
  "usando apenas gestos circulares nenhum reto",
  "usando apenas gestos retos nenhum curvo",
  "em camadas — cada camada seca antes da próxima",
  "usando apenas sobras e descartados",
  "com uma única ferramenta que você nunca usou antes",
  "com tempo ilimitado sem pressa",
];

const RESTRICOES_AVANCADO = [
  "em silêncio absoluto sem música nem conversa",
  "documentando cada etapa com uma palavra não uma foto",
  "sem tomar nenhuma decisão consciente",
  "recomeçando do zero toda vez que errar sem apagar",
  "fazendo algo que será destruído no fim",
  "destruindo o trabalho na metade e continuando com os fragmentos",
  "ampliando apenas um detalhe até virar outra coisa",
  "com a outra mão imobilizada",
];

const REFERENCIAS = [
  "Lucie Rie","Peter Voulkos","Magdalene Odundo","Edmund de Waal","Betty Woodman",
  "Akio Takamori","Rosa Veloso","Francisco Brennand","Jô Vasconcellos",
  "Ceramistas Karajá","Cerâmica Jomon","Cerâmica Marajoara","Tarsila do Amaral",
  "Hélio Oiticica","Lygia Clark","Arthur Bispo do Rosário","Cândido Portinari",
  "Anna Maria Maiolino","Vik Muniz","Adriana Varejão","Rosana Paulino",
  "Erika Verzutti","Almandrade","Yayoi Kusama","Louise Bourgeois","Kara Walker",
  "Jean-Michel Basquiat","Barbara Kruger","Andy Goldsworthy",
  "Arte indígena brasileira","Wabi-sabi japonês","Arte Povera italiana",
  "Fluxus","Grafite e muralismo brasileiro",
];

const INTENCOES = [
  "memória","tempo","corpo","erro","natureza","identidade","pertencimento",
  "silêncio","fronteira","rastro","peso","ausência","transformação","herança",
  "ruptura","desejo","resistência","origem","limite","equilíbrio","vazio",
  "superfície","dentro e fora","o que não se vê","o que não se diz","cicatriz",
  "movimento","permanência","invisível","cotidiano","afeto","estranhamento",
  "passagem","escuta","espera","crescimento","fragmento","contato","distância",
  "recomeço","o que sobra","o que falta","presença","mapa","território",
];

// ─── MAPEAMENTOS MYP ──────────────────────────────────────────────────────────

const VERBO_CRITERIO: Record<string, "A"|"B"|"C"|"D"> = {
  // A — Knowing & Understanding
  "investigar":"A","questionar":"A","mapear":"A","contextualizar":"A",
  "documentar":"A","arquivar":"A","colecionar":"A","comparar":"A",
  "interpretar":"A","situar":"A","reinterpretar":"A","ler":"A",
  "narrar":"A","citar":"A","traduzir":"A","rastrear":"A","confrontar":"A",
  // B — Developing Skills
  "rasgar":"B","colar":"B","cortar":"B","amassar":"B","pressionar":"B",
  "apertar":"B","alisar":"B","furar":"B","perfurar":"B","marcar":"B",
  "riscar":"B","dobrar":"B","torcer":"B","esticar":"B","comprimir":"B",
  "encaixar":"B","juntar":"B","separar":"B","empilhar":"B","equilibrar":"B",
  "sobrepor":"B","entrelaçar":"B","costurar":"B","conectar":"B",
  "articular":"B","calibrar":"B","afinar":"B","traçar":"B","inscrever":"B",
  "percorrer":"B","gesticular":"B",
  // C — Thinking Creatively
  "transformar":"C","recompor":"C","reorganizar":"C","fragmentar":"C",
  "recombinar":"C","agrupar":"C","dispersar":"C","deformar":"C",
  "distorcer":"C","dissolver":"C","fundir":"C","desgastar":"C",
  "corroer":"C","quebrar":"C","interromper":"C","alterar":"C",
  "tensionar":"C","desestabilizar":"C","revelar":"C","ocultar":"C",
  "sugerir":"C","simular":"C","repetir":"C","prolongar":"C","inverter":"C",
  "combinar":"C","derivar":"C","vagar":"C","pulsar":"C","brotar":"C",
  "hesitar":"C","abandonar":"C","errar":"C","recomeçar":"C",
  "experimentar":"C","testar":"C","apropriar":"C",
  // D — Responding
  "refletir":"D","perceber":"D","contemplar":"D","apreciar":"D",
  "observar":"D","escutar":"D","ressignificar":"D","dialogar":"D",
  "problematizar":"D","homenagear":"D","contrastar":"D","intensificar":"D",
  "qualificar":"D","concluir":"D","circular":"D","posicionar":"D",
};

const INTENCAO_CONCEITO: Record<string, string> = {
  "memória":"Identity","tempo":"Time, Place and Space","corpo":"Identity",
  "erro":"Change","natureza":"Connections","identidade":"Identity",
  "pertencimento":"Communities","silêncio":"Aesthetics","fronteira":"Perspective",
  "rastro":"Connections","peso":"Form","ausência":"Aesthetics",
  "transformação":"Change","herança":"Culture","ruptura":"Change",
  "desejo":"Perspective","resistência":"Perspective","origem":"Culture",
  "limite":"Form","equilíbrio":"Aesthetics","vazio":"Aesthetics",
  "superfície":"Form","dentro e fora":"Relationships","o que não se vê":"Perspective",
  "o que não se diz":"Communication","cicatriz":"Identity","movimento":"Change",
  "permanência":"Time, Place and Space","invisível":"Perspective",
  "cotidiano":"Communities","afeto":"Relationships","estranhamento":"Perspective",
  "passagem":"Time, Place and Space","escuta":"Communication",
  "espera":"Time, Place and Space","crescimento":"Change","fragmento":"Form",
  "contato":"Relationships","distância":"Connections","recomeço":"Change",
  "o que sobra":"Aesthetics","o que falta":"Form","presença":"Identity",
  "mapa":"Connections","território":"Communities",
};

const CRITERIO_INFO = {
  A: { label: "Criterion A", nome: "Knowing & Understanding", cor: "#118AB2" },
  B: { label: "Criterion B", nome: "Developing Skills",       cor: "#FF9500" },
  C: { label: "Criterion C", nome: "Thinking Creatively",     cor: "#06D6A0" },
  D: { label: "Criterion D", nome: "Responding",              cor: "#9B5DE5" },
};

function getATLSkills(criterio: "A"|"B"|"C"|"D"): string[] {
  if (criterio === "A") return ["Research Skills", "Critical Thinking Skills"];
  if (criterio === "B") return ["Transfer Skills", "Reflection Skills"];
  if (criterio === "C") return ["Creative Thinking Skills", "Reflection Skills"];
  return ["Communication Skills", "Self-Management Skills"];
}

// ─── ARTISTAS ────────────────────────────────────────────────────────────────

interface Obra {
  titulo: string;
  ano: string;
  material: string;
  local?: string;
}

interface ArtistaInfo {
  bio: string;
  obras: Obra[];
}

const ARTISTAS_INFO: Record<string, ArtistaInfo> = {
  "Lucie Rie": {
    bio: "Ceramista austríaca radicada em Londres (1902–1995), conhecida por vasos de forma precisa e esmaltes inovadores. Influenciada pelo Bauhaus, criou uma obra que une rigor formal e delicadeza poética, redefinindo o vocabulário da cerâmica moderna.",
    obras: [
      { titulo: "Fluted Bowl", ano: "c. 1970", material: "porcelana com esmalte branco", local: "Victoria and Albert Museum, Londres" },
      { titulo: "Bottle", ano: "c. 1978", material: "grés com esmalte sgraffito", local: "coleções diversas no Reino Unido" },
      { titulo: "Shallow Bowl", ano: "c. 1960", material: "grés com esmalte de pó de bronze", local: "Sainsbury Centre for Visual Arts, Norwich" },
    ],
  },
  "Peter Voulkos": {
    bio: "Ceramista americano (1924–2002) que incorporou o Expressionismo Abstrato à cerâmica, quebrando a separação entre arte e artesanato. Suas esculturas monumentais em grés são marcadas por gestos físicos intensos e superfícies rústicas e expressivas.",
    obras: [
      { titulo: "Rocking Pot", ano: "1956", material: "grés", local: "Oakland Museum of California" },
      { titulo: "Little Big Horn", ano: "1959", material: "grés com esmalte", local: "Oakland Museum of California" },
      { titulo: "Stack", ano: "1980", material: "cerâmica com engobe", local: "Los Angeles County Museum of Art" },
    ],
  },
  "Magdalene Odundo": {
    bio: "Ceramista queniana-britânica (n. 1950) que constrói vasos sem torno, coiling e burnishing à mão em diálogo com tradições cerâmicas africanas e pré-colombianas. Suas formas evocam o corpo humano com elegância e presença escultural.",
    obras: [
      { titulo: "Untitled", ano: "1989", material: "terracota burnished, queima em atmosfera redutora" },
      { titulo: "Asymmetric Vessel", ano: "1994", material: "terracota burnished", local: "Victoria and Albert Museum, Londres" },
      { titulo: "The Journey IV", ano: "2019", material: "grés polido à mão", local: "Solomon R. Guggenheim Museum, Nova York" },
    ],
  },
  "Edmund de Waal": {
    bio: "Ceramista e escritor britânico (n. 1964), famoso pelo livro 'A Lebre com Olhos de Âmbar' e por instalações de centenas de vasos de porcelana branca. Sua obra explora memória, herança familiar e o poder silencioso dos objetos acumulados.",
    obras: [
      { titulo: "the sea, the sea (instalação de 425 vasos)", ano: "2011", material: "porcelana, ouro e platina", local: "Frick Collection, Nova York" },
      { titulo: "during the night (instalação)", ano: "2014", material: "porcelana", local: "Gagosian Gallery, Nova York" },
      { titulo: "Psalm (instalação)", ano: "2021", material: "porcelana em caixas de zinco", local: "coleções internacionais" },
    ],
  },
  "Betty Woodman": {
    bio: "Ceramista americana (1930–2018) que transformou a jarra e o vaso em escultura pictórica vibrante. Sua obra une técnicas tradicionais da cerâmica ao expressionismo da pintura, criando peças ao mesmo tempo funcionais e escultóricas.",
    obras: [
      { titulo: "Pillow Pitcher (série)", ano: "1980s", material: "cerâmica esmaltada pintada", local: "Metropolitan Museum of Art, Nova York" },
      { titulo: "Naples Yellow (série)", ano: "1999", material: "cerâmica com esmalte e óleo sobre tela" },
      { titulo: "Bedroom Mazurka", ano: "2000", material: "cerâmica com esmalte e acrílica", local: "Wadsworth Atheneum Museum of Art, Hartford" },
    ],
  },
  "Akio Takamori": {
    bio: "Ceramista japonês-americano (1950–2017) que pintava figuras humanas expressivas sobre formas de argila, unindo tradição cerâmica japonesa e sensibilidade narrativa ocidental. Suas peças falam sobre identidade, deslocamento e intimidade.",
    obras: [
      { titulo: "Sleep", ano: "1990s", material: "grés com engobe pintado", local: "coleções privadas e museus dos EUA" },
      { titulo: "Boy and Girl", ano: "2000", material: "grés com esmalte e engobe" },
      { titulo: "After Lunch (série)", ano: "2010s", material: "grés com engobe" },
    ],
  },
  "Rosa Veloso": {
    bio: "Ceramista brasileira cuja obra articula tradições da cerâmica popular e vocabulário contemporâneo. Em seu trabalho, argila e esmalte são meios para explorar memória, identidade e a expressão do cotidiano.",
    obras: [
      { titulo: "Série de vasos com superfície texturizada", ano: "anos 2000", material: "grés com esmalte" },
      { titulo: "Peças escultóricas em argila", ano: "anos 2010", material: "cerâmica com engobe" },
      { titulo: "Trabalhos em cerâmica de alta temperatura", ano: "anos 2010–2020", material: "grés, Cone 6–10" },
    ],
  },
  "Francisco Brennand": {
    bio: "Ceramista e artista plástico pernambucano (1927–2019) que construiu um universo simbólico único, mesclando mitologia, erotismo e natureza. Criou a Oficina Cerâmica Francisco Brennand no Recife — um dos maiores complexos culturais do Brasil, com mais de 2.000 esculturas.",
    obras: [
      { titulo: "O Mensageiro", ano: "s.d.", material: "cerâmica monumental pintada", local: "Oficina Cerâmica Francisco Brennand, Recife" },
      { titulo: "Série Mulheres", ano: "décadas de 1960–2000", material: "cerâmica esmaltada", local: "Oficina Cerâmica Francisco Brennand, Recife" },
      { titulo: "Painel Cerâmico do Aeroporto de Recife", ano: "1997", material: "cerâmica policromada", local: "Aeroporto Internacional do Recife" },
    ],
  },
  "Jô Vasconcellos": {
    bio: "Ceramista brasileira contemporânea que une processos artesanais e investigação conceitual na construção de formas cerâmicas. Seu trabalho explora o corpo, a feminilidade e a memória por meio da argila.",
    obras: [
      { titulo: "Série de esculturas em grés", ano: "anos 2000–2010", material: "grés com esmalte" },
      { titulo: "Instalação cerâmica", ano: "anos 2010", material: "cerâmica e objetos combinados" },
      { titulo: "Vasos escultóricos", ano: "anos 2010–2020", material: "cerâmica de alta temperatura" },
    ],
  },
  "Ceramistas Karajá": {
    bio: "Os Karajá habitam as margens do Rio Araguaia (GO/TO/PA/MT) e produzem as 'bonecas Ritxoko' — estatuetas de cerâmica que representam mulheres com adornos tradicionais. Patrimônio imaterial do Brasil desde 2012, as Ritxoko são transmitidas de mãe para filha há séculos.",
    obras: [
      { titulo: "Ritxoko (boneca cerâmica feminina)", ano: "tradição viva, séc. XIX–XXI", material: "argila local queimada e pintada com urucum e jenipapo", local: "Museu do Índio, Rio de Janeiro e Brasília" },
      { titulo: "Estatueta ritual masculina", ano: "tradição viva", material: "argila e pigmentos naturais", local: "coleções de museus etnográficos brasileiros" },
      { titulo: "Coleção de Ritxoko históricas", ano: "séc. XIX–XX", material: "cerâmica pintada", local: "Museu Nacional (RJ) — parte destruída no incêndio de 2018" },
    ],
  },
  "Cerâmica Jomon": {
    bio: "A cerâmica Jōmon (c. 10.500–300 a.C.) é uma das mais antigas do mundo, produzida pelos povos pré-históricos do Japão. Seus vasos com marcas de corda e bordas flamejantes uniam função e expressão estética de forma pioneira há milênios.",
    obras: [
      { titulo: "Vaso de Chama (Kaen-doki)", ano: "c. 3000–2000 a.C.", material: "argila cozida com textura de corda", local: "Museu Nacional de Tóquio" },
      { titulo: "Figurina Dogū feminina", ano: "c. 3000–2000 a.C.", material: "cerâmica", local: "Museu Nacional de Tóquio" },
      { titulo: "Vaso com decoração Jōmon", ano: "c. 5000 a.C.", material: "argila com marcas de corda trançada", local: "coleções de museus japoneses" },
    ],
  },
  "Cerâmica Marajoara": {
    bio: "A cerâmica Marajoara (c. 400–1300 d.C.) foi produzida na ilha de Marajó (PA) e é uma das expressões mais sofisticadas da arte pré-colombiana nas Américas. Seus grafismos geométricos elaborados em vermelho e preto sobre fundo branco distinguem urnas funerárias, pratos e estatuetas.",
    obras: [
      { titulo: "Urna funerária Marajoara", ano: "c. 400–1300 d.C.", material: "cerâmica polícroma pintada", local: "Museu do Marajó e Museu Paraense Emílio Goeldi, Belém" },
      { titulo: "Prato com grafismos geométricos", ano: "c. 400–1300 d.C.", material: "cerâmica pintada com engobes coloridos", local: "Museu Paraense Emílio Goeldi, Belém" },
      { titulo: "Estatueta feminina", ano: "c. 400–1300 d.C.", material: "cerâmica pintada", local: "Museu Nacional (RJ) e coleções diversas" },
    ],
  },
  "Tarsila do Amaral": {
    bio: "Pintora brasileira (1886–1973), ícone do Modernismo e co-fundadora do movimento Antropofágico. Suas obras sintetizam estética europeia e iconografia brasileira, criando uma linguagem visual que se tornou símbolo da identidade cultural do país.",
    obras: [
      { titulo: "Abaporu", ano: "1928", material: "óleo sobre tela", local: "MALBA — Museu de Arte Latino-Americana, Buenos Aires" },
      { titulo: "Operários", ano: "1933", material: "óleo sobre tela", local: "Acervo Artístico-Cultural dos Palácios do Governo do Estado de SP" },
      { titulo: "A Cuca", ano: "1924", material: "óleo sobre tela", local: "Neue Nationalgalerie, Berlim" },
    ],
  },
  "Hélio Oiticica": {
    bio: "Artista carioca (1937–1980) que expandiu os limites da arte, passando da pintura construtivista a instalações participativas, parangolés e ambientes imersivos. Pioneiro da arte sensorial e participativa, influenciou gerações no Brasil e no mundo.",
    obras: [
      { titulo: "Parangolé P4 Cape 1", ano: "1964", material: "tecido e tintas", local: "MAM Rio de Janeiro e coleções internacionais" },
      { titulo: "Tropicália (instalação)", ano: "1967", material: "madeira, areia, plantas e tecidos", local: "Projeto Hélio Oiticica, Rio de Janeiro" },
      { titulo: "Metaesquema", ano: "1957–58", material: "guache sobre cartão", local: "coleções diversas, incluindo MoMA Nova York" },
    ],
  },
  "Lygia Clark": {
    bio: "Artista mineira (1920–1988) que transformou a relação entre obra e espectador — das pinturas neoconcretistas a 'objetos relacionais' terapêuticos. Sua obra propõe a participação ativa do corpo e a dissolução das fronteiras entre arte e vida.",
    obras: [
      { titulo: "Bicho", ano: "1960", material: "alumínio articulado", local: "coleção Família Clark e museus internacionais" },
      { titulo: "O Eu e o Tu — Roupa-corpo-roupa", ano: "1967", material: "roupa sensorial em borracha e tecido", local: "museus e coleções diversas" },
      { titulo: "Caminhando", ano: "1963", material: "fita de papel e tesoura (obra-instrução participativa)" },
    ],
  },
  "Arthur Bispo do Rosário": {
    bio: "Artista brasileiro (c. 1909–1989) que passou décadas internado na Colônia Juliano Moreira (RJ), onde criou bordados e mantos catalogando obsessivamente o mundo. Sua obra é hoje reconhecida como uma das mais importantes da arte brasileira do século XX.",
    obras: [
      { titulo: "Manto da Apresentação", ano: "c. 1980s", material: "bordado em tecido azul com fios e objetos", local: "Museu Bispo do Rosário Arte Contemporânea, Rio de Janeiro" },
      { titulo: "Navio", ano: "s.d.", material: "madeira, tecidos bordados e fios", local: "Museu Bispo do Rosário Arte Contemporânea, Rio de Janeiro" },
      { titulo: "Eu Vim ao Mundo (estandarte)", ano: "s.d.", material: "bordado e objetos costurados em tecido", local: "Museu Bispo do Rosário Arte Contemporânea, Rio de Janeiro" },
    ],
  },
  "Cândido Portinari": {
    bio: "Pintor brasileiro (1903–1962) que documentou o povo com força expressiva — retirantes, trabalhadores, crianças e festas populares. Seus murais e telas estão entre as obras mais significativas da arte brasileira do século XX.",
    obras: [
      { titulo: "Retirantes", ano: "1944", material: "óleo sobre tela", local: "MASP — Museu de Arte de São Paulo" },
      { titulo: "Guerra e Paz (dois painéis)", ano: "1956", material: "afresco sobre painel", local: "Sede da ONU, Nova York" },
      { titulo: "Café", ano: "1935", material: "óleo sobre tela", local: "Museu Nacional de Belas Artes, Rio de Janeiro" },
    ],
  },
  "Anna Maria Maiolino": {
    bio: "Artista ítalo-brasileira (n. 1942) que une performance, fotografia, vídeo e cerâmica na investigação de memória, migração e o corpo. Seus trabalhos com argila exploram a repetição gestual como linguagem poética e política.",
    obras: [
      { titulo: "Por um Fio", ano: "1976", material: "fotoperformance", local: "acervo MAM São Paulo" },
      { titulo: "Entrevidas", ano: "1981", material: "fotoperformance (ovos sobre piso)", local: "acervo MAM São Paulo" },
      { titulo: "Aqui e Lá (instalação)", ano: "1995–2000s", material: "argila crua em rolos e bolinhas", local: "MoMA Nova York, Tate Modern e outros" },
    ],
  },
  "Vik Muniz": {
    bio: "Artista paulistano (n. 1961) radicado em Nova York, famoso por recriar imagens icônicas com materiais inusitados — chocolate, lixo, açúcar, diamantes. Seu processo de criar, fotografar e destruir questiona o valor da imagem e o papel da ilusão na arte.",
    obras: [
      { titulo: "Marat (Sebastião) — série Pictures of Garbage", ano: "2008", material: "fotografia (feita com lixo)", local: "coleções internacionais" },
      { titulo: "Cleo — série Pictures of Chocolate", ano: "1997", material: "fotografia (feita com calda de chocolate)" },
      { titulo: "Double Mona Lisa — série Pictures of Diamonds", ano: "1999", material: "fotografia (feita com diamantes)" },
    ],
  },
  "Adriana Varejão": {
    bio: "Artista carioca (n. 1964) que usa o azulejo português como suporte para investigar colonização, miscigenação e violência na história do Brasil. Suas obras evocam corpos, carne e arquitetura de forma perturbadora e poética.",
    obras: [
      { titulo: "Proposta para uma Catequese", ano: "1994", material: "óleo sobre tela e MDF recortado" },
      { titulo: "Ruína de São Francisco Xavier", ano: "1992", material: "azulejo e óleo sobre tela" },
      { titulo: "Celacanto Provoca Maremoto (instalação)", ano: "2004–2008", material: "azulejos em trompe l'oeil com fissuras", local: "Instituto Inhotim, Brumadinho, MG" },
    ],
  },
  "Rosana Paulino": {
    bio: "Artista paulistana (n. 1967) que investiga as marcas da escravidão no corpo e na identidade da mulher negra brasileira. Usando costura, bordado, impressão e fotografia, cria obras que confrontam apagamentos históricos com urgência poética.",
    obras: [
      { titulo: "Parede da Memória", ano: "1994/2015", material: "instalação com fotografias, tecido e linha", local: "Museu Afro Brasil, São Paulo" },
      { titulo: "As Filhas de Eva", ano: "1997", material: "gravura e bordado" },
      { titulo: "Sutura", ano: "1997", material: "fotografia e bordado sobre papel", local: "Museu Afro Brasil, São Paulo" },
    ],
  },
  "Erika Verzutti": {
    bio: "Artista paulistana (n. 1971) cujas esculturas fundem formas orgânicas — frutas, animais, plantas — com referências da história da arte ocidental. Trabalha com cerâmica, bronze e papier-mâché, criando objetos que transitam entre o familiar e o estranho.",
    obras: [
      { titulo: "Caju", ano: "2010", material: "bronze e cerâmica" },
      { titulo: "Crocodilo", ano: "2012", material: "bronze e cerâmica pintada" },
      { titulo: "Instalação na 29ª Bienal de São Paulo", ano: "2010", material: "cerâmica e bronze", local: "Bienal de São Paulo" },
    ],
  },
  "Almandrade": {
    bio: "Artista baiano (n. 1951) que articula poesia visual, pintura e instalação, investigando a linguagem como sistema de signos. Transita entre o Concretismo brasileiro e a arte conceitual contemporânea, com obras que exigem a participação ativa do leitor-espectador.",
    obras: [
      { titulo: "Série de pinturas com signos e letras", ano: "1970s–2000s", material: "óleo sobre tela", local: "Museu de Arte Moderna da Bahia, Salvador" },
      { titulo: "Poemas visuais (série)", ano: "1970s–presente", material: "tinta sobre papel e tela" },
      { titulo: "Instalações poético-visuais", ano: "2000s–presente", material: "objetos, texto e luz", local: "exposições no Brasil e exterior" },
    ],
  },
  "Yayoi Kusama": {
    bio: "Artista japonesa (n. 1929) que desde os anos 1950 explora obsessivamente o padrão de bolinhas como forma de autoapagamento e de infinito. Sobrevivente de trauma e pioneira da arte conceitual e da performance, com obra que vai de pinturas a instalações imersivas mundialmente conhecidas.",
    obras: [
      { titulo: "Infinity Mirror Room — Phalli's Field", ano: "1965", material: "instalação com espelhos e formas de tecido preenchido" },
      { titulo: "Pumpkin (escultura)", ano: "1994", material: "fibra de vidro e esmalte amarelo com bolinhas pretas", local: "Benesse Art Site, Naoshima, Japão" },
      { titulo: "Dots Obsession (instalação)", ano: "2002–presente", material: "balões e adesivos de bolinhas", local: "museus e galerias em todo o mundo" },
    ],
  },
  "Louise Bourgeois": {
    bio: "Artista franco-americana (1911–2010) que transformou trauma, memória e o corpo em esculturas de grande escala e instalações perturbadoras. Sua aranha gigante 'Maman' é um dos ícones incontornáveis da arte do século XX.",
    obras: [
      { titulo: "Maman", ano: "1999", material: "aço inoxidável e mármore", local: "Museu Guggenheim, Bilbao; National Gallery of Canada, Ottawa; e outras coleções" },
      { titulo: "Cell (You Better Grow Up)", ano: "1993", material: "instalação com vidro, mármore, cerâmica e metal", local: "MoMA, Nova York" },
      { titulo: "The Destruction of the Father", ano: "1974", material: "látex, plástico, madeira e tecido" },
    ],
  },
  "Kara Walker": {
    bio: "Artista americana (n. 1969) que usa silhuetas em papel recortado para narrar a história da escravidão e do racismo nos EUA com brutalidade poética. Suas obras provocadoras são fundamentais para entender raça, gênero e poder na arte contemporânea.",
    obras: [
      { titulo: "Gone: An Historical Romance... (mural de 8,5 m)", ano: "1994", material: "silhuetas em papel recortado coladas na parede" },
      { titulo: "A Subtlety (obra efêmera)", ano: "2014", material: "instalação em açúcar e melaço", local: "Domino Sugar Refinery, Brooklyn (demolida)" },
      { titulo: "Fons Americanus (escultura de 13 m)", ano: "2019", material: "escultura em cortiça pintada", local: "Tate Modern, Londres" },
    ],
  },
  "Jean-Michel Basquiat": {
    bio: "Artista nova-iorquino (1960–1988) de origem haitiana-porto-riquenha que emergiu do grafite para o mercado internacional de arte. Suas pinturas combinam texto, símbolo, anatomia e crítica racial com energia expressionista urgente e incontrolável.",
    obras: [
      { titulo: "Untitled (Skull)", ano: "1981", material: "acrílica e bastão de óleo sobre tela", local: "The Broad, Los Angeles" },
      { titulo: "Hollywood Africans", ano: "1983", material: "acrílica e bastão de óleo sobre tela", local: "Whitney Museum of American Art, Nova York" },
      { titulo: "Irony of Negro Policeman", ano: "1981", material: "acrílica sobre tela", local: "coleção privada" },
    ],
  },
  "Barbara Kruger": {
    bio: "Artista americana (n. 1945) que usa a estética da publicidade — texto em negrito sobre fotos em preto e branco — para criticar poder, gênero e consumismo. Seu estilo inconfundível influenciou décadas de design gráfico e arte política.",
    obras: [
      { titulo: "Untitled (Your Body is a Battleground)", ano: "1989", material: "fotografia e serigrafia", local: "Broad Art Foundation e coleções internacionais" },
      { titulo: "Untitled (I Shop Therefore I Am)", ano: "1987", material: "fotografia serigrafada sobre vinil" },
      { titulo: "Untitled (We Don't Need Another Hero)", ano: "1987", material: "fotografia serigrafada" },
    ],
  },
  "Andy Goldsworthy": {
    bio: "Artista britânico (n. 1956) que cria esculturas efêmeras diretamente na natureza usando folhas, pedras, gelo e galhos — sem cola nem tinta industrial. Fotografa o processo e o desaparecimento das obras, tornando o tempo um elemento central da arte.",
    obras: [
      { titulo: "Rowan Leaves and Hole", ano: "1987", material: "folhas de freixo sobre pedra (efêmero, documentado em fotografia)" },
      { titulo: "Storm King Wall (292 m)", ano: "1997–98", material: "muro de pedra seca sinuoso", local: "Storm King Art Center, Nova York" },
      { titulo: "Balanced Rocks (série)", ano: "1978–presente", material: "pedras equilibradas na natureza (efêmero)" },
    ],
  },
  "Arte indígena brasileira": {
    bio: "As tradições visuais e materiais dos povos originários do Brasil abrangem cerâmica, tecelagem, grafismo corporal e plumária, cada povo com linguagem visual própria. São sistemas estéticos vivos que articulam cosmologia, identidade e relação com o território.",
    obras: [
      { titulo: "Grafismo corporal Kayapó", ano: "tradição viva", material: "pintura com jenipapo e urucum sobre o corpo", local: "Pará e Mato Grosso" },
      { titulo: "Kusiwa — arte gráfica Wajãpi (Patrimônio Imaterial UNESCO, 2003)", ano: "tradição viva", material: "desenho com jenipapo sobre pele, tecido e cerâmica", local: "Amapá" },
      { titulo: "Cestaria Yanomami", ano: "tradição viva", material: "palha trançada com pigmentos naturais", local: "Amazônia venezuelana e brasileira" },
    ],
  },
  "Wabi-sabi japonês": {
    bio: "Filosofia estética japonesa que encontra beleza na imperfeição, impermanência e incompletude. Na cerâmica, manifesta-se em peças rústicas, assimétricas, com marcas visíveis do tempo e do fogo — como nas tradições Raku e Bizen.",
    obras: [
      { titulo: "Tigela Raku (Cha-wan)", ano: "séc. XVI–presente", material: "cerâmica construída à mão, queima rápida em baixa temperatura", local: "Museu Raku, Kyoto" },
      { titulo: "Cerâmica Bizen (Bizen-yaki)", ano: "séc. XII–presente", material: "grés sem esmalte, marcas de cinza e fogo", local: "Prefeitura de Okayama, Japão" },
      { titulo: "Kintsukuroi (vaso reparado com ouro)", ano: "séc. XVI–presente", material: "cerâmica quebrada reparada com laca e ouro em pó", local: "coleções de museus japoneses e internacionais" },
    ],
  },
  "Arte Povera italiana": {
    bio: "Movimento italiano (anos 1960–70) que rejeitou os materiais nobres em favor de elementos cotidianos e 'pobres' — pedra, terra, madeira, vidro, pano. Artistas como Jannis Kounellis, Mario Merz e Michelangelo Pistoletto questionavam o consumismo e o sistema da arte.",
    obras: [
      { titulo: "Untitled (12 Horses) — Jannis Kounellis", ano: "1969", material: "cavalos vivos instalados em galeria (obra efêmera)", local: "Galleria L'Attico, Roma" },
      { titulo: "Igloo di Giap — Mario Merz", ano: "1968", material: "canos de metal, argila e neon", local: "Galleria Sperone, Turin" },
      { titulo: "Venere degli Stracci — Michelangelo Pistoletto", ano: "1967", material: "escultura de mármore e pilha de trapos coloridos", local: "Tate Modern, Londres e coleções internacionais" },
    ],
  },
  "Fluxus": {
    bio: "Movimento internacional (anos 1960–70) que mesclou artes visuais, música e performance de forma radical e bem-humorada. Yoko Ono, Nam June Paik e Joseph Beuys foram participantes; o Fluxus valorizava o processo, o acidente e a participação do público.",
    obras: [
      { titulo: "Grapefruit (livro de instruções) — Yoko Ono", ano: "1964", material: "publicação com instruções para obras realizadas pelo leitor" },
      { titulo: "TV Buddha — Nam June Paik", ano: "1974", material: "escultura de Buda diante de câmera e monitor em circuito fechado", local: "Stedelijk Museum, Amsterdã" },
      { titulo: "I Like America and America Likes Me — Joseph Beuys", ano: "1974", material: "performance com coiote vivo por 3 dias (obra efêmera)", local: "René Block Gallery, Nova York" },
    ],
  },
  "Grafite e muralismo brasileiro": {
    bio: "O grafite e muralismo urbano brasileiro têm raízes na pichação dos anos 1980 e cresceram para uma linguagem visual sofisticada internacionalmente reconhecida. São Paulo é uma das capitais mundiais do grafite, com artistas como Os Gêmeos, Eduardo Kobra e Cranio.",
    obras: [
      { titulo: "Voodoo Doll — Os Gêmeos", ano: "2013", material: "spray sobre parede (mural)", local: "Nova York, EUA" },
      { titulo: "Etnias — Eduardo Kobra (3.000 m²)", ano: "2016", material: "tinta spray sobre parede", local: "Zona Portuária, Rio de Janeiro" },
      { titulo: "Índio Azul (série de murais) — Cranio", ano: "2010s–presente", material: "spray sobre muros", local: "São Paulo e cidades do mundo" },
    ],
  },
};

// ─── TIPOS ────────────────────────────────────────────────────────────────────

type Foco = "artesvisuais" | "ceramica" | "desenho" | "crazy";
type Duracao = "rapido" | "projeto" | "tecnico";
type Nivel = "iniciante" | "intermediario" | "avancado";

interface Desafio {
  verbo: string; material: string; restricao: string;
  referencia: string; intencao: string;
  duracao: string; formato: string;
  criterio: "A"|"B"|"C"|"D";
  keyConcept: string;
  atlSkills: string[];
}

// ─── UTILITÁRIOS ──────────────────────────────────────────────────────────────

function rand<T>(lista: T[]): T {
  return lista[Math.floor(Math.random() * lista.length)];
}

function getMateriais(foco: Foco) {
  if (foco === "artesvisuais") return MATERIAIS_ARTESVISUAIS;
  if (foco === "ceramica") return MATERIAIS_CERAMICA;
  if (foco === "desenho") return MATERIAIS_DESENHO;
  return MATERIAIS_CRAZY;
}

function getRestricoes(nivel: Nivel) {
  if (nivel === "iniciante") return RESTRICOES_INICIANTE;
  if (nivel === "avancado") return [...RESTRICOES_INTERMEDIARIO, ...RESTRICOES_AVANCADO];
  return [...RESTRICOES_INICIANTE, ...RESTRICOES_INTERMEDIARIO];
}

function getDuracao(duracao: Duracao): { tempo: string; formato: string } {
  if (duracao === "rapido") return { tempo: rand(["5 min","10 min","15 min"]), formato: "exercício rápido" };
  if (duracao === "projeto") return { tempo: rand(["1 aula","projeto de semana"]), formato: "projeto investigativo" };
  return { tempo: rand(["30 min","1 aula"]), formato: "exercício técnico com intenção poética" };
}

function gerarReflexoes(verbo: string, intencao: string, restricao: string): string[] {
  return [
    `Como a ideia de "${intencao}" aparece no seu processo?`,
    `O que muda quando você ${verbo} com essa restrição?`,
    `Que decisões surgiram que você não esperava tomar?`,
    `O que o material disse que você não havia planejado?`,
  ];
}

function desafioParaTexto(d: Desafio): string {
  return `${d.verbo.charAt(0).toUpperCase() + d.verbo.slice(1)} a ideia de "${d.intencao}" usando ${d.material}, com a restrição: ${d.restricao}. Inspire-se em ${d.referencia}.\n⏱ ${d.duracao} · ${d.formato}`;
}

// ─── ÍCONES SVG ───────────────────────────────────────────────────────────────

const IconVerbo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);
const IconMaterial = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
  </svg>
);
const IconRestricao = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
  </svg>
);
const IconReferencia = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IconIntencao = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export default function ARTbotPage() {
  const [desafio, setDesafio] = useState<Desafio | null>(null);
  const [reflexoes, setReflexoes] = useState<string[]>([]);
  const [copiado, setCopiado] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [foco, setFoco] = useState<Foco>("artesvisuais");
  const [duracao, setDuracao] = useState<Duracao>("rapido");
  const [nivel, setNivel] = useState<Nivel>("intermediario");

  const handleGerar = useCallback(() => {
    const { tempo, formato } = getDuracao(duracao);
    const verbo = rand(VERBOS);
    const intencao = rand(INTENCOES);
    const restricao = rand(getRestricoes(nivel));
    const criterio = VERBO_CRITERIO[verbo] ?? "C";
    const novo: Desafio = {
      verbo,
      intencao,
      material: rand(getMateriais(foco)),
      restricao,
      referencia: rand(REFERENCIAS),
      duracao: tempo,
      formato,
      criterio,
      keyConcept: INTENCAO_CONCEITO[intencao] ?? "Creativity",
      atlSkills: getATLSkills(criterio),
    };
    setDesafio(novo);
    setReflexoes(gerarReflexoes(verbo, intencao, restricao));
    setAnimKey(k => k + 1);
    setCopiado(false);
  }, [foco, duracao, nivel]);

  const handleCopiar = useCallback(async () => {
    if (!desafio) return;
    const texto = desafioParaTexto(desafio);
    try { await navigator.clipboard.writeText(texto); }
    catch { const el = document.createElement("textarea"); el.value = texto; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el); }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }, [desafio]);

  const handleImprimir = useCallback(() => { if (desafio) window.print(); }, [desafio]);

  const artistaInfo = desafio ? (ARTISTAS_INFO[desafio.referencia] ?? null) : null;

  // Estilos reutilizáveis
  const S = {
    bg: "#F8F9FF", card: "#FFFFFF", borda: "#E0E0F0",
    texto: "#1A1A2E", medio: "#4A4A6A", suave: "#9090B0",
    vermelho: "#FF5252", laranja: "#FF9500", amarelo: "#FFC300",
    verde: "#06D6A0", azul: "#118AB2", roxo: "#9B5DE5", rosa: "#F15BB5",
    grad: "linear-gradient(90deg, #FF5252, #FF9500, #FFC300, #06D6A0, #118AB2, #9B5DE5)",
    label: { fontSize: "0.6rem", letterSpacing: "0.12em", fontWeight: 700 } as React.CSSProperties,
  };

  const btnFiltro = (ativo: boolean, cor = S.azul): React.CSSProperties => ({
    padding: "6px 14px", borderRadius: 8, fontSize: "0.8rem", cursor: "pointer",
    border: `1.5px solid ${ativo ? cor : S.borda}`,
    backgroundColor: ativo ? cor : S.card,
    color: ativo ? "#FFFFFF" : S.medio,
    fontWeight: ativo ? 700 : 400,
    transition: "all 0.15s",
  });

  const elementoIcone = [
    { label: "VERBO DE AÇÃO",        icon: <IconVerbo />,      cor: S.vermelho },
    { label: "MATERIAL / TÉCNICA",   icon: <IconMaterial />,   cor: S.laranja  },
    { label: "RESTRIÇÃO CRIATIVA",   icon: <IconRestricao />,  cor: S.verde    },
    { label: "REFERÊNCIA ARTÍSTICA", icon: <IconReferencia />, cor: S.azul     },
    { label: "INTENÇÃO POÉTICA",     icon: <IconIntencao />,   cor: S.roxo     },
  ];

  return (
    <div style={{ backgroundColor: S.bg, minHeight: "100vh", fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* HEADER */}
      <header style={{ backgroundColor: S.card, borderBottom: `4px solid transparent`, borderImage: `${S.grad} 1` }}
        className="px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1">
            {"ART".split("").map((letra, i) => {
              const cores = [S.vermelho, S.laranja, S.amarelo];
              return <span key={i} style={{ color: cores[i], fontSize: "1.5rem", fontWeight: 900, letterSpacing: "0.1em" }}>{letra}</span>;
            })}
            <span style={{ color: S.azul, fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.1em" }}>bot</span>
          </div>
          <p style={{ color: S.suave, fontSize: "0.65rem", letterSpacing: "0.12em", marginTop: 2 }}>
            GERADOR DE DESAFIOS CRIATIVOS
          </p>
        </div>
        <p style={{ color: S.suave, fontSize: "0.7rem", fontStyle: "italic", textAlign: "right", maxWidth: 200, lineHeight: 1.5 }}>
          Investigação. Transformação.<br/>Arte. Criação Autoral.
        </p>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* COLUNA ESQUERDA — Desafio */}
          <div className="flex-1">
            <h2 style={{ color: S.texto, fontSize: "1.1rem", marginBottom: 16, fontWeight: 400 }}>
              Seu desafio artístico ✦
            </h2>

            {/* CARD DO DESAFIO */}
            <div key={animKey} style={{ backgroundColor: S.card, border: `1px solid ${S.borda}`, borderRadius: 16, overflow: "hidden", marginBottom: 16, borderTop: `4px solid transparent`, borderImage: `${S.grad} 1` }}>

              {!desafio ? (
                <div style={{ padding: 48, textAlign: "center" }}>
                  <p style={{ color: S.suave, fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.8, marginBottom: 28 }}>
                    Um desafio pode ser um convite para sair do lugar comum.
                  </p>
                  <button onClick={handleGerar}
                    style={{ padding: "14px 32px", background: S.grad, color: "#FFFFFF", border: "none", borderRadius: 10, fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.08em", cursor: "pointer", fontFamily: "Georgia, serif", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    Gerar desafio ✦
                  </button>
                </div>
              ) : (
                <>
                <div style={{ padding: "28px 28px 0 28px" }}>
                  {/* Elementos com ícones */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                    {elementoIcone.map((el, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ color: el.cor, flexShrink: 0 }}>{el.icon}</div>
                        <span style={{ ...S.label, color: el.cor, textTransform: "uppercase" }}>{el.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Texto principal do desafio */}
                  <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", lineHeight: 1.9, color: S.texto, marginBottom: 24 }}>
                    <span style={{ color: S.vermelho, fontStyle: "italic", fontWeight: 700 }}>
                      {desafio.verbo.charAt(0).toUpperCase() + desafio.verbo.slice(1)}
                    </span>
                    {" "}
                    <span style={{ color: S.laranja }}>
                      {desafio.material},
                    </span>
                    <br />
                    <span style={{ color: S.verde }}>
                      {desafio.restricao},
                    </span>
                    <br />
                    <span style={{ color: S.medio }}>inspirado em </span>
                    <span style={{ color: S.azul, fontStyle: "italic" }}>
                      {desafio.referencia}
                    </span>
                    <span style={{ color: S.medio }}>,</span>
                    <br />
                    <span style={{ color: S.medio }}>para investigar a ideia de </span>
                    <span style={{ color: S.roxo, fontWeight: 700 }}>
                      {desafio.intencao}
                    </span>
                    <span style={{ color: S.medio }}>.</span>
                  </p>

                  {/* Metadados */}
                  <div style={{ borderTop: `1px solid ${S.borda}`, padding: "12px 0", display: "flex", gap: 20, flexWrap: "wrap" }}>
                    <span style={{ color: S.suave, fontSize: "0.78rem", display: "flex", alignItems: "center", gap: 6 }}>
                      ⏱ <strong style={{ color: S.azul }}>Duração:</strong> {desafio.duracao}
                    </span>
                    <span style={{ color: S.suave, fontSize: "0.78rem", display: "flex", alignItems: "center", gap: 6 }}>
                      ◎ <strong style={{ color: S.laranja }}>Formato:</strong> {desafio.formato}
                    </span>
                    <span style={{ color: S.suave, fontSize: "0.78rem", display: "flex", alignItems: "center", gap: 6 }}>
                      ◈ <strong style={{ color: S.roxo }}>Nível:</strong> {nivel === "iniciante" ? "Iniciante" : nivel === "avancado" ? "Avançado" : "Intermediário"}
                    </span>
                  </div>
                </div>

                {/* SEÇÃO MYP */}
                <div style={{ backgroundColor: "#F4F6FF", borderTop: `1px solid ${S.borda}`, padding: "16px 28px" }}>
                  <p style={{ ...S.label, color: S.suave, textTransform: "uppercase", marginBottom: 10, letterSpacing: "0.12em", fontSize: "0.6rem", fontFamily: "Georgia, serif" }}>
                    IB MYP Arts
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                    {/* Criterion badge */}
                    <span style={{ backgroundColor: CRITERIO_INFO[desafio.criterio].cor, color: "#fff", borderRadius: 6, padding: "4px 12px", fontSize: "0.72rem", fontWeight: 700, fontFamily: "sans-serif" }}>
                      {CRITERIO_INFO[desafio.criterio].label}
                    </span>
                    <span style={{ color: CRITERIO_INFO[desafio.criterio].cor, fontSize: "0.78rem", fontWeight: 600, fontFamily: "sans-serif" }}>
                      {CRITERIO_INFO[desafio.criterio].nome}
                    </span>
                    <span style={{ color: S.borda, fontSize: "1rem" }}>·</span>
                    {/* Key Concept */}
                    <span style={{ border: `1.5px solid ${S.roxo}`, color: S.roxo, borderRadius: 20, padding: "3px 10px", fontSize: "0.7rem", fontFamily: "sans-serif" }}>
                      Key Concept: {desafio.keyConcept}
                    </span>
                    {/* ATL Skills */}
                    {desafio.atlSkills.map((s, i) => (
                      <span key={i} style={{ border: `1.5px solid ${S.verde}`, color: S.verde, borderRadius: 20, padding: "3px 10px", fontSize: "0.7rem", fontFamily: "sans-serif" }}>
                        ATL: {s}
                      </span>
                    ))}
                  </div>
                </div>
                </>
              )}

              {/* Barra de ações */}
              {desafio && (
                <div style={{ borderTop: `1px solid ${S.borda}`, padding: "12px 16px", display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={handleCopiar} style={{ ...btnFiltro(copiado), fontSize: "0.75rem" }}>
                    {copiado ? "✓ Copiado" : "◻ Copiar desafio"}
                  </button>
                  <button onClick={handleImprimir} style={{ ...btnFiltro(false), fontSize: "0.75rem" }}>
                    ⎙ Imprimir
                  </button>
                  <button onClick={handleGerar} style={{ ...btnFiltro(false), fontSize: "0.75rem", marginLeft: "auto" }}>
                    ↺ Gerar novo desafio
                  </button>
                </div>
              )}
            </div>

            {/* PARA REFLETIR */}
            {desafio && reflexoes.length > 0 && (
              <div style={{ backgroundColor: S.card, border: `1px solid ${S.borda}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
                <h3 style={{ color: S.texto, fontSize: "0.85rem", fontWeight: 700, marginBottom: 12, letterSpacing: "0.05em" }}>
                  Para refletir
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {reflexoes.map((r, i) => {
                    const pontinhos = [S.vermelho, S.laranja, S.verde, S.azul];
                    return (
                      <li key={i} style={{ color: S.medio, fontSize: "0.85rem", lineHeight: 1.6, display: "flex", gap: 8 }}>
                        <span style={{ color: pontinhos[i % pontinhos.length], flexShrink: 0, fontWeight: 700 }}>•</span>
                        {r}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* SOBRE A REFERÊNCIA */}
            {desafio && artistaInfo && (
              <div style={{ backgroundColor: S.card, border: `1px solid ${S.borda}`, borderRadius: 16, padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ color: S.azul }}><IconReferencia /></div>
                  <h3 style={{ color: S.texto, fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em", margin: 0 }}>
                    Sobre a referência
                  </h3>
                </div>

                <p style={{ color: S.azul, fontSize: "1rem", fontWeight: 700, fontStyle: "italic", marginBottom: 10 }}>
                  {desafio.referencia}
                </p>

                <p style={{ color: S.medio, fontSize: "0.83rem", lineHeight: 1.75, marginBottom: 18 }}>
                  {artistaInfo.bio}
                </p>

                <p style={{ ...S.label, color: S.suave, textTransform: "uppercase", marginBottom: 12, fontSize: "0.6rem" }}>
                  Obras de referência
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {artistaInfo.obras.map((obra, i) => {
                    const cores = [S.azul, S.roxo, S.verde];
                    const cor = cores[i % cores.length];
                    return (
                      <li key={i} style={{ display: "flex", gap: 10 }}>
                        <span style={{ color: cor, flexShrink: 0, fontWeight: 700, fontSize: "1rem", lineHeight: 1.3 }}>●</span>
                        <div>
                          <p style={{ color: S.texto, fontSize: "0.83rem", fontWeight: 600, fontStyle: "italic", margin: 0, lineHeight: 1.4 }}>
                            &ldquo;{obra.titulo}&rdquo;
                          </p>
                          <p style={{ color: S.suave, fontSize: "0.75rem", margin: "3px 0 0 0", lineHeight: 1.5 }}>
                            {obra.ano} · {obra.material}
                            {obra.local && (
                              <span style={{ color: S.suave }}> · <em>{obra.local}</em></span>
                            )}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* COLUNA DIREITA — Filtros */}
          <div style={{ width: "100%", maxWidth: 280 }} className="lg:w-72 lg:flex-shrink-0">
            <div style={{ backgroundColor: S.card, border: `1px solid ${S.borda}`, borderRadius: 16, padding: 24, position: "sticky", top: 24 }}>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <h3 style={{ color: S.texto, fontSize: "0.9rem", fontWeight: 700 }}>Filtros</h3>
                <span style={{ color: S.suave, fontSize: "1rem" }}>⚙</span>
              </div>

              {/* Duração */}
              <div style={{ marginBottom: 18 }}>
                <p style={{ ...S.label, color: S.azul, textTransform: "uppercase", marginBottom: 8 }}>Duração</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(["rapido","projeto","tecnico"] as Duracao[]).map(d => (
                    <button key={d} style={btnFiltro(duracao === d, S.azul)} onClick={() => setDuracao(d)}>
                      {d === "rapido" ? "Rápido" : d === "projeto" ? "Projeto" : "Técnico"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Foco */}
              <div style={{ marginBottom: 18 }}>
                <p style={{ ...S.label, color: S.laranja, textTransform: "uppercase", marginBottom: 8 }}>Foco</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(["artesvisuais","ceramica","desenho","crazy"] as Foco[]).map(f => (
                    <button key={f} style={btnFiltro(foco === f, S.laranja)} onClick={() => setFoco(f)}>
                      {f === "artesvisuais" ? "Artes Visuais" : f === "ceramica" ? "Cerâmica" : f === "desenho" ? "Desenho" : "Crazy"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nível */}
              <div style={{ marginBottom: 24 }}>
                <p style={{ ...S.label, color: S.roxo, textTransform: "uppercase", marginBottom: 8 }}>Nível</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(["iniciante","intermediario","avancado"] as Nivel[]).map(n => (
                    <button key={n} style={btnFiltro(nivel === n, S.roxo)} onClick={() => setNivel(n)}>
                      {n === "iniciante" ? "Iniciante" : n === "avancado" ? "Avançado" : "Intermediário"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Crédito pedagógico */}
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${S.borda}` }}>
                <p style={{ color: S.suave, fontSize: "0.65rem", lineHeight: 1.7, textAlign: "center", fontStyle: "italic" }}>
                  Inspirado em Dewey, Ana Mae Barbosa,<br/>
                  Edith Derdik, Fernando Hernández<br/>
                  e Elliot Eisner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `4px solid transparent`, borderImage: `${S.grad} 1`, padding: "24px 16px", marginTop: 32, textAlign: "center", backgroundColor: S.card }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em" }}>
          {"ARTbot".split("").map((l, i) => {
            const cores = [S.vermelho, S.laranja, S.amarelo, S.verde, S.azul, S.roxo];
            return <span key={i} style={{ color: cores[i % cores.length] }}>{l}</span>;
          })}
          <span style={{ color: S.medio }}> — Gerador de Desafios Artísticos</span>
        </p>
        <p style={{ color: S.suave, fontSize: "0.7rem", marginTop: 4, fontStyle: "italic" }}>
          Barro na Veia · Escola de cerâmica · Uma ferramenta para provocar a criação, a investigação e a autoria.
        </p>
      </footer>

      {/* PRINT STYLE */}
      <style>{`
        @media print {
          header, footer, .lg\\:w-72 { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
