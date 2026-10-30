import { motion } from 'framer-motion'
import { useState } from 'react'
import { categorias, portfolio } from '../data/conteudo'
import { Escrita, Reveal, TituloAnimado } from './Animacoes'
import Celulares from './Celulares'
import './Portfolio.css'

export default function Portfolio() {
  const [filtro, setFiltro] = useState(categorias[0])
  const lista = filtro.tipo ? portfolio.filter((p) => p.tipo === filtro.tipo) : portfolio

  return (
    <section className="secao portfolio" id="portfolio">
      <div className="container">
        <div className="portfolio__topo">
          <div>
            <Escrita>no seu feed</Escrita>
            <TituloAnimado texto="Portfó*lio*" />
          </div>
          <div className="filtros">
            {categorias.map((c) => (
              <button key={c.label} className={`filtro ${filtro.label === c.label ? 'is-ativo' : ''}`} onClick={() => setFiltro(c)}>
                {filtro.label === c.label && <motion.span layoutId="filtro-pill" className="filtro__pill" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />}
                <span className="filtro__txt">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Reveal y={60}>
        {/* key: ao trocar o filtro, o carrossel recomeça do primeiro */}
        <Celulares key={filtro.label} itens={lista} />
      </Reveal>
    </section>
  )
}
