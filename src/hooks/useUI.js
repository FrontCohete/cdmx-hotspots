import { useEffect, useRef, useState } from 'react'

/**
 * Dirección del scroll con umbral, para ocultar/mostrar el navbar.
 * Devuelve 'up' | 'down'. Usa requestAnimationFrame para rendimiento.
 */
export function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState('up')
  const [atTop, setAtTop] = useState(true)
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setAtTop(y < 24)
        if (Math.abs(y - lastY.current) > threshold) {
          setDirection(y > lastY.current ? 'down' : 'up')
          lastY.current = y
        }
        ticking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { direction, atTop }
}

/**
 * Scrollspy con IntersectionObserver: devuelve el id de la
 * sección visible para el índice de navegación lateral.
 */
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

/**
 * Efecto de tecleo (typewriter) que escribe y borra una lista
 * de frases en ciclo. Respeta prefers-reduced-motion.
 */
export function useTypewriter(phrases, { typeMs = 45, eraseMs = 22, holdMs = 2600 } = {}) {
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setText(phrases[0])
      setDone(true)
      return
    }

    let phrase = 0
    let char = 0
    let erasing = false
    let timer

    const tick = () => {
      const current = phrases[phrase]
      if (!erasing) {
        char++
        setText(current.slice(0, char))
        if (char === current.length) {
          if (phrases.length === 1) {
            setDone(true)
            return
          }
          erasing = true
          timer = setTimeout(tick, holdMs)
          return
        }
        timer = setTimeout(tick, typeMs)
      } else {
        char--
        setText(current.slice(0, char))
        if (char === 0) {
          erasing = false
          phrase = (phrase + 1) % phrases.length
        }
        timer = setTimeout(tick, eraseMs)
      }
    }

    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [phrases, typeMs, eraseMs, holdMs])

  return { text, done }
}
