// =====================================================================
//  CONTEÚDO DO SITE — edite aqui textos, preços, contatos e imagens.
//  Tudo marcado com (FICTÍCIO) é provisório e deve ser trocado.
//  Imagens: coloque os arquivos em /public/img e use "img/nome.jpg".
//  Vídeos:  coloque em /public/videos e use "videos/nome.mp4".
// =====================================================================

export const contato = {
  nome: 'Rebeka',
  instagram: 'byreebeka',
  whatsapp: '5512999999999', // (FICTÍCIO) só números, com 55 + DDD
  mensagemWhats: 'Oi Rebeka! Vi seu portfólio e quero um orçamento.',
  email: 'contato@byreebeka.com.br', // (FICTÍCIO)
  behance: 'https://www.behance.net/', // (FICTÍCIO)
  cidade: 'São José dos Campos — SP', // (FICTÍCIO)
}

export const linkWhats = (texto = contato.mensagemWhats) =>
  `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(texto)}`

export const menu = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Stories', href: '#stories' },
  { label: 'Pacotes', href: '#pacotes' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Contato', href: '#contato' },
]

export const hero = {
  foto: 'img/rebeka-1.jpg',
  linha1: 'Histórias',
  linha2: 'em movimento.',
  ladoEsquerdo: 'Videomaker & Storymaker',
  ladoDireito: 'Social media & Design',
}

export const manifesto = {
  texto:
    'Seu conteúdo merece cara de cinema — sem perder a verdade da sua rotina.',
  destaque: ['cinema', 'verdade'],
  apoio:
    'Capto, edito e planejo vídeos e stories para marcas, profissionais, doutores e eventos que querem ser vistos — e lembrados.',
  assinatura: 'vamos criar juntos',
}

export const sobre = {
  kicker: 'quem faz tudo isso',
  fotoPrincipal: 'img/rebeka-1.jpg',
  legendaPolaroid: 'Rebeka',
  // Fotos da tira de filme — troque pelos seus arquivos (FICTÍCIO)
  tiraDeFilme: ['', '', ''],
  paragrafos: [
    'Sou videomaker, storymaker e designer de redes sociais. Produzo conteúdo para marcas, profissionais, doutores e eventos.',
    'Todos os vídeos são gravados e editados por mim — do roteiro ao último corte.',
  ],
  destaque:
    'Conteúdo bom não é sorte: é olhar, estratégia e constância.',
}

export const faixa = ['Videomaker', 'Storymaker', 'Social Media', 'Design', 'Reels', 'Eventos']

export const servicos = [
  {
    titulo: 'Videomaker',
    texto: 'Reels e vídeos curtos com roteiro, captação e edição com estética de cinema.',
  },
  {
    titulo: 'Storymaker',
    texto: 'Captação e edição de stories em tempo real durante eventos, atendimentos e ações.',
  },
  {
    titulo: 'Social Media',
    texto: 'Planejamento de temas, calendário e acompanhamento do perfil mês a mês.', // (FICTÍCIO)
  },
  {
    titulo: 'Design',
    texto: 'Capas, carrosséis e identidade visual para o feed ficar com a sua cara.', // (FICTÍCIO)
  },
]

export const stories = {
  kicker: 'de storymaker',
  descricao:
    'Captação e edição de stories em tempo real durante eventos, atendimentos, ações e rotina profissional.',
  precos: [
    { nome: 'Cobertura de até 2 horas', detalhe: 'Eventos pequenos, atendimentos e ações pontuais.', preco: 'R$ 400' },
    { nome: 'Cobertura de até 3 horas', detalhe: 'Eventos médios e dias de gravação mais longos.', preco: 'R$ 500' }, // detalhe (FICTÍCIO)
    { nome: 'Cobertura de até 4 horas', detalhe: 'Eventos completos, do começo ao fim.', preco: 'R$ 600' }, // (FICTÍCIO)
  ],
}

export const reels = {
  kicker: 'de videomaker',
  precos: [
    { nome: 'Reel simples', detalhe: 'Captação rápida e edição dinâmica.', preco: 'R$ 180', aPartir: false }, // (FICTÍCIO)
    { nome: 'Reel intermediário', detalhe: 'Roteiro, mais cenas e trilha.', preco: 'R$ 280', aPartir: false }, // (FICTÍCIO)
    { nome: 'Reel elaborado', detalhe: 'Produção completa, várias locações.', preco: 'R$ 380', aPartir: true },
  ],
}

