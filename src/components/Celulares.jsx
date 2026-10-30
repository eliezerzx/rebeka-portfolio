import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Foto } from './Animacoes'
import './Celulares.css'

/*
 * Carrossel de celulares — cada aparelho mostra um trabalho no formato
 * em que ele aparece no perfil: Stories, Reels ou Post.
 * O do meio fica em destaque; os outros ficam em leque, em 3D.
 * Arraste para o lado, clique num celular ou use as setas. Avança sozinho.
 */

const mod = (i, n) => ((i % n) + n) % n

// ---------- ícones simples ----------
const I = {
  coracao: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  comentario: <path d="M20 12a8 8 0 1 1-3.2-6.4A8 8 0 0 1 20 12zm0 0v7l-3-2" />,
  enviar: <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7z" />,
  salvar: <path d="M6 3h12v18l-6-4-6 4z" />,
  mais: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  musica: <path d="M9 18V5l11-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3zm11-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" />,
  camera: <><rect x="3" y="6" width="18" height="14" rx="3" /><circle cx="12" cy="13" r="3.5" /><path d="M8 6l1.5-2h5L16 6" /></>,
}
const Icone = ({ nome, cheio }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill={cheio ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {I[nome]}
  </svg>
)

function Midia({ item, ativo }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (ativo) v.play().catch(() => {})
    else v.pause()
  }, [ativo])
  if (item.video) return <video ref={ref} className="cel__midia" src={item.video} poster={item.capa || undefined} muted loop playsInline preload="metadata" />
  if (item.capa) return <Foto src={item.capa} alt={item.titulo} className="cel__midia" />
  return (
    <div className="cel__midia cel__vazio" style={{ background: item.fundo }}>
      <span>{item.frase || item.titulo}</span>
    </div>
  )
}

const Avatar = ({ item }) => <span className="cel__avatar" style={item.avatar ? { backgroundImage: `url(${item.avatar})` } : undefined} />

// ---------- telas ----------
function TelaStories({ item, ativo }) {
  return (
    <div className="tela tela--stories">
      <Midia item={item} ativo={ativo} />
      <div className="tela__sombra-topo" />
      <div className="stories__barras">
        {[0, 1, 2].map((i) => <span key={i}><i className={i === 0 && ativo ? 'enchendo' : i === 0 ? 'cheia' : ''} /></span>)}
      </div>
      <div className="tela__perfil"><Avatar item={item} /><b>{item.perfil}</b><small>2 h</small></div>
      <div className="stories__rodape">
        <span className="stories__msg">Enviar mensagem</span>
        <Icone nome="coracao" /><Icone nome="enviar" />
      </div>
    </div>
  )
}

function TelaReels({ item, ativo }) {
  return (
    <div className="tela tela--reels">
      <Midia item={item} ativo={ativo} />
      <div className="tela__sombra-base" />
      <div className="reels__topo"><b>Reels</b><Icone nome="camera" /></div>
      <div className="reels__lateral">
        <span><Icone nome="coracao" /><small>{item.curtidas || '12,4 mil'}</small></span>
        <span><Icone nome="comentario" /><small>{item.comentarios || '318'}</small></span>
        <span><Icone nome="enviar" /><small>1.204</small></span>
        <span><Icone nome="mais" /></span>
      </div>
      <div className="reels__info">
        <div className="tela__perfil tela__perfil--base"><Avatar item={item} /><b>{item.perfil}</b><em>Seguir</em></div>
        <p>{item.legenda}</p>
        <small><Icone nome="musica" /> Áudio original</small>
      </div>
    </div>
  )
}

function TelaPost({ item, ativo }) {
  return (
    <div className="tela tela--post">
      <div className="post__topo"><Avatar item={item} /><b>{item.perfil}</b><Icone nome="mais" /></div>
      <div className="post__midia"><Midia item={item} ativo={ativo} /></div>
      <div className="post__acoes">
        <Icone nome="coracao" cheio /><Icone nome="comentario" /><Icone nome="enviar" />
        <span style={{ marginLeft: 'auto' }}><Icone nome="salvar" /></span>
      </div>
      <div className="post__texto">
        <b>{item.curtidas || '1.287'} curtidas</b>
        <p><b>{item.perfil}</b> {item.legenda}</p>
        <small>Ver todos os {item.comentarios || '48'} comentários</small>
      </div>
    </div>
  )
}

