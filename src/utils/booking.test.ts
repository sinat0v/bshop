import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPhoneInput,
  isPhoneComplete,
  isDateTodayOrFuture,
  validateBookingForm,
  SERVICES,
  MASTERS,
  REVIEWS,
  WORKS,
} from './booking.js';

test('SERVICES has exact 5 specified services with correct names and prices', () => {
  assert.equal(SERVICES.length, 5);
  assert.equal(SERVICES[0].name, 'Мужская стрижка');
  assert.equal(SERVICES[0].price, 2500);
  assert.equal(SERVICES[1].name, 'Стрижка бороды');
  assert.equal(SERVICES[1].price, 1500);
  assert.equal(SERVICES[2].name, 'Стрижка и борода');
  assert.equal(SERVICES[2].price, 3500);
  assert.equal(SERVICES[3].name, 'Камуфляж седины');
  assert.equal(SERVICES[3].price, 2000);
  assert.equal(SERVICES[4].name, 'Детская стрижка');
  assert.equal(SERVICES[4].price, 1800);
});

test('MASTERS has exact 3 specified barbers', () => {
  assert.equal(MASTERS.length, 3);
  assert.equal(MASTERS[0].name, 'Артём');
  assert.equal(MASTERS[0].specialization, 'стрижки и борода');
  assert.equal(MASTERS[1].name, 'Рустам');
  assert.equal(MASTERS[1].specialization, 'классические стрижки');
  assert.equal(MASTERS[2].name, 'Илья');
  assert.equal(MASTERS[2].specialization, 'фейд и текстура');
});

test('WORKS has exact 6 items', () => {
  assert.equal(WORKS.length, 6);
});

test('REVIEWS has exact 3 specified testimonials with verbatim texts', () => {
  assert.equal(REVIEWS.length, 3);
  assert.equal(
    REVIEWS[0].text,
    '«Записался на вечер, не ждал ни минуты. Стрижка ровно такая, как просил.»'
  );
  assert.equal(REVIEWS[0].author, 'Дмитрий');
  assert.equal(REVIEWS[0].service, 'мужская стрижка');

  assert.equal(
    REVIEWS[1].text,
    '«Хожу третий год. Всегда одинаково аккуратно, без сюрпризов.»'
  );
  assert.equal(REVIEWS[1].author, 'Марат');
  assert.equal(REVIEWS[1].service, 'стрижка и борода');

  assert.equal(
    REVIEWS[2].text,
    '«Сделали камуфляж перед свадьбой. Выглядит естественно, никто не заметил.»'
  );
  assert.equal(REVIEWS[2].author, 'Алексей');
  assert.equal(REVIEWS[2].service, 'камуфляж седины');
});

test('formatPhoneInput formats raw digits into Russian phone mask', () => {
  assert.equal(formatPhoneInput(''), '');
  assert.equal(formatPhoneInput('9'), '+7 (9');
  assert.equal(formatPhoneInput('917'), '+7 (917');
  assert.equal(formatPhoneInput('917123'), '+7 (917) 123');
  assert.equal(formatPhoneInput('91712345'), '+7 (917) 123-45');
  assert.equal(formatPhoneInput('9171234567'), '+7 (917) 123-45-67');
  // Handling leading 8 or 7
  assert.equal(formatPhoneInput('89171234567'), '+7 (917) 123-45-67');
  assert.equal(formatPhoneInput('+79171234567'), '+7 (917) 123-45-67');
});

test('isPhoneComplete checks if phone has all 10 digits', () => {
  assert.equal(isPhoneComplete('+7 (917) 123-45-67'), true);
  assert.equal(isPhoneComplete('+7 (917) 123-45-6'), false);
  assert.equal(isPhoneComplete('+7 (917)'), false);
  assert.equal(isPhoneComplete(''), false);
});

test('isDateTodayOrFuture allows today and future dates only', () => {
  const mockToday = '2026-11-03';
  assert.equal(isDateTodayOrFuture('2026-11-03', mockToday), true);
  assert.equal(isDateTodayOrFuture('2026-11-04', mockToday), true);
  assert.equal(isDateTodayOrFuture('2026-12-01', mockToday), true);
  assert.equal(isDateTodayOrFuture('2026-11-02', mockToday), false);
  assert.equal(isDateTodayOrFuture('2025-01-01', mockToday), false);
  assert.equal(isDateTodayOrFuture('', mockToday), false);
  assert.equal(isDateTodayOrFuture('invalid', mockToday), false);
});

test('validateBookingForm correctly catches invalid inputs', () => {
  const mockToday = '2026-11-03';

  // Empty fields
  const emptyRes = validateBookingForm(
    { name: '', phone: '', service: '', date: '' },
    mockToday
  );
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.name);
  assert.ok(emptyRes.errors.phone);
  assert.ok(emptyRes.errors.service);
  assert.ok(emptyRes.errors.date);

  // Short name (< 2 chars)
  const shortNameRes = validateBookingForm(
    { name: 'А', phone: '+7 (917) 123-45-67', service: 'Мужская стрижка', date: '2026-11-03' },
    mockToday
  );
  assert.equal(shortNameRes.isValid, false);
  assert.ok(shortNameRes.errors.name);

  // Incomplete phone
  const partialPhoneRes = validateBookingForm(
    { name: 'Иван', phone: '+7 (917) 123-45', service: 'Мужская стрижка', date: '2026-11-03' },
    mockToday
  );
  assert.equal(partialPhoneRes.isValid, false);
  assert.ok(partialPhoneRes.errors.phone);

  // Past date
  const pastDateRes = validateBookingForm(
    { name: 'Иван', phone: '+7 (917) 123-45-67', service: 'Мужская стрижка', date: '2026-11-01' },
    mockToday
  );
  assert.equal(pastDateRes.isValid, false);
  assert.ok(pastDateRes.errors.date);

  // Valid submission
  const validRes = validateBookingForm(
    { name: 'Иван', phone: '+7 (917) 123-45-67', service: 'Мужская стрижка', date: '2026-11-03' },
    mockToday
  );
  assert.equal(validRes.isValid, true);
  assert.deepEqual(validRes.errors, {});
});
