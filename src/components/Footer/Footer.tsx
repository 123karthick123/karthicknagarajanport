import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { contact, profile } from '../../data/profile'
import { AnimatedIcon } from '../ui/AnimatedIcon'

export function Footer() {
  return (
    <footer className="relative border-t border-line py-10">
      <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-sm font-bold">{profile.name}</p>
          <p className="t-small text-muted">
            {profile.role} · {profile.location}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email Karthick"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface"
          >
            <AnimatedIcon icon={Mail} size={17} hover="bounce" draw={false} />
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface"
          >
            <AnimatedIcon icon={Github} size={17} hover="bounce" draw={false} />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface"
          >
            <AnimatedIcon icon={Linkedin} size={17} hover="bounce" draw={false} />
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface"
            style={{ color: 'var(--accent)' }}
          >
            <AnimatedIcon icon={ArrowUp} size={17} hover="bounce" draw={false} />
          </a>
        </div>
      </div>
      <div className="shell mt-6">
        <p className="t-small text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Tailwind CSS,
          Framer Motion and three.js.
        </p>
      </div>
    </footer>
  )
}
