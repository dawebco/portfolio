import type { CSSProperties } from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/Logo"

const NAV_LINKS = [
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      lastScrollY.current = window.scrollY
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      // DYNAMIC HEIGHT: Smooth transition between larger layout on Hero and a compact bar when scrolling
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
        scrolled 
          ? "h-14 md:h-16 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]" 
          : "h-20 md:h-24"
      }`}
      style={{
        background: scrolled ? "rgba(3, 7, 18, 0.85)" : "rgba(3, 7, 18, 0)",
        backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.03)" : "1px solid transparent",
      }}
    >
      {/* Brand Anchored System Wrapper */}
      <a href="#hero" className="shrink-0 max-h-full flex items-center overflow-hidden py-1 opacity-95 hover:opacity-100 transition-opacity">
        {/* Pass down a size control variant matching the current scroll height if needed, or stick to 'md' layout constraints */}
        <Logo size={scrolled ? "sm" : "md"} /> 
      </a>

      {/* Synchronized Desktop Nav Links */}
      <div 
        className="hidden md:flex items-center gap-10 relative"
        onMouseLeave={() => setHoveredLink(null)}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHoveredLink(link.href)}
            className="relative text-xs uppercase font-semibold tracking-[0.18em] text-white/50 hover:text-white transition-colors duration-300 py-2"
            style={{ fontFamily: 'var(--font-sans, "Inter", sans-serif)' }}
          >
            <span className="relative z-10">{link.label}</span>
            
            {/* Magnetic Sliding Premium Underline Vector */}
            {hoveredLink === link.href && (
              <motion.div
                layoutId="navUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1.5px]"
                style={{
                  background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </a>
        ))}
      </div>

      {/* Desktop Luxury Conversational CTA — Scales smoothly down on layout compression */}
      <div className="hidden md:block">
        <motion.a
          href="#contact"
          whileHover={{ y: -2, boxShadow: "0 4px 25px rgba(212, 175, 55, 0.25)" }}
          whileTap={{ y: 0 }}
          className={`inline-flex items-center uppercase text-black transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) rounded-full ${
            scrolled 
              ? "px-5 py-2 text-[10px] font-bold tracking-[0.12em]" 
              : "px-7 py-3 text-xs font-bold tracking-[0.15em]"
          }`}
          style={{
            fontFamily: 'var(--font-sans, "Inter", sans-serif)',
            background: "linear-gradient(135deg, #F5E6A3 0%, #D4AF37 40%, #B87333 100%)",
          }}
        >
          Start a Conversation
        </motion.a>
      </div>

      {/* Mobile Burger Minimal Control Trigger */}
      <button
        className="md:hidden flex flex-col gap-2 p-2 relative z-50"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span
          className="block w-5 h-[1.5px] bg-white transition-all duration-300"
          style={{ transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none" }}
        />
        <span
          className="block w-5 h-[1.5px] bg-white transition-all duration-300"
          style={{ transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none" }}
        />
      </button>

      {/* Mobile Modal Drawer Layout Interface */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 mt-2 mx-6 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(3, 7, 18, 0.98)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.04)",
              boxShadow: "0 30px 60px -15px rgba(0,0,0,0.8)",
            }}
          >
            <div className="flex flex-col p-8 gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-medium text-white/60 hover:text-white transition-colors duration-200 py-1"
                  style={{ fontFamily: 'var(--font-sans, "Inter", sans-serif)' }}
                >
                  {link.label}
                </a>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold uppercase tracking-widest rounded-full text-black mt-1"
                style={{
                  fontFamily: 'var(--font-sans, "Inter", sans-serif)',
                  background: "linear-gradient(135deg, #F5E6A3 0%, #D4AF37 40%, #B87333 100%)",
                }}
              >
                Start a Conversation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}