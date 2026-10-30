import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { manifesto } from '../data/conteudo'
import { Escrita, Reveal } from './Animacoes'
import './Manifesto.css'

function Palavra({ children, progresso, inicio, fim, italico }) {
  const opacidade = useTransform(progresso, [inicio, fim], [0.12, 1])
  return (
    <motion.span style={{ opacity: opacidade }} className={italico ? 'it' : ''}>
      {children}{' '}
    </motion.span>
  )
}

// Rolo de filme girando (no lugar do vinil da referência)
export function RoloFilme({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="#24050C" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="#FFEDC5" strokeOpacity=".15" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={a} cx={50 + 26 * Math.cos((a * Math.PI) / 180)} cy={50 + 26 * Math.sin((a * Math.PI) / 180)} r="10" fill="#FFEDC5" />
      ))}
      <circle cx="50" cy="50" r="7" fill="#FFEDC5" />
      <circle cx="50" cy="50" r="3" fill="#24050C" />
    </svg>
  )
}

export default function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const palavras = manifesto.texto.split(' ')

  return (
    <section className="secao secao--creme manifesto" id="manifesto">
      <div className="container manifesto__grid">
        <RoloFilme className="manifesto__rolo" />
        <p className="manifesto__texto" ref={ref}>
          {palavras.map((p, i) => {
            const limpa = p.replace(/[—.,]/g, '').toLowerCase()
            return (
              <Palavra
                key={i}
                progresso={scrollYProgress}
                inicio={i / palavras.length}
                fim={(i + 1) / palavras.length}
                italico={manifesto.destaque.includes(limpa)}
              >
                {p}
              </Palavra>
            )
          })}
        </p>
        <Reveal className="manifesto__apoio">{manifesto.apoio}</Reveal>
        <Escrita className="manifesto__assinatura">{manifesto.assinatura}</Escrita>
      </div>
    </section>
  )
}
