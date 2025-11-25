export type SearchItem = {
  title: string
  href: string
  description: string
  tags: string[]
}

export const searchIndex: SearchItem[] = [
  {
    title: 'Home',
    href: '/',
    description: 'Overview of Suretech Network & Data Solution with services, capabilities, and CTA.',
    tags: ['landing', 'overview', 'hero', 'stats'],
  },
  {
    title: 'Services',
    href: '/services',
    description: 'Detailed ICT offerings including cabling, network design, server setup, and cybersecurity.',
    tags: ['network', 'cabling', 'cybersecurity', 'deployment'],
  },
  {
    title: 'Support Center',
    href: '/support',
    description: '24/7 support channels, escalation matrix, and proactive monitoring playbooks.',
    tags: ['support', 'sla', 'noc', 'contact'],
  },
  {
    title: 'Book a Service',
    href: '/book',
    description: 'Online booking form for CCTV, network, server, and ICT services with scheduling options.',
    tags: ['booking', 'schedule', 'appointment', 'services'],
  },
  {
    title: 'About Us',
    href: '/about',
    description: 'Company vision, mission, and core values that drive our ICT delivery.',
    tags: ['company', 'vision', 'mission', 'team'],
  },
  {
    title: 'Why Choose Us',
    href: '/why-choose-us',
    description: 'Competitive advantages, benefits, and differentiators of partnering with Suretech.',
    tags: ['benefits', 'value', 'trust', 'experience'],
  },
  {
    title: 'Clients & Industries',
    href: '/clients',
    description: 'Industries we serve such as corporate offices, schools, and government agencies.',
    tags: ['industries', 'clients', 'case', 'portfolio'],
  },
  {
    title: 'Certifications',
    href: '/certifications',
    description: 'Official registrations and industry certifications for compliance and trust.',
    tags: ['bir', 'dti', 'compliance', 'licenses'],
  },
  {
    title: 'Innovation Hub',
    href: '/innovation',
    description: 'Research tracks, pilot programs, and future-ready ICT experiments.',
    tags: ['innovation', 'ai', 'labs', 'research'],
  },
  {
    title: 'Tech Insights',
    href: '/insights',
    description: 'Thought leadership articles on AI-ready networks, zero trust, and CCTV projects.',
    tags: ['blog', 'articles', 'insights', 'trends'],
  },
  {
    title: 'Packages',
    href: '/packages',
    description: 'Service bundles with transparent pricing for basic, professional, and enterprise needs.',
    tags: ['pricing', 'packages', 'plans'],
  },
  {
    title: 'Reviews',
    href: '/reviews',
    description: 'Customer reviews and experience sharing from successful projects.',
    tags: ['reviews', 'feedback', 'ratings'],
  },
  {
    title: 'Referral Program',
    href: '/referral',
    description: 'Earn benefits by referring Suretech services to other businesses and partners.',
    tags: ['referral', 'rewards', 'program'],
  },
  {
    title: 'Contact',
    href: '/contact',
    description: 'Direct communication channels, location map, and inquiry form.',
    tags: ['contact', 'location', 'email', 'phone'],
  },
]


