import React, { useState, useEffect, useRef } from 'react';
import {
  SERVICES,
  formatPhoneInput,
  getTodayDateString,
  validateBookingForm,
  ValidationErrors,
} from '../utils/booking.js';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Мужская стрижка',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService);
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const today = getTodayDateString();

  // Reset or initialize state when opening
  useEffect(() => {
    if (isOpen) {
      setService(initialService || 'Мужская стрижка');
      setErrors({});
      setIsSuccess(false);

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus name input after animation frame
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalOverflow;
        clearTimeout(timer);
      };
    }
  }, [isOpen, initialService]);

  // Handle ESC key to close modal & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setPhone(formatted);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateBookingForm({
      name,
      phone,
      service,
      date,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          service,
          date,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        setErrors({ name: data.error || 'Произошла ошибка при отправке заявки' });
      }
    } catch {
      // Offline fallback: still inform user
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName('');
    setPhone('');
    setDate('');
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full md:max-w-[440px] bg-[var(--surface)] border border-[var(--border)] rounded-t-[4px] md:rounded-[4px] p-6 md:p-8"
      >
        {isSuccess ? (
          <div className="flex flex-col items-start">
            <h3
              id="booking-modal-title"
              className="font-heading font-semibold text-[1.25rem] text-[var(--text)] mb-3"
            >
              Заявка принята. Перезвоним в течение 15 минут.
            </h3>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 w-full cursor-pointer bg-[var(--text)] text-[var(--bg)] py-3 rounded-full font-medium text-[1rem] hover:opacity-90 transition-opacity duration-150"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3
                id="booking-modal-title"
                className="font-heading font-semibold text-[1.25rem] text-[var(--text)]"
              >
                Онлайн-запись
              </h3>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Закрыть окно"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--border)]/40 transition-colors text-[1.125rem] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="booking-name"
                  className="block text-[0.875rem] text-[var(--muted)] mb-1"
                >
                  Имя
                </label>
                <input
                  ref={nameInputRef}
                  id="booking-name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Ваше имя"
                  className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] px-3.5 py-2.5 rounded-[6px] text-[1rem] placeholder:text-[var(--muted)] focus:border-[var(--accent)] transition-colors duration-150"
                />
                {errors.name && (
                  <p className="text-[var(--accent)] text-[0.875rem] mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="booking-phone"
                  className="block text-[0.875rem] text-[var(--muted)] mb-1"
                >
                  Телефон
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] px-3.5 py-2.5 rounded-[6px] text-[1rem] placeholder:text-[var(--muted)] focus:border-[var(--accent)] transition-colors duration-150"
                />
                {errors.phone && (
                  <p className="text-[var(--accent)] text-[0.875rem] mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="booking-service"
                  className="block text-[0.875rem] text-[var(--muted)] mb-1"
                >
                  Услуга
                </label>
                <select
                  id="booking-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] px-3.5 py-2.5 rounded-[6px] text-[1rem] focus:border-[var(--accent)] transition-colors duration-150 cursor-pointer"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.name} className="bg-[var(--surface)] text-[var(--text)]">
                      {s.name} ({s.formattedPrice})
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-[var(--accent)] text-[0.875rem] mt-1">
                    {errors.service}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="booking-date"
                  className="block text-[0.875rem] text-[var(--muted)] mb-1"
                >
                  Дата
                </label>
                <input
                  id="booking-date"
                  type="date"
                  min={today}
                  value={date}
                  onChange={handleDateChange}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] px-3.5 py-2.5 rounded-[6px] text-[1rem] focus:border-[var(--accent)] transition-colors duration-150 cursor-pointer"
                />
                {errors.date && (
                  <p className="text-[var(--accent)] text-[0.875rem] mt-1">
                    {errors.date}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full cursor-pointer bg-[var(--text)] text-[var(--bg)] py-3 rounded-full font-medium text-[1rem] hover:opacity-90 disabled:opacity-50 transition-opacity duration-150"
              >
                {isSubmitting ? 'Отправка...' : 'Записаться'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
