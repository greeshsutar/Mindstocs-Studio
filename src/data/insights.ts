export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  readingTime: string;
  content: string; // HTML-safe body text
  relatedServices: string[]; // slug matches
  relatedArticles: string[]; // slug matches
}

export const articles: Article[] = [
  {
    id: 'technical-seo-foundations',
    slug: 'technical-seo-foundations',
    title: 'Technical SEO Foundations for Organic Visibility',
    description: 'A structural checklist covering sitemaps, semantic layout hierarchies, indexation rules, and performance metrics.',
    author: 'SEO Engineering Team',
    date: 'August 10, 2026',
    category: 'SEO',
    readingTime: '5 min read',
    content: `
      <p>Search engine optimization (SEO) is built on structural foundations. Before keyword strategies or link acquisitions, search engine crawlers must be able to index and read your website easily.</p>
      
      <h3>1. Semantic HTML Structure</h3>
      <p>Using correct HTML5 tags such as <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, and <code>&lt;footer&gt;</code> is essential. It provides contextual hierarchy. Always enforce a single <code>&lt;h1&gt;</code> tag representing the main topic, followed by sequential H2 and H3 subdivisions. Never style body paragraphs using heading tags just to adjust fonts.</p>
      
      <h3>2. Structured JSON-LD Data Schemas</h3>
      <p>Structured schema markers tell crawlers explicitly what your company does. Using <code>Organization</code>, <code>LocalBusiness</code>, and <code>Service</code> schemas inside your head scripts clarifies your location, phone, active services, and legal GST mappings. This is crucial for local searches.</p>
      
      <h3>3. Performance Metrics (Core Web Vitals)</h3>
      <p>Loading latency directly impacts search indexing. Focus on optimizing the three core web vitals: LCP (Largest Contentful Paint), INP (Interaction to Next Paint), and CLS (Cumulative Layout Shift). Use modern formats like WebP or AVIF, lazy-load R3F canvas layers when they are offscreen, and structure stylesheet files cleanly to prevent layout shifts.</p>
    `,
    relatedServices: ['seo'],
    relatedArticles: []
  },
  {
    id: 'systematic-trading-logic',
    slug: 'systematic-trading-logic',
    title: 'Designing Systematic Trading Algorithms with Risk Controls',
    description: 'An engineering overview of market data ingest, backtesting pipelines, and pre-trade risk validations.',
    author: 'Trading Technology Desk',
    date: 'August 05, 2026',
    category: 'Trading Technology',
    readingTime: '6 min read',
    content: `
      <p>Developing trading infrastructure is a discipline of precision and control. Unlike general software, trading algorithms operate under volatile market feeds and require strict boundaries to prevent financial drawdowns.</p>
      
      <h3>1. Market Data Ingestion Pipeline</h3>
      <p>The system must parse WebSocket streams reliably. We separate raw ingestion from calculation modules by queuing incoming ticks. This ensures that calculation latency does not block WebSocket buffers, which would lead to stale data processing.</p>
      
      <h3>2. Risk Controls as Gateways</h3>
      <p>Never rely on strategy logic to enforce risk limits. Pre-trade risk controls should be implemented as an isolated gateway layer. The risk module evaluates order sizing, price bounds, and execution frequency before any order reaches the API broker connection.</p>
      
      <h3>3. The Disclosures Rule</h3>
      <p>It is important to remember that backtests represent historical simulations. Systematic developers must avoid promising profits or presenting misleading metrics. Responsible developers prioritize risk containment and technical uptime above all else.</p>
    `,
    relatedServices: ['trading-algorithm-development'],
    relatedArticles: []
  },
  {
    id: 'saas-mvp-scoping',
    slug: 'saas-mvp-scoping',
    title: 'Scoping a SaaS MVP: Scarcity as a Design Tool',
    description: 'How focusing on single core values speeds up product validation cycles and reduces initial development overhead.',
    author: 'Product Engineering Desk',
    date: 'July 28, 2026',
    category: 'SaaS',
    readingTime: '4 min read',
    content: `
      <p>When launching a new software product, founders often attempt to build every feature at once. This leads to extended timelines, bloated codebases, and delayed validation cycles.</p>
      
      <h3>1. The Core Value Loop</h3>
      <p>An MVP should focus entirely on a single value loop. If you are building a tool for invoicing, the core loop is creating a invoice and collecting payment. Custom reporting templates, multiple user permissions, and integrations can wait for subsequent versions.</p>
      
      <h3>2. Standardized Microservice Architectures</h3>
      <p>Speed up MVP scoping by utilizing reusable system boilerplates. Leverage pre-built microservices for common systems like multi-tenant workspace separation, password reset links, and billing webhooks. This lets you spend engineering hours on custom features rather than common infrastructure.</p>
      
      <h3>3. Launch and Learn Cycles</h3>
      <p>Deploy quickly to gather real user feedback. Monitor key user pathways, track loading performance, and let data guide feature priority rather than speculation.</p>
    `,
    relatedServices: ['saas-product-development', 'software-development'],
    relatedArticles: []
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return articles.map((a) => a.slug);
}