export const pacotes = {
  kicker: 'de videomaker',
  itens: [
    {
      nome: 'Reels Essencial',
      preco: 'R$ 550',
      inclui: [
        '3 Reels simples',
        '1 sessão de captação de até 2 horas',
        'Planejamento básico dos temas',
        '1 rodada de ajustes por vídeo',
      ],
    },
    {
      nome: 'Conteúdo em Dia',
      preco: 'R$ 1.000',
      destaque: true,
      selo: 'mais escolhido',
      inclui: [ // (FICTÍCIO)
        '6 Reels (simples e intermediários)',
        '2 sessões de captação',
        'Planejamento mensal de conteúdo',
        'Capas personalizadas para o feed',
        '2 rodadas de ajustes por vídeo',
      ],
    },
    {
      nome: 'Presença Completa',
      preco: 'R$ 1.800',
      inclui: [ // (FICTÍCIO)
        '8 Reels + 1 cobertura de stories',
        '3 sessões de captação',
        'Planejamento e calendário editorial',
        'Design de carrosséis e capas',
        'Relatório mensal de resultados',
      ],
    },
  ],
}

// Categorias do filtro do portfólio (ligadas ao "tipo" de cada item)
export const categorias = [
  { label: 'Todos', tipo: null },
  { label: 'Reels', tipo: 'reels' },
  { label: 'Stories', tipo: 'stories' },
  { label: 'Posts', tipo: 'post' },
]

// Itens do portfólio, mostrados dentro de celulares (FICTÍCIO)
// tipo:  'reels' | 'stories' | 'post'   → muda a tela do celular
// capa:  'img/arquivo.jpg'  (foto)      video: 'videos/arquivo.mp4'
// perfil: @ do cliente (sem o @)        avatar: foto do perfil do cliente
// Sem capa/vídeo aparece um fundo nas cores do site com a "frase".
export const portfolio = [
  { titulo: 'Clínica Aurora', tipo: 'reels', perfil: 'clinicaaurora', legenda: 'Um dia na clínica: do primeiro atendimento ao sorriso final ✨', frase: 'bastidores', fundo: 'linear-gradient(170deg,#c08a5a,#7a3a2a 55%,#3D0B16)', capa: '', video: '' },
  { titulo: 'Lançamento Ateliê', tipo: 'stories', perfil: 'atelieflor', frase: 'ao vivo', fundo: 'linear-gradient(170deg,#8a3a2c,#5a1624 60%,#3D0B16)', capa: '', video: '' },
  { titulo: 'Rebeka em Roma', tipo: 'post', perfil: 'byreebeka', legenda: 'Cada viagem vira roteiro. 🎬', capa: 'img/rebeka-1.jpg', avatar: 'img/rebeka-1.jpg', video: '' },
  { titulo: 'Café Lume', tipo: 'reels', perfil: 'cafelume', legenda: 'O café da manhã mais bonito da cidade ☕', frase: 'café & luz', fundo: 'linear-gradient(170deg,#e8cfa0,#a0604a 55%,#5a1624)', capa: '', video: '' },
  { titulo: 'Dra. Marina', tipo: 'post', perfil: 'dramarina', legenda: '3 mitos sobre clareamento que você precisa parar de acreditar.', frase: 'dica da dra.', fundo: 'linear-gradient(170deg,#d79c8f,#8a3a3c 60%,#3D0B16)', capa: '', video: '' },
  { titulo: 'Casamento L&M', tipo: 'stories', perfil: 'lemcasamento', frase: 'o grande dia', fundo: 'linear-gradient(170deg,#6a2a30,#3D0B16 60%,#24050C)', capa: '', video: '' },
]

export const depoimentos = [ // (FICTÍCIO)
  { nome: 'Juliana M.', cargo: 'Dentista', texto: 'Meu perfil mudou de nível. Os pacientes chegam falando dos vídeos.' },
  { nome: 'Carlos R.', cargo: 'Dono de restaurante', texto: 'Ela entende a marca e entrega rápido. Os Reels viraram nossa vitrine.' },
  { nome: 'Patrícia S.', cargo: 'Organizadora de eventos', texto: 'Os stories em tempo real fizeram o evento parecer ainda maior.' },
]

// Varal de polaroids — fotos de trabalhos (FICTÍCIO)
// Use imagem: 'img/nome.jpg'. Sem imagem, aparece uma paisagem pintada
// (paleta: 'vinho' | 'bege' | 'dusk' | 'rosa').
export const varal = {
  kicker: 'revelando',
  fotos: [
    { titulo: 'Ensaio Ateliê', legenda: 'Fotos de produto e bastidores para o lançamento.', imagem: '', paleta: 'vinho', seed: 3 },
    { titulo: 'Clínica Aurora', legenda: 'Retratos da equipe para o feed e o site.', imagem: '', paleta: 'bege', seed: 8 },
    { titulo: 'Casamento L&M', legenda: 'Making of e stories em tempo real.', imagem: '', paleta: 'dusk', seed: 14 },
    { titulo: 'Café Lume', legenda: 'Fotos de cardápio e ambiente.', imagem: '', paleta: 'rosa', seed: 21 },
    { titulo: 'Dra. Marina', legenda: 'Ensaio de posicionamento profissional.', imagem: '', paleta: 'vinho', seed: 34 },
    { titulo: 'Studio Pilates', legenda: 'Conteúdo mensal: aulas e rotina.', imagem: '', paleta: 'bege', seed: 55 },
  ],
}
