import type React from "react"
import type { CSSProperties, ReactNode } from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MessageCircle, ArrowRight, Globe, Camera, X } from "lucide-react"

const WHATSAPP_URL =
  "https://wa.me/917625072926?text=Hi%20DaWebCo.%2C%20I%27d%20like%20to%20discuss%20a%20web%20project.%20Can%20we%20schedule%20a%20discovery%20call%3F"

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
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
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
            placeholder="Tell us about your business and what you'd like to build..."
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200 resize-none"
            style={inputStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(212,175,55,0.3)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full py-3.5 rounded-xl text-sm font-bold text-black flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #F5E6A3 0%, #D4AF37 40%, #B87333 100%)",
          }}
          onClick={() => {
            window.location.href = `mailto:${EMAIL}`
          }}
        >
          Send Message
          <ArrowRight size={15} />
        </motion.button>
      </div>
    </motion.div>
  )
}

export function ContactFooter() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" })

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
              Ready to elevate your digital presence? Reach out through any channel below — we
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
                value="+91 76250 72926"
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
                  Currently accepting new projects &mdash;{" "}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            {/* Brand */}
            <div className="md:col-span-2">
            
              <p className="mt-4 text-xs text-white/35 leading-relaxed max-w-xs">
                We build premium websites for small businesses with clear roadmaps to scale into
                enterprise-grade digital products.
              </p>
              {/* logo.png: dark navy brand square — screen blend dissolves the navy bg,
                  leaving the copper text and subtle texture on our dark footer */}
              <img
                src="/logo.png"
                alt="DaWebCo. – Your competitors have one. Do you?"
                className="w-28 h-28 object-cover rounded-2xl mt-5 opacity-80"
                style={{
                  mixBlendMode: "screen",
                  filter: "brightness(1.05) saturate(1.1)",
                }}
              />
              <div className="flex items-center gap-4 mt-5">
                {(
                  [
                    { icon: <Camera size={16} />, href: "#", label: "Instagram" },
                    { icon: <X size={16} />, href: "#", label: "Twitter / X" },
                    { icon: <MessageCircle size={16} />, href: WHATSAPP_URL, label: "WhatsApp" },
                  ] as { icon: ReactNode; href: string; label: string }[]
                ).map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, color: "#D4AF37" }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white/35 transition-colors duration-200"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading}>
                <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-xs text-white/35 hover:text-white/70 transition-colors duration-200"
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
            <span>© {new Date().getFullYear()} DaWebCo. All rights reserved.</span>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-white/50 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white/50 transition-colors duration-200">
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

