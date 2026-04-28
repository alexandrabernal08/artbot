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
              <div style={{ backgroundColor: S.card, border: `1px solid ${S.borda}`, borderRadius: 16, padding: 24 }}>
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
