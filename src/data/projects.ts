export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  isInternal: boolean;
  label: string; // e.g. "Internal R&D Product" or "Proprietary Project"
  shortDescription: string;
  challenge: string;
  approach: string;
  whatWeBuilt: string[];
  technologies: string[];
  outcome: string;
  services: string[]; // matching service ids/slugs
}

export const projects: Project[] = [
  {
    id: 'starlight-trading-system',
    slug: 'starlight-trading-system',
    title: 'Starlight Trading Engine',
    client: 'MindStocs Proprietary Project',
    isInternal: true,
    label: 'Proprietary Trading Infrastructure',
    shortDescription: 'A systematic trading workflow built for low-latency market data processing, signal logic, backtesting, and automated risk control.',
    challenge: 'Developing a high-throughput system capable of processing real-time WebSockets market feeds, executing order logic under strict risk thresholds, and backtesting strategies against multiple gigabytes of historical data without memory leaks or race conditions.',
    approach: 'We designed a modular Python/TypeScript system. The ingestion layer reads tick-by-tick data, the signal module generates execution orders, and a separate risk engine validates risk boundaries before forwarding execution payloads. The backtester uses historical tick databases for offline verification.',
    whatWeBuilt: [
      'Low-latency WebSocket data consumer engine.',
      'Comprehensive strategy testing and signal verification framework.',
      'Pre-trade risk gateway limiting size, price deviations, and frequency.',
      'Performance reporting dashboard showing drawdown, Sharpe ratio, and slippage.'
    ],
    technologies: ['Python', 'Node.js', 'PostgreSQL', 'WebSockets', 'REST APIs'],
    outcome: 'Completed the internal R&D platform. Successfully processes tick feeds and executes backtests over 5+ years of historical data. The risk gateway restricts orders within 15ms of signal generation.',
    services: ['trading-algorithm-development', 'software-development']
  },
  {
    id: 'mindstocs-saas-kit',
    slug: 'mindstocs-saas-kit',
    title: 'SaaS Billing & Identity Microservice',
    client: 'MindStocs Internal Product',
    isInternal: true,
    label: 'Internal SaaS Accelerator',
    shortDescription: 'A reusable boilerplate microservice providing multi-tenant authentication, Stripe billing integration, and team management dashboards.',
    challenge: 'Speeding up SaaS product delivery without recreating common infrastructure components like subscription tiers, credit-card processing webhooks, email verification, and team permission controls for every new project.',
    approach: 'We developed an isolated Next.js/Node.js API template with a Postgres/Prisma database layer, implementing robust multi-tenancy where each workspace isolates user memberships, billing plans, and data logs.',
    whatWeBuilt: [
      'Secure email/password and social login OAuth flow.',
      'Flexible subscription tier management linked with Stripe webhooks.',
      'Workspace-based team invite and permission controls.',
      'Interactive usage dashboard displaying subscription logs and invoice histories.'
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe API'],
    outcome: 'Reduced SaaS MVP development overhead by ~30% for all subsequent internal and client builds by providing a plug-and-play foundation.',
    services: ['saas-product-development', 'software-development']
  },
  {
    id: 'organic-growth-engine',
    slug: 'organic-growth-engine',
    title: 'Automated SEO Audit & Analytics Dashboard',
    client: 'MindStocs Internal Tool',
    isInternal: true,
    label: 'Proprietary Marketing Utility',
    shortDescription: 'An internal web utility that tracks site performance metrics, keyword ranking shifts, and schema verification reports.',
    challenge: 'Manually auditing site metrics and aggregating search console queries across multiple properties was time-consuming. We needed a unified dashboard to track organic visibility trends.',
    approach: 'We built a data pipeline utilizing the Google Search Console API and Google Analytics reporting endpoints, storing daily aggregates in a database, and displaying trends via a custom React frontend.',
    whatWeBuilt: [
      'Google Search Console API crawler integration.',
      'PageSpeed Insights monitoring tool generating daily scores.',
      'Visual performance dashboard displaying keyword rankings, clicks, impressions, and indexation errors.'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Google Search Console API'],
    outcome: 'Empowered our SEO team to review site ranking changes and technical health benchmarks in under 5 minutes daily.',
    services: ['seo', 'performance-marketing']
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
