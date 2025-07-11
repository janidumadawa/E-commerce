import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardPin, setCardPin] = useState(['', '', '', '']);
  const [giftCode, setGiftCode] = useState('');

const Navigate = useNavigate();

  // Mock data for demonstration
  const subtotal = 2000;
  const shipping = 49.48;
  const tax = 2.24;
  const total = subtotal + shipping + tax;

  const handlePayment = () => {
    // Mock payment logic - replace with your actual payment handling
    if (cardPin.every(digit => digit !== '')) {
    Navigate("/cart"); 
    } else {
    Navigate("/cart"); 
    }
  };

  const handlePinChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...cardPin];
      newPin[index] = value;
      setCardPin(newPin);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleCancel = () => {
    Navigate("/cart"); 
  };

  const handleApplyGiftCode = () => {
    if (giftCode.trim()) {
      alert(`Gift code "${giftCode}" applied! (This is a UI demo)`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl mt-10 mb-20 pl-70"> This is Dummy Payment GateWay Page</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Payment</h2>
            
            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">Pay With:</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-400">Bank Transfer</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="crypto"
                    checked={paymentMethod === 'crypto'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-400">Cryptocurrency</span>
                </label>
              </div>
            </div>

            {/* Card PIN Input */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Enter your 4-digit card pin to confirm this payment
              </label>
              <div className="flex space-x-3">
                {cardPin.map((digit, index) => (
                  <input
                    key={index}
                    id={`pin-${index}`}
                    type="password"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    className="w-14 h-14 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handlePayment}
                className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Confirm Payment
              </button>
              <button
                onClick={handleCancel}

                className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-500 transition-colors"
              >
                Cancel Transfer
              </button>
            </div>

            {/* Privacy Notice */}
            <p className="text-xs text-gray-500 leading-relaxed">
              Your personal data will be used to process your order, support your 
              experience throughout this website, and for other purposes described 
              in our privacy policy.
            </p>
          </div>

          {/* Order Summary Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Contact Details</h2>
            
            {/* Contact Info */}
            <div className="mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Full Name</span>
                  <span className="text-sm text-gray-600">Janidu</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Email</span>
                  <span className="text-sm text-gray-600">janidu@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Mobile</span>
                  <span className="text-sm text-gray-600">+12345678</span>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2 cursor-pointer hover:underline">Not Janidu? Change Account</p>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Order Summary */}
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>
            
            {/* Order Detail */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-4">Order Detail</h4>
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-300 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <img
                        src="../src/assets/box_icon.svg"
                        alt="Product"
                        className="w-12 h-12 object-cover"
                    />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">Carrots</h5>
                  <p className="text-sm text-gray-500">Freh Carrots</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">Rs.{subtotal.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Qty: 10</p>
                </div>
              </div>
            </div>

            {/* Gift Code */}
            <div className="mb-6">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Gift or discount code"
                  value={giftCode}
                  onChange={(e) => setGiftCode(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <button 
                  onClick={handleApplyGiftCode}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Price Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Shipping</span>
                <span className="font-medium text-gray-800">${shipping.toFixed(2)}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between">
                <div>
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <p className="text-xs text-gray-500">Including ${tax.toFixed(2)} in taxes</p>
                </div>
                <span className="text-2xl font-bold text-gray-800">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;