const TELAS = { stories: TelaStories, reels: TelaReels, post: TelaPost }

// ---------- celular ----------
function Celular({ item, ativo }) {
  const Tela = TELAS[item.tipo] || TelaReels
  return (
    <div className="cel">
      <span className="cel__botao cel__botao--1" /><span className="cel__botao cel__botao--2" /><span className="cel__botao cel__botao--3" />
      <div className="cel__tela">
        <div className="cel__status"><b>9:41</b><span className="cel__ilha" /><i /></div>
        <Tela item={item} ativo={ativo} />
      </div>
    </div>
  )
}

// ---------- carrossel ----------
export default function Celulares({ itens, autoplay = 4200 }) {
  const n = itens.length
  const [ativa, setAtiva] = useState(0)
  const [largura, setLargura] = useState(1200)
  const pausado = useRef(false)
  const toque = useRef(null)
  const rootRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setLargura(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!autoplay || n < 2) return
    const t = setInterval(() => { if (!pausado.current && !document.hidden) setAtiva((a) => a + 1) }, autoplay)
    return () => clearInterval(t)
  }, [autoplay, n])

  if (!n) return <p className="cels__vazio">Nenhum trabalho nesta categoria ainda.</p>

  const mobile = largura < 700
  const passo = mobile ? largura * 0.42 : Math.min(250, largura * 0.2)
  const visiveis = mobile ? 1 : 2
  const atual = mod(ativa, n)

  return (
    <div
      ref={rootRef}
      className="cels"
      onMouseEnter={() => (pausado.current = true)}
      onMouseLeave={() => (pausado.current = false)}
      onPointerDown={(e) => (toque.current = e.clientX)}
      onPointerUp={(e) => {
        if (toque.current == null) return
        const dx = e.clientX - toque.current
        toque.current = null
        if (Math.abs(dx) > 40) setAtiva((a) => a + (dx < 0 ? 1 : -1))
      }}
    >
      <div className="cels__palco">
        {itens.map((item, i) => {
          // distância até o celular do meio (o carrossel é infinito)
          let d = mod(i - atual, n)
          if (d > n / 2) d -= n
          if (n === 2 && d === -1) d = 1
          const longe = Math.abs(d) > visiveis
          return (
            <motion.div
              key={item.titulo + i}
              className="cels__item"
              style={{ zIndex: 10 - Math.abs(d), pointerEvents: longe ? 'none' : 'auto' }}
              initial={false}
              animate={{
                x: d * passo,
                scale: d === 0 ? 1 : 1 - Math.min(Math.abs(d), 3) * 0.13,
                rotateY: d * -16,
                opacity: longe ? 0 : d === 0 ? 1 : 0.55,
                filter: d === 0 ? 'brightness(1)' : 'brightness(.6)',
              }}
              transition={{ type: 'spring', stiffness: 170, damping: 24 }}
              onClick={() => d !== 0 && setAtiva((a) => a + d)}
            >
              <Celular item={item} ativo={d === 0} />
            </motion.div>
          )
        })}
      </div>

      <div className="cels__barra">
        <button className="cels__seta" aria-label="Anterior" onClick={() => setAtiva((a) => a - 1)}>←</button>
        <div className="cels__legenda" key={atual}>
          <span className="rotulo">{itens[atual].tipo === 'post' ? 'Post' : itens[atual].tipo === 'stories' ? 'Stories' : 'Reels'}</span>
          <h3>{itens[atual].titulo}</h3>
        </div>
        <button className="cels__seta" aria-label="Próximo" onClick={() => setAtiva((a) => a + 1)}>→</button>
      </div>
      <div className="cels__pontos">
        {itens.map((_, i) => (
          <button key={i} aria-label={`Ir para ${i + 1}`} className={i === atual ? 'is-ativo' : ''} onClick={() => setAtiva((a) => a + (mod(i - a, n) > n / 2 ? mod(i - a, n) - n : mod(i - a, n)))} />
        ))}
      </div>
    </div>
  )
}
