import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { contato, faixa, sobre } from '../data/conteudo'
import { Escrita, Foto, Reveal, TituloAnimado } from './Animacoes'
import './Sobre.css'

export default function Sobre() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const girarPolaroid = useTransform(scrollYProgress, [0, 1], [-10, -2])
  const girarTira = useTransform(scrollYProgress, [0, 1], [18, 6])
  const subirTira = useTransform(scrollYProgress, [0, 1], [120, -60])

  return (
    <>
      <section className="secao secao--vinho sobre" id="sobre" ref={ref}>
        <div className="container sobre__grid">
          <div className="sobre__colagem">
            <motion.figure className="polaroid" style={{ rotate: girarPolaroid }}>
              <span className="fita" />
              <div className="polaroid__foto"><Foto src={sobre.fotoPrincipal} alt={contato.nome} /></div>
              <figcaption>{sobre.legendaPolaroid}</figcaption>
            </motion.figure>

            <motion.div className="tira" style={{ rotate: girarTira, y: subirTira }}>
              {sobre.tiraDeFilme.map((src, i) => (
                <div className="tira__quadro" key={i}>
                  <Foto src={src} rotulo={`foto ${i + 1}`} />
                  <span className="tira__num">{String(i + 12).padStart(2, '0')}A</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="sobre__texto">
            <Escrita>{sobre.kicker}</Escrita>
            <TituloAnimado texto="Sobre *mim*" />
            {sobre.paragrafos.map((p, i) => (
              <Reveal key={i} as="p" delay={0.1 * i} className="sobre__p">{p}</Reveal>
            ))}
            <Reveal as="p" className="sobre__destaque" delay={0.2}>{sobre.destaque}</Reveal>
            <Reveal delay={0.3}>
              <a className="btn btn--contorno" href={contato.behance} target="_blank" rel="noreferrer">
                Ver portfólio no Behance <span className="seta">→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="faixa">
        <div className="faixa__trilho">
          {[0, 1].map((k) => (
            <div className="faixa__grupo" key={k} aria-hidden={k === 1}>
              {faixa.map((f, i) => (
                <span key={i}>
                  {i % 2 ? <em>{f}</em> : f} <b>✦</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
