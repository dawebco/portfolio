import type { CSSProperties } from "react"
import { useRef } from "react"
import { motion, useInView, useMotionValue, useTransform, useMotionTemplate } from "framer-motion"
import { Check, Plus } from "lucide-react"

interface PricingTier {
  id: string
  name: string
  tagline: string
  price: string
  accentColor: string
  bgGlow: string
  features: string[]
  cta: string
}

const TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for small businesses & startups looking to launch fast.",
    price: "₹4.9k+",
    accentColor: "rgba(168, 85, 247, 0.4)", 
    bgGlow: "rgba(168, 85, 247, 0.03)",
    cta: "Get Started",
    features: [
      "1-Page Modern Website",
      "Mobile & Tablet Responsive",
      "High-Conversion Contact Form",
      "Instant WhatsApp Integration",
      "Google Maps Integration",
      "Basic SEO Layout Setup",
      "Optimized Fast Delivery",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For businesses ready to expand their reach and showcase services.",
    price: "₹9.9k+",
    accentColor: "rgba(59, 130, 246, 0.4)", 
    bgGlow: "rgba(59, 130, 246, 0.03)",
    cta: "Get Started",
    features: [
      "Everything in Starter included",
      "Up to 5 Multi-functional Pages",
      "Bespoke Custom UI Design",
      "Dedicated Service/Product Showcase",
      "High-Fidelity Image Gallery",
      "Advanced Contact Forms",
      "Google Business Profile Setup",
      "Full On-Page SEO Optimization",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "For established brands demanding a flagship digital asset.",
    price: "₹19.9k+",
    accentColor: "rgba(20, 184, 166, 0.4)", 
    bgGlow: "rgba(20, 184, 166, 0.03)",
    cta: "Get Started",
    features: [
      "Everything in Growth included",
      "Fully Custom Advanced Framework",
      "Premium Micro-Animations",
      "Luxury High-Tier UI/UX System",
      "Lead Generation Infrastructure",
      "Performance & Speed Fine-Tuning",
      "Advanced Security Optimization",
      "Priority Developer Support Line",
    ],
  },
]

const ADD_ONS = [
  { title: "Domain (.com / .in)", description: "Secured at actual real-time cost pricing" },
  { title: "Business Email Setup", description: "Professional @yourbrand workspace layout" },
  { title: "Logo & Brand Identity", description: "Bespoke digital vector branding assets" },
  { title: "Monthly Maintenance", description: "Regular structural code updates & continuous backups" },
  { title: "Premium Content Writing", description: "Copywriting designed to capture search intent & convert" },
  { title: "Social Media Channel Rigging", description: "Seamless consistency setups across networks" },
  { title: "Additional Dynamic Pages", description: "Expand your site scale systematically as needed" },
  { title: "Google Business Profile Optimization", description: "Continuous local map ranking maps management" },
]

