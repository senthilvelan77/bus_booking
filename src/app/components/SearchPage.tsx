import React, { useState } from 'react';
import { ArrowLeftRight, Calendar, MapPin } from 'lucide-react';
import { SearchParams } from '../types';
import { cities } from '../mockData';

interface SearchPageProps {
  onSearch: (params: SearchParams) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onSearch }) => {
  const [from, setFrom] = useState('Mumbai');
  const [to, setTo] = useState('Bangalore');
  const [date, setDate] = useState('2026-02-10');

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ from, to, date });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 text-blue-600">
            🚌 Bus Booking
          </h1>
          <p className="text-xl text-gray-600">Book your bus tickets easily and securely</p>
        </div>

        {/* Search Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* From */}
              <div>
                <label className="block mb-2 text-gray-700">
                  <MapPin className="inline w-5 h-5 mr-2" />
                  From
                </label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* To */}
              <div>
                <label className="block mb-2 text-gray-700">
                  <MapPin className="inline w-5 h-5 mr-2" />
                  To
                </label>
                <div className="relative">
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    required
                  >
                    {cities.filter(city => city !== from).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="absolute -left-8 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors hidden md:block"
                    title="Swap cities"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block mb-2 text-gray-700">
                <Calendar className="inline w-5 h-5 mr-2" />
                Journey Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg text-lg"
            >
              Search Buses
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-3">🎫</div>
            <h3 className="mb-2">Easy Booking</h3>
            <p className="text-gray-600 text-sm">Book tickets in just a few clicks</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-3">💺</div>
            <h3 className="mb-2">Choose Your Seat</h3>
            <p className="text-gray-600 text-sm">Select your preferred seat</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="mb-2">E-Ticket</h3>
            <p className="text-gray-600 text-sm">Get instant digital ticket</p>
          </div>
        </div>
      </div>
    </div>
  );
};
