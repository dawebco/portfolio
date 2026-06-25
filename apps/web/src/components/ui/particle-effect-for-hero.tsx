import { type FC, useEffect, useRef, useState, useCallback } from "react"
import { MousePointer2, ArrowRight } from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
  color: string
  // Organic wander: each particle orbits its home via a Lissajous path
  phase: number        // X-axis phase offset
  phaseY: number       // Y-axis phase offset (independent → non-circular, organic)
  wanderRadius: number // orbital radius around home (px)
  wanderSpeed: number  // individual orbital speed (rad/ms)
}

interface BackgroundParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  phase: number
}

interface MouseState {
  x: number
  y: number
  isActive: boolean
}

// ─── Physics Configuration ──────────────────────────────────────────────────────
//
// Old → New for key constants and WHY:
//
//  RETURN_SPEED   0.08  → 0.009   9× softer: was snapping rigidly back to exact origin
//  DAMPING        0.90  → 0.976   Fluid glide instead of killing velocity in 7 frames
//  REPULSION      ×1.2×5 linear  → smoothstep cubic + swirl: no hard edge, no violent jerk
//  ANTI_GRAVITY   (none) → -0.006 Slow upward float bias the soft spring counteracts
//  WANDER         (none) → orbit   Particles circle their home with Lissajous paths
// ───────────────────────────────────────────────────────────────────────────────

const PARTICLE_DENSITY = 0.00012   // ~130 particles at 1080p
const BG_PARTICLE_DENSITY = 0.000032
const MOUSE_RADIUS = 165           // px
const RETURN_SPEED = 0.009         // spring constant (was 0.08 — 9× too stiff)
const DAMPING = 0.976              // friction per frame (was 0.90 — killed glide)
const REPULSION_STRENGTH = 6.5     // radial push force (smoothstep-modulated)
const SWIRL_STRENGTH = 2.6         // tangential swirl component
const ANTI_GRAVITY = -0.006        // upward bias (px/frame²)
const WANDER_SPEED_BASE = 0.00048  // base orbital speed (rad/ms)
const WANDER_SPEED_VAR = 0.00022   // per-particle speed variance
const WANDER_RADIUS_MIN = 7
const WANDER_RADIUS_MAX = 30

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min

// ─── AntiGravityCanvas ─────────────────────────────────────────────────────────

