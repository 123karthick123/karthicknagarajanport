/**
 * Single source of truth for every piece of content on the site.
 * Edit this file only — no component needs to change.
 */

export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Mobile'
  | 'Backend'
  | 'Databases'
  | 'DevOps & Tools'
  | 'AI & Automation'

export interface SkillGroup {
  category: SkillCategory
  items: string[]
}

export interface Project {
  id: string
  name: string
  /** what kind of build it was, shown as a small label over the gallery */
  kind: string
  tagline: string
  stack: string[]
  highlights: string[]
  /** screenshots in /public, shown in the card gallery and the lightbox */
  shots: string[]
  /** public URL, if the project is live */
  link?: string
  /** show the animated offline-first sync diagram on this card */
  syncDiagram?: boolean
}

export interface TimelineItem {
  id: string
  kind: 'work' | 'education' | 'certification'
  title: string
  org: string
  period: string
  bullets: string[]
}

export const profile = {
  name: 'B. Karthick Nagarajan',
  shortName: 'Karthick',
  role: 'Full Stack Developer',
  /** the line under the name on the resume */
  title: 'MERN & React Native Specialist · AI-Assisted Engineering',
  location: 'Madurai, Tamil Nadu, India',
  /** words in the hero headline that get the animated gradient */
  heroAccentWords: ['Full', 'Stack', 'Developer'],
  /** cycled by the hero typewriter, one phrase at a time */
  heroRoles: [
    'Full Stack Developer',
    'MERN Stack Developer',
    'React Native Specialist',
    'AI-Assisted Engineer',
  ],
  /** full-bleed portrait behind the hero (lives in /public) */
  heroPhoto: '/karthick-hero.png',
  /** portrait shown in the hero card (lives in /public) */
  photo: '/karthick.jpg',
  /** portrait shown in the about section (lives in /public) */
  aboutPhoto: '/karthick-about.jpg',
  summary:
    'Performance-driven Full Stack Developer with 1+ years of hands-on experience designing, engineering and deploying scalable web dashboards, cross-platform mobile apps and robust RESTful APIs. Core proficiency across JavaScript (ES6+), TypeScript, React.js, React Native, Node.js, Express.js and MongoDB, with specialised expertise in offline-first mobile data sync and state management with Redux Toolkit. Skilled in AI-assisted development and architecting AI-enabled workflows, including LLM API integration and automated backend services.',
  about: [
    'I build the whole path — from the screen a field agent taps, through the Express middleware, down to the MongoDB schema behind it. Most of my work has been operational software: debt-collection tracking, workforce management, admin dashboards on the web and React Native apps that have to keep working when the network does not.',
    'That constraint shaped how I work. Offline-first caching with background sync queues so nothing a user typed is ever lost. JWT and role-based access control so executive and field-tier data stay separated. A modular component kit — forms, modals, data tables, toast alerts — that cut our delivery cycle by about 30%. And increasingly, LLM APIs and prompt engineering wired into Node services to automate the work that used to be manual.',
  ],
} as const

export const contact = {
  email: 'karthicknagaraj135@gmail.com',
  phone: '+91 8220425385',
  linkedin: 'https://www.linkedin.com/in/karthick-nagarajan-b-640292374/',
  github: 'https://github.com/123karthick123',
  /** drop the PDF at public/karthick-nagarajan-cv.pdf for this to work */
  cv: '/karthick-nagarajan-cv.pdf',
} as const

/** The label / value rows in the About section. Edit freely. */
export const aboutFacts = [
  { label: 'Experience', value: '1+ years' },
  { label: 'Phone', value: contact.phone },
  { label: 'Email', value: contact.email },
  { label: 'From', value: profile.location },
  { label: 'Languages', value: 'Tamil, English' },
  { label: 'Freelance', value: 'Available' },
] as const

export interface SkillCard {
  name: string
  /** self-assessed confidence, 0–100 — drives the bar under the logo */
  level: number
  /** devicon slug, e.g. 'react/react-original' */
  logo: string
  /** brand colour, used for the fallback monogram and the hover glow */
  tint: string
}

