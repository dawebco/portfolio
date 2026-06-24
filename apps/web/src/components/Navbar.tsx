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
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
      // Added a strict height container constraint (h-16 md:h-20) to lock row height
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 md:h-20"
      style={{
        background: scrolled
          ? "rgba(3,7,18,0.88)"
          : "rgba(3,7,18,0.15)",
        backdropFilter: scrolled ? "blur(18px)" : "blur(6px)",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "blur(6px)",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.12)" : "1px solid transparent",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* Logo Wrapper: 
        Using 'max-h-full' and 'flex items-center' ensures that even if you make 
        the Logo component larger, it is forced to fit inside the parent track layout.
      */}
      <a href="#hero" className="shrink-0 max-h-full flex items-center overflow-hidden py-1">
        <Logo size="md" /> 
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:block">
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full text-black transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #F5E6A3 0%, #D4AF37 40%, #B87333 100%)",
          }}
        >
          Start a Project
        </motion.a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span
          className="block w-5 h-0.5 bg-white/80 transition-all duration-300"
          style={{ transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }}
        />
        <span
          className="block w-5 h-0.5 bg-white/80 transition-all duration-300"
          style={{ opacity: menuOpen ? 0 : 1 }}
        />
        <span
          className="block w-5 h-0.5 bg-white/80 transition-all duration-300"
          style={{ transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }}
        />
      </button>

      {/* Mobile menu (Wrapped in AnimatePresence for clean unmounting) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute top-full left-0 right-0 mt-1 mx-4 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(3,7,18,0.96)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(212,175,55,0.15)",
            }}
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-white/70 hover:text-white transition-colors duration-200 py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-full text-black mt-2"
                style={{
                  background: "linear-gradient(135deg, #F5E6A3 0%, #D4AF37 40%, #B87333 100%)",
                }}
              >
                Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}