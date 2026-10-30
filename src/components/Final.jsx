import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { contato, depoimentos, hero, linkWhats, menu } from '../data/conteudo'
import { Escrita, Foto, Reveal, TituloAnimado } from './Animacoes'
import './Final.css'

export function Depoimentos() {
  return (
    <section className="secao secao--bege depoimentos">
      <div className="container">
        <div className="depoimentos__topo">
          <Escrita>quem já gravou comigo</Escrita>
          <TituloAnimado texto={'Resultados *reais*'} />
        </div>
        <div className="depoimentos__grid">
          {depoimentos.map((d, i) => (
            <motion.figure
              key={d.nome}
              className="depoimento"
              initial={{ opacity: 0, y: 60, rotate: (i - 1) * 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: (i - 1) * 1.5 }}
              whileHover={{ rotate: 0, y: -8 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="depoimento__estrelas">★★★★★</div>
              <blockquote>“{d.texto}”</blockquote>
              <figcaption>
                <b>{d.nome}</b>
                <span>{d.cargo}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contato() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-35%'])
  const escala = useTransform(scrollYProgress, [0, 1], [1.25, 1])

  return (
    <section className="contato" id="contato" ref={ref}>
      <motion.div className="contato__fundo" style={{ scale: escala }}>
        <Foto src={hero.foto} rotulo="" />
      </motion.div>
      <motion.p className="contato__gigante" style={{ x }} aria-hidden="true">
        Vamos criar <em>juntos</em> ✦ Vamos criar <em>juntos</em>
      </motion.p>
      <div className="contato__conteudo">
        <Escrita className="kicker contato__kicker">bora gravar?</Escrita>
        <TituloAnimado texto={'Seu próximo\n*conteúdo* começa aqui'} />
        <Reveal className="contato__acoes" delay={0.2}>
          <a className="btn" href={linkWhats()} target="_blank" rel="noreferrer">Chamar no WhatsApp <span className="seta">→</span></a>
          <a className="btn btn--contorno" href={`https://instagram.com/${contato.instagram}`} target="_blank" rel="noreferrer">@{contato.instagram}</a>
        </Reveal>
      </div>
    </section>
  )
}

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape__grid">
        <div>
          <span className="rodape__logo">{contato.nome}</span>
          <p>Videomaker, storymaker e social media.<br />{contato.cidade}</p>
        </div>
        <nav>
          {menu.map((m) => <a key={m.href} href={m.href}>{m.label}</a>)}
        </nav>
        <div className="rodape__contato">
          <a href={`mailto:${contato.email}`}>{contato.email}</a>
          <a href={`https://instagram.com/${contato.instagram}`} target="_blank" rel="noreferrer">Instagram</a>
          <a href={contato.behance} target="_blank" rel="noreferrer">Behance</a>
          <a href={linkWhats()} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="rodape__base">
        <span>© {new Date().getFullYear()} {contato.nome}. Todos os direitos reservados.</span>
        <a href="#topo">Voltar ao topo ↑</a>
      </div>
    </footer>
  )
}
