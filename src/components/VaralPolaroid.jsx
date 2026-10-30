import { useCallback, useEffect, useRef, useState } from 'react'
import './VaralPolaroid.css'

/*
 * Varal de Polaroids — fotos presas por pregadores num barbante que cede no meio.
 * Arraste o varal (ou use as setas/teclado) e as fotos deslizam balançando.
 * A foto do meio é a que está em destaque. Avança sozinho (autoplay).
 * Fotos sem "imagem" recebem uma paisagem pintada nas cores do site.
 */

// ---------- lógica ----------
const wrapClamp = (v, a, b) => Math.min(b, Math.max(a, v))
const stringY = (x, w, y0, sag) => {
  const t = wrapClamp(x / w, 0, 1)
  return y0 + 4 * sag * t * (1 - t)
}
function springStep(x, v, target, dt, k = 70) {
  const c = 2 * Math.sqrt(k)
  const nv = v + (k * (target - x) - c * v) * dt
  return [x + nv * dt, nv]
}
function swingStep(a, w, lineVel, dt, gain) {
  const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt
  return [wrapClamp(a + nw * dt, -0.6, 0.6), nw]
}
const nearestAt = (off, spacing, n) => wrapClamp(Math.round(off / spacing), 0, Math.max(0, n - 1))
const pad2 = (n) => (n < 10 ? '0' + n : String(n))

// ---------- paisagens pintadas (quando não há foto) ----------
const PALETAS = {
  vinho: { top: '#3D0B16', bottom: '#c46a4e', sun: '#FFEDC5', far: '#8a3a3c', near: '#24050C', mist: '255,220,190' },
  bege: { top: '#e9c9a0', bottom: '#FFEDC5', sun: '#ffffff', far: '#c9a07a', near: '#5A1624', mist: '255,243,225' },
  dusk: { top: '#2a1430', bottom: '#ef8d60', sun: '#ffd9a6', far: '#93607c', near: '#18121f', mist: '255,196,160' },
  rosa: { top: '#d79c8f', bottom: '#f8e8d6', sun: '#fff4df', far: '#c49aa0', near: '#3D0B16', mist: '255,240,232' },
}
function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const hexRgb = (h) => {
  const v = parseInt(h.replace('#', ''), 16)
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255]
}
const mixRgb = (a, b, t) => {
  const A = hexRgb(a), B = hexRgb(b)
  return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',') + ')'
}
function pintarPaisagem(seed, paleta, w = 900, h = 900) {
  if (typeof document === 'undefined') return ''
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const g = c.getContext('2d')
  if (!g) return ''
  const P = PALETAS[paleta] ?? PALETAS.vinho
  const r = mulberry32(seed * 104729 + 7)
  const sky = g.createLinearGradient(0, 0, 0, h * 0.72)
  sky.addColorStop(0, P.top); sky.addColorStop(1, P.bottom)
  g.fillStyle = sky; g.fillRect(0, 0, w, h)
  const sx = w * (0.22 + r() * 0.56), sy = h * (0.26 + r() * 0.16)
  const sun = hexRgb(P.sun).join(',')
  const halo = g.createRadialGradient(sx, sy, 0, sx, sy, w * 0.45)
  halo.addColorStop(0, `rgba(${sun},.85)`); halo.addColorStop(0.08, `rgba(${sun},.55)`); halo.addColorStop(1, `rgba(${sun},0)`)
  g.fillStyle = halo; g.fillRect(0, 0, w, h)
  g.fillStyle = P.sun; g.beginPath(); g.arc(sx, sy, h * 0.045, 0, Math.PI * 2); g.fill()
  const layers = 5
  for (let L = 0; L < layers; L++) {
    const k = L / (layers - 1)
    const base = h * (0.42 + k * 0.4), amp = h * (0.07 + k * 0.1)
    const ph = [r(), r(), r(), r()].map((v) => v * Math.PI * 2)
    const fr = [1.3 + r(), 3.1 + r() * 2, 7 + r() * 4, 17 + r() * 8]
    const ridge = (x) => {
      const u = x / w
      return base - amp * (0.55 * Math.sin(u * fr[0] + ph[0]) + 0.28 * Math.sin(u * fr[1] + ph[1]) + 0.12 * Math.abs(Math.sin(u * fr[2] + ph[2])) + 0.05 * Math.sin(u * fr[3] + ph[3]))
    }
    const mist = g.createLinearGradient(0, base - amp * 1.4, 0, base + amp * 0.4)
    mist.addColorStop(0, `rgba(${P.mist},0)`); mist.addColorStop(1, `rgba(${P.mist},${(0.55 - k * 0.35).toFixed(2)})`)
    g.fillStyle = mist; g.fillRect(0, base - amp * 1.4, w, amp * 1.8)
    const body = g.createLinearGradient(0, base - amp, 0, h)
    body.addColorStop(0, mixRgb(P.far, P.near, Math.pow(k, 1.3)))
    body.addColorStop(1, mixRgb(P.far, P.near, Math.min(1, Math.pow(k, 1.3) + 0.18)))
    g.fillStyle = body; g.beginPath(); g.moveTo(0, h)
    for (let x = 0; x <= w; x += 6) g.lineTo(x, ridge(x))
    g.lineTo(w, h); g.closePath(); g.fill()
  }
  const vig = g.createRadialGradient(w / 2, h * 0.45, h * 0.3, w / 2, h / 2, w * 0.78)
  vig.addColorStop(0, 'rgba(0,0,0,0)'); vig.addColorStop(1, 'rgba(0,0,0,.32)')
  g.fillStyle = vig; g.fillRect(0, 0, w, h)
  const grain = g.getImageData(0, 0, w, h), d = grain.data
  for (let i = 0; i < d.length; i += 4) { const v = (r() - 0.5) * 14; d[i] += v; d[i + 1] += v; d[i + 2] += v }
  g.putImageData(grain, 0, 0)
  return c.toDataURL('image/jpeg', 0.85)
}

