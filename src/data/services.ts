export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  positioning: string;
  capabilities: string[];
  process: ProcessStep[];
  technologies: string[];
  deliverables: string[];
  faqs: ServiceFAQ[];
  cta: { label: string; href: string };
  disclaimer?: string;
}

export const services: Service[] = [
  {
    id: 'software-development',
    slug: 'software-development',
    number: '01',
    title: 'Software Development',
    shortDescription: 'Turn business requirements into reliable digital products.',
    positioning: 'Turn business requirements into reliable digital products.',
    description:
      'Custom software built around your business workflows, processes and requirements. From web applications to backend systems, we engineer solutions that support the way your business operates.',
    capabilities: [
      'Web applications',
      'Business platforms',
      'Admin dashboards',
      'APIs & backend systems',
      'Database architecture',
      'Third-party integrations',
      'Workflow automation',
      'Authentication & authorization',
      'Cloud deployment',
      'Maintenance & improvements',
    ],
    process: [
      { number: '01', title: 'Requirement Analysis', description: 'Understand your business workflows and technical requirements.' },
      { number: '02', title: 'System Design', description: 'Define architecture, data models and integration points.' },
      { number: '03', title: 'Development', description: 'Build, integrate and test iteratively.' },
      { number: '04', title: 'Deployment', description: 'Deploy to production with proper infrastructure.' },
      { number: '05', title: 'Support', description: 'Monitor, maintain and improve over time.' },
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS'],
    deliverables: [
      'Production-ready application',
      'Technical documentation',
      'Deployment configuration',
      'Source code repository',
      'Ongoing support plan',
    ],
    faqs: [
      {
        question: 'Can MindStocs build software from scratch?',
        answer: 'Yes. We handle the full development process from requirement analysis through to deployment and ongoing support.',
      },
      {
        question: 'Can you improve an existing application?',
        answer: 'Yes. We can audit, improve, extend or rebuild existing software systems based on your requirements.',
      },
      {
        question: 'What technologies do you use?',
        answer: 'We select technologies based on the requirements of each project. Common choices include React, Next.js, Node.js, Python, PostgreSQL and MongoDB.',
      },
    ],
    cta: { label: 'DISCUSS A SOFTWARE PROJECT', href: '/contact?service=software-development' },
  },
  {
    id: 'saas-product-development',
    slug: 'saas-product-development',
    number: '02',
    title: 'SaaS Product Development',
    shortDescription: 'From product idea to production-ready SaaS.',
    positioning: 'From product idea to production-ready SaaS.',
    description:
      'We help you take a SaaS idea from concept through to a production-ready product. Product discovery, requirements, architecture, development, launch and iteration — covered as a complete product development process.',
    capabilities: [
      'Product discovery & requirements',
      'MVP planning & scoping',
      'UI/UX design',
      'Frontend & backend development',
      'Authentication & user management',
      'Subscription & payment integration',
      'Admin dashboards & analytics',
      'Multi-tenant architecture',
      'Deployment & DevOps',
      'Post-launch iteration',
    ],
    process: [
      { number: '01', title: 'Idea', description: 'Understand the product vision, target users and market context.' },
      { number: '02', title: 'Define', description: 'Translate the idea into clear requirements and an MVP scope.' },
      { number: '03', title: 'Design', description: 'Create the user experience and interface design.' },
      { number: '04', title: 'Build', description: 'Develop the frontend, backend and integrations.' },
      { number: '05', title: 'Launch', description: 'Deploy to production with monitoring and analytics.' },
      { number: '06', title: 'Learn', description: 'Gather usage data and user feedback.' },
      { number: '07', title: 'Scale', description: 'Iterate, optimize and grow the product.' },
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS', 'Vercel'],
    deliverables: [
      'Production SaaS application',
      'Admin dashboard',
      'Payment integration',
      'User documentation',
      'Deployment pipeline',
      'Analytics integration',
    ],
    faqs: [
      {
        question: 'Can you build an MVP?',
        answer: 'Yes. We can scope and develop an MVP focused on validating your core product idea with real users.',
      },
      {
        question: 'Can you develop a complete SaaS product?',
        answer: 'Yes. We can handle the full product lifecycle from discovery through to a production-ready, scalable SaaS platform.',
      },
    ],
    cta: { label: 'DISCUSS A SAAS PROJECT', href: '/contact?service=saas-product-development' },
  },
  {
    id: 'trading-algorithm-development',
    slug: 'trading-algorithm-development',
    number: '03',
    title: 'Trading Algorithm Development',
    shortDescription: 'Engineering systematic trading workflows around defined strategies and risk controls.',
    positioning: 'Engineering systematic trading workflows around defined strategies and risk controls.',
    description:
      'We build systematic trading infrastructure — from market data handling and signal generation to backtesting, risk management and execution workflows. This is engineering and technology work, focused on reliability and precision.',
    capabilities: [
      'Market data integration',
      'Strategy logic implementation',
      'Signal generation systems',
      'Backtesting frameworks',
      'Risk control systems',
      'Execution workflow automation',
      'Performance monitoring',
      'Performance analytics & reporting',
    ],
    process: [
      { number: '01', title: 'Strategy Review', description: 'Understand the trading strategy, rules and risk parameters.' },
      { number: '02', title: 'System Design', description: 'Design the data pipeline, logic engine and execution workflow.' },
      { number: '03', title: 'Development', description: 'Build the system with proper testing and validation.' },
      { number: '04', title: 'Backtesting', description: 'Test against historical data with defined metrics.' },
      { number: '05', title: 'Deployment', description: 'Deploy with monitoring, logging and risk safeguards.' },
    ],
    technologies: ['Python', 'Node.js', 'PostgreSQL', 'APIs', 'WebSockets'],
    deliverables: [
      'Trading system codebase',
      'Backtesting reports',
      'Risk control documentation',
      'Monitoring dashboard',
      'Deployment configuration',
    ],
    faqs: [
      {
        question: 'What does trading algorithm development involve?',
        answer: 'It involves engineering the technical infrastructure for systematic trading — including data handling, strategy logic, backtesting, risk management and execution automation.',
      },
      {
        question: 'Do you guarantee trading profits?',
        answer: 'No. Trading involves financial risk. Algorithm development does not guarantee profitability or future performance. We provide engineering and technology services.',
      },
    ],
    cta: { label: 'DISCUSS A TRADING PROJECT', href: '/contact?service=trading-algorithm-development' },
    disclaimer: 'Trading involves financial risk. Algorithm development does not guarantee profitability or future performance.',
  },
  {
    id: 'performance-marketing',
    slug: 'performance-marketing',
    number: '04',
    title: 'Performance Marketing',
    shortDescription: 'Turn attention into measurable business growth.',
    positioning: 'Turn attention into measurable business growth.',
    description:
      'Data-driven campaign strategy, execution and optimization focused on turning marketing spend into measurable business outcomes. From research and audience targeting through to conversion optimization and performance reporting.',
    capabilities: [
      'Campaign strategy & planning',
      'Paid campaign management',
      'Audience research & targeting',
      'Landing page development',
      'Conversion optimization',
      'Campaign analytics',
      'Performance reporting',
      'Budget optimization',
    ],
    process: [
      { number: '01', title: 'Research', description: 'Analyze the market, competitors and target audience.' },
      { number: '02', title: 'Strategy', description: 'Define campaign objectives, channels and budget allocation.' },
      { number: '03', title: 'Campaign', description: 'Create and launch campaigns with targeted messaging.' },
      { number: '04', title: 'Landing', description: 'Build conversion-focused landing experiences.' },
      { number: '05', title: 'Measurement', description: 'Track performance against defined KPIs.' },
      { number: '06', title: 'Optimization', description: 'Iterate based on data to improve results.' },
    ],
    technologies: ['Google Ads', 'Meta Ads', 'Analytics platforms', 'Landing page tools'],
    deliverables: [
      'Campaign strategy document',
      'Campaign setup & management',
      'Landing pages',
      'Performance reports',
      'Optimization recommendations',
    ],
    faqs: [
      {
        question: 'How do you measure campaign performance?',
        answer: 'We track and report on defined KPIs such as impressions, clicks, conversions, cost per acquisition and return on ad spend. Specific metrics depend on the campaign objectives.',
      },
    ],
    cta: { label: 'DISCUSS A MARKETING PROJECT', href: '/contact?service=performance-marketing' },
  },
  {
    id: 'seo',
    slug: 'seo',
    number: '05',
    title: 'SEO',
    shortDescription: 'Build search visibility on technical foundations, useful content and measurable improvement.',
    positioning: 'Build search visibility on technical foundations, useful content and measurable improvement.',
    description:
      'Sustainable organic growth built on technical search foundations, content strategy and measurable improvement. We focus on the structural and content work that helps search engines understand and rank your website.',
    capabilities: [
      'Technical SEO audits',
      'On-page optimization',
      'Keyword research & strategy',
      'Content strategy & planning',
      'Internal linking architecture',
      'Local SEO',
      'Site performance optimization',
      'Search analytics & reporting',
    ],
    process: [
      { number: '01', title: 'Audit', description: 'Analyze current search visibility, technical health and content.' },
      { number: '02', title: 'Strategy', description: 'Define priorities, target keywords and content plan.' },
      { number: '03', title: 'Technical', description: 'Resolve technical issues affecting search performance.' },
      { number: '04', title: 'Content', description: 'Create and optimize content around target topics.' },
      { number: '05', title: 'Monitor', description: 'Track rankings, traffic and search performance.' },
      { number: '06', title: 'Iterate', description: 'Refine strategy based on data and search trends.' },
    ],
    technologies: ['Google Search Console', 'Analytics', 'SEO tools', 'Schema markup'],
    deliverables: [
      'Technical SEO audit report',
      'Keyword strategy document',
      'Content plan',
      'Implementation recommendations',
      'Monthly performance reports',
    ],
    faqs: [
      {
        question: 'How long does SEO take?',
        answer: 'SEO is a long-term process. Technical improvements can show results in weeks, but meaningful organic growth typically builds over months of consistent work.',
      },
      {
        question: 'What does your SEO service include?',
        answer: 'Our SEO service covers technical audits, on-page optimization, keyword research, content strategy, internal linking, local SEO and ongoing performance reporting.',
      },
    ],
    cta: { label: 'DISCUSS AN SEO PROJECT', href: '/contact?service=seo' },
  },
  {
    id: 'content-creation',
    slug: 'content-creation',
    number: '06',
    title: 'Content Creation',
    shortDescription: 'Create content that communicates, educates and converts.',
    positioning: 'Create content that communicates, educates and converts.',
    description:
      'Content that serves a purpose — communicating your value, educating your audience and driving meaningful engagement. From social media content to brand storytelling and campaign creative.',
    capabilities: [
      'Social media content',
      'Brand content & storytelling',
      'Product content',
      'Campaign creative',
      'Educational content',
      'Visual content design',
      'Short-form content',
    ],
    process: [
      { number: '01', title: 'Brief', description: 'Understand the brand, audience and content objectives.' },
      { number: '02', title: 'Strategy', description: 'Define content themes, formats and distribution plan.' },
      { number: '03', title: 'Create', description: 'Produce content aligned with the strategy.' },
      { number: '04', title: 'Review', description: 'Refine content based on feedback.' },
      { number: '05', title: 'Distribute', description: 'Publish and distribute across channels.' },
      { number: '06', title: 'Analyze', description: 'Measure performance and iterate.' },
    ],
    technologies: ['Design tools', 'Content management', 'Social platforms', 'Analytics'],
    deliverables: [
      'Content strategy document',
      'Content calendar',
      'Published content assets',
      'Performance reports',
    ],
    faqs: [
      {
        question: 'What types of content do you create?',
        answer: 'We create social media content, brand content, product storytelling, campaign creative, educational content and visual content — depending on your requirements and objectives.',
      },
    ],
    cta: { label: 'DISCUSS A CONTENT PROJECT', href: '/contact?service=content-creation' },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
