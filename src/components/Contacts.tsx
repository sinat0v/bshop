import React from 'react';

export const Contacts: React.FC = () => {
  return (
    <section
      id="contacts"
      aria-labelledby="contacts-title"
      className="py-16 md:py-[104px] bg-[var(--surface)]"
    >
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <h2
          id="contacts-title"
          className="font-heading font-semibold text-[var(--text)] tracking-[-0.02em] mb-8 md:mb-12"
        >
          Как нас найти
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: Details (clickable address, hours, phone, telegram) */}
          <div className="md:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-[0.875rem] text-[var(--muted)] block mb-1">
                Адрес
              </span>
              <a
                href="https://2gis.ru/kazan/search/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C%2C%20%D1%83%D0%BB.%20%D0%9F%D1%80%D0%BE%D1%84%D1%81%D0%BE%D1%8E%D0%B7%D0%BD%D0%B0%D1%8F%2C%2016"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[1.125rem] text-[var(--text)] font-medium hover:text-[var(--muted)] transition-colors duration-150 inline-block"
              >
                Казань, ул. Профсоюзная, 16
              </a>
            </div>

            <div>
              <span className="text-[0.875rem] text-[var(--muted)] block mb-1">
                Режим работы
              </span>
              <span className="text-[1rem] text-[var(--text)] font-normal">
                Ежедневно, 10:00–22:00
              </span>
            </div>

            <div>
              <span className="text-[0.875rem] text-[var(--muted)] block mb-1">
                Телефон
              </span>
              <a
                href="tel:+78432154488"
                className="text-[1.125rem] text-[var(--text)] font-medium hover:text-[var(--muted)] transition-colors duration-150"
              >
                +7 843 215-44-88
              </a>
            </div>

            <div>
              <a
                href="https://t.me/grad_barbershop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[1rem] text-[var(--text)] underline underline-offset-4 hover:text-[var(--muted)] transition-colors duration-150"
              >
                Написать в Telegram
              </a>
            </div>
          </div>

          {/* Right Column: Rectangular block 16:9, bg --bg, inside border, button "Открыть в 2ГИС" */}
          <div className="md:col-span-6 w-full">
            <div className="aspect-[16/9] w-full bg-[var(--bg)] border border-[var(--border)] rounded-[4px] p-6 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[0.875rem] text-[var(--muted)] block mb-1">
                    Локация
                  </span>
                  <p className="text-[1.125rem] font-medium text-[var(--text)]">
                    Казань, ул. Профсоюзная, 16
                  </p>
                </div>
                {/* Accent marker dot (allowed accent place) */}
                <div
                  className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] mt-1.5"
                  aria-hidden="true"
                />
              </div>

              <div>
                <a
                  href="https://2gis.ru/kazan/search/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C%2C%20%D1%83%D0%BB.%20%D0%9F%D1%80%D0%BE%D1%84%D1%81%D0%BE%D1%8E%D0%B7%D0%BD%D0%B0%D1%8F%2C%2016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--text)] px-5 py-2.5 rounded-full text-[0.875rem] font-medium hover:border-[var(--text)] transition-colors duration-150"
                >
                  Открыть в 2ГИС
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
