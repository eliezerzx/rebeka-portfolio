import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { contato, hero, linkWhats, reels, stories } from '../data/conteudo'
import { Escrita, Reveal, TituloAnimado } from './Animacoes'
import './Stories.css'

const telas = [
  { fundo: 'linear-gradient(170deg,#8a3a2c,#5a1624 60%,#3D0B16)', frase: 'em tempo real' },
  { fundo: 'linear-gradient(170deg,#c08a5a,#7a3a2a 55%,#3D0B16)', frase: 'bastidores' },
  { fundo: 'linear-gradient(170deg,#e8cfa0,#a0604a 55%,#5a1624)', frase: 'seu evento' },
  { fundo: 'linear-gradient(170deg,#6a2a30,#3D0B16 60%,#24050C)', frase: 'ao vivo' },
]
const DURACAO = 3000

function CelularStory() {
  const [atual, setAtual] = useState(0)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 })

  useEffect(() => {
    const id = setTimeout(() => setAtual((a) => (a + 1) % telas.length), DURACAO)
    return () => clearTimeout(id)
  }, [atual])

  return (
    <div
      className="story-palco"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
    >
      <motion.div className="story" style={{ rotateX: rx, rotateY: ry }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={atual}
            className="story__tela"
            style={{ background: telas[atual].fundo }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="story__frase"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
            >
              {telas[atual].frase}
            </motion.span>
          </motion.div>
        </AnimatePresence>

        <div className="story__barras">
          {telas.map((_, i) => (
            <span key={i}>
              <i
                key={i === atual ? `a${atual}` : i}
                className={i < atual ? 'cheia' : i === atual ? 'enchendo' : ''}
                style={{ animationDuration: `${DURACAO}ms` }}
              />
            </span>
          ))}
        </div>
        <div className="story__perfil">
          <span className="story__avatar" style={{ backgroundImage: `url(${hero.foto})` }} />
          <b>{contato.instagram}</b>
          <small>agora</small>
        </div>
      </motion.div>
    </div>
  )
}

export function ListaPrecos({ itens }) {
  return (
    <ul className="precos">
      {itens.map((p, i) => (
        <motion.li
          key={p.nome}
          className="preco"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5% 0px' }}
          transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <h4>{p.nome}</h4>
            <p>{p.detalhe}</p>
          </div>
          <span className="preco__valor">
            {p.aPartir && <small>a partir de</small>}
            {p.preco}
          </span>
        </motion.li>
      ))}
    </ul>
  )
}

export default function Stories() {
  return (
    <section className="secao secao--vinho stories" id="stories">
      <div className="container stories__grid">
        <CelularStory />
        <div>
          <Escrita>{stories.kicker}</Escrita>
          <TituloAnimado texto={'Stories\n*em tempo* real'} />
          <Reveal as="p" className="stories__desc">{stories.descricao}</Reveal>
          <ListaPrecos itens={stories.precos} />
        </div>
      </div>

      <div className="container reels">
        <div className="reels__topo">
          <Escrita>{reels.kicker}</Escrita>
          <TituloAnimado texto="Reels *avulsos*" />
        </div>
        <ListaPrecos itens={reels.precos} />
        <Reveal className="reels__cta">
          <a className="btn" href={linkWhats('Oi Rebeka! Quero um orçamento de Reels/Stories.')} target="_blank" rel="noreferrer">
            Pedir orçamento <span className="seta">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
