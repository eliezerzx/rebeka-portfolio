import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

// Cursor personalizado (só no computador). Cresce sobre links/botões
// e mostra "play" sobre itens com data-cursor="play".
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 400, damping: 35 })
  const sy = useSpring(y, { stiffness: 400, damping: 35 })
  const [modo, setModo] = useState('')
  const [ativo, setAtivo] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setAtivo(true)
    document.documentElement.classList.add('tem-cursor')
    const mover = (e) => {
      x.set(e.clientX); y.set(e.clientY)
      const alvo = e.target.closest?.('[data-cursor], a, button')
      setModo(alvo ? alvo.dataset.cursor || 'link' : '')
    }
    window.addEventListener('mousemove', mover)
    return () => window.removeEventListener('mousemove', mover)
  }, [x, y])

  if (!ativo) return null
  const tam = modo === 'play' ? 96 : modo === 'link' ? 54 : 12
  return (
    <motion.div
      style={{
        position: 'fixed', left: 0, top: 0, x: sx, y: sy, zIndex: 300, pointerEvents: 'none',
        translateX: '-50%', translateY: '-50%',
        mixBlendMode: modo === 'play' ? 'normal' : 'difference',
      }}
    >
      <motion.div
        animate={{ width: tam, height: tam, background: modo === 'play' ? '#FFEDC5' : modo === 'link' ? 'rgba(255,237,197,0)' : '#FFEDC5', borderWidth: modo === 'link' ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ borderRadius: '50%', border: '0 solid #FFEDC5', display: 'grid', placeItems: 'center', color: '#3D0B16', fontSize: 11, letterSpacing: '.2em', fontFamily: 'var(--f-texto)' }}
      >
        {modo === 'play' && 'PLAY'}
      </motion.div>
    </motion.div>
  )
}
