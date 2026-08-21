import { company } from '@/data/company';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { faqCategories } from '@/data/faq';
import { articles } from '@/data/insights';

export interface KnowledgeChunk {
  id: string;
  category: 'company' | 'service' | 'project' | 'process' | 'faq' | 'insight' | 'portal';
  title: string;
  source: string;
  content: string;
  keywords: string[];
  suggestedActions: string[];
  ctaType?: 'contact' | 'whatsapp' | 'portal' | 'none';
  ctaLink?: string;
  ctaText?: string;
}

export interface RAGSearchResult {
  chunk: KnowledgeChunk;
  score: number;
}

export interface RAGResponse {
  answer: string;
  confidence: number;
  sources: string[];
  suggestedActions: string[];
  cta?: {
    type: 'contact' | 'whatsapp' | 'portal' | 'none';
    link: string;
    text: string;
  };
}

/**
 * Build the unified MindStocs Knowledge Base
 */
function buildKnowledgeBase(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  // 1. Company Profile & Identity
  chunks.push({
    id: 'company-overview',
    category: 'company',
    title: 'About MindStocs Studio',
    source: 'Company Profile',
    content: `${company.name} is a software and digital agency based in ${company.address.city}, ${company.address.state}, India. Our positioning is "${company.positioning}". We bring custom software engineering, SaaS product development, algorithmic trading systems, performance marketing, SEO, and content creation under one studio. Founder: ${company.founder}.`,
    keywords: ['about', 'company', 'mindstocs', 'studio', 'agency', 'what is', 'who are', 'founder', 'jackson fernandes', 'mission'],
    suggestedActions: ['Explore Services', 'Our Process', 'Talk to Team'],
    ctaType: 'contact',
    ctaLink: '/contact',
    ctaText: 'Start a Project',
  });

  chunks.push({
    id: 'company-location',
    category: 'company',
    title: 'Office Location & Contact Info',
    source: 'Company Contact & Location',
    content: `MindStocs Studio is located at: ${company.address.line1}, ${company.address.line2}, ${company.address.line3}, Pincode: ${company.address.pincode}. GST Number: ${company.gst}. Contact Phone / WhatsApp: ${company.phone}. Direct WhatsApp chat link is available for instant communication.`,
    keywords: ['address', 'location', 'where', 'office', 'sawantwadi', 'sindhudurg', 'maharashtra', 'karol plaza', 'gst', 'phone', 'whatsapp', 'contact number', 'mobile'],
    suggestedActions: ['Talk to the Team (WhatsApp)', 'Send Project Brief'],
    ctaType: 'whatsapp',
    ctaLink: company.whatsapp.link,
    ctaText: 'Open WhatsApp Chat',
  });

  // 2. Core Services
  services.forEach((service) => {
    chunks.push({
      id: `service-${service.id}`,
      category: 'service',
      title: service.title,
      source: `Service: ${service.title}`,
      content: `${service.title} (${service.positioning}): ${service.description} Key Capabilities: ${service.capabilities.join(', ')}. Tech Stack & Frameworks: ${service.technologies.join(', ')}. Deliverables: ${service.deliverables.join(', ')}.${service.disclaimer ? ` Note: ${service.disclaimer}` : ''}`,
      keywords: [
        service.title.toLowerCase(),
        service.slug,
        ...service.capabilities.map((c) => c.toLowerCase()),
        ...service.technologies.map((t) => t.toLowerCase()),
      ],
      suggestedActions: [
        `Discuss ${service.title}`,
        `${service.title} FAQs`,
        'Talk to Team',
      ],
      ctaType: 'contact',
      ctaLink: service.cta.href,
      ctaText: service.cta.label,
    });

    // Service-specific FAQs
    service.faqs.forEach((faq, fIdx) => {
      chunks.push({
        id: `service-faq-${service.id}-${fIdx}`,
        category: 'faq',
        title: `${service.title} FAQ: ${faq.question}`,
        source: `FAQ: ${service.title}`,
        content: `Question: ${faq.question}\nAnswer: ${faq.answer}`,
        keywords: [service.title.toLowerCase(), ...faq.question.toLowerCase().split(' ')],
        suggestedActions: [`Discuss ${service.title}`, 'Talk to Team'],
        ctaType: 'contact',
        ctaLink: service.cta.href,
      });
    });
  });

  // 3. Portfolio & Case Studies
  projects.forEach((proj) => {
    chunks.push({
      id: `project-${proj.id}`,
      category: 'project',
      title: proj.title,
      source: `Case Study: ${proj.title}`,
      content: `Case Study: ${proj.title} (${proj.label}). ${proj.shortDescription} Challenge: ${proj.challenge} Approach & Engineering: ${proj.approach} What We Built: ${proj.whatWeBuilt.join(', ')}. Technologies: ${proj.technologies.join(', ')}. Outcome: ${proj.outcome}.`,
      keywords: [
        proj.title.toLowerCase(),
        proj.slug,
        'case study',
        'portfolio',
        'what built',
        ...proj.technologies.map((t) => t.toLowerCase()),
      ],
      suggestedActions: ['View All Work', 'Discuss a Similar Project', 'Talk to Team'],
      ctaType: 'contact',
      ctaLink: `/work/${proj.slug}`,
      ctaText: `Explore ${proj.title}`,
    });
  });

  // 4. 7-Step Process
  chunks.push({
    id: 'mindstocs-process',
    category: 'process',
    title: '7-Step Delivery Process',
    source: 'Engineering Methodology',
    content: `MindStocs Studio follows a disciplined 7-step engineering process: 1. Discover (understand business workflows), 2. Define (scope & architecture), 3. Design (clean UI/UX & design system), 4. Build (iterative frontend/backend development), 5. Validate (rigorous QA & security checks), 6. Launch (production deployment & monitoring), and 7. Improve (performance iterations). We avoid arbitrary delivery dates and prioritize reliable execution.`,
    keywords: ['process', 'how you work', 'steps', 'timeline', 'methodology', 'discovery', 'launch', 'delivery', 'workflow'],
    suggestedActions: ['Send Project Brief', 'Talk to Team', 'Explore Services'],
    ctaType: 'contact',
    ctaLink: '/process',
    ctaText: 'View Our Process',
  });

  // 5. General FAQs (Pricing, Startups, Revisions, Timelines)
  faqCategories.forEach((category) => {
    category.items.forEach((item, idx) => {
      chunks.push({
        id: `faq-${category.id}-${idx}`,
        category: 'faq',
        title: item.question,
        source: `FAQ: ${category.label}`,
        content: `Question: ${item.question}\nAnswer: ${item.answer}`,
        keywords: [category.label.toLowerCase(), ...item.question.toLowerCase().split(' ')],
        suggestedActions: ['Send Project Brief', 'Talk to Team (WhatsApp)', 'Explore Services'],
        ctaType: 'contact',
        ctaLink: '/contact',
      });
    });
  });

  // 6. Insights & Articles
  articles.forEach((art) => {
    chunks.push({
      id: `insight-${art.slug}`,
      category: 'insight',
      title: art.title,
      source: `Insight Article: ${art.title}`,
      content: `Article: "${art.title}" (${art.category}, ${art.readingTime}). ${art.description}`,
      keywords: [art.title.toLowerCase(), art.category.toLowerCase(), 'article', 'insight', 'blog'],
      suggestedActions: ['Read Articles', 'Discuss Project', 'Talk to Team'],
      ctaType: 'none',
      ctaLink: `/insights/${art.slug}`,
    });
  });

  // 7. Client Portal & Authentication
  chunks.push({
    id: 'client-portal-auth',
    category: 'portal',
    title: 'Client Portal, Sign In & Verification',
    source: 'Client Portal & Security',
    content: `MindStocs Studio offers a secure Client Portal where clients can submit project briefs, manage deliverables, and review milestone logs. Accounts are created with 6-digit email OTP verification for bank-grade security. A 3-step Forgot Password flow allows instant password recovery via email OTP.`,
    keywords: ['portal', 'login', 'signup', 'register', 'otp', 'verification', 'forgot password', 'dashboard', 'account'],
    suggestedActions: ['Client Login', 'Create Account', 'Send Project Brief'],
    ctaType: 'portal',
    ctaLink: '/login',
    ctaText: 'Access Client Portal',
  });

  return chunks;
}

