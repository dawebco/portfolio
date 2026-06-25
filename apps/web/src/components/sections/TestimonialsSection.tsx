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
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Kavita Mehta",
    role: "Chief Orthodontist",
    company: "Mehi Dental Studio",
    quote:
      "Our old website didn't reflect the clinical excellence we provide. DaWebCo. built a flawless, high converting layout. Patient inquiries via our custom booking form increased by 60% in the first two months alone.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face&auto=format&q=80",
    accentColor: "#D4AF37",
  },
  {
    id: 2,
    name: "Riya Kapoor",
    role: "Owner & Lead Stylist",
    company: "Beauté Luxe Salon",
    quote:
      "In the beauty industry, visuals are everything. The micro-animations and custom UI showcase our bridal transformation portfolio beautifully. Our weekend salon bookings are completely full, all coming organically through the new site.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face&auto=format&q=80",
    accentColor: "#C9A84C",
  },
  {
    id: 3,
    name: "Arjun Softa",
    role: "Co-Owner",
    company: "The Grind Café",
    quote:
      "We wanted a digital asset as curated as our pour over menu. DaWebCo. delivered a flagship layout that has turned into a major branding tool. Cafe footfall increased significantly once our aesthetic digital home went live.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&auto=format&q=80",
    accentColor: "#B87333",
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
      className="group rounded-2xl p-6 md:p-8 flex flex-col gap-5 cursor-default flex-1"
      style={{
        background: "rgba(7,14,26,0.65)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
      }}
      whileHover={{
        borderColor: `${t.accentColor}28`,
        boxShadow: `0 0 40px ${t.accentColor}0C`,
        y: -4,
      }}
    >
      <div className="flex justify-between items-start w-full">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${t.accentColor}10`, color: `${t.accentColor}80` }}
        >
          <Quote size={15} />
        </div>
        <StarRating rating={t.rating} color={t.accentColor} />
      </div>

      <p
        className="text-sm md:text-base text-white/70 leading-relaxed italic font-normal flex-1"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="flex items-center gap-4 pt-4 mt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <img
          src={t.photoUrl}
          alt={t.name}
          width={44}
          height={44}
          className="rounded-full object-cover flex-shrink-0"
          style={{ border: `1.5px solid ${t.accentColor}40` }}
          onError={(e) => {
            e.currentTarget.style.display = "none"
          }}
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-white/90 truncate">{t.name}</span>
          <span className="text-xs text-white/40 truncate">
            {t.role} at <span className="text-white/60 font-medium">{t.company}</span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" })

  return (
    <section
      id="testimonials"
      className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ background: "#030712" }}
    >
      {/* Background glow matrix */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(212,175,55,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-20 text-left"
        >
          <span
            className="inline-block text-xs font-mono tracking-[0.25em] uppercase mb-4 font-bold"
            style={{ color: "#D4AF37" }}
          >
            Social Proof
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            style={sectionHeadStyle}
          >
            Businesses That
            <br />
            Chose to Win.
          </h2>
          <p className="mt-6 text-white/40 max-w-xl text-base leading-relaxed font-normal">
            Real outcomes from local luxury businesses. These aren&apos;t just websites - they&apos;re growth engines built for business owners who demand a premium presence.
          </p>
        </motion.div>

        {/* Dynamic Responsive 3-Card Symmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}