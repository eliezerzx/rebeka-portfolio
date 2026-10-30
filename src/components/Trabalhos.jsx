import { varal } from '../data/conteudo'
import { Escrita, Reveal, TituloAnimado } from './Animacoes'
import VaralPolaroid from './VaralPolaroid'
import './Trabalhos.css'

export default function Trabalhos() {
  return (
    <section className="secao secao--vinho trabalhos-fotos" id="trabalhos">
      <div className="container">
        <div className="trabalhos-fotos__topo">
          <div>
            <Escrita>{varal.kicker}</Escrita>
            <TituloAnimado texto="Trabalhos *em fotos*" />
          </div>
          <Reveal as="p" className="trabalhos-fotos__dica">
            Arraste o varal ou use as setas →
          </Reveal>
        </div>
      </div>
      <Reveal y={60}>
        <VaralPolaroid fotos={varal.fotos} />
      </Reveal>
    </section>
  )
}
