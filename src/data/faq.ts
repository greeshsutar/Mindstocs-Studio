export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    label: 'General',
    items: [
      {
        question: 'What does MindStocs Studio do?',
        answer:
          'MindStocs Studio is a software and digital agency that provides software development, SaaS product development, trading algorithm development, performance marketing, SEO and content creation services.',
      },
      {
        question: 'What type of businesses do you work with?',
        answer:
          'We work with businesses of different sizes — from startups building their first product to established companies looking to develop new software, improve digital presence or grow through marketing.',
      },
      {
        question: 'Do you work with startups?',
        answer:
          'Yes. We can help startups scope, design and build their initial product or MVP, and support growth through marketing and SEO.',
      },
    ],
  },
  {
    id: 'software',
    label: 'Software',
    items: [
      {
        question: 'Can MindStocs build software from scratch?',
        answer:
          'Yes. We handle the full development process from requirement analysis through to deployment and ongoing support.',
      },
      {
        question: 'Can you improve an existing application?',
        answer:
          'Yes. We can audit, improve, extend or rebuild existing software systems based on your requirements.',
      },
    ],
  },
  {
    id: 'saas',
    label: 'SaaS',
    items: [
      {
        question: 'Can you build an MVP?',
        answer:
          'Yes. We can scope and develop an MVP focused on validating your core product idea with real users.',
      },
      {
        question: 'Can you develop a complete SaaS product?',
        answer:
          'Yes. We can handle the full product lifecycle from discovery through to a production-ready, scalable SaaS platform.',
      },
    ],
  },
  {
    id: 'trading',
    label: 'Trading',
    items: [
      {
        question: 'What does trading algorithm development involve?',
        answer:
          'It involves engineering the technical infrastructure for systematic trading — including data handling, strategy logic, backtesting, risk management and execution automation.',
      },
      {
        question: 'Do you guarantee trading profits?',
        answer:
          'No. Trading involves financial risk. Algorithm development does not guarantee profitability or future performance. We provide engineering and technology services.',
      },
    ],
  },
  {
    id: 'seo-faq',
    label: 'SEO',
    items: [
      {
        question: 'How long does SEO take?',
        answer:
          'SEO is a long-term process. Technical improvements can show results in weeks, but meaningful organic growth typically builds over months of consistent work.',
      },
      {
        question: 'What does your SEO service include?',
        answer:
          'Our SEO service covers technical audits, on-page optimization, keyword research, content strategy, internal linking, local SEO and ongoing performance reporting.',
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    items: [
      {
        question: 'How do you measure campaign performance?',
        answer:
          'We track and report on defined KPIs such as impressions, clicks, conversions, cost per acquisition and return on ad spend. Specific metrics depend on the campaign objectives.',
      },
    ],
  },
  {
    id: 'project',
    label: 'Project',
    items: [
      {
        question: 'How does a project begin?',
        answer:
          'Projects begin with a conversation about your requirements. We then define scope, timeline and approach before starting any work.',
      },
      {
        question: 'What information do you need to get started?',
        answer:
          'A description of what you are trying to build or achieve, any existing systems or context, timeline expectations, and budget range if available.',
      },
      {
        question: 'How long does development take?',
        answer:
          'Development timelines depend on scope and complexity. We provide clear timeline estimates after understanding the full requirements.',
      },
      {
        question: 'Do you provide post-launch support?',
        answer:
          'Yes. We offer ongoing support, maintenance and improvement services after launch.',
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    items: [
      {
        question: 'How can I request a project estimate?',
        answer:
          'You can submit a project brief through our contact form, reach out via WhatsApp, or use the MindStocs Assistant on this website to start a conversation.',
      },
      {
        question: 'What is your pricing?',
        answer:
          'Project pricing depends on scope, requirements and complexity. Contact the team to discuss your requirements and receive a tailored estimate.',
      },
    ],
  },
];

export function getAllFAQItems(): FAQItem[] {
  return faqCategories.flatMap((category) => category.items);
}
