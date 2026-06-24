import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { ContactFooter } from "@/components/sections/ContactFooter"

export function App() {
  return (
    <div className="min-h-screen" style={{ background: "#030712", color: "#ffffff" }}>
      <Navbar />
      <main>
        <HeroSection />
        <HowWeWorkSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactFooter />
      </main>
    </div>
  )
}
