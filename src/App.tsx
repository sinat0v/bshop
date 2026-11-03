/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { Services } from './components/Services.js';
import { Masters } from './components/Masters.js';
import { Works } from './components/Works.js';
import { Reviews } from './components/Reviews.js';
import { Contacts } from './components/Contacts.js';
import { Footer } from './components/Footer.js';
import { BookingModal } from './components/BookingModal.js';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Мужская стрижка');

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col font-normal antialiased">
      <Header onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <Services onSelectService={(serviceName) => handleOpenBooking(serviceName)} />
        <Masters />
        <Works />
        <Reviews />
        <Contacts />
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialService={selectedService}
      />
    </div>
  );
}
