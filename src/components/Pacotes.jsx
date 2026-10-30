import { motion } from 'framer-motion'
import { linkWhats, pacotes } from '../data/conteudo'
import { Escrita, TituloAnimado } from './Animacoes'
import './Pacotes.css'

function Cartao({ p, i }) {
  return (
    <motion.div
      className="pacote-wrap"
      initial={{ opacity: 0, y: 80, rotate: i === 0 ? -3 : i === 2 ? 3 : 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.2, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
    <article
      className={`pacote ${p.destaque ? 'pacote--destaque' : ''}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
    >
      {p.selo && <span className="pacote__selo">{p.selo}</span>}
      <h3 className="pacote__nome">{p.nome}</h3>
      <p className="pacote__preco">
        {p.preco} <span>/mês</span>
      </p>
      <hr />
      <ul>
        {p.inclui.map((item) => (
          <li key={item}><span>×</span>{item}</li>
        ))}
      </ul>
      <a
        className={`btn ${p.destaque ? '' : 'btn--vinho'} pacote__btn`}
        href={linkWhats(`Oi Rebeka! Tenho interesse no pacote ${p.nome}.`)}
        target="_blank" rel="noreferrer"
      >
        Quero este <span className="seta">→</span>
      </a>
    </article>
    </motion.div>
  )
}

export default function Pacotes() {
  return (
    <section className="secao secao--creme pacotes" id="pacotes">
      <div className="container">
        <div className="pacotes__topo">
          <Escrita>{pacotes.kicker}</Escrita>
          <TituloAnimado texto="Pacotes *mensais*" />
        </div>
        <div className="pacotes__grid">
          {pacotes.itens.map((p, i) => <Cartao key={p.nome} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}
