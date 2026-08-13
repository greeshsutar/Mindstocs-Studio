export interface AssistantResponse {
  message: string;
  suggestedActions?: string[];
  ctaType?: 'whatsapp' | 'contact' | 'none';
}

export interface AssistantIntent {
  keywords: string[];
  response: AssistantResponse;
}

export interface AssistantKnowledgeType {
  welcomeMessage: string;
  quickActions: string[];
  fallback: AssistantResponse;
  intents: AssistantIntent[];
}

export const assistantKnowledge: AssistantKnowledgeType = {
  welcomeMessage: "Hi. I'm the MindStocs Assistant. What are you looking to build, improve or grow?",
  quickActions: [
    'Software',
    'SaaS',
    'Trading',
    'Marketing',
    'SEO',
    'Content',
    'General Question'
  ],
  fallback: {
    message: "I don't have enough verified information to answer that accurately. Would you like to speak with the MindStocs team?",
    suggestedActions: ['Talk to the Team (WhatsApp)', 'Send Project Brief', 'Start Over'],
    ctaType: 'whatsapp'
  },
  intents: [
    {
      keywords: ['software', 'custom software', 'web app', 'admin dashboard', 'api', 'backend', 'database'],
      response: {
        message: "MindStocs Studio provides custom Software Development. We turn business workflows into reliable digital products, covering web applications, admin dashboards, APIs, database systems, third-party integrations, workflow automation, and cloud deployment. We don't promise arbitrary delivery timelines or make unsupported claims — we focus purely on engineering. Would you like to discuss a software project or talk to the team?",
        suggestedActions: ['Discuss Software Project', 'Software FAQs', 'Talk to Team'],
        ctaType: 'contact'
      }
    },
    {
      keywords: ['saas', 'mvp', 'product idea', 'subscription', 'stripe', 'product lifecycle'],
      response: {
        message: "We design and build SaaS products from the initial idea to a production-ready system. This includes product discovery, MVP scoping, UI/UX design, frontend & backend engineering, subscription/payment integration (like Stripe), and deployment. We focus on validation and learning post-launch. Would you like to discuss a SaaS project?",
        suggestedActions: ['Discuss SaaS Project', 'SaaS FAQs', 'Talk to Team'],
        ctaType: 'contact'
      }
    },
    {
      keywords: ['trading', 'algo', 'algorithm', 'quant', 'backtest', 'market data', 'execution', 'signals', 'systematic'],
      response: {
        message: "MindStocs Studio engineers systematic trading workflows around defined strategies and risk controls. Our capabilities include market data integration, signal generation, backtesting frameworks, and execution workflows. *Important Disclaimer: Trading involves financial risk. Algorithm development does not guarantee profitability or future performance.* Our focus is on precise engineering. Would you like to discuss a trading system?",
        suggestedActions: ['Discuss Trading Project', 'Trading FAQs', 'Talk to Team'],
        ctaType: 'contact'
      }
    },
    {
      keywords: ['marketing', 'paid campaigns', 'google ads', 'meta ads', 'conversion', 'landing page', 'audience'],
      response: {
        message: "We run data-driven Performance Marketing to turn attention into measurable business growth. We cover audience targeting, landing page experiences, Google/Meta Ads management, conversion optimization, and analytics reporting. We do not guarantee arbitrary lead numbers or ROI. Would you like to know more?",
        suggestedActions: ['Discuss Marketing Project', 'Talk to Team'],
        ctaType: 'contact'
      }
    },
    {
      keywords: ['seo', 'search', 'rank', 'keywords', 'organic', 'visibility', 'search console'],
      response: {
        message: "Our SEO services build search visibility on technical foundations, useful content, and measurable improvement. We cover technical audits, on-page optimization, keyword research, content strategy, and search analytics. We avoid black-hat techniques and do not guarantee instant #1 rankings. Would you like to discuss SEO?",
        suggestedActions: ['Discuss SEO Project', 'SEO FAQs', 'Talk to Team'],
        ctaType: 'contact'
      }
    },
    {
      keywords: ['content', 'social media', 'creative', 'storytelling', 'writing', 'posts', 'instagram'],
      response: {
        message: "We create purpose-driven business content that communicates, educates, and converts. Our capabilities include brand storytelling, visual content design, social media assets, and educational content. We do not overclaim video or massive production capabilities that are not confirmed. Would you like to talk about content creation?",
        suggestedActions: ['Discuss Content Project', 'Talk to Team'],
        ctaType: 'contact'
      }
    },
    {
      keywords: ['address', 'where', 'location', 'office', 'sindhudurg', 'sawantwadi', 'maharashtra', 'karol plaza'],
      response: {
        message: "MindStocs Studio is located at: Shop No. 12 & 13, First Floor, Karol Plaza, Road: Opp. Vruddhashram, Salaiwada, Sawantwadi, Sindhudurg, Maharashtra – 416510. Our GST number is 27ACIFM1188P1ZI.",
        suggestedActions: ['Talk to Team', 'Send Project Brief'],
        ctaType: 'none'
      }
    },
    {
      keywords: ['whatsapp', 'phone', 'call', 'contact number', 'mobile', 'speak', 'phone number'],
      response: {
        message: "You can talk to the MindStocs Studio team directly on WhatsApp at +91 90210 08698, or call us. Click below to chat instantly.",
        suggestedActions: ['Talk to the Team (WhatsApp)', 'Send Project Brief'],
        ctaType: 'whatsapp'
      }
    },
    {
      keywords: ['price', 'pricing', 'cost', 'fee', 'charge', 'rate', 'how much'],
      response: {
        message: "Project pricing depends on the scope, technical requirements, and complexity. We don't have predefined rates. We would be happy to discuss your requirements and provide a custom estimate. Would you like to send a project brief?",
        suggestedActions: ['Send Project Brief', 'Talk to Team'],
        ctaType: 'contact'
      }
    },
    {
      keywords: ['process', 'how you work', 'steps', 'timeline', 'validate', 'launch'],
      response: {
        message: "Our work follows a clear 7-step process: 1. Discover, 2. Define, 3. Design, 4. Build, 5. Validate, 6. Launch, and 7. Improve. We prioritize clear scope, honest timelines, and reliable execution. Would you like to learn more or start a project?",
        suggestedActions: ['Send Project Brief', 'Talk to Team'],
        ctaType: 'contact'
      }
    }
  ]
};

export function matchAssistantResponse(query: string): AssistantResponse {
  const normalized = query.toLowerCase().trim();

  // Handle common greetings
  if (/^(hi|hello|hey|greetings|hola|good morning|good afternoon)/.test(normalized)) {
    return {
      message: "Hi there! I am the MindStocs Studio AI Assistant. I can tell you about our six core services (Software, SaaS, Trading, Marketing, SEO, Content), our process, office location, or help you start a project. What are you looking to build, improve or grow?",
      suggestedActions: ['Software', 'SaaS', 'Trading', 'Marketing', 'SEO', 'Content']
    };
  }

  // Iterate over intents
  for (const intent of assistantKnowledge.intents) {
    for (const keyword of intent.keywords) {
      if (normalized.includes(keyword)) {
        return intent.response;
      }
    }
  }

  // Check general questions
  if (normalized.includes('question') || normalized.includes('help') || normalized.includes('what do you do')) {
    return {
      message: "I can assist you with information about Software Development, SaaS products, Trading systems, SEO, Performance Marketing, Content creation, our process, address or pricing. What can I help you with?",
      suggestedActions: ['Software', 'SaaS', 'Trading', 'Marketing', 'SEO', 'Content']
    };
  }

  return assistantKnowledge.fallback;
}
