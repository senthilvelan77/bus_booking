import jsPDF from 'jspdf';
import { Booking } from '../types';

export const generateTicketPDF = (booking: Booking) => {
  const doc = new jsPDF();
  
  // Set colors
  const primaryColor: [number, number, number] = [41, 128, 185];
  const textColor: [number, number, number] = [44, 62, 80];
  
  // Header with background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 35, 'F');
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('BUS TICKET', 105, 15, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('E-Ticket Confirmation', 105, 25, { align: 'center' });
  
  // PNR Section
  doc.setFillColor(46, 204, 113);
  doc.rect(15, 40, 180, 15, 'F');
  doc.setFontSize(14);
  doc.text(`PNR: ${booking.pnr}`, 105, 50, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  
  // Journey Details
  doc.setFontSize(16);
  doc.text('Journey Details', 15, 70);
  
  doc.setFontSize(11);
  let yPos = 80;
  
  // Journey info
  doc.text(`From: ${booking.from}`, 15, yPos);
  doc.text(`To: ${booking.to}`, 110, yPos);
  yPos += 8;
  
  doc.text(`Date: ${new Date(booking.date).toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })}`, 15, yPos);
  yPos += 8;
  
  doc.text(`Departure: ${booking.departureTime}`, 15, yPos);
  doc.text(`Arrival: ${booking.arrivalTime}`, 110, yPos);
  yPos += 15;
  
  // Bus Details
  doc.setFontSize(16);
  doc.text('Bus Details', 15, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.text(`Bus: ${booking.busName}`, 15, yPos);
  yPos += 8;
  doc.text(`Operator: ${booking.operator}`, 15, yPos);
  yPos += 8;
  doc.text(`Seats: ${booking.seats.join(', ')}`, 15, yPos);
  yPos += 15;
  
  // Passenger Details
  doc.setFontSize(16);
  doc.text('Passenger Details', 15, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  booking.passengers.forEach((passenger, index) => {
    doc.text(`${index + 1}. ${passenger.name} (${passenger.gender}, ${passenger.age} years) - Seat ${passenger.seatNumber}`, 15, yPos);
    yPos += 6;
  });
  
  yPos += 10;
  
  // Contact Details
  doc.setFontSize(16);
  doc.text('Contact Information', 15, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.text(`Email: ${booking.contactEmail}`, 15, yPos);
  yPos += 6;
  doc.text(`Phone: ${booking.contactPhone}`, 15, yPos);
  yPos += 15;
  
  // Payment Details
  doc.setFillColor(236, 240, 241);
  doc.rect(15, yPos, 180, 20, 'F');
  
  doc.setFontSize(14);
  doc.text('Total Amount Paid:', 20, yPos + 10);
  doc.text(`₹${booking.totalAmount}`, 170, yPos + 10);
  
  yPos += 30;
  
  // Booking Details
  doc.setFontSize(9);
  doc.setTextColor(127, 140, 141);
  doc.text(`Booking ID: ${booking.id}`, 15, yPos);
  doc.text(`Booking Date: ${new Date(booking.bookingDate).toLocaleString()}`, 15, yPos + 5);
  doc.text(`Status: ${booking.status.toUpperCase()}`, 15, yPos + 10);
  
  // Footer
  doc.setFontSize(8);
  doc.text('Please carry a valid ID proof during the journey.', 105, 280, { align: 'center' });
  doc.text('For queries, contact support@busbooking.com', 105, 285, { align: 'center' });
  
  // Save the PDF
  doc.save(`bus-ticket-${booking.pnr}.pdf`);
};

export const printTicket = () => {
  window.print();
};
