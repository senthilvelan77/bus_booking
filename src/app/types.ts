export interface Bus {
  id: string;
  name: string;
  type: 'AC' | 'Non-AC' | 'Sleeper' | 'Semi-Sleeper';
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  from: string;
  to: string;
  date: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  rating: number;
  amenities: string[];
  seatLayout: Seat[][];
}

export interface Seat {
  id: string;
  number: string;
  type: 'seat' | 'sleeper' | 'empty';
  isBooked: boolean;
  isSelected?: boolean;
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  seatNumber: string;
}

export interface Booking {
  id: string;
  busId: string;
  busName: string;
  operator: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  passengers: Passenger[];
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
  pnr: string;
  contactEmail: string;
  contactPhone: string;
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
}
