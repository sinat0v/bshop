import React from 'react';
import { MASTERS, MasterItem } from '../utils/booking.js';

export const Masters: React.FC = () => {
  return (
    <section
      id="masters"
      aria-labelledby="masters-title"
      className="py-16 md:py-[104px] bg-[var(--bg)]"
    >
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <h2
          id="masters-title"
          className="font-heading font-semibold text-[var(--text)] tracking-[-0.02em] mb-8 md:mb-12"
        >
          Мастера
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MASTERS.map((master: MasterItem) => (
            <div
              key={master.name}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-[4px] overflow-hidden"
            >
              <div className="aspect-[3/4] w-full bg-[var(--bg)] overflow-hidden">
                <img
                  src={master.image}
                  alt={`Мастер ${master.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 md:p-5">
                <h3 className="text-[1.125rem] font-medium text-[var(--text)] leading-tight">
                  {master.name}
                </h3>
                <p className="text-[0.875rem] text-[var(--muted)] mt-1">
                  {master.specialization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
