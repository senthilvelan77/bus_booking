import React, { useState } from 'react';
import { ArrowLeft, Clock, Star, Wifi, Battery, Wind } from 'lucide-react';
import { Bus, SearchParams } from '../types';

interface BusListPageProps {
  buses: Bus[];
  searchParams: SearchParams;
  onBack: () => void;
  onSelectBus: (bus: Bus) => void;
}

export const BusListPage: React.FC<BusListPageProps> = ({ buses, searchParams, onBack, onSelectBus }) => {
  const [filters, setFilters] = useState({
    busType: 'All',
    priceRange: [0, 2000],
    departureTime: 'All',
    rating: 0,
  });

  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'rating' | 'departure'>('departure');

  const filteredBuses = buses.filter(bus => {
    if (filters.busType !== 'All' && bus.type !== filters.busType) return false;
    if (bus.price < filters.priceRange[0] || bus.price > filters.priceRange[1]) return false;
    if (filters.rating > 0 && bus.rating < filters.rating) return false;
    
    if (filters.departureTime !== 'All') {
      const hour = parseInt(bus.departureTime.split(':')[0]);
      if (filters.departureTime === 'Morning' && (hour < 6 || hour >= 12)) return false;
      if (filters.departureTime === 'Afternoon' && (hour < 12 || hour >= 18)) return false;
      if (filters.departureTime === 'Evening' && (hour < 18 || hour >= 23)) return false;
      if (filters.departureTime === 'Night' && (hour >= 6 && hour < 18)) return false;
    }
    
    return true;
  });

  const sortedBuses = [...filteredBuses].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'departure':
        return a.departureTime.localeCompare(b.departureTime);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-3">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Search
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl">
                {searchParams.from} → {searchParams.to}
              </h2>
              <p className="text-gray-600">
                {new Date(searchParams.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">{sortedBuses.length} buses found</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg mb-4">Filters</h3>
              
              {/* Bus Type */}
              <div className="mb-6">
                <label className="block mb-2 text-sm text-gray-700">Bus Type</label>
                <select
                  value={filters.busType}
                  onChange={(e) => setFilters({ ...filters, busType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option>All</option>
                  <option>AC</option>
                  <option>Non-AC</option>
                  <option>Sleeper</option>
                  <option>Semi-Sleeper</option>
                </select>
              </div>

              {/* Departure Time */}
              <div className="mb-6">
                <label className="block mb-2 text-sm text-gray-700">Departure Time</label>
                <select
                  value={filters.departureTime}
                  onChange={(e) => setFilters({ ...filters, departureTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option>All</option>
                  <option>Morning (6AM-12PM)</option>
                  <option>Afternoon (12PM-6PM)</option>
                  <option>Evening (6PM-11PM)</option>
                  <option>Night (11PM-6AM)</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block mb-2 text-sm text-gray-700">
                  Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                  className="w-full"
                />
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block mb-2 text-sm text-gray-700">Minimum Rating</label>
                <div className="space-y-2">
                  {[4, 3.5, 3, 0].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => setFilters({ ...filters, rating })}
                        className="mr-2"
                      />
                      <span className="flex items-center">
                        {rating > 0 ? (
                          <>
                            {rating}+ <Star className="w-4 h-4 text-yellow-500 ml-1 fill-yellow-500" />
                          </>
                        ) : 'Any'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block mb-2 text-sm text-gray-700">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="departure">Departure Time</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bus List */}
          <div className="lg:col-span-3 space-y-4">
            {sortedBuses.map(bus => (
              <div key={bus.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl mb-1">{bus.name}</h3>
                    <p className="text-gray-600 text-sm">{bus.operator}</p>
                    <div className="flex items-center mt-2">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-2">
                        {bus.type}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm">{bus.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl text-blue-600">₹{bus.price}</p>
                    <p className="text-sm text-gray-500">per seat</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-2xl">{bus.departureTime}</p>
                    <p className="text-sm text-gray-600">{bus.from}</p>
                  </div>
                  <div className="text-center flex flex-col items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-400 mb-1" />
                    <p className="text-sm text-gray-600">{bus.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{bus.arrivalTime}</p>
                    <p className="text-sm text-gray-600">{bus.to}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {bus.amenities.map(amenity => (
                    <span key={amenity} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                      {amenity === 'WiFi' && <Wifi className="w-4 h-4 mr-1" />}
                      {amenity === 'Charging Point' && <Battery className="w-4 h-4 mr-1" />}
                      {amenity === 'AC' && <Wind className="w-4 h-4 mr-1" />}
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    <span className="text-green-600">{bus.availableSeats} seats</span> available
                  </p>
                  <button
                    onClick={() => onSelectBus(bus)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Select Seats
                  </button>
                </div>
              </div>
            ))}

            {sortedBuses.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No buses found matching your filters</p>
                <button
                  onClick={() => setFilters({
                    busType: 'All',
                    priceRange: [0, 2000],
                    departureTime: 'All',
                    rating: 0,
                  })}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
