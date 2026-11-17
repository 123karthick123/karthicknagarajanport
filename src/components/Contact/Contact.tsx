import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useCallback, useState } from 'react'
import { contact, profile } from '../../data/profile'
import { Reveal } from '../motion/RevealText'
import { AnimatedIcon, type IconComponent } from '../ui/AnimatedIcon'
import { Section } from '../ui/Section'

interface Row {
  id: string
  icon: IconComponent
  label: string
  value: string
  href: string
  copy?: boolean
  external?: boolean
}

const rows: Row[] = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    copy: true,
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Phone',
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s/g, '')}`,
    copy: true,
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Connect on LinkedIn',
    href: contact.linkedin,
    external: true,
  },
  {
    id: 'github',
    icon: Github,
    label: 'GitHub',
    value: 'See my repositories',
    href: contact.github,
    external: true,
  },
]

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = useCallback(async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      /* clipboard blocked — the link beside the button still works */
      return
    }
    setCopied(id)
    window.setTimeout(() => setCopied((c) => (c === id ? null : c)), 1800)
  }, [])

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      eyebrowIcon={Send}
      heading="Let's build something together"
      accentWords={['together']}
      lede="The fastest way to reach me is email or a call. Copy either one with a single click."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <ul className="space-y-3">
          {rows.map((row, i) => (
            <Reveal key={row.id} delay={i * 0.08}>
              <li className="card flex items-center gap-4 p-4">
                <span
                  className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-line bg-surface-2"
                  style={{ color: 'var(--accent)' }}
                >
                  <AnimatedIcon icon={row.icon} size={18} hover="bounce" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {row.label}
                  </p>
                  <a
                    href={row.href}
                    target={row.external ? '_blank' : undefined}
                    rel={row.external ? 'noreferrer noopener' : undefined}
                    className="block truncate text-sm font-semibold hover:underline"
                  >
                    {row.value}
                  </a>
                </div>

                {row.copy && (
                  <button
                    type="button"
                    onClick={() => copy(row.id, row.value)}
                    aria-label={`Copy ${row.label.toLowerCase()} to clipboard`}
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-line bg-surface-2 transition-colors"
                    style={{ color: copied === row.id ? 'var(--accent-2)' : 'var(--muted)' }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={copied === row.id ? 'done' : 'copy'}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex"
                      >
                        {copied === row.id ? (
                          <Check size={17} aria-hidden />
                        ) : (
                          <Copy size={17} aria-hidden />
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                )}
              </li>
            </Reveal>
          ))}
          <p role="status" aria-live="polite" className="sr-only">
            {copied ? `${copied} copied to clipboard` : ''}
          </p>
        </ul>

        <Reveal delay={0.2}>
          <div className="card flex h-full flex-col justify-between gap-6 p-6">
            <div>
              <h3 className="t-h3 font-display">Open to new work</h3>
              <p className="t-small mt-2 text-muted">
                {profile.role} based in {profile.location}, working across React.js, React Native
                and Node.js.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={15} aria-hidden style={{ color: 'var(--accent)' }} />
              {profile.location}
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
            >
              <Mail size={16} aria-hidden />
              Email me
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
