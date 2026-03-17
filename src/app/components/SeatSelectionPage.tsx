import React, { useState } from 'react';
import { ArrowLeft, User, Armchair } from 'lucide-react';
import { Bus, Seat } from '../types';

interface SeatSelectionPageProps {
  bus: Bus;
  onBack: () => void;
  onContinue: (selectedSeats: string[]) => void;
}

export const SeatSelectionPage: React.FC<SeatSelectionPageProps> = ({ bus, onBack, onContinue }) => {
  const [seatLayout, setSeatLayout] = useState(bus.seatLayout);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.type === 'empty' || seat.isBooked) return;

    const seatNumber = seat.number;
    const newLayout = seatLayout.map(row =>
      row.map(s =>
        s.number === seatNumber
          ? { ...s, isSelected: !s.isSelected }
          : s
      )
    );
    setSeatLayout(newLayout);

    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const totalAmount = selectedSeats.length * bus.price;

  const getSeatClass = (seat: Seat) => {
    if (seat.type === 'empty') return 'invisible';
    if (seat.isBooked) return 'bg-gray-300 cursor-not-allowed';
    if (seat.isSelected) return 'bg-green-500 text-white cursor-pointer hover:bg-green-600';
    return 'bg-white border-2 border-gray-300 cursor-pointer hover:border-blue-500 hover:bg-blue-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-3">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Bus List
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl">{bus.name}</h2>
              <p className="text-gray-600">
                {bus.from} → {bus.to} | {bus.departureTime} - {bus.arrivalTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seat Layout */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl">Select Your Seats</h3>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded mr-2"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
                    <span>Booked</span>
                  </div>
                </div>
              </div>

              {/* Driver Section */}
              <div className="mb-8">
                <div className="bg-gray-200 rounded-lg p-4 w-16 ml-auto">
                  <User className="w-8 h-8 text-gray-600" />
                  <p className="text-xs text-center mt-1">Driver</p>
                </div>
              </div>

              {/* Seats */}
              <div className="space-y-3">
                {seatLayout.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-3">
                    {row.map((seat, seatIndex) => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat)}
                        disabled={seat.type === 'empty' || seat.isBooked}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm transition-all ${getSeatClass(seat)}`}
                        title={seat.isBooked ? 'Already booked' : seat.type === 'empty' ? '' : `Seat ${seat.number}`}
                      >
                        {seat.type !== 'empty' && (
                          <div className="flex flex-col items-center">
                            <Armchair className="w-5 h-5" />
                            <span className="text-xs">{seat.number}</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                Click on available seats to select/deselect
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl mb-4">Booking Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Selected Seats:</span>
                  <span>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price per seat:</span>
                  <span>₹{bus.price}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="text-2xl text-blue-600">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onContinue(selectedSeats)}
                disabled={selectedSeats.length === 0}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {selectedSeats.length === 0 ? 'Select seats to continue' : `Continue (${selectedSeats.length} seat${selectedSeats.length > 1 ? 's' : ''})`}
              </button>

              {selectedSeats.length > 0 && (
                <p className="text-xs text-gray-500 mt-3 text-center">
                  You can select up to {Math.min(6, bus.availableSeats)} seats
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