/** The logo grid in the Skills section. */
export const skillCards: SkillCard[] = [
  { name: 'React.js', level: 92, logo: 'react/react-original', tint: '#61dafb' },
  { name: 'React Native', level: 90, logo: 'react/react-original', tint: '#61dafb' },
  { name: 'Node.js', level: 88, logo: 'nodejs/nodejs-original', tint: '#83cd29' },
  { name: 'MongoDB', level: 84, logo: 'mongodb/mongodb-original', tint: '#4faa41' },
  { name: 'TypeScript', level: 82, logo: 'typescript/typescript-original', tint: '#3178c6' },
  { name: 'Tailwind CSS', level: 90, logo: 'tailwindcss/tailwindcss-original', tint: '#38bdf8' },
  { name: 'Redux', level: 85, logo: 'redux/redux-original', tint: '#764abc' },
  { name: 'MySQL', level: 78, logo: 'mysql/mysql-original', tint: '#00758f' },
]

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'Python', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frontend',
    items: [
      'React.js',
      'Next.js',
      'Redux',
      'Redux Toolkit',
      'Redux-Saga',
      'Tailwind CSS',
      'Bootstrap',
      'Material UI',
    ],
  },
  {
    category: 'Mobile',
    items: ['React Native', 'React Native CLI', 'Metro Bundler', 'Android SDK'],
  },
  {
    category: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'RESTful API Development',
      'Middleware',
      'JWT Authentication',
      'RBAC',
      'Postman',
    ],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'Mongoose ODM', 'MySQL', 'Redis'],
  },
  {
    category: 'DevOps & Tools',
    items: ['Docker', 'Git', 'GitHub', 'Linux / Windows Dev Environments'],
  },
  {
    category: 'AI & Automation',
    items: [
      'LLM API Integration',
      'Prompt Engineering',
      'GitHub Copilot',
      'Claude',
      'ChatGPT',
      'Automated Data Processing',
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'hcc',
    name: 'HCC Collection Suite',
    kind: 'Web dashboard + mobile app',
    tagline:
      'An enterprise debt-collection platform: a React Native app for field agents and a React.js admin dashboard for the office.',
    stack: ['React Native', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux'],
    highlights: [
      'Client, distributor and daily-rate management with validated multi-step forms',
      'Offline-first transaction caching with a background sync queue, so nothing is lost in dead zones',
      'JWT authentication and granular route guards across both the app and the dashboard',
      'Live collection analytics and automated reconciliation APIs for management',
    ],
    shots: [1, 2, 3, 4, 5].map((n) => `/hcc/hccimg${n}.png`),
    syncDiagram: true,
  },
  {
    id: 'hrms',
    name: 'HR Management System',
    kind: 'MERN web application',
    tagline:
      'An end-to-end personnel portal for employee records, daily attendance and multi-tier leave approvals.',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Redux Toolkit'],
    highlights: [
      'Configurable leave types — paid, unpaid, day allowances — with a full request and approval pipeline',
      'Attendance tracking and employee rosters synchronised through Redux Toolkit',
      'Role-based access control across React Router routes and Express endpoints',
      'Searchable, filterable, paginated dashboards built from one reusable table kit',
    ],
    shots: [1, 2, 3, 4, 5].map((n) => `/hrms/HRMS${n}.png`),
  },
  {
    id: 'hinzah',
    name: 'Hinzah Solutions',
    kind: 'Corporate website',
    tagline:
      'The company site for Hinzah Solutions — services, mission, products and enquiries in one responsive build.',
    stack: ['React.js', 'Tailwind CSS', 'Node.js', 'REST API'],
    highlights: [
      'Full marketing site: hero, services, mission, product catalogue and contact',
      'Responsive from phone to desktop, with scroll-triggered section animations',
      'Enquiry form wired to a Node mail endpoint with validation and error states',
      'Tuned for fast first paint on mobile connections',
    ],
    shots: [1, 2, 3, 4, 5].map((n) => `/hinzahsolutions/hinzahsolutions${n}.png`),
  },
  {
    id: 'winture',
    name: 'Winture Trading FZ LLC',
    kind: 'Business website',
    tagline:
      'A product and services site for a Ras Al Khaimah trading company, built around a vehicle catalogue.',
    stack: ['React.js', 'Tailwind CSS', 'REST API'],
    highlights: [
      'Image carousel hero with keyboard and touch navigation',
      'Products and services catalogue driven entirely by data, so new listings need no code',
      'Contact form with field-level validation and a mapped office address',
      'Delivered for the client through Hinzah Solutions',
    ],
    shots: [
      '/winturetrading/winturetrading1.png',
      '/winturetrading/winturetrading2.png',
      '/winturetrading/winturetradin3.png',
      '/winturetrading/winturetrading4.png',
      '/winturetrading/winturetrading5.png',
      '/winturetrading/winturetrading6.png',
    ],
  },
  {
    id: 'lucile',
    name: 'Lucile Rental Cars',
    kind: 'Booking website',
    tagline:
      'A car rental platform with a filterable fleet, per-day pricing and direct WhatsApp enquiries.',
    stack: ['React.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    highlights: [
      'Fleet grid with seats, bags, transmission, fuel and AED day rates on every card',
      'Category filtering — luxury, economy, SUV — plus a detail page per vehicle',
      'Bilingual interface with a language switcher in the navigation',
      'Floating WhatsApp enquiry button so a booking is one tap away',
    ],
    shots: [1, 2, 3, 4, 5, 6, 7].map((n) => `/lucilerentalcars/lucilerentalcars${n}.jpeg`),
  },
]

export const timeline: TimelineItem[] = [
  {
    id: 'hinzah',
    kind: 'work',
    title: 'Full Stack Developer',
    org: 'Hinzah Solutions',
    period: 'Dec 2024 — Apr 2026',
    bullets: [
      'Architected responsive React.js web apps and cross-platform React Native apps for operational tracking and field collection management.',
      'Engineered secure RESTful endpoints and middleware in Node.js and Express.js, with MongoDB schema validation and indexing.',
      'Built a modular frontend design kit — forms, modals, data tables, toast alerts — cutting development cycle time by ~30%.',
      'Enforced JWT authentication and role-based access control across executive and field-tier operations.',
      'Added high-speed local storage so field agents keep recording transactions through network dropouts, then auto-sync on reconnect.',
      'Centralised token rotation, request logging and HTTP error handling through Axios interceptors.',
    ],
  },
  {
    id: 'bsc',
    kind: 'education',
    title: 'B.Sc. Information Technology',
    org: 'Kamarajar University',
    period: '2020 — 2023',
    bullets: [],
  },
  {
    id: 'cert',
    kind: 'certification',
    title: 'Full Stack Developer Certification',
    org: 'Edax Tech IT Solution',
    period: '2023 — 2024',
    bullets: [],
  },
  {
    id: 'hsc',
    kind: 'education',
    title: 'Higher Secondary',
    org: 'Nehru Vidhyasalai Higher Secondary School',
    period: '2019 — 2020',
    bullets: [],
  },
]

export const navItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'skills', label: 'Skills', icon: 'layers' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'journey', label: 'Journey', icon: 'route' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
] as const
