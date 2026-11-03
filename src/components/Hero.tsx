import React from 'react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section aria-labelledby="hero-title" className="py-16 md:py-[104px]">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center">
          {/* Left Column (55% / 7 cols) */}
          <div className="md:col-span-7 flex flex-col items-start">
            <span className="text-[0.875rem] text-[var(--muted)] mb-3 block">
              Казань, Профсоюзная, 16
            </span>
            <h1
              id="hero-title"
              className="font-heading font-semibold text-[var(--text)] tracking-[-0.02em] max-w-[14ch] md:max-w-none"
            >
              Мужские стрижки и бритьё в центре Казани
            </h1>
            <p className="mt-4 mb-8 text-[1rem] leading-[1.65] text-[var(--text)]/90 max-w-[520px]">
              Работаем ежедневно с 10:00 до 22:00. Запись на сегодня и завтра, без звонков и переписок.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="cursor-pointer bg-[var(--text)] text-[var(--bg)] px-7 py-3 rounded-full font-medium text-[1rem] hover:opacity-90 transition-opacity duration-150"
              >
                Записаться онлайн
              </button>
              <a
                href="#services"
                className="cursor-pointer inline-flex items-center justify-center border border-[var(--border)] text-[var(--text)] px-7 py-3 rounded-full font-medium text-[1rem] hover:border-[var(--text)] transition-colors duration-150"
              >
                Прайс
              </a>
            </div>
          </div>

          {/* Right Column (45% / 5 cols): vertical photo 4:5, barbershop, dark, without close-up people */}
          <div className="md:col-span-5 w-full">
            <div className="aspect-[4/5] w-full overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80"
                alt="Интерьер барбершопа ГРАДЪ"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
