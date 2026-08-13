'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqCategories } from '@/data/faq';
import '@/styles/components/sections.css';

interface FAQProps {
  showAll?: boolean;
}

export default function FAQ({ showAll = false }: FAQProps) {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (question: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(question)) {
        next.delete(question);
      } else {
        next.add(question);
      }
      return next;
    });
  };

  const displayCategories = showAll
    ? faqCategories
    : faqCategories.slice(0, 4);

  const currentCategory = faqCategories.find((c) => c.id === activeCategory);

  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="container container--narrow">
        <div className="section-heading section-heading--center">
          <span className="section-heading__eyebrow">FAQ</span>
          <h2 className="section-heading__title" id="faq-heading">
            COMMON QUESTIONS
          </h2>
        </div>

        {/* Category tabs */}
        <div className="faq-categories" role="tablist" aria-label="FAQ categories">
          {displayCategories.map((category) => (
            <button
              key={category.id}
              className={`faq-category-btn ${
                activeCategory === category.id ? 'faq-category-btn--active' : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
              aria-controls={`faq-panel-${category.id}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div
          className="faq-list"
          role="tabpanel"
          id={`faq-panel-${activeCategory}`}
          aria-labelledby={`faq-tab-${activeCategory}`}
        >
          {currentCategory?.items.map((item) => {
            const isOpen = openItems.has(item.question);
            return (
              <div
                key={item.question}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
              >
                <button
                  className="faq-item__question"
                  onClick={() => toggleItem(item.question)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <Plus className="faq-item__icon" size={20} />
                </button>
                <div className="faq-item__answer" aria-hidden={!isOpen}>
                  <div className="faq-item__answer-inner">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
