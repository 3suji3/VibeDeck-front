import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if device supports hover and is not mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (isMobile || prefersReducedMotion) {
      return
    }

    setIsVisible(true)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [role="button"], .cursor-pointer, input, textarea')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [role="button"], .cursor-pointer, input, textarea')) {
        setIsHovering(false)
      }
    }

    document.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor dot (더 큼, glow, 클릭 위치 강조) */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full pointer-events-none z-[9999] shadow-[0_0_16px_4px_rgba(236,72,153,0.25)]"
        style={{
          mixBlendMode: 'exclusion',
          boxShadow: isHovering
            ? '0 0 32px 8px rgba(139,92,246,0.25), 0 0 0 6px rgba(236,72,153,0.10)'
            : '0 0 16px 4px rgba(236,72,153,0.18)'
        }}
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.35 : 1,
          opacity: 1
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.6
        }}
      />

      {/* Outer dreamy ring (hover시 glow, 클릭영역 강조) */}
      <motion.div
        className="fixed top-0 left-0 w-14 h-14 border-2 border-pink-300/60 rounded-full pointer-events-none z-[9998]"
        style={{
          mixBlendMode: 'exclusion',
          boxShadow: isHovering
            ? '0 0 32px 8px rgba(139,92,246,0.18), 0 0 0 8px rgba(236,72,153,0.10)'
            : '0 0 12px 2px rgba(139,92,246,0.10)'
        }}
        animate={{
          x: mousePosition.x - 28,
          y: mousePosition.y - 28,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.7 : 0.45
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
          mass: 0.9
        }}
      />
    </>
  )
}
