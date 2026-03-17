import { Bus, Seat } from './types';

// Generate seat layout
const generateSeatLayout = (totalSeats: number, bookedCount: number): Seat[][] => {
  const layout: Seat[][] = [];
  const seatsPerRow = 4;
  const rows = Math.ceil(totalSeats / seatsPerRow);
  
  let seatCounter = 1;
  const bookedSeats = new Set<number>();
  
  // Randomly book some seats
  while (bookedSeats.size < bookedCount) {
    bookedSeats.add(Math.floor(Math.random() * totalSeats) + 1);
  }
  
  for (let i = 0; i < rows; i++) {
    const row: Seat[] = [];
    for (let j = 0; j < seatsPerRow; j++) {
      if (j === 2) {
        // Aisle (empty space)
        row.push({
          id: `empty-${i}-${j}`,
          number: '',
          type: 'empty',
          isBooked: false,
        });
      } else {
        if (seatCounter <= totalSeats) {
          row.push({
            id: `seat-${seatCounter}`,
            number: `${seatCounter}`,
            type: 'seat',
            isBooked: bookedSeats.has(seatCounter),
          });
          seatCounter++;
        }
      }
    }
    layout.push(row);
  }
  
  return layout;
};

export const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Goa',
];

export const mockBuses: Bus[] = [
  {
    id: 'bus-1',
    name: 'VRL Travels',
    type: 'AC',
    operator: 'VRL Travels',
    departureTime: '22:00',
    arrivalTime: '06:30',
    duration: '8h 30m',
    from: 'Mumbai',
    to: 'Bangalore',
    date: '2026-02-10',
    price: 1200,
    availableSeats: 28,
    totalSeats: 40,
    rating: 4.5,
    amenities: ['WiFi', 'Charging Point', 'Blankets', 'Water Bottle'],
    seatLayout: generateSeatLayout(40, 12),
  },
  {
    id: 'bus-2',
    name: 'Orange Travels',
    type: 'Sleeper',
    operator: 'Orange Travels',
    departureTime: '20:30',
    arrivalTime: '05:00',
    duration: '8h 30m',
    from: 'Mumbai',
    to: 'Bangalore',
    date: '2026-02-10',
    price: 1500,
    availableSeats: 22,
    totalSeats: 36,
    rating: 4.2,
    amenities: ['WiFi', 'Charging Point', 'Blankets', 'Pillow', 'Reading Light'],
    seatLayout: generateSeatLayout(36, 14),
  },
  {
    id: 'bus-3',
    name: 'SRS Travels',
    type: 'AC',
    operator: 'SRS Travels',
    departureTime: '23:30',
    arrivalTime: '08:00',
    duration: '8h 30m',
    from: 'Mumbai',
    to: 'Bangalore',
    date: '2026-02-10',
    price: 1100,
    availableSeats: 35,
    totalSeats: 40,
    rating: 4.3,
    amenities: ['Charging Point', 'Water Bottle'],
    seatLayout: generateSeatLayout(40, 5),
  },
  {
    id: 'bus-4',
    name: 'Kallada Travels',
    type: 'Sleeper',
    operator: 'Kallada Travels',
    departureTime: '21:00',
    arrivalTime: '05:30',
    duration: '8h 30m',
    from: 'Mumbai',
    to: 'Bangalore',
    date: '2026-02-10',
    price: 1800,
    availableSeats: 18,
    totalSeats: 36,
    rating: 4.8,
    amenities: ['WiFi', 'Charging Point', 'Blankets', 'Pillow', 'Entertainment', 'Reading Light'],
    seatLayout: generateSeatLayout(36, 18),
  },
  {
    id: 'bus-5',
    name: 'Parveen Travels',
    type: 'Semi-Sleeper',
    operator: 'Parveen Travels',
    departureTime: '19:00',
    arrivalTime: '03:30',
    duration: '8h 30m',
    from: 'Mumbai',
    to: 'Bangalore',
    date: '2026-02-10',
    price: 900,
    availableSeats: 32,
    totalSeats: 40,
    rating: 3.9,
    amenities: ['Charging Point'],
    seatLayout: generateSeatLayout(40, 8),
  },
  {
    id: 'bus-6',
    name: 'RedBus Express',
    type: 'AC',
    operator: 'RedBus Express',
    departureTime: '22:30',
    arrivalTime: '07:00',
    duration: '8h 30m',
    from: 'Mumbai',
    to: 'Bangalore',
    date: '2026-02-10',
    price: 1350,
    availableSeats: 25,
    totalSeats: 40,
    rating: 4.6,
    amenities: ['WiFi', 'Charging Point', 'Blankets', 'Water Bottle', 'Snacks'],
    seatLayout: generateSeatLayout(40, 15),
  },
];

export const getBusesForRoute = (from: string, to: string, date: string): Bus[] => {
  // Update the mock data with the search parameters
  return mockBuses.map(bus => ({
    ...bus,
    from,
    to,
    date,
    seatLayout: generateSeatLayout(bus.totalSeats, bus.totalSeats - bus.availableSeats),
  }));
};
