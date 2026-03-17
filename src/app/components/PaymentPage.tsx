import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Building, Wallet, Check } from 'lucide-react';
import { Bus, Passenger } from '../types';

interface PaymentPageProps {
  bus: Bus;
  selectedSeats: string[];
  passengers: Passenger[];
  contactEmail: string;
  contactPhone: string;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ 
  bus, 
  selectedSeats, 
  passengers,
  contactEmail,
  contactPhone,
  onBack, 
  onPaymentSuccess 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'wallet'>('card');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');

  const totalAmount = selectedSeats.length * bus.price;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-3">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Passenger Details
          </button>
          <div>
            <h2 className="text-2xl">Payment</h2>
            <p className="text-gray-600">Complete your booking securely</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg mb-4">Select Payment Method</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="text-sm">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="w-6 h-6" />
                  <span className="text-sm">UPI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'netbanking' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building className="w-6 h-6" />
                  <span className="text-sm">Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Wallet className="w-6 h-6" />
                  <span className="text-sm">Wallet</span>
                </button>
              </div>

              <form onSubmit={handlePayment}>
                {/* Card Payment */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">CVV</label>
                        <input
                          type="password"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Payment */}
                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="username@upi"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Enter your UPI ID (e.g., yourname@paytm, yourname@googlepay)
                    </p>
                  </div>
                )}

                {/* Net Banking */}
                {paymentMethod === 'netbanking' && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Select Your Bank</label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Choose a bank</option>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                      <option>Punjab National Bank</option>
                    </select>
                  </div>
                )}

                {/* Wallet */}
                {paymentMethod === 'wallet' && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Select Wallet</label>
                    <div className="space-y-3">
                      {['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay'].map(wallet => (
                        <label key={wallet} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="radio" name="wallet" className="mr-3" required />
                          <span>{wallet}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Pay ₹{totalAmount}
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="text-green-600">🔒</span>
                  Your payment information is secure and encrypted. This is a demo payment gateway.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg mb-4">Booking Summary</h3>
              
              <div className="space-y-3 mb-6 text-sm">
                <div>
                  <p className="text-gray-600">Bus</p>
                  <p>{bus.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Route</p>
                  <p>{bus.from} → {bus.to}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date</p>
                  <p>{new Date(bus.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Time</p>
                  <p>{bus.departureTime} - {bus.arrivalTime}</p>
                </div>
                <div>
                  <p className="text-gray-600">Passengers</p>
                  {passengers.map((p, i) => (
                    <p key={i} className="text-xs">{p.name} - Seat {p.seatNumber}</p>
                  ))}
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between mb-2">
                    <span>Base Fare ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})</span>
                    <span>₹{selectedSeats.length * bus.price}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>GST (5%)</span>
                    <span>₹{Math.round(selectedSeats.length * bus.price * 0.05)}</span>
                  </div>
                  <div className="border-t mt-2 pt-2">
                    <div className="flex justify-between">
                      <span>Total Amount</span>
                      <span className="text-xl text-blue-600">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
