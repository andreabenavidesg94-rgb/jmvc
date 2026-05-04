'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/lib/faqs';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section scroll-mt-24">
      <div className="container max-w-3xl">
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
            Preguntas frecuentes
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Lo que más nos preguntan antes de empezar.
          </h2>
        </div>

        <ul className="mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white"
                >
                  {item.q}
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-white/60 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className="border-t border-white/[0.06] px-5 py-4 text-sm leading-relaxed text-white/70"
                  >
                    {item.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
