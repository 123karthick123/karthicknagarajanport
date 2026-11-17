import { motion } from 'framer-motion'
import { useCalmMotion } from '../motion/motionPrefs'

const NODES = [
  { x: 42, label: 'Agent app', sub: 'React Native' },
  { x: 160, label: 'Local queue', sub: 'offline write' },
  { x: 278, label: 'REST API', sub: 'Node.js' },
  { x: 396, label: 'Dashboard', sub: 'React.js' },
]

/**
 * Animated diagram of the offline-first sync path in HCC Collection Suite:
 * a collection is written locally first, queued while offline, then replayed
 * to the API and reflected on the admin dashboard.
 */
export function SyncFlow() {
  const calm = useCalmMotion()

  return (
    <figure className="mt-5">
      <svg
        viewBox="0 0 470 132"
        role="img"
        aria-label="Offline-first sync flow: the field agent app writes to a local queue, which replays to the Node.js REST API and then updates the admin dashboard."
        className="w-full"
      >
        {/* connecting track */}
        <line
          x1="42"
          y1="46"
          x2="396"
          y2="46"
          stroke="var(--border)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* drawn-in path */}
        <motion.line
          x1="42"
          y1="46"
          x2="396"
          y2="46"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: calm ? 0.4 : 1.4, ease: 'easeInOut' }}
        />

        {/* travelling packet */}
        {!calm && (
          <motion.circle
            r="5"
            cy="46"
            fill="var(--accent-2)"
            initial={{ cx: 42, opacity: 0 }}
            whileInView={{ cx: [42, 160, 160, 278, 396], opacity: [0, 1, 1, 1, 0] }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          />
        )}

        {NODES.map((n, i) => (
          <g key={n.label}>
            <motion.circle
              cx={n.x}
              cy={46}
              r="11"
              fill="var(--surface-2)"
              stroke={i === 1 ? 'var(--accent-2)' : 'var(--accent)'}
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: calm ? 0 : 0.2 + i * 0.22, type: 'spring', stiffness: 260 }}
              style={{ transformOrigin: `${n.x}px 46px` }}
            />
            <text
              x={n.x}
              y={82}
              textAnchor="middle"
              fill="var(--text)"
              fontSize="11.5"
              fontWeight="600"
              fontFamily="Manrope, sans-serif"
            >
              {n.label}
            </text>
            <text
              x={n.x}
              y={98}
              textAnchor="middle"
              fill="var(--muted)"
              fontSize="10"
              fontFamily="'JetBrains Mono', monospace"
            >
              {n.sub}
            </text>
          </g>
        ))}

        {/* offline badge over the queue node */}
        <motion.g
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: calm ? 0 : 1.1 }}
        >
          <rect
            x="112"
            y="8"
            width="96"
            height="20"
            rx="10"
            fill="var(--surface)"
            stroke="var(--border)"
          />
          <text
            x="160"
            y="22"
            textAnchor="middle"
            fill="var(--accent-2)"
            fontSize="10"
            fontFamily="'JetBrains Mono', monospace"
          >
            works offline
          </text>
        </motion.g>
      </svg>
      <figcaption className="t-small mt-1 text-muted">
        Writes land locally first, then replay to the API when the connection returns.
      </figcaption>
    </figure>
  )
}
