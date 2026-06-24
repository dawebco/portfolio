import type { CSSProperties } from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  quote: string
  rating: number
  photoUrl: string
  accentColor: string
  size: "sm" | "md" | "lg"
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Founder & CEO",
    company: "Lumière Boutique",
    quote:
      "DaWebCo. transformed our digital presence completely. Our online sales jumped 340% within three months of the new site going live. The quality of work is on another level.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
    accentColor: "#D4AF37",
    size: "lg",
  },
  {
    id: 2,
    name: "Marcus Webb",
    role: "Owner",
    company: "Ember Restaurant Group",
    quote:
      "Every pixel was intentional. Reservations are up 200% and our brand finally looks as premium as the dining experience we offer.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
    accentColor: "#C9A84C",
    size: "md",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Director",
    company: "Nirvana Wellness Studio",
    quote:
      "From concept to launch in under three weeks. They understood our brand perfectly on the very first call — the designs were practically ready without revisions.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
    accentColor: "#B87333",
    size: "sm",
  },
  {
    id: 4,
    name: "James Kowalski",
    role: "Managing Partner",
    company: "Kowalski & Associates Law",
    quote:
      "Professional, premium, and high-performing. Client inquiries doubled within the first month. The ROI was visible before we even finished reviewing the invoice.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
    accentColor: "#E8C97A",
    size: "lg",
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    role: "Creative Director",
    company: "Forma Interior Studio",
    quote:
      "The animations and micro-interactions they built set us apart from every competitor in our market. Clients regularly comment on how refined the experience feels.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
    accentColor: "#D4AF37",
    size: "md",
  },
  {
    id: 6,
    name: "David Park",
    role: "Co-Founder",
    company: "Stackwise Technologies",
    quote:
      "We went from a basic landing page to a full SaaS marketing site in six weeks. The quality far exceeded every expectation. Our investor deck now links to the website as proof of execution quality.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&auto=format&q=80",
    accentColor: "#C9A84C",
    size: "sm",
  },
]

const sectionHeadStyle: CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  background: "linear-gradient(135deg, #FFFFFF 0%, #F5E6A3 40%, #D4AF37 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}

function StarRating({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={color}>
          <path d="M6 0.5L7.545 4.13L11.5 4.545L8.75 7.205L9.59 11.13L6 9.02L2.41 11.13L3.25 7.205L0.5 4.545L4.455 4.13L6 0.5Z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t, delay }: { t: Testimonial; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className="group break-inside-avoid mb-5 rounded-2xl p-6 flex flex-col gap-4 cursor-default"
      style={{
        background: "rgba(7,14,26,0.65)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
      }}
      whileHover={{
        borderColor: `${t.accentColor}28`,
        boxShadow: `0 0 40px ${t.accentColor}0C`,
      }}
    >
      {/* Quote icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${t.accentColor}10`, color: `${t.accentColor}80` }}
      >
        <Quote size={14} />
      </div>

      {/* Stars */}
      <StarRating rating={t.rating} color={t.accentColor} />

      {/* Quote text */}
      <p
        className="text-sm text-white/60 leading-relaxed italic"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <img
          src={t.photoUrl}
          alt={t.name}
          width={40}
          height={40}
          className="rounded-full object-cover flex-shrink-0"
          style={{ border: `1.5px solid ${t.accentColor}30` }}
          onError={(e) => {
            const img = e.currentTarget
            img.style.display = "none"
          }}
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-white/85 truncate">{t.name}</span>
          <span className="text-xs text-white/35 truncate">
            {t.role}, {t.company}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" })

  const col1 = TESTIMONIALS.filter((_, i) => i % 3 === 0)
  const col2 = TESTIMONIALS.filter((_, i) => i % 3 === 1)
  const col3 = TESTIMONIALS.filter((_, i) => i % 3 === 2)

  return (
    <section
      id="testimonials"
      className="relative py-28 px-6 md:px-12"
      style={{ background: "#030712" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 60%, rgba(184,115,51,0.04) 0%, transparent 70%)",
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
            Social Proof
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight max-w-2xl"
            style={sectionHeadStyle}
          >
            Businesses That
            <br />
            Chose to Win.
          </h2>
          <p className="mt-5 text-white/40 max-w-md text-sm md:text-base leading-relaxed">
            Real outcomes from real clients. These aren&apos;t testimonials — they&apos;re
            proof-of-concept reports from business owners who chose premium.
          </p>
        </motion.div>

        {/* Masonry grid — 3 columns desktop, 2 columns tablet, 1 column mobile */}
        <div className="hidden lg:flex gap-5 items-start">
          <div className="flex-1 flex flex-col">
            {col1.map((t, i) => (
              <TestimonialCard key={t.id} t={t} delay={i * 0.1} />
            ))}
          </div>
          <div className="flex-1 flex flex-col mt-10">
            {col2.map((t, i) => (
              <TestimonialCard key={t.id} t={t} delay={i * 0.1 + 0.08} />
            ))}
          </div>
          <div className="flex-1 flex flex-col mt-6">
            {col3.map((t, i) => (
              <TestimonialCard key={t.id} t={t} delay={i * 0.1 + 0.16} />
            ))}
          </div>
        </div>

        {/* 2-column masonry for tablet */}
        <div className="hidden md:flex lg:hidden gap-5 items-start">
          {[
            TESTIMONIALS.filter((_, i) => i % 2 === 0),
            TESTIMONIALS.filter((_, i) => i % 2 === 1),
          ].map((col, ci) => (
            <div key={ci} className={`flex-1 flex flex-col ${ci === 1 ? "mt-8" : ""}`}>
              {col.map((t, i) => (
                <TestimonialCard key={t.id} t={t} delay={i * 0.12} />
              ))}
            </div>
          ))}
        </div>

        {/* Single column for mobile */}
        <div className="md:hidden flex flex-col">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
