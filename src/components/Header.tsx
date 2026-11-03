import React from 'react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  return (
    <header className="sticky top-0 z-40 h-16 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-heading font-semibold text-[1.25rem] text-[var(--text)] tracking-[-0.02em] hover:opacity-90"
          aria-label="Барбершоп ГРАДЪ"
        >
          ГРАДЪ
        </a>

        {/* Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Основная навигация">
          <a
            href="#services"
            className="text-[1rem] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-150"
          >
            Услуги
          </a>
          <a
            href="#masters"
            className="text-[1rem] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-150"
          >
            Мастера
          </a>
          <a
            href="#works"
            className="text-[1rem] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-150"
          >
            Работы
          </a>
          <a
            href="#contacts"
            className="text-[1rem] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-150"
          >
            Контакты
          </a>
        </nav>

        {/* Right side: Phone & Booking CTA */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+78432154488"
            className="hidden md:inline-block text-[1rem] text-[var(--text)] hover:text-[var(--muted)] transition-colors duration-150"
          >
            +7 843 215-44-88
          </a>
          <button
            type="button"
            onClick={onOpenBooking}
            className="cursor-pointer bg-[var(--text)] text-[var(--bg)] px-5 py-2 rounded-full text-[0.875rem] md:text-[1rem] font-medium hover:opacity-90 transition-opacity duration-150"
          >
            Записаться
          </button>
        </div>
      </div>
    </header>
  );
};
