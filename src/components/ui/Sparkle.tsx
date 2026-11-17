/** Four-point sparkle used as the accent mark through the hero. */
export function Sparkle({
  size = 64,
  className = '',
  color = 'var(--accent)',
}: {
  size?: number
  className?: string
  color?: string
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden
      className={className}
      style={{ color }}
    >
      <path
        d="M50 0c3 26 21 44 50 50-29 6-47 24-50 50-3-26-21-44-50-50C29 44 47 26 50 0Z"
        fill="currentColor"
      />
    </svg>
  )
}