export const AntiGravityCanvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // Store CSS dimensions so clearRect uses the correct (scaled) coordinate space
  const cssSizeRef = useRef({ w: 0, h: 0 })
  const [entityCount, setEntityCount] = useState(0)

  const particlesRef = useRef<Particle[]>([])
  const bgParticlesRef = useRef<BackgroundParticle[]>([])
  // Mouse is tracked at window level so it fires through overlaid DOM elements (CTA buttons etc.)
  const mouseRef = useRef<MouseState>({ x: -9999, y: -9999, isActive: false })
  const frameIdRef = useRef<number>(0)

  // ── Init ───────────────────────────────────────────────────────────────────

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.floor(width * height * PARTICLE_DENSITY)
    const ps: Particle[] = []

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      ps.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.4, // tiny initial drift so they start moving
        vy: (Math.random() - 0.5) * 0.4,
        size: randomRange(0.8, 2.4),
        color: Math.random() > 0.88 ? "#D4AF37" : "#ffffff",
        phase: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        wanderRadius: randomRange(WANDER_RADIUS_MIN, WANDER_RADIUS_MAX),
        wanderSpeed: WANDER_SPEED_BASE + Math.random() * WANDER_SPEED_VAR,
      })
    }
    particlesRef.current = ps

    const bgCount = Math.floor(width * height * BG_PARTICLE_DENSITY)
    const bgs: BackgroundParticle[] = []
    for (let i = 0; i < bgCount; i++) {
      bgs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: randomRange(0.4, 1.3),
        alpha: randomRange(0.08, 0.35),
        phase: Math.random() * Math.PI * 2,
      })
    }
    bgParticlesRef.current = bgs

    setEntityCount(count + bgCount)
  }, [])

  // ── Animation Loop ─────────────────────────────────────────────────────────

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { w, h } = cssSizeRef.current
    if (!w || !h) {
      frameIdRef.current = requestAnimationFrame(animate)
      return
    }

    // Clear using CSS-space dimensions (important after ctx.scale(dpr, dpr))
    ctx.clearRect(0, 0, w, h)

    // ── Background: breathing radial glow ────────────────────────────────────
    const pulse = Math.sin(time * 0.00075) * 0.03 + 0.07
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.65)
    grad.addColorStop(0, `rgba(212, 175, 55, ${pulse})`)
    grad.addColorStop(0.5, `rgba(184, 115, 51, ${pulse * 0.4})`)
    grad.addColorStop(1, "rgba(0, 0, 0, 0)")
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    // ── Background: drifting ambient stars ───────────────────────────────────
    const bgs = bgParticlesRef.current
    for (let i = 0; i < bgs.length; i++) {
      const p = bgs[i]
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0) p.x = w
      if (p.x > w) p.x = 0
      if (p.y < 0) p.y = h
      if (p.y > h) p.y = 0

      const twinkle = Math.sin(time * 0.0018 + p.phase) * 0.5 + 0.5
      ctx.globalAlpha = p.alpha * (0.25 + 0.75 * twinkle)
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1.0

    // ── Foreground particle physics ───────────────────────────────────────────
    const ps = particlesRef.current
    const mouse = mouseRef.current

    for (let i = 0; i < ps.length; i++) {
      const p = ps[i]

      // 1. Lissajous wander target — X and Y oscillate at slightly different
      //    frequencies (1.31× ratio) producing organic, non-repeating elliptical paths
      const wx = time * p.wanderSpeed
      const wy = time * p.wanderSpeed * 1.31
      const targetX = p.originX + Math.cos(wx + p.phase) * p.wanderRadius
      const targetY = p.originY + Math.sin(wy + p.phaseY) * p.wanderRadius * 0.72

      // 2. Soft spring toward the wandering target (NOT the rigid origin)
      p.vx += (targetX - p.x) * RETURN_SPEED
      p.vy += (targetY - p.y) * RETURN_SPEED

      // 3. Anti-gravity: slight upward bias the spring naturally counteracts,
      //    creating a hovering, breathing float without explicit oscillation code
      p.vy += ANTI_GRAVITY

      // 4. Mouse interaction — smoothstep-modulated radial + tangential force
      if (mouse.isActive) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const distSq = dx * dx + dy * dy
        if (distSq < MOUSE_RADIUS * MOUSE_RADIUS) {
          const dist = Math.sqrt(distSq)
          if (dist > 0.5) {
            // Cubic smoothstep: 0 at radius edge → 1 at cursor center
            // Eliminates the harsh pop-in the old linear formula caused
            const t = 1.0 - dist / MOUSE_RADIUS
            const smooth = t * t * (3.0 - 2.0 * t)
            const inv = 1.0 / dist

            // Radial push (away from cursor)
            p.vx += dx * inv * smooth * REPULSION_STRENGTH
            p.vy += dy * inv * smooth * REPULSION_STRENGTH

            // Tangential swirl (perpendicular to radial, counter-clockwise)
            p.vx += -dy * inv * smooth * SWIRL_STRENGTH
            p.vy +=  dx * inv * smooth * SWIRL_STRENGTH
          }
        }
      }

      // 5. Damping and integration
      p.vx *= DAMPING
      p.vy *= DAMPING
      p.x += p.vx
      p.y += p.vy

      // 6. Draw — velocity brightens the particle so fast particles glow
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      const opacity = Math.min(0.22 + speed * 0.09, 0.92)

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle =
        p.color === "#D4AF37"
          ? `rgba(212, 175, 55, ${opacity})`
          : `rgba(255, 255, 255, ${opacity})`
      ctx.fill()
    }

    frameIdRef.current = requestAnimationFrame(animate)
  }, [])

  // ── Resize Handler ─────────────────────────────────────────────────────────

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      if (!width || !height) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2) // cap at 2× for performance

      canvasRef.current.width = Math.round(width * dpr)
      canvasRef.current.height = Math.round(height * dpr)
      canvasRef.current.style.width = `${width}px`
      canvasRef.current.style.height = `${height}px`

      // Store CSS dimensions — the animation loop MUST use these for clearRect
      // and gradient coordinates after ctx.scale(dpr, dpr) has been applied
      cssSizeRef.current = { w: width, h: height }

      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0) // reset any previous scale first
        ctx.scale(dpr, dpr)
      }

      initParticles(width, height)
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [initParticles])

  // ── Start Loop ─────────────────────────────────────────────────────────────

  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameIdRef.current)
  }, [animate])

  // ── Window-level mouse tracking ────────────────────────────────────────────
  // Attached to WINDOW so it fires through any overlaid DOM elements
  // (hero text, CTA buttons with pointer-events-auto, etc.)
  useEffect(() => {
    const onWindowMouse = (e: globalThis.MouseEvent) => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          isActive: true,
        }
      } else {
        mouseRef.current.isActive = false
      }
    }
    const onWindowLeave = () => {
      mouseRef.current.isActive = false
    }

    window.addEventListener("mousemove", onWindowMouse)
    window.addEventListener("mouseleave", onWindowLeave)
    return () => {
      window.removeEventListener("mousemove", onWindowMouse)
      window.removeEventListener("mouseleave", onWindowLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden cursor-crosshair"
      style={{ background: "#030712" }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Debug overlay — intentionally very faint */}
      <div className="absolute bottom-3 right-4 pointer-events-none text-[9px] text-white/10 font-mono text-right leading-5 select-none">
        <p>{entityCount} particles</p>
      </div>
    </div>
  )
}

