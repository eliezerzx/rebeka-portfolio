import Lenis from 'lenis'
import { useEffect } from 'react'
import { Contato, Depoimentos, Rodape } from './components/Final'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Nav from './components/Nav'
import Pacotes from './components/Pacotes'
import Portfolio from './components/Portfolio'
import Servicos from './components/Servicos'
import Sobre from './components/Sobre'
import Stories from './components/Stories'
import Trabalhos from './components/Trabalhos'

export default function App() {
  const pronto = true

  // Rolagem suave (Lenis) + links de âncora suaves
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)

    const clique = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const alvo = document.querySelector(a.getAttribute('href'))
      if (alvo) { e.preventDefault(); lenis.scrollTo(alvo, { offset: 0 }) }
    }
    document.addEventListener('click', clique)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); document.removeEventListener('click', clique) }
  }, [])

  return (
    <>
      <div className="grao" aria-hidden="true" />
      <Nav />
      <main>
        <Hero pronto={pronto} />
        <Manifesto />
        <Sobre />
        <Trabalhos />
        <Servicos />
        <Stories />
        <Pacotes />
        <Portfolio />
        <Depoimentos />
        <Contato />
      </main>
      <Rodape />
    </>
  )
}
