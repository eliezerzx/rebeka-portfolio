import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { contato, linkWhats, menu } from '../data/conteudo'
import './Nav.css'

export default function Nav() {
  const [rolou, setRolou] = useState(false)
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
  }, [aberto])

  return (
    <>
      <header className={`nav ${rolou ? 'nav--solida' : ''}`}>
        <a href="#topo" className="nav__logo">{contato.nome}</a>
        <nav className="nav__links">
          {menu.map((m) => (
            <a key={m.href} href={m.href} className="nav__link">
              <span data-texto={m.label}>{m.label}</span>
            </a>
          ))}
        </nav>
        <a href={linkWhats()} target="_blank" rel="noreferrer" className="btn nav__cta">Orçamento</a>
        <button className={`nav__burger ${aberto ? 'is-aberto' : ''}`} onClick={() => setAberto(!aberto)} aria-label="Abrir menu">
          <span /><span />
        </button>
      </header>

      <AnimatePresence>
        {aberto && (
          <motion.div
            className="menu-mobile"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {menu.map((m, i) => (
              <motion.a
                key={m.href}
                href={m.href}
                onClick={() => setAberto(false)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <small>0{i + 1}</small> {m.label}
              </motion.a>
            ))}
            <motion.a
              className="menu-mobile__insta"
              href={`https://instagram.com/${contato.instagram}`}
              target="_blank" rel="noreferrer"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            >
              @{contato.instagram}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