function useImagens(fotos) {
  const chave = fotos.map((s) => s.imagem || (s.paleta || 'vinho') + ':' + (s.seed ?? 1)).join('|')
  const [pintadas, setPintadas] = useState(() => fotos.map(() => ''))
  useEffect(() => {
    setPintadas(fotos.map((s, i) => (s.imagem ? '' : pintarPaisagem(s.seed ?? i + 1, s.paleta || 'vinho'))))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave])
  return fotos.map((s, i) => s.imagem || pintadas[i] || '')
}

// ---------- componente ----------
export default function VaralPolaroid({
  fotos,
  altura = 'min(78svh, 720px)',
  larguraFoto = 290,
  sag = 46,
  balanco = 1,
  autoplay = 4500,
}) {
  const n = fotos.length
  const srcs = useImagens(fotos)
  const inicio = Math.floor((n - 1) / 2) // começa no meio, com fotos dos dois lados
  const [ativa, setAtiva] = useState(inicio)
  const [arrastando, setArrastando] = useState(false)
  const [tam, setTam] = useState({ w: 1200, h: 700, cw: larguraFoto })
  const rootRef = useRef(null)
  const pathRef = useRef(null)
  const cards = useRef([])
  const sim = useRef({ off: 0, vel: 0, target: 0, a: [], w: [] })
  const drag = useRef(null)
  const ultimoToque = useRef(0)
  const ativaRef = useRef(inicio)
  const opts = useRef({ sag, balanco })
  opts.current = { sag, balanco }

  const espaco = tam.cw * 1.08
  const irPara = useCallback((i) => { sim.current.target = wrapClamp(i, 0, n - 1) * espaco }, [n, espaco])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver(() => {
      const r = root.getBoundingClientRect()
      const cw = Math.round(Math.max(150, Math.min(larguraFoto, r.width * 0.5, r.height * 0.42)))
      setTam({ w: r.width, h: r.height, cw })
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [larguraFoto])

  useEffect(() => {
    sim.current.target = ativaRef.current * espaco
    sim.current.off = ativaRef.current * espaco
  }, [espaco])

  // simulação: escreve direto no DOM a cada quadro
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let visivel = true, raf = 0, prev = performance.now()
    const S = sim.current
    const frame = (now) => {
      raf = 0
      if (!visivel) return
      const dt = Math.min(0.033, (now - prev) / 1000)
      prev = now
      const { w, h, cw } = tam
      const y0 = Math.max(40, h * 0.12)
      const d = drag.current
      let lineVel
      if (d && d.moved) lineVel = d.v * 1000
      else {
        const antes = S.off
        ;[S.off, S.vel] = springStep(S.off, S.vel, S.target, dt)
        lineVel = -(S.off - antes) / Math.max(dt, 1e-3)
      }
      const o = opts.current
      const g = reduzir ? 0 : o.balanco
      const perto = nearestAt(S.off, espaco, n)
      for (let i = 0; i < n; i++) {
        const el = cards.current[i]
        if (!el) continue
        const x = w / 2 + i * espaco - S.off
        if (x < -cw * 1.5 || x > w + cw * 1.5) { el.style.visibility = 'hidden'; continue }
        el.style.visibility = 'visible'
        let a = S.a[i] || 0, av = S.w[i] || 0
        ;[a, av] = swingStep(a, av, lineVel, dt, g)
        if (g) a += Math.sin(now / 1300 + i * 1.7) * 0.0009 * g
        S.a[i] = a; S.w[i] = av
        const y = stringY(x, w, y0, o.sag) - 6
        el.style.transform = `translate(${(x - cw / 2).toFixed(1)}px,${y.toFixed(1)}px) rotate(${a.toFixed(4)}rad)`
        el.style.zIndex = String(i === perto ? n + 1 : n - Math.abs(i - perto))
      }
      pathRef.current?.setAttribute('d', `M0 ${y0} Q${w / 2} ${y0 + 2 * o.sag} ${w} ${y0}`)
      if (perto !== ativaRef.current) { ativaRef.current = perto; setAtiva(perto) }
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting
      if (visivel && !raf) { prev = performance.now(); raf = requestAnimationFrame(frame) }
    })
    io.observe(root)
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [tam, espaco, n])

  // autoplay: volta para a primeira depois da última
  useEffect(() => {
    if (!autoplay || n < 2) return
    const t = window.setInterval(() => {
      if (document.hidden || drag.current || performance.now() - ultimoToque.current < autoplay) return
      irPara(ativaRef.current >= n - 1 ? 0 : ativaRef.current + 1)
    }, autoplay)
    return () => window.clearInterval(t)
  }, [autoplay, n, irPara])

  const onDown = (e) => {
    if (e.target.closest('.pl-bar')) return
    ultimoToque.current = performance.now()
    drag.current = { x: e.clientX, off: sim.current.off, lx: e.clientX, lt: e.timeStamp, v: 0, moved: false }
  }
  const onMove = (e) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      setArrastando(true)
      rootRef.current?.setPointerCapture(e.pointerId)
    }
    if (!d.moved) return
    const dt = Math.max(1, e.timeStamp - d.lt)
    d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v
    d.lx = e.clientX; d.lt = e.timeStamp
    const max = (n - 1) * espaco
    let off = d.off - dx
    if (off < 0) off *= 0.35
    if (off > max) off = max + (off - max) * 0.35
    sim.current.off = off
  }
  const onUp = (e) => {
    const d = drag.current
    drag.current = null
    ultimoToque.current = performance.now()
    if (!d) return
    if (d.moved) {
      setArrastando(false)
      sim.current.vel = -d.v * 1000
      irPara(nearestAt(sim.current.off - d.v * 180, espaco, n))
      return
    }
    const card = e.target.closest('[data-i]')
    if (card) irPara(Number(card.getAttribute('data-i')))
  }
  const passo = (dir) => { ultimoToque.current = performance.now(); irPara(wrapClamp(ativaRef.current + dir, 0, n - 1)) }
  const onKey = (e) => {
    if (e.key === 'ArrowRight') passo(1)
    else if (e.key === 'ArrowLeft') passo(-1)
    else return
    e.preventDefault()
  }

  const s = fotos[ativa] || {}

  return (
    <div
      ref={rootRef}
      className="pl-root"
      style={{ height: altura, '--pl-cw': tam.cw + 'px' }}
      data-drag={arrastando ? '1' : '0'}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Fotos de trabalhos"
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <svg className="pl-string" aria-hidden="true">
        <path ref={pathRef} fill="none" stroke="#FFEDC5" strokeOpacity=".55" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {fotos.map((f, i) => (
        <div key={i} className="pl-card" data-i={i} data-on={i === ativa ? '1' : '0'} ref={(el) => void (cards.current[i] = el)} aria-hidden={i === ativa ? undefined : true}>
          <div className="pl-print">
            <div className="pl-shot">{srcs[i] ? <img src={srcs[i]} alt={f.alt || f.titulo || ''} draggable={false} /> : null}</div>
            <div className="pl-note">{f.titulo || ''}</div>
          </div>
          <div className="pl-peg" />
        </div>
      ))}
      <div className="pl-bar">
        <div className="pl-cap" key={ativa} aria-hidden="true">
          {s.titulo ? <span className="pl-title">{s.titulo}</span> : null}
          {s.legenda ? <span className="pl-sub">{s.legenda}</span> : null}
        </div>
        <span className="pl-count" aria-hidden="true"><b>{pad2(ativa + 1)}</b> / {pad2(n)}</span>
        <button type="button" className="pl-btn" aria-label="Anterior" onClick={() => passo(-1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.4" /></svg>
        </button>
        <button type="button" className="pl-btn" aria-label="Próxima" onClick={() => passo(1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.4" /></svg>
        </button>
      </div>
      <div className="pl-sr" aria-live="polite">{`Foto ${ativa + 1} de ${n}${s.titulo ? ': ' + s.titulo : ''}`}</div>
    </div>
  )
}
