import type { CSSProperties } from "react"

// side.png is a gold wordmark on a white background.
// To render it cleanly on a dark page:
//   invert(1)        → white bg becomes black; gold (#D4AF37) inverts to its complement (~blue at 220°)
//   hue-rotate(180°) → shifts that 220° blue complement back to ~40° (gold/amber) ✓
//   screen blend     → the black areas (formerly white bg) disappear against the dark page ✓
const logoStyle: CSSProperties = {
  filter: "invert(1) hue-rotate(180deg) brightness(1.15)",
  mixBlendMode: "screen",
}
const heightMap: Record<string, string> = {
  sm: "h-35", // 7 * 5 = 35 (140px)
  md: "h-50", // 10 * 5 = 50 (200px)
  lg: "h-50"  // 10 * 5 = 50 (200px)
}

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  return (
    <img
      src="/side.png"
      alt="DaWebCo."
      draggable={false}
      className={`object-contain w-auto select-none ${heightMap[size]} ${className}`}
      style={logoStyle}
    />
  )
}
