import React from 'react';
import { WORKS, WorkItem } from '../utils/booking.js';

export const Works: React.FC = () => {
  return (
    <section
      id="works"
      aria-labelledby="works-title"
      className="py-16 md:py-[104px] bg-[var(--surface)]"
    >
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <h2
          id="works-title"
          className="font-heading font-semibold text-[var(--text)] tracking-[-0.02em] mb-8 md:mb-12"
        >
          Работы
        </h2>

        {/* 6 photos: 3 columns on desktop, 2 on mobile, gap 12px, aspect 1:1 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {WORKS.map((work: WorkItem) => (
            <div
              key={work.id}
              className="aspect-square w-full overflow-hidden border border-[var(--border)] rounded-[4px] bg-[var(--bg)]"
            >
              <img
                src={work.image}
                alt={work.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
