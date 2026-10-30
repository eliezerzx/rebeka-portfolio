import { motion } from 'framer-motion'
import { servicos } from '../data/conteudo'
import { Escrita, Reveal, TituloAnimado } from './Animacoes'
import './Servicos.css'

export default function Servicos() {
  return (
    <section className="secao secao--bege servicos" id="servicos">
      <div className="container servicos__grid">
        <div className="servicos__topo">
          <Escrita>o que eu faço</Escrita>
          <TituloAnimado texto={'Meus\n*serviços*'} />
          <Reveal as="p" className="servicos__intro">
            Do planejamento ao último corte: cada etapa pensada para o seu perfil ter constância e personalidade.
          </Reveal>
        </div>

        <ul className="servicos__lista">
          {servicos.map((s, i) => (
            <motion.li
              key={s.titulo}
              className="servico"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="servico__num">0{i + 1}</span>
              <div className="servico__corpo">
                <h3 className="servico__titulo">{s.titulo}</h3>
                <p className="servico__texto">{s.texto}</p>
              </div>
              <span className="servico__seta">↗</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