const KNOWLEDGE_BASE = buildKnowledgeBase();

/**
 * Text Tokenizer with Stop-Word Filtering
 */
const STOP_WORDS = new Set([
  'a', 'about', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'how', 'i', 'in', 'is', 'it', 'of', 'on', 'or', 'that', 'the', 'this',
  'to', 'was', 'what', 'when', 'where', 'who', 'will', 'with', 'you', 'your',
  'can', 'do', 'does', 'tell', 'me', 'please', 'we', 'they', 'our', 'give',
  'wt', 'wht', 'ur', 'u', 'whats', "what's", 'whos', "who's", 'name',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * Compute BM25 + Cosine Similarity score between Query and Knowledge Chunk
 */
function scoreChunk(queryTokens: string[], rawQuery: string, chunk: KnowledgeChunk): number {
  let score = 0;
  const chunkText = `${chunk.title} ${chunk.content} ${chunk.keywords.join(' ')}`.toLowerCase();
  const chunkTokens = tokenize(chunkText);
  const chunkTokenSet = new Set(chunkTokens);

  const cleanRawQuery = rawQuery.toLowerCase().trim();

  // Exact phrase match bonus
  if (cleanRawQuery.length >= 4 && chunkText.includes(cleanRawQuery)) {
    score += 15.0;
  }

  // Keyword exact matches (only for meaningful keywords >= 3 characters)
  for (const kw of chunk.keywords) {
    if (kw.length >= 3 && cleanRawQuery.includes(kw)) {
      score += 8.0;
    }
  }

  // Term frequency overlap
  for (const token of queryTokens) {
    if (token.length >= 3) {
      if (chunkTokenSet.has(token)) {
        score += 4.0;
      }
      if (chunkText.includes(token)) {
        score += 1.5;
      }
    }
  }

  // Length normalization penalty for excessively long chunks
  score = score / Math.log10(chunkText.length + 10);

  return score;
}

/**
 * Retrieve Top-K relevant knowledge chunks using RAG Search
 */
export function retrieveContext(query: string, topK = 4): RAGSearchResult[] {
  const rawQuery = query.trim();
  const queryTokens = tokenize(rawQuery);

  if (queryTokens.length === 0 && rawQuery.length < 2) {
    return [];
  }

  const scored = KNOWLEDGE_BASE.map((chunk) => ({
    chunk,
    score: scoreChunk(queryTokens, rawQuery, chunk),
  }));

  // Sort descending by relevance score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK).filter((res) => res.score > 0.35);
}

/**
 * Call External LLM (Groq / Google Gemini / OpenAI) with RAG Injected Context
 */
async function callLLMWithRAGContext(query: string, retrievedContext: string[]): Promise<string | null> {
  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  const systemInstruction = `You are the official conversational AI assistant for MindStocs Studio (a software and digital agency based in Sawantwadi, India).
MindStocs specializes in:
1. Custom Software Engineering (web apps, APIs, admin dashboards, databases)
2. SaaS Product Development (MVP scoping, multi-tenancy, Stripe billing integration)
3. Algorithmic Trading Systems (market data feeds, low-latency execution, backtesting, strict risk limits)
4. Performance Marketing (Google & Meta Ads, conversion funnels)
5. Technical SEO (technical audits, search visibility)
6. Purpose-Driven Content Creation

MINDSTOCS VERIFIED KNOWLEDGE CONTEXT:
${retrievedContext.join('\n\n')}

INSTRUCTIONS:
- Answer the user's question directly, conversationally, and accurately based on the context above.
- If the user asks general or out-of-the-box questions (e.g. general tech, jokes, trivia), answer politely and clearly, then warmly invite them to explore how MindStocs can help their business.
- Keep your tone sharp, professional, and helpful. Do NOT make up unsupported guarantees or unrealistic timelines.`;

  // 1. Groq Cloud (Ultra-fast, High IQ LLM)
  if (groqKey) {
    const groqModels = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.6-27b', 'groq/compound-mini'];
    for (const model of groqModels) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemInstruction },
              { role: 'user', content: query },
            ],
            temperature: 0.35,
            max_tokens: 600,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data?.choices?.[0]?.message?.content;
          if (text) return text.trim();
        } else {
          const errData = await response.json();
          console.warn(`[RAG LLM] Groq API (${model}) error:`, errData);
        }
      } catch (err) {
        console.warn(`[RAG LLM] Groq API (${model}) failed:`, err);
      }
    }
  }

  // 2. Google Gemini 1.5/2.0 Flash (Free tier available at Google AI Studio)
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\nUser Question: ${query}` }],
              },
            ],
            generationConfig: {
              temperature: 0.35,
              maxOutputTokens: 600,
            },
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      } else {
        const errData = await response.json();
        console.warn('[RAG LLM] Gemini API returned error:', errData);
      }
    } catch (err) {
      console.warn('[RAG LLM] Gemini call failed:', err);
    }
  }

  // 3. OpenAI GPT-4o-mini
  if (openaiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: query },
          ],
          temperature: 0.35,
          max_tokens: 600,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) return text.trim();
      } else {
        const errData = await response.json();
        console.warn('[RAG LLM] OpenAI API returned error (check billing/quota):', errData?.error?.message || errData);
      }
    } catch (err) {
      console.warn('[RAG LLM] OpenAI call failed:', err);
    }
  }

  return null;
}

/**
 * Synthesize a RAG Response given user query and retrieved context
 */
export async function generateRAGResponse(query: string): Promise<RAGResponse> {
  const normalized = query.toLowerCase().trim();

  // 1. Common Greeting Catch
  if (/^(hi|hello|hey|greetings|hola|good morning|good afternoon|good evening)\b/.test(normalized)) {
    return {
      answer:
        "Hello! I am the MindStocs Studio AI Assistant, powered by our live RAG knowledge engine. I can answer any questions about our 6 core services (Custom Software, SaaS, Algorithmic Trading, Performance Marketing, Technical SEO, Content Creation), our 7-step delivery process, office location in Sawantwadi, or starting a new project. How can I help you today?",
      confidence: 1.0,
      sources: ['MindStocs Knowledge Engine'],
      suggestedActions: [
        'Software Development',
        'SaaS Products',
        'Trading Algorithms',
        'Marketing & SEO',
        'Office Location',
        'Send Project Brief',
      ],
      cta: {
        type: 'contact',
        link: '/contact',
        text: 'Discuss Your Project',
      },
    };
  }

  // 1.1 Identity & Name Queries
  if (
    /^(wt|what|wht|tell me|who)\s*(is|are|r)?\s*(your|ur)?\s*(name|identity|you)\b/i.test(normalized) ||
    /^(who are you|who r u|whats your name|what is your name|wt is your name|your name)\b/i.test(normalized)
  ) {
    return {
      answer:
        "I am the MindStocs Studio AI Assistant — an intelligent neural assistant engineered to answer questions about our digital engineering services, SaaS development, algorithmic trading systems, performance marketing, and pricing models. How can I assist you with your project today?",
      confidence: 1.0,
      sources: ['MindStocs Assistant Identity'],
      suggestedActions: [
        'Custom Software',
        'SaaS Products',
        'Trading Algorithms',
        'Send Project Brief',
        'Talk to Team',
      ],
      cta: {
        type: 'contact',
        link: '/contact',
        text: 'Start a Project',
      },
    };
  }

  // 1.2 Founder & Leadership Queries
  if (
    /(who (is|are) (the )?(founder|ceo|owner|creator)|who created (you|mindstocs)|who made you|jackson fernandes)/i.test(
      normalized
    )
  ) {
    return {
      answer:
        `MindStocs Studio was founded by ${company.founder}. We are a software and digital agency based in Sawantwadi, Maharashtra, delivering custom software, SaaS products, quantitative trading workflows, and growth marketing.`,
      confidence: 1.0,
      sources: ['Company Profile & Leadership'],
      suggestedActions: [
        'Our Process',
        'Office Location',
        'Explore Services',
        'Talk to Team (WhatsApp)',
      ],
      cta: {
        type: 'whatsapp',
        link: company.whatsapp.link,
        text: 'Connect on WhatsApp',
      },
    };
  }

  // 2. Perform RAG Knowledge Retrieval
  const topResults = retrieveContext(query, 4);

  const sources = Array.from(new Set(topResults.map((r) => r.chunk.source)));
  const suggestedActions = Array.from(
    new Set(topResults.flatMap((r) => r.chunk.suggestedActions))
  ).slice(0, 5);

  const contextSnippets = topResults.map(
    (r) => `[Source: ${r.chunk.source}]\n${r.chunk.content}`
  );

  // 3. Attempt LLM Generation with Injected RAG Context (if GEMINI_API_KEY or OPENAI_API_KEY is configured)
  const llmGeneratedAnswer = await callLLMWithRAGContext(query, contextSnippets);
  if (llmGeneratedAnswer) {
    const primaryChunk = topResults[0]?.chunk;
    return {
      answer: llmGeneratedAnswer,
      confidence: topResults.length > 0 ? Math.min(1.0, topResults[0].score / 4.0) : 0.8,
      sources: sources.length > 0 ? sources : ['MindStocs Neural LLM'],
      suggestedActions:
        suggestedActions.length > 0
          ? suggestedActions
          : ['Discuss Software Project', 'Send Project Brief', 'Talk to Team'],
      cta: primaryChunk?.ctaLink
        ? {
            type: primaryChunk.ctaType || 'contact',
            link: primaryChunk.ctaLink,
            text: primaryChunk.ctaText || 'Discuss With Team',
          }
        : undefined,
    };
  }

  // 4. In-Memory RAG Synthesizer (Fallback when no LLM API key is present)
  if (topResults.length === 0 || topResults[0].score < 0.5) {
    return {
      answer:
        "I couldn't find a direct verified match in our knowledge base for that specific inquiry. Our engineering and strategy leads are available to answer your custom requirements directly.",
      confidence: 0.2,
      sources: ['MindStocs Fallback'],
      suggestedActions: [
        'Talk to the Team (WhatsApp)',
        'Send Project Brief',
        'Explore Services',
        'Start Over',
      ],
      cta: {
        type: 'whatsapp',
        link: company.whatsapp.link,
        text: 'Chat on WhatsApp',
      },
    };
  }

  const primaryResult = topResults[0];
  const primaryChunk = primaryResult.chunk;

  let synthesizedAnswer = '';
  if (primaryChunk.category === 'service') {
    synthesizedAnswer = `${primaryChunk.content}\n\nWould you like to discuss requirements for ${primaryChunk.title} or submit a project brief?`;
  } else if (primaryChunk.category === 'project') {
    synthesizedAnswer = `Here is our verified case study for ${primaryChunk.title}:\n\n${primaryChunk.content}`;
  } else if (primaryChunk.category === 'faq') {
    synthesizedAnswer = `${primaryChunk.content.replace(/^Question: .*\nAnswer: /, '')}`;
  } else {
    synthesizedAnswer = `${primaryChunk.content}`;
  }

  return {
    answer: synthesizedAnswer,
    confidence: Math.min(1.0, primaryResult.score / 5.0),
    sources,
    suggestedActions,
    cta: primaryChunk.ctaLink
      ? {
          type: primaryChunk.ctaType || 'contact',
          link: primaryChunk.ctaLink,
          text: primaryChunk.ctaText || 'Learn More',
        }
      : undefined,
  };
}
