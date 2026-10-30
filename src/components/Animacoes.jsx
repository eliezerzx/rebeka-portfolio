import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.16, 1, 0.3, 1]

// Aparece subindo com leve desfoque quando entra na tela
export function Reveal({ children, delay = 0, y = 40, as = 'div', className, style }) {
  const M = motion[as]
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </M>
  )
}

// Título que revela palavra por palavra, saindo de uma "máscara".
// Palavras entre *asteriscos* viram itálico (fonte secundária).
export function TituloAnimado({ texto, className = 'titulo', as = 'h2', delay = 0 }) {
  const ref = useRef(null)
  const visivel = useInView(ref, { once: true, margin: '-10% 0px' })
  const Tag = as
  const linhas = texto.split('\n')
  let i = 0
  let emItalico = false // permite *várias palavras* em itálico
  return (
    <Tag ref={ref} className={className}>
      {linhas.map((linha, li) => (
        <span key={li} style={{ display: 'block' }}>
          {linha.split(' ').map((palavra, pi) => {
            if (palavra.startsWith('*')) emItalico = true
            const italico = emItalico
            if (palavra.endsWith('*')) emItalico = false
            const limpa = palavra.replace(/\*/g, '')
            const idx = i++
            return (
              <span
                key={pi}
                style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em', marginBottom: '-0.08em' }}
              >
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%', rotate: 4 }}
                  animate={visivel ? { y: '0%', rotate: 0 } : {}}
                  transition={{ duration: 1.1, delay: delay + idx * 0.07, ease }}
                >
                  {italico ? <em>{limpa}</em> : limpa}
                </motion.span>
                {' '}
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

// Texto cursivo que "se escreve" da esquerda para a direita
export function Escrita({ children, className = 'kicker', delay = 0 }) {
  return (
    <motion.span
      className={className}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.6, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.span>
  )
}

export function Foto({ src, alt = '', claro = false, rotulo = 'sua foto aqui', style, className }) {
  if (src) return <img src={src} alt={alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }} className={className} />
  return <div className={`ph ${claro ? 'ph--claro' : ''} ${className || ''}`} style={style}>{rotulo}</div>
}
