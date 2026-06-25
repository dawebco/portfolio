import type { CSSProperties, ReactNode } from "react"
import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ClipboardList, PenTool, Code2, Rocket, LifeBuoy } from "lucide-react"

interface Step {
  id: string
  icon: ReactNode
  title: string
  description: string
  accent: string
}

const STEPS: Step[] = [
  {
    id: "discover",
    icon: <Search size={20} />,
    title: "Discover",
    description: "We understand your business, goals, audience, and website requirements.",
    accent: "#FFFFFF",
  },
  {
    id: "plan",
    icon: <ClipboardList size={20} />,
    title: "Plan",
    description: "We define the website structure, pages, content flow, and design direction.",
    accent: "#F5E6A3",
  },
  {
    id: "design",
    icon: <PenTool size={20} />,
    title: "Design",
    description: "We create a clean, modern interface that matches your brand.",
    accent: "#ECE2B4",
  },
  {
    id: "develop",
    icon: <Code2 size={20} />,
    title: "Develop",
    description: "We build a responsive, fast, and reliable website.",
    accent: "#D4AF37",
  },
  {
    id: "launch",
    icon: <Rocket size={20} />,
    title: "Launch",
    description: "We test, optimize, deploy, and connect your website to your domain.",
    accent: "#C5A059",
  },
  {
    id: "support",
    icon: <LifeBuoy size={20} />,
    title: "Support",
    description: "We help with updates, improvements, and future changes.",
    accent: "#B87333",
  },
]

const sectionHeadStyle: CSSProperties = {
  fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
  background: "linear-gradient(135deg, #FFFFFF 0%, #ECE2B4 50%, #C5A059 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  letterSpacing: "-0.02em",
}

interface StepCardProps {
  step: Step
  index: number
  hoveredIndex: number | null
  setHoveredIndex: (index: number | null) => void
}

function StepCard({ step, index, hoveredIndex, setHoveredIndex }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="group relative flex gap-6 p-8 rounded-2xl cursor-pointer transition-all duration-500"
      style={{
        background: "rgba(7, 14, 26, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(16px)",
      }}
      whileHover={{
        y: -6,
        borderColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.5)",
      }}
    >
      {/* Dynamic Background Layout Tracking Line System */}
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.div
            layoutId="activeCardGlow"
            className="absolute inset-0 rounded-2xl pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            style={{
              background: `radial-gradient(circle at 50% 0%, ${step.accent}0d 0%, transparent 75%)`,
              borderTop: `1px solid ${step.accent}30`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Main Content Layout Container */}
      <div className="relative z-10 flex gap-6 w-full">
        <div className="shrink-0 flex flex-col items-center pt-1">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${step.accent}15, transparent)`,
              border: `1px solid ${step.accent}25`,
              color: step.accent,
              boxShadow: `0 0 20px -5px ${step.accent}20`,
            }}
          >
            {step.icon}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 min-w-0 justify-center">
          <h3
            className="text-xl font-medium text-white/90 leading-tight transition-colors duration-300 group-hover:text-white"
            style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
          >
            {step.title}
          </h3>
          <p 
            className="text-sm text-white/60 leading-relaxed font-normal" 
            style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
          >
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function HowWeWorkSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="process"
      className="relative py-36 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ background: "#02040a" }}
    >
      {/* Background Ambience Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 1000px at 80% 20%, rgba(212, 175, 55, 0.015) 0%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 text-left"
        >
          <span
            className="inline-block text-xs font-mono tracking-[0.3em] uppercase mb-4 font-bold"
            style={{ color: "#D4AF37" }}
          >
            Our Methodology
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            style={sectionHeadStyle}
          >
            How We Work
          </h2>
          <p 
            className="mt-6 text-white/40 max-w-2xl text-base md:text-lg leading-relaxed font-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
          >
            A high-fidelity framework engineered for structured translation, fluid communication channels, 
            and pristine deployment timelines.
          </p>
        </motion.div>

        {/* Primary Interactive Process Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {STEPS.map((step, i) => (
            <StepCard 
              key={step.id} 
              step={step} 
              index={i} 
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}