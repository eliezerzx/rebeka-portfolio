import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './Intro.css'

// Abertura de cinema: timecode contando, REC piscando e as "tarjas" abrindo
export default function Intro({ aoTerminar }) {
  const [frame, setFrame] = useState(0)
  const [ativo, setAtivo] = useState(true)
  const total = 72 // 3 segundos a 24fps

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    let f = 0
    const id = setInterval(() => {
      f += 1
      setFrame(f)
      if (f >= total) {
        clearInterval(id)
        setTimeout(() => setAtivo(false), 250)
      }
    }, 2200 / total)
    return () => clearInterval(id)
  }, [])

  const seg = String(Math.floor(frame / 24)).padStart(2, '0')
  const fr = String(frame % 24).padStart(2, '0')
  const pct = Math.round((frame / total) * 100)

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = ''
        aoTerminar?.()
      }}
    >
      {ativo && (
        <motion.div className="intro" key="intro" exit={{ opacity: 1 }} transition={{ duration: 1.2 }}>
          <motion.div
            className="intro__tarja intro__tarja--topo"
            exit={{ y: '-100%' }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="intro__tarja intro__tarja--base"
            exit={{ y: '100%' }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div className="intro__conteudo" exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 0.5 }}>
            <div className="intro__hud intro__hud--esq">
              <span className="intro__rec" /> REC
            </div>
            <div className="intro__hud intro__hud--dir">4K · 24FPS</div>
            <div className="intro__nome">
              <span className="intro__script">Rebeka</span>
              <span className="intro__sub">videomaker · storymaker · social media</span>
            </div>
            <div className="intro__timecode">00:00:{seg}:{fr}</div>
            <div className="intro__barra"><span style={{ width: `${pct}%` }} /></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
