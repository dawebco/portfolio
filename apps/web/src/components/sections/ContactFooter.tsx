import React from "react"
import type { CSSProperties, ReactNode } from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MessageCircle, ArrowRight, Globe } from "lucide-react"

// Updated behind-the-scenes premium WhatsApp endpoint string 
const WHATSAPP_URL =
  "https://wa.me/917625072926?text=Hi%20DaWebCo%2C%20I%27d%20like%20to%20discuss%20a%20web%20project.%20Can%20we%20schedule%20a%20discovery%20call%3F"

const EMAIL = "dawebsiteco@gmail.com"

const sectionHeadStyle: CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  background: "linear-gradient(135deg, #FFFFFF 0%, #F5E6A3 40%, #D4AF37 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}

const FOOTER_LINKS = [
  {
    heading: "Services",
    links: [
      { label: "Web Design", href: "#process" },
      { label: "Next.js Development", href: "#process" },
      { label: "SEO & Performance", href: "#process" },
      { label: "Enterprise Solutions", href: "#pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
]

function ContactCard({
  icon,
  label,
  value,
  href,
  accentColor,
  delay,
}: {
  icon: ReactNode
  label: string
  value: string
  href: string
  accentColor: string
  delay: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{
        borderColor: `${accentColor}40`,
        boxShadow: `0 0 32px ${accentColor}12`,
        y: -3,
      }}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center gap-5 p-6 rounded-2xl transition-all duration-300 cursor-pointer"
      style={{
        background: "rgba(7,14,26,0.6)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        textDecoration: "none",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${accentColor}12`,
          border: `1px solid ${accentColor}25`,
          color: accentColor,
        }}
      >
        {icon}
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-xs text-white/35 tracking-wide uppercase mb-0.5">{label}</span>
        <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-200 truncate">
          {value}
        </span>
      </div>

      <ArrowRight
        size={16}
        className="ml-auto shrink-0 transition-all duration-300 group-hover:translate-x-1"
        style={{ color: `${accentColor}60` }}
      />
    </motion.a>
  )
}
function ContactForm() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [brief, setBrief] = React.useState("")
  const [isSent, setIsSent] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)"
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.06)"
  }
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"
    e.currentTarget.style.boxShadow = "none"
  }

  const inputStyle: CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    setIsSubmitting(true)

    try {
      // Using Web3Forms API endpoint (Free, no backend setup needed)
      // Get a free key at web3forms.com and swap 'YOUR_ACCESS_KEY_HERE'
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "f3553523-fbc9-4fe4-9ef9-aafb6b6c063f", // Replace with your key
          subject: `New Project Inquiry from ${name}`,
          from_name: "DaWebCo Contact Form",
          to_email: EMAIL,
          name: name,
          email: email,
          project_brief: brief || "No brief provided.",
        }),
      })

      if (response.ok) {
        setIsSent(true)
      } else {
        console.error("Submission failed.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-2xl p-7 md:p-8 flex flex-col items-center justify-center text-center min-h-[380px]"
        style={{
          background: "rgba(7,14,26,0.6)",
          border: "1px solid rgba(212,175,55,0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="w-16 h-16 rounded-full bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center mb-5 text-[#D4AF37]">
          <svg className="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Message Sent
        </h3>
        <p className="text-sm text-white/50 max-w-sm leading-relaxed">
          Thank you, {name}. Your client brief has been compiled. We will review your data and respond within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
      className="rounded-2xl p-7 md:p-8"
      style={{
        background: "rgba(7,14,26,0.6)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}
    >
      <h3
        className="text-xl font-bold text-white mb-1"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Send a Message
      </h3>
      <p className="text-xs text-white/40 mb-6">We respond within 24 hours on business days.</p>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/40 tracking-wide">Name</label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
              style={inputStyle}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/40 tracking-wide">Email</label>
            <input
              type="email"
              required
              disabled={isSubmitting}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
              style={inputStyle}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-white/40 tracking-wide">Project Brief</label>
          <textarea
            rows={4}
            disabled={isSubmitting}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Tell us about your business and what you'd like to build..."
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200 resize-none"
            style={inputStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={isSubmitting ? {} : { scale: 1.02, boxShadow: "0 0 32px rgba(212,175,55,0.3)" }}
          whileTap={isSubmitting ? {} : { scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className={`w-full py-3.5 rounded-xl text-sm font-bold text-black flex items-center justify-center gap-2 mt-2 ${isSubmitting ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
          style={{
            background: "linear-gradient(135deg, #F5E6A3 0%, #D4AF37 40%, #B87333 100%)",
          }}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          {!isSubmitting && <ArrowRight size={15} />}
        </motion.button>
      </div>
    </motion.form>
  )
}
export function ContactFooter() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-40px" })

  return (
    <>
      {/* ── Contact Section ── */}
      <section
        id="contact"
        className="relative py-28 px-6 md:px-12"
        style={{ background: "#030712" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="mb-14"
          >
            <span
              className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4"
              style={{ color: "#D4AF37" }}
            >
              Contact
            </span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight max-w-2xl"
              style={sectionHeadStyle}
            >
              Let&apos;s Build
              <br />
              Something Exceptional.
            </h2>
            <p className="mt-5 text-white/40 max-w-md text-sm md:text-base leading-relaxed">
              Ready to elevate your digital presence? Reach out through any channel below - we
              reply within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact channels */}
            <div className="flex flex-col gap-4">
              <ContactCard
                icon={<Mail size={20} />}
                label="Email Us"
                value={EMAIL}
                href={`mailto:${EMAIL}`}
                accentColor="#D4AF37"
                delay={0.1}
              />
              <ContactCard
                icon={<MessageCircle size={20} />}
                label="WhatsApp"
                value="Chat with Studio"
                href={WHATSAPP_URL}
                accentColor="#25D366"
                delay={0.2}
              />
              <ContactCard
                icon={<Globe size={20} />}
                label="Discovery Call"
                value="Book a 30-min free consultation"
                href="#contact"
                accentColor="#C9A84C"
                delay={0.3}
              />

              {/* Availability pill */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="flex items-center gap-3 px-5 py-4 rounded-xl mt-2"
                style={{
                  background: "rgba(37,211,102,0.05)",
                  border: "1px solid rgba(37,211,102,0.15)",
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: "#25D366", boxShadow: "0 0 6px #25D36680" }}
                />
                <span className="text-xs text-white/50">
                  Currently accepting new projects - {" "}
                  <span className="text-white/70 font-medium">2 spots available this quarter</span>
                </span>
              </motion.div>
            </div>

            {/* Contact form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="relative px-6 md:px-12 pt-16 pb-10 overflow-hidden"
        style={{
          background: "#020710",
          borderTop: "1px solid rgba(212,175,55,0.08)",
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Top footer */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14 items-start">
            {/* Brand */}
            <div className="md:col-span-2 flex flex-col justify-between h-full">
              <div>
                <p className="text-xs text-white/35 leading-relaxed max-w-xs">
                  We build premium websites for small businesses with clear roadmaps to scale into
                  enterprise-grade digital products.
                </p>
                <img
                  src="/logo.png"
                  alt="DaWebCo."
                  className="w-28 h-28 object-cover rounded-2xl mt-5 opacity-80"
                  style={{
                    mixBlendMode: "screen",
                    filter: "brightness(1.05) saturate(1.1)",
                  }}
                />
              </div>
              
              {/* Upgraded Premium Social Layout with Bulletproof Inline SVGs */}
              <div className="flex items-center gap-4 mt-6">
                {(
                  [
                    { 
                      icon: (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      ), 
                      href: "https://www.linkedin.com/in/dawebco", 
                      label: "LinkedIn" 
                    },
                    { 
                      icon: (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      ), 
                      href: "https://github.com/dawebco", 
                      label: "GitHub" 
                    },
                    { 
                      icon: (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      ), 
                      href: "https://www.instagram.com/dawebco", 
                      label: "Instagram" 
                    },
                  ] as { icon: ReactNode; href: string; label: string }[]
                ).map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.12, color: "#D4AF37", borderColor: "rgba(212,175,55,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 transition-all duration-200"
                    style={{ 
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(255,255,255,0.02)"
                    }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading} className="pt-1">
                <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/50 mb-4">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-xs text-white/35 hover:text-white/80 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            className="w-full h-px mb-7"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(212,175,55,0.15), transparent)",
            }}
          />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
            <span>© 2026 DaWebCo. All rights reserved.</span>
            <div className="flex items-center gap-5">
             <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors duration-200">
  Privacy Policy
</a>
              <a href="/termsofservice.html" className="hover:text-white/50 transition-colors duration-200">
                Terms of Service
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="hover:text-white/50 transition-colors duration-200"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* Background watermark */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none select-none text-center whitespace-nowrap"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 900,
            color: "rgba(212,175,55,0.022)",
            letterSpacing: "-0.02em",
            zIndex: 0,
          }}
        >
          DaWebCo.
        </div>
      </footer>
    </>
  )
}