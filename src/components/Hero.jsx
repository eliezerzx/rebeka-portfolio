import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { contato, hero } from '../data/conteudo'
import { Foto } from './Animacoes'
import './Hero.css'

const ease = [0.16, 1, 0.3, 1]

export default function Hero({ pronto }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const escalaFoto = useTransform(scrollYProgress, [0, 1], [1, 1.35])
  const zoomImg = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  const subir = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])
  const descer = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const sumir = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const anim = (d) => ({
    initial: { opacity: 0, y: 60 },
    animate: pronto ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.4, delay: d, ease },
  })

  return (
    <section className="hero" id="topo" ref={ref}>
      <div className="hero__fundo">
        <Foto src={hero.foto} rotulo="" />
      </div>

      <div className="hero__palco">
        <motion.h1 className="titulo hero__linha hero__linha--1" style={{ y: subir, opacity: sumir }} {...anim(0.15)}>
          {hero.linha1}
        </motion.h1>

        <motion.div
          className="hero__quadro"
          style={{ scale: escalaFoto }}
          initial={{ clipPath: 'inset(50% 50% 50% 50%)' }}
          animate={pronto ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
          transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div className="hero__img" style={{ scale: zoomImg }}>
            <Foto src={hero.foto} alt={contato.nome} />
          </motion.div>
          {/* HUD de câmera */}
          <span className="hud hud--tl" /><span className="hud hud--tr" />
          <span className="hud hud--bl" /><span className="hud hud--br" />
          <span className="hero__rec"><i /> REC</span>
        </motion.div>

        <motion.h1 className="titulo hero__linha hero__linha--2" style={{ y: descer, opacity: sumir }} {...anim(0.3)}>
          <em>{hero.linha2}</em>
        </motion.h1>

        <motion.p className="rotulo hero__lado hero__lado--esq" {...anim(0.6)}>{hero.ladoEsquerdo}</motion.p>
        <motion.p className="rotulo hero__lado hero__lado--dir" {...anim(0.7)}>{hero.ladoDireito}</motion.p>
      </div>

      <motion.a href="#manifesto" className="hero__rolar" style={{ opacity: sumir }} {...anim(1)}>
        <span>role</span>
        <i />
      </motion.a>
    </section>
  )
}