const sectionHeadStyle: CSSProperties = {
  fontFamily: 'var(--font-display, "Cinzel", "Playfair Display", Georgia, serif)',
  background: "linear-gradient(135deg, #FFFFFF 0%, #ECE2B4 50%, #C5A059 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  letterSpacing: "-0.02em",
  paddingBottom: "0.15em",
  marginBottom: "-0.15em",
}

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-40px" })

  // Motion values for tracking cursor position relative to the card bounds
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 3D Tilt angles mapped from cursor positions (max 10 degrees tilt for premium subtlety)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

  // Mouse move handler to compute precise fractional offsets from the card center
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    
    // Absolute positions inside the card for the cursor spotlight gradient
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set((x / rect.width) - 0.5)
    mouseY.set((y / rect.height) - 0.5)

    // Set custom CSS variables on the element for optimized spotlight rendering
    cardRef.current.style.setProperty("--mouse-x", `${x}px`)
    cardRef.current.style.setProperty("--mouse-y", `${y}px`)
  }

  function handleMouseLeave() {
    // Smoothly snap back to flat orientation when mouse exits
    mouseX.set(0)
    mouseY.set(0)
  }

  // Combine spotlight position dynamically with standard tier bg color overrides
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      280px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
      ${tier.accentColor.replace("0.4", "0.12")},
      transparent 80%
    )
  `

  return (
    <div 
      style={{ perspective: "1000px" }} 
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: `linear-gradient(180deg, ${tier.bgGlow} 0%, rgba(7, 10, 18, 0.4) 100%)`,
          border: `1px solid ${tier.accentColor}`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex flex-col h-full rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/50"
      >
        {/* Dynamic Interactive Spotlight Layer */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlightBackground }}
        />

        <div className="relative z-10 flex items-baseline justify-between gap-4 mb-3" style={{ transform: "translateZ(20px)" }}>
          <h3
            className="text-2xl font-medium text-white/95 tracking-tight"
            style={{ fontFamily: 'var(--font-sans, "Inter", sans-serif)' }}
          >
            {tier.name}
          </h3>
          <span
            className="text-2xl font-medium text-white/95 tracking-tight"
            style={{ fontFamily: 'var(--font-sans, "Inter", sans-serif)' }}
          >
            {tier.price}
          </span>
        </div>

        <p className="relative z-10 text-sm text-white/45 leading-relaxed mb-6 h-12" style={{ transform: "translateZ(15px)" }}>
          {tier.tagline}
        </p>

        <motion.a
          href="#contact"
          whileHover={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.2)" }}
          whileTap={{ scale: 0.98 }}
          className="relative z-10 w-full inline-flex items-center justify-center py-3 rounded-xl text-sm font-medium transition-all duration-300 mb-8"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "#FFF",
            fontFamily: 'var(--font-sans, "Inter", sans-serif)',
            transform: "translateZ(25px)"
          }}
        >
          {tier.cta}
        </motion.a>

        <div className="relative z-10 text-xs uppercase tracking-wider text-white/40 mb-4 font-semibold" style={{ transform: "translateZ(10px)" }}>
          Includes
        </div>

        <ul className="relative z-10 flex flex-col gap-3.5 flex-1" style={{ transform: "translateZ(10px)" }}>
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3.5 text-sm text-white/70 leading-snug">
              <Check size={15} className="mt-0.5 shrink-0 text-white/60 transition-transform group-hover:scale-110" />
              <span style={{ fontFamily: 'var(--font-sans, "Inter", sans-serif)' }}>{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export function PricingSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-40px" })

  return (
    <section id="pricing" className="relative py-36 px-6 md:px-12 lg:px-24 overflow-hidden" style={{ background: "#02040a" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle 1000px at 50% 40%, rgba(168, 85, 247, 0.02) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24 text-left"
        >
          <span
            className="inline-block text-xs font-mono tracking-[0.3em] uppercase mb-4 font-bold"
            style={{ color: "#D4AF37" }}
          >
            Transparent Pricing
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            style={sectionHeadStyle}
          >
            Our Pricing Plan
          </h2>
          <p 
            className="mt-6 text-white/40 max-w-2xl text-base md:text-lg leading-relaxed font-normal"
            style={{ fontFamily: 'var(--font-sans, "Plus Jakarta Sans", "Inter", sans-serif)' }}
          >
            Clear, realistic product setups structured to scale without surprise costs. Find the exact framework your goals demand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-28">
          {TIERS.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        <div className="border-t border-white/5 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-2" style={{ fontFamily: 'var(--font-sans, "Inter", sans-serif)' }}>
                AVAILABLE ADD-ONS
              </h3>
              <p className="text-xs text-white/40 leading-relaxed">
                Need extra components? Expand your standard architecture seamlessly as requirements evolve over time.
              </p>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {ADD_ONS.map((addon, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: "rgba(255, 255, 255, 0.03)", 
                    borderColor: "rgba(255, 255, 255, 0.08)" 
                  }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex gap-4 p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] cursor-pointer transition-colors duration-200 group/addon"
                >
                  <Plus size={14} className="text-white/40 shrink-0 mt-0.5 transition-transform duration-300 group-hover/addon:rotate-90 group-hover/addon:text-white/80" />
                  <div>
                    <h4 className="text-sm font-medium text-white/90 mb-0.5 transition-colors duration-200 group-hover/addon:text-white" style={{ fontFamily: 'var(--font-sans, "Inter", sans-serif)' }}>
                      {addon.title}
                    </h4>
                    <p className="text-xs text-white/40 leading-normal transition-colors duration-200 group-hover/addon:text-white/60">{addon.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}