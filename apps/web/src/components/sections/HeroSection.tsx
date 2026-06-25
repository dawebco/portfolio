import type { CSSProperties } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { AntiGravityCanvas } from "@/components/ui/particle-effect-for-hero"

export const displayHeadingStyle: CSSProperties = {
  // 1. Typography & Hierarchy
  fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', // Responsive fluid typography
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: '-0.02em', // Premium fonts need tight tracking at large sizes

  // 2. High-End Metallic Gradient (Smoother interpolation)
  backgroundImage: 'linear-gradient(135deg, #FFFFFF 10%, #ECE2B4 50%, #C5A059 100%)',
  
  // 3. Flawless Text Clipping Implementation
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  
  // 4. Fine-Tuning for Elegance
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
};



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
        >
          <span style={displayHeadingStyle}>
            Your competitors have one.
            <br />
            Do you?
          </span>
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-6 text-base md:text-lg text-white/55 max-w-xl leading-relaxed"
        >
          DAWEBCO builds bold, high-performance websites engineered for trust, speed, and growth.
          Designed to stand out. Built to outperform.
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
            Start A Conversation
            <ArrowRight size={15} />
          </motion.a>

          <motion.a
            href="#process"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white/60 border border-white/12 hover:border-[#D4AF37]/30 hover:text-white/80 transition-all duration-300"
          >
            See How We Work
          </motion.a>
        </motion.div>

      </div>

      {/* Page transition fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #030712)" }}
      />
    </section>
  )
}
