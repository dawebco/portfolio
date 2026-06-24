import type { CSSProperties, ReactNode } from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, Palette, Code2, Rocket } from "lucide-react"

interface Step {
  number: string
  icon: ReactNode
  title: string
  description: string
  detail: string
  accent: string
}

const STEPS: Step[] = [
  {
    number: "01",
    icon: <Search size={22} />,
    title: "Discovery & Copywriting",
    description:
      "We immerse ourselves in your brand, market position, and customer psychology — then craft razor-sharp copy that speaks directly to your buyers.",
    detail: "Brand audit · Competitor mapping · Conversion copywriting · Information architecture",
    accent: "#D4AF37",
  },
  {
    number: "02",
    icon: <Palette size={22} />,
    title: "Custom High-Fi Designs",
    description:
      "Every pixel is intentional. We produce Figma-first, high-fidelity designs unique to your brand — no templates, no shortcuts.",
    detail: "Figma prototypes · Mobile-first · Dark/light variants · Micro-interaction specs",
    accent: "#C9A84C",
  },
  {
    number: "03",
    icon: <Code2 size={22} />,
    title: "Next.js Production Build",
    description:
      "Your design becomes a blazing-fast, SEO-ready web application — built on Next.js 15 with TypeScript, production-grade and future-proof.",
    detail: "Next.js 15 · TypeScript · Tailwind CSS · Vercel deployment · Edge runtime",
    accent: "#B87333",
  },
  {
    number: "04",
    icon: <Rocket size={22} />,
    title: "Optimisation & Handover",
    description:
      "We push Lighthouse scores past 95, implement custom SEO metadata, and hand over full ownership with documentation and training.",
    detail: "Core Web Vitals · Analytics · SEO metadata · CMS handover · Ongoing retainer options",
    accent: "#E8C97A",
  },
]

const sectionHeadStyle: CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  background: "linear-gradient(135deg, #FFFFFF 0%, #F5E6A3 40%, #D4AF37 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative flex gap-6 p-7 rounded-2xl cursor-default"
      style={{
        background: "rgba(7,14,26,0.6)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
      }}
      whileHover={{
        borderColor: `${step.accent}30`,
        backgroundColor: "rgba(10,18,35,0.8)",
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${step.accent}08 0%, transparent 60%)`,
        }}
      />

      {/* Step number + icon */}
      <div className="shrink-0 flex flex-col items-center gap-3 pt-1">
        <span
          className="text-xs font-mono font-bold tracking-wider"
          style={{ color: `${step.accent}80` }}
        >
          {step.number}
        </span>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${step.accent}14`,
            border: `1px solid ${step.accent}25`,
            color: step.accent,
          }}
        >
          {step.icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 min-w-0">
        <h3
          className="text-lg font-semibold text-white/90 leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {step.title}
        </h3>
        <p className="text-sm text-white/45 leading-relaxed">{step.description}</p>
        <p className="text-xs font-mono tracking-wide mt-1" style={{ color: `${step.accent}65` }}>
          {step.detail}
        </p>
      </div>
    </motion.div>
  )
}

export function HowWeWorkSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" })

  return (
    <section id="process" className="relative py-28 px-6 md:px-12" style={{ background: "#030712" }}>
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-16"
        >
          <span
            className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4"
            style={{ color: "#D4AF37" }}
          >
            Our Process
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight max-w-2xl"
            style={sectionHeadStyle}
          >
            From Brief to
            <br />
            Launch-Ready.
          </h2>
          <p className="mt-5 text-white/45 max-w-lg text-sm md:text-base leading-relaxed">
            A structured four-phase process designed to eliminate guesswork and deliver extraordinary
            results — on scope, on time, every time.
          </p>
        </motion.div>

        {/* Asymmetric step grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* Timeline connector hint on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="hidden md:flex items-center justify-center mt-12 gap-4"
        >
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex items-center gap-4">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: step.accent, opacity: 0.7 }}
              />
              {i < STEPS.length - 1 && (
                <div
                  className="w-16 h-px"
                  style={{
                    background: `linear-gradient(to right, ${STEPS[i].accent}50, ${STEPS[i + 1].accent}50)`,
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
