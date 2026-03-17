import React, { useState } from 'react';
import { SearchPage } from './components/SearchPage';
import { BusListPage } from './components/BusListPage';
import { SeatSelectionPage } from './components/SeatSelectionPage';
import { PassengerDetailsPage } from './components/PassengerDetailsPage';
import { PaymentPage } from './components/PaymentPage';
import { BookingConfirmationPage } from './components/BookingConfirmationPage';
import { MyBookingsPage } from './components/MyBookingsPage';
import { Bus, SearchParams, Passenger, Booking } from './types';
import { getBusesForRoute } from './mockData';
import { Ticket } from 'lucide-react';

type Page = 
  | 'search' 
  | 'busList' 
  | 'seatSelection' 
  | 'passengerDetails' 
  | 'payment' 
  | 'confirmation'
  | 'myBookings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('search');
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    const foundBuses = getBusesForRoute(params.from, params.to, params.date);
    setBuses(foundBuses);
    setCurrentPage('busList');
  };

  const handleSelectBus = (bus: Bus) => {
    setSelectedBus(bus);
    setCurrentPage('seatSelection');
  };

  const handleContinueFromSeats = (seats: string[]) => {
    setSelectedSeats(seats);
    setCurrentPage('passengerDetails');
  };

  const handleContinueFromPassengers = (
    passengersData: Passenger[], 
    email: string, 
    phone: string
  ) => {
    setPassengers(passengersData);
    setContactEmail(email);
    setContactPhone(phone);
    setCurrentPage('payment');
  };

  const handlePaymentSuccess = () => {
    if (!selectedBus || !searchParams) return;

    const generatePNR = () => {
      return 'PNR' + Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    const booking: Booking = {
      id: 'BK' + Date.now(),
      busId: selectedBus.id,
      busName: selectedBus.name,
      operator: selectedBus.operator,
      from: searchParams.from,
      to: searchParams.to,
      date: searchParams.date,
      departureTime: selectedBus.departureTime,
      arrivalTime: selectedBus.arrivalTime,
      passengers,
      seats: selectedSeats,
      totalAmount: selectedSeats.length * selectedBus.price,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      pnr: generatePNR(),
      contactEmail,
      contactPhone,
    };

    setBookings(prev => [...prev, booking]);
    setCurrentBooking(booking);
    setCurrentPage('confirmation');
  };

  const handleGoHome = () => {
    setCurrentPage('search');
    setSearchParams(null);
    setSelectedBus(null);
    setSelectedSeats([]);
    setPassengers([]);
    setContactEmail('');
    setContactPhone('');
    setCurrentBooking(null);
  };

  const handleViewBookings = () => {
    setCurrentPage('myBookings');
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Bar - Only show on certain pages */}
      {(currentPage === 'search' || currentPage === 'busList' || currentPage === 'myBookings') && (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <button 
              onClick={handleGoHome}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Ticket className="w-6 h-6" />
              <span className="text-xl">Bus Booking</span>
            </button>
            <button
              onClick={handleViewBookings}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              My Bookings ({bookings.filter(b => b.status === 'confirmed').length})
            </button>
          </div>
        </nav>
      )}

      {/* Page Routing */}
      {currentPage === 'search' && (
        <SearchPage onSearch={handleSearch} />
      )}

      {currentPage === 'busList' && searchParams && (
        <BusListPage
          buses={buses}
          searchParams={searchParams}
          onBack={handleGoHome}
          onSelectBus={handleSelectBus}
        />
      )}

      {currentPage === 'seatSelection' && selectedBus && (
        <SeatSelectionPage
          bus={selectedBus}
          onBack={() => setCurrentPage('busList')}
          onContinue={handleContinueFromSeats}
        />
      )}

      {currentPage === 'passengerDetails' && selectedBus && (
        <PassengerDetailsPage
          bus={selectedBus}
          selectedSeats={selectedSeats}
          onBack={() => setCurrentPage('seatSelection')}
          onContinue={handleContinueFromPassengers}
        />
      )}

      {currentPage === 'payment' && selectedBus && (
        <PaymentPage
          bus={selectedBus}
          selectedSeats={selectedSeats}
          passengers={passengers}
          contactEmail={contactEmail}
          contactPhone={contactPhone}
          onBack={() => setCurrentPage('passengerDetails')}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {currentPage === 'confirmation' && currentBooking && (
        <BookingConfirmationPage
          booking={currentBooking}
          onGoHome={handleGoHome}
          onViewBookings={handleViewBookings}
        />
      )}

      {currentPage === 'myBookings' && (
        <MyBookingsPage
          bookings={bookings}
          onBack={handleGoHome}
          onCancelBooking={handleCancelBooking}
        />
      )}
    </div>
  );
}

export default App;
