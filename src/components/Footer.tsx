import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg)] border-t border-[var(--border)] py-8">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
          <span className="font-heading font-semibold text-[1.125rem] text-[var(--text)]">
            ГРАДЪ
          </span>
          <a
            href="tel:+78432154488"
            className="text-[1rem] text-[var(--text)] hover:text-[var(--muted)] transition-colors duration-150"
          >
            +7 843 215-44-88
          </a>
        </div>
        <p className="text-[0.75rem] text-[var(--muted)] mt-4">
          Демо-сайт. Название, цены, мастера и отзывы вымышлены.
        </p>
      </div>
    </footer>
  );
};
