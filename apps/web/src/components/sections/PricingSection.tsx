import type { CSSProperties, ReactNode } from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Zap, Star, Building2 } from "lucide-react"

interface PricingTier {
  id: string
  icon: ReactNode
  name: string
  tagline: string
  price: string
  priceNote: string
  highlight: boolean
  accentColor: string
  features: string[]
  cta: string
}

const TIERS: PricingTier[] = [
  {
    id: "essential",
    icon: <Zap size={18} />,
    name: "Essential Launch",
    tagline: "For businesses establishing their digital presence",
    price: "₹49,999",
    priceNote: "one-time project fee",
    highlight: false,
    accentColor: "#C9A84C",
    cta: "Get Started",
    features: [
      "Up to 5 custom pages",
      "Mobile-responsive design",
      "Custom domain & hosting setup",
      "Basic SEO metadata & sitemap",
      "Contact form integration",
      "WhatsApp CTA button",
      "Performance score 90+",
      "2 revision rounds",
      "2-week delivery",
      "30-day post-launch support",
    ],
  },
  {
    id: "professional",
    icon: <Star size={18} />,
    name: "Professional Scale",
    tagline: "For growing businesses ready to convert at scale",
    price: "₹1,19,999",
    priceNote: "one-time project fee",
    highlight: true,
    accentColor: "#D4AF37",
    cta: "Most Popular — Start Now",
    features: [
      "Up to 12 fully custom pages",
      "Bespoke Figma UI/UX design",
      "Next.js 15 production build",
      "Advanced SEO metadata & schema",
      "Google Analytics 4 integration",
      "Blog / CMS integration",
      "Performance score 95+",
      "3 revision rounds",
      "4-week delivery",
      "WhatsApp & chat integration",
      "Social media feed embeds",
      "60-day post-launch support",
    ],
  },
  {
    id: "enterprise",
    icon: <Building2 size={18} />,
    name: "Custom Enterprise",
    tagline: "Bespoke digital systems engineered for scale",
    price: "Custom",
    priceNote: "scoped to your requirements",
    highlight: false,
    accentColor: "#B87333",
    cta: "Book a Discovery Call",
    features: [
      "Unlimited pages & sections",
      "Full-stack Next.js application",
      "Custom API integrations",
      "Advanced animation system",
      "Multi-language / i18n support",
      "E-commerce or SaaS features",
      "Performance score 99+",
      "Unlimited revisions",
      "Dedicated project manager",
      "Staff training & documentation",
      "Priority 24/7 support",
      "Ongoing retainer options",
    ],
  },
]

const sectionHeadStyle: CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  background: "linear-gradient(135deg, #FFFFFF 0%, #F5E6A3 40%, #D4AF37 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}

function PopularBorderCard({ tier, index }: { tier: PricingTier; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative"
      style={{ zIndex: tier.highlight ? 2 : 1 }}
    >
      {tier.highlight ? (
        /* Animated gradient border for Most Popular */
        <div className="relative rounded-3xl p-[1.5px] overflow-hidden" style={{ background: "transparent" }}>
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundSize: "300% 300%",
              backgroundImage:
                "linear-gradient(90deg, #D4AF37, #F5E6A3, #C9A84C, #B87333, #F5E6A3, #D4AF37)",
            }}
          />
          <PricingCardInner tier={tier} />
        </div>
      ) : (
        <PricingCardInner tier={tier} />
      )}
    </motion.div>
  )
}

function PricingCardInner({ tier }: { tier: PricingTier }) {
  return (
    <div
      className="group relative flex flex-col h-full rounded-3xl p-7 md:p-8 overflow-hidden"
      style={{
        background: tier.highlight ? "rgba(8,14,28,0.98)" : "rgba(7,14,26,0.6)",
        border: tier.highlight ? "none" : "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        minHeight: "660px",
      }}
    >
      {/* Card glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${tier.accentColor}0C 0%, transparent 65%)`,
        }}
      />

      {/* Most Popular badge */}
      {tier.highlight && (
        <div
          className="absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #B87333)",
            color: "#000",
          }}
        >
          Most Popular
        </div>
      )}

      {/* Tier icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
        style={{
          background: `${tier.accentColor}14`,
          border: `1px solid ${tier.accentColor}28`,
          color: tier.accentColor,
        }}
      >
        {tier.icon}
      </div>

      {/* Tier identity */}
      <h3
        className="text-xl font-bold text-white mb-1"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {tier.name}
      </h3>
      <p className="text-xs text-white/40 leading-relaxed mb-6">{tier.tagline}</p>

      {/* Price */}
      <div className="mb-7">
        <span
          className="text-4xl font-black"
          style={{
            color: tier.highlight ? "#D4AF37" : "#fff",
            fontFamily: tier.highlight ? "'Playfair Display', Georgia, serif" : "inherit",
          }}
        >
          {tier.price}
        </span>
        <span className="text-xs text-white/35 ml-2">{tier.priceNote}</span>
      </div>

      {/* Divider */}
      <div
        className="w-full h-px mb-6"
        style={{ background: `linear-gradient(to right, ${tier.accentColor}30, transparent)` }}
      />

      {/* Feature list */}
      <ul className="flex flex-col gap-3 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-white/60 leading-snug">
            <Check
              size={13}
              className="mt-0.5 flex-shrink-0"
              style={{ color: tier.accentColor }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.03, boxShadow: tier.highlight ? `0 0 32px ${tier.accentColor}40` : "none" }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="mt-8 w-full inline-flex items-center justify-center py-3.5 rounded-xl text-sm font-bold transition-all duration-300"
        style={
          tier.highlight
            ? {
                background: "linear-gradient(135deg, #F5E6A3 0%, #D4AF37 40%, #B87333 100%)",
                color: "#000",
              }
            : {
                background: `${tier.accentColor}14`,
                border: `1px solid ${tier.accentColor}30`,
                color: tier.accentColor,
              }
        }
      >
        {tier.cta}
      </motion.a>
    </div>
  )
}

export function PricingSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" })

  return (
    <section id="pricing" className="relative py-28 px-6 md:px-12" style={{ background: "#030712" }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4"
            style={{ color: "#D4AF37" }}
          >
            Pricing
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
            style={sectionHeadStyle}
          >
            Investment-Grade
            <br />
            Value Frameworks.
          </h2>
          <p className="mt-5 text-white/40 max-w-md mx-auto text-sm md:text-base leading-relaxed">
            Transparent, results-driven pricing. No hidden fees, no lock-in.
            Every tier is engineered to deliver measurable ROI.
          </p>
        </motion.div>

        {/* Pricing grid — middle card elevated on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 items-start">
          {TIERS.map((tier, i) => (
            <div
              key={tier.id}
              className={tier.highlight ? "md:-mt-4 md:mb-0" : "md:mt-4"}
            >
              <PopularBorderCard tier={tier} index={i} />
            </div>
          ))}
        </div>

        {/* Trust footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-xs text-white/25 mt-10"
        >
          All projects include NDA protection · Milestone-based payment schedule available ·
          Prices in INR, international billing supported
        </motion.p>
      </div>
    </section>
  )
}
