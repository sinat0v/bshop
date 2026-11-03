import React from 'react';
import { SERVICES, ServiceItem } from '../utils/booking.js';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="py-16 md:py-[104px] bg-[var(--surface)]"
    >
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <h2
          id="services-title"
          className="font-heading font-semibold text-[var(--text)] tracking-[-0.02em] mb-8 md:mb-12"
        >
          Услуги и цены
        </h2>

        {/* Price list: rows with border-b, height 56px, clickable, hover price turns --accent */}
        <div className="border-t border-[var(--border)]">
          {SERVICES.map((service: ServiceItem) => (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelectService(service.name)}
              className="w-full h-[56px] flex items-center justify-between border-b border-[var(--border)] group cursor-pointer text-left transition-colors duration-150 hover:bg-[var(--bg)]/30 px-2"
              aria-label={`Записаться на услугу: ${service.name}, цена ${service.formattedPrice}`}
            >
              <span className="text-[1rem] text-[var(--text)] font-normal">
                {service.name}
              </span>
              <span className="text-[1rem] text-[var(--text)] font-medium tabular-nums group-hover:text-[var(--accent)] transition-colors duration-150">
                {service.formattedPrice}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