// ─── Standalone full-page demo (used by demo.tsx) ──────────────────────────────

export default function ParticleEffectHero() {
  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: "#030712" }}>
      <AntiGravityCanvas />

      {/* Nav */}
      <nav className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-6">
        <img
          src="/side.png"
          alt="DaWebCo."
          className="h-10 w-auto object-contain"
          style={{ filter: "invert(1) hue-rotate(180deg) brightness(1.15)", mixBlendMode: "screen" }}
        />
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/60">
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <a
          href="#contact"
          className="px-5 py-2.5 rounded-full text-sm font-bold text-black"
          style={{ background: "linear-gradient(135deg, #F5E6A3, #D4AF37, #B87333)" }}
        >
          Start a Conversation
        </a>
      </nav>

      {/* Hero content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
        <div className="max-w-4xl space-y-8">
          <span className="inline-block py-1 px-4 rounded-full text-xs font-mono text-white/50 tracking-widest uppercase border border-white/15 bg-white/5 backdrop-blur-sm">
            Premium Web Agency
          </span>
          <h1
            className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tighter"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              background: "linear-gradient(135deg, #fff 0%, #F5E6A3 35%, #D4AF37 65%, #B87333 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Zero Friction.
            <br />
            Infinite Reach.
          </h1>
          <p className="max-w-xl mx-auto text-base md:text-lg text-white/50 font-light leading-relaxed">
            We engineer premium websites that convert visitors into customers — built for small
            businesses today, architected to scale into enterprise tomorrow.
          </p>
          <div className="pointer-events-auto">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #F5E6A3, #D4AF37, #B87333)" }}
            >
              Start Your Project
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Interact hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 pointer-events-none select-none">
        <span className="text-[10px] uppercase tracking-[0.2em]">Move cursor</span>
        <MousePointer2 size={14} className="animate-bounce" />
      </div>
    </div>
  )
}
