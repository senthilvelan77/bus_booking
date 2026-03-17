import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Bus, Passenger } from '../types';

interface PassengerDetailsPageProps {
  bus: Bus;
  selectedSeats: string[];
  onBack: () => void;
  onContinue: (passengers: Passenger[], contactEmail: string, contactPhone: string) => void;
}

export const PassengerDetailsPage: React.FC<PassengerDetailsPageProps> = ({ 
  bus, 
  selectedSeats, 
  onBack, 
  onContinue 
}) => {
  const [passengers, setPassengers] = useState<Passenger[]>(
    selectedSeats.map((seat, index) => ({
      name: '',
      age: 0,
      gender: 'Male' as const,
      seatNumber: seat,
    }))
  );

  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(passengers, contactEmail, contactPhone);
  };

  const isFormValid = passengers.every(p => p.name && p.age > 0) && contactEmail && contactPhone;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-3">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Seat Selection
          </button>
          <div>
            <h2 className="text-2xl">Passenger Details</h2>
            <p className="text-gray-600">
              {bus.from} → {bus.to} | Seats: {selectedSeats.join(', ')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Passenger Forms */}
            <div className="lg:col-span-2 space-y-6">
              {passengers.map((passenger, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg">
                      Passenger {index + 1} - Seat {passenger.seatNumber}
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="Enter full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        value={passenger.age || ''}
                        onChange={(e) => handlePassengerChange(index, 'age', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="Age"
                        min="1"
                        max="120"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        value={passenger.gender}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="your@email.com"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Ticket will be sent to this email</p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="+91 XXXXXXXXXX"
                      pattern="[0-9+\-\s]+"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">For booking confirmation and updates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-lg mb-4">Booking Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Bus</p>
                    <p>{bus.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Route</p>
                    <p>{bus.from} → {bus.to}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p>{new Date(bus.date).toLocaleDateString()}</p>
                    <p className="text-sm">{bus.departureTime} - {bus.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Seats</p>
                    <p>{selectedSeats.join(', ')}</p>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="text-2xl text-blue-600">₹{selectedSeats.length * bus.price}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Proceed to Payment
                </button>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  Please ensure all details are correct
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
