import React from 'react';
import { REVIEWS, ReviewItem } from '../utils/booking.js';

export const Reviews: React.FC = () => {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="py-16 md:py-[104px] bg-[var(--bg)]"
    >
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        {/* Only centered block on page as explicitly specified */}
        <h2
          id="reviews-title"
          className="font-heading font-semibold text-[var(--text)] tracking-[-0.02em] text-center mb-8 md:mb-12"
        >
          Отзывы
        </h2>

        {/* 3 cards in a row, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review: ReviewItem) => (
            <div
              key={review.id}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-[4px] p-6 md:p-8 flex flex-col justify-between"
            >
              <blockquote className="font-review text-[1.0625rem] text-[var(--text)] leading-relaxed m-0 p-0">
                {review.text}
              </blockquote>
              <div className="text-[0.875rem] text-[var(--muted)] mt-6 pt-4 border-t border-[var(--border)]">
                {review.author}, {review.service}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
