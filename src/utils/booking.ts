export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
}

export const SERVICES: ServiceItem[] = [
  { id: 'haircut', name: 'Мужская стрижка', price: 2500, formattedPrice: '2 500 ₽' },
  { id: 'beard', name: 'Стрижка бороды', price: 1500, formattedPrice: '1 500 ₽' },
  { id: 'combo', name: 'Стрижка и борода', price: 3500, formattedPrice: '3 500 ₽' },
  { id: 'camouflage', name: 'Камуфляж седины', price: 2000, formattedPrice: '2 000 ₽' },
  { id: 'kids', name: 'Детская стрижка', price: 1800, formattedPrice: '1 800 ₽' },
];

export interface MasterItem {
  name: string;
  specialization: string;
  image: string;
}

export const MASTERS: MasterItem[] = [
  {
    name: 'Артём',
    specialization: 'стрижки и борода',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=750&q=80',
  },
  {
    name: 'Рустам',
    specialization: 'классические стрижки',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=750&q=80',
  },
  {
    name: 'Илья',
    specialization: 'фейд и текстура',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=750&q=80',
  },
];

export interface WorkItem {
  id: number;
  alt: string;
  image: string;
}

export const WORKS: WorkItem[] = [
  {
    id: 1,
    alt: 'Мужская стрижка и инструменты барбера',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    alt: 'Классическая мужская стрижка',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    alt: 'Стрижка и сведение висков',
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 4,
    alt: 'Интерьер и кресла барбершопа',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 5,
    alt: 'Бритьё опасной бритвой и уход за бородой',
    image: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 6,
    alt: 'Стайлинг и мужская косметика',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=700&q=80',
  },
];

export interface ReviewItem {
  id: number;
  text: string;
  author: string;
  service: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: 1,
    text: '«Записался на вечер, не ждал ни минуты. Стрижка ровно такая, как просил.»',
    author: 'Дмитрий',
    service: 'мужская стрижка',
  },
  {
    id: 2,
    text: '«Хожу третий год. Всегда одинаково аккуратно, без сюрпризов.»',
    author: 'Марат',
    service: 'стрижка и борода',
  },
  {
    id: 3,
    text: '«Сделали камуфляж перед свадьбой. Выглядит естественно, никто не заметил.»',
    author: 'Алексей',
    service: 'камуфляж седины',
  },
];

export interface BookingFormData {
  name: string;
  phone: string;
  service: string;
  date: string;
}

export interface ValidationErrors {
  name?: string;
  phone?: string;
  service?: string;
  date?: string;
}

/**
 * Formats a phone input into the standard Russian phone mask: +7 (XXX) XXX-XX-XX
 */
export function formatPhoneInput(raw: string): string {
  // Extract all digits
  let digits = raw.replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  // If starts with 8 or 7, drop the leading country code digit so we have 10 digits
  if (digits.startsWith('7') || digits.startsWith('8')) {
    digits = digits.slice(1);
  }

  // Cap at 10 digits
  digits = digits.slice(0, 10);

  let formatted = '+7';
  if (digits.length > 0) {
    formatted += ` (${digits.slice(0, 3)}`;
  }
  if (digits.length > 3) {
    formatted += `) ${digits.slice(3, 6)}`;
  }
  if (digits.length > 6) {
    formatted += `-${digits.slice(6, 8)}`;
  }
  if (digits.length > 8) {
    formatted += `-${digits.slice(8, 10)}`;
  }

  return formatted;
}

/**
 * Checks if the masked phone number is completely filled (contains exactly 10 digits after +7)
 */
export function isPhoneComplete(phone: string): boolean {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('7') || digits.startsWith('8')) {
    digits = digits.slice(1);
  }
  return digits.length === 10;
}

/**
 * Returns today's date formatted as YYYY-MM-DD in local time
 */
export function getTodayDateString(dateObj: Date = new Date()): string {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Checks if a given YYYY-MM-DD date string represents today or a future date
 */
export function isDateTodayOrFuture(dateStr: string, todayStr: string = getTodayDateString()): boolean {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return false;
  }
  return dateStr >= todayStr;
}

/**
 * Validates booking form data according to requirements:
 * - name: at least 2 characters
 * - phone: completely filled (+7 (XXX) XXX-XX-XX)
 * - date: selected and today or future
 * - service: non-empty and recognized
 */
export function validateBookingForm(
  data: BookingFormData,
  todayStr: string = getTodayDateString()
): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  const trimmedName = (data.name || '').trim();
  if (trimmedName.length < 2) {
    errors.name = 'Введите имя от 2 символов';
  }

  if (!data.phone || !isPhoneComplete(data.phone)) {
    errors.phone = 'Укажите номер телефона полностью';
  }

  if (!data.service || !SERVICES.some((s) => s.name === data.service || s.id === data.service)) {
    errors.service = 'Выберите услугу из списка';
  }

  if (!data.date) {
    errors.date = 'Выберите дату записи';
  } else if (!isDateTodayOrFuture(data.date, todayStr)) {
    errors.date = 'Дата записи не может быть в прошлом';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
