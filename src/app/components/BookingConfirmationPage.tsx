import React from 'react';
import { CheckCircle, Download, Home, Calendar } from 'lucide-react';
import { Booking } from '../types';
import { generateTicketPDF } from '../utils/ticketGenerator';

interface BookingConfirmationPageProps {
  booking: Booking;
  onGoHome: () => void;
  onViewBookings: () => void;
}

export const BookingConfirmationPage: React.FC<BookingConfirmationPageProps> = ({ 
  booking, 
  onGoHome,
  onViewBookings 
}) => {
  const handleDownloadTicket = () => {
    generateTicketPDF(booking);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <CheckCircle className="w-24 h-24 text-green-500" />
            </div>
            <h1 className="text-4xl mb-2 text-green-600">Booking Confirmed!</h1>
            <p className="text-xl text-gray-600">Your bus ticket has been booked successfully</p>
          </div>

          {/* Ticket */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6" id="ticket">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="text-center">
                <h2 className="text-2xl mb-2">E-Ticket</h2>
                <div className="bg-white text-blue-600 inline-block px-6 py-2 rounded-full">
                  <span>PNR: {booking.pnr}</span>
                </div>
              </div>
            </div>

            {/* Journey Details */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm text-gray-600 mb-3">Journey Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">From:</span>
                      <span>{booking.from}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span>{booking.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span>{new Date(booking.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Departure:</span>
                      <span>{booking.departureTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrival:</span>
                      <span>{booking.arrivalTime}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-gray-600 mb-3">Bus Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bus:</span>
                      <span>{booking.busName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Operator:</span>
                      <span>{booking.operator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seats:</span>
                      <span>{booking.seats.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-600 mb-3">Passenger Details</h3>
                <div className="space-y-2">
                  {booking.passengers.map((passenger, index) => (
                    <div key={index} className="flex justify-between bg-gray-50 p-3 rounded-lg">
                      <span>{index + 1}. {passenger.name}</span>
                      <span className="text-gray-600">{passenger.gender}, {passenger.age} years - Seat {passenger.seatNumber}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-600 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{booking.contactEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{booking.contactPhone}</span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Total Amount Paid</span>
                  <span className="text-2xl text-green-600">₹{booking.totalAmount}</span>
                </div>
              </div>

              {/* Booking Info */}
              <div className="mt-6 pt-6 border-t text-sm text-gray-500 space-y-1">
                <p>Booking ID: {booking.id}</p>
                <p>Booking Date: {new Date(booking.bookingDate).toLocaleString()}</p>
                <p>Status: <span className="text-green-600 uppercase">{booking.status}</span></p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleDownloadTicket}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Ticket PDF
            </button>
            <button
              onClick={onViewBookings}
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              My Bookings
            </button>
          </div>

          <button
            onClick={onGoHome}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Book Another Ticket
          </button>

          {/* Important Notice */}
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h4 className="text-sm mb-2">Important Instructions:</h4>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Please carry a valid ID proof during the journey</li>
              <li>Reach the boarding point 15 minutes before departure</li>
              <li>Ticket confirmation has been sent to your email</li>
              <li>You can cancel this booking from "My Bookings" section</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
