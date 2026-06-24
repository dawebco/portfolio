import type { CSSProperties } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { AntiGravityCanvas } from "@/components/ui/particle-effect-for-hero"

const displayHeadingStyle: CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  background: "linear-gradient(135deg, #FFFFFF 0%, #F5E6A3 35%, #D4AF37 65%, #B87333 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}

const goldTextStyle: CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  background: "linear-gradient(135deg, #F5E6A3, #D4AF37)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}

const STATS = [
  { value: "100+", label: "Projects Delivered" },
  { value: "99+", label: "Lighthouse Score" },
  { value: "3×", label: "Avg Revenue Growth" },
]

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", background: "#030712" }}
    >
      {/* Interactive particle canvas */}
      <AntiGravityCanvas />

      {/* Ambient glow orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0,
          right: "-10%",
          width: "40vw",
          height: "50vh",
          background:
            "radial-gradient(ellipse at center, rgba(184,115,51,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(3,7,18,0.45) 0%, rgba(3,7,18,0.55) 40%, rgba(3,7,18,0.82) 80%, #030712 100%)",
        }}
      />

      {/* Content layer */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12"
        style={{ minHeight: "100svh", paddingTop: "120px", paddingBottom: "80px" }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.25)",
            color: "#D4AF37",
          }}
        >
          <Sparkles size={12} />
          Premium Web Design &amp; Development Agency
        </motion.div>

        {/* Display heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight max-w-5xl"
          style={displayHeadingStyle}
        >
          Zero Friction.
          <br />
          Infinite Reach.
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-6 text-base md:text-lg text-white/55 max-w-xl leading-relaxed"
        >
          We engineer premium websites that convert visitors into customers — built for small
          businesses today, architected to scale into enterprise tomorrow.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212,175,55,0.35)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-black"
            style={{
              background:
                "linear-gradient(135deg, #F5E6A3 0%, #D4AF37 40%, #C9A84C 70%, #B87333 100%)",
            }}
          >
            Start Your Project
            <ArrowRight size={15} />
          </motion.a>

          <motion.a
            href="#process"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white/60 border border-white/[0.12] hover:border-[#D4AF37]/30 hover:text-white/80 transition-all duration-300"
          >
            See How We Work
          </motion.a>
        </motion.div>

        {/* Social proof numbers */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="flex items-center gap-8 mt-14 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-2xl font-bold" style={goldTextStyle}>
                {s.value}
              </span>
              <span className="text-xs text-white/35 mt-0.5 whitespace-nowrap">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Page transition fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #030712)" }}
      />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.5), transparent)" }}
        />
      </motion.div>
    </section>
  )
}
