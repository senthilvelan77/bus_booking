import React, { useState } from 'react';
import { ArrowLeft, Download, Calendar, MapPin, Users, XCircle, CheckCircle } from 'lucide-react';
import { Booking } from '../types';
import { generateTicketPDF } from '../utils/ticketGenerator';

interface MyBookingsPageProps {
  bookings: Booking[];
  onBack: () => void;
  onCancelBooking: (bookingId: string) => void;
}

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({ bookings, onBack, onCancelBooking }) => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'cancelled'>('upcoming');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const upcomingBookings = bookings.filter(b => {
    const bookingDate = new Date(b.date);
    const today = new Date();
    return b.status === 'confirmed' && bookingDate >= today;
  });

  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');
  const pastBookings = bookings.filter(b => {
    const bookingDate = new Date(b.date);
    const today = new Date();
    return b.status === 'confirmed' && bookingDate < today;
  });

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking? Cancellation charges may apply.')) {
      setCancellingId(bookingId);
      setTimeout(() => {
        onCancelBooking(bookingId);
        setCancellingId(null);
      }, 1000);
    }
  };

  const canCancelBooking = (booking: Booking): boolean => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    const hoursDifference = (bookingDate.getTime() - today.getTime()) / (1000 * 60 * 60);
    return hoursDifference >= 2; // Can cancel if journey is at least 2 hours away
  };

  const displayBookings = selectedTab === 'upcoming' ? upcomingBookings : cancelledBookings;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-3">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <h2 className="text-3xl">My Bookings</h2>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                selectedTab === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Upcoming ({upcomingBookings.length})
            </button>
            <button
              onClick={() => setSelectedTab('cancelled')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                selectedTab === 'cancelled'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancelled ({cancelledBookings.length})
            </button>
          </div>

          {/* Bookings List */}
          {displayBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🎫</div>
              <h3 className="text-xl mb-2">No {selectedTab} bookings</h3>
              <p className="text-gray-600">
                {selectedTab === 'upcoming' 
                  ? "You don't have any upcoming trips. Book your next journey now!" 
                  : "You don't have any cancelled bookings."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayBookings.map(booking => {
                const isCancellable = canCancelBooking(booking);
                const isCancelling = cancellingId === booking.id;

                return (
                  <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Status Bar */}
                    <div className={`px-6 py-2 ${
                      booking.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'
                    } text-white flex justify-between items-center`}>
                      <div className="flex items-center gap-2">
                        {booking.status === 'confirmed' ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Confirmed</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            <span className="text-sm">Cancelled</span>
                          </>
                        )}
                      </div>
                      <span className="text-sm">PNR: {booking.pnr}</span>
                    </div>

                    <div className="p-6">
                      {/* Journey Info */}
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <div className="flex items-start gap-3 mb-4">
                            <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                            <div>
                              <p className="text-lg">{booking.from} → {booking.to}</p>
                              <p className="text-sm text-gray-600">{booking.busName}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                            <div>
                              <p>{new Date(booking.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}</p>
                              <p className="text-sm text-gray-600">{booking.departureTime} - {booking.arrivalTime}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-start gap-3 mb-4">
                            <Users className="w-5 h-5 text-gray-400 mt-1" />
                            <div className="flex-1">
                              <p className="mb-1">{booking.passengers.length} Passenger{booking.passengers.length > 1 ? 's' : ''}</p>
                              <div className="text-sm text-gray-600 space-y-1">
                                {booking.passengers.map((p, i) => (
                                  <p key={i}>{p.name} - Seat {p.seatNumber}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Total Amount</span>
                              <span className="text-xl text-blue-600">₹{booking.totalAmount}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 flex-wrap">
                        <button
                          onClick={() => generateTicketPDF(booking)}
                          className="flex-1 md:flex-initial bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download Ticket
                        </button>

                        {booking.status === 'confirmed' && isCancellable && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={isCancelling}
                            className="flex-1 md:flex-initial border-2 border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isCancelling ? (
                              <>
                                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                Cancelling...
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" />
                                Cancel Booking
                              </>
                            )}
                          </button>
                        )}

                        {booking.status === 'confirmed' && !isCancellable && (
                          <div className="flex-1 md:flex-initial text-gray-500 text-sm px-6 py-2 border border-gray-300 rounded-lg bg-gray-50">
                            ⚠️ Cancellation not allowed (journey starting soon)
                          </div>
                        )}
                      </div>

                      {/* Booking Details */}
                      <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                        <p>Booking ID: {booking.id}</p>
                        <p>Booked on: {new Date(booking.bookingDate).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Cancellation Policy */}
          {selectedTab === 'upcoming' && upcomingBookings.length > 0 && (
            <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <h4 className="text-sm mb-2">Cancellation Policy:</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Free cancellation up to 24 hours before departure</li>
                <li>50% refund for cancellations between 6-24 hours before departure</li>
                <li>No refund for cancellations within 2 hours of departure</li>
                <li>Refund will be processed within 5-7 business days</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
