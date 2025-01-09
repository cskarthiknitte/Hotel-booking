import axios from "axios";
import React, { useEffect, useState } from "react";

const BookingForm = () => {
  const [hotels, setHotels] = useState([]);
  const [hotelName, setHotelName] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/hotels`)
      .then(response => setHotels(response.data))
      .catch(error => console.error('Error fetching hotels:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = { hotelName, from, to, customerName };

    axios.post(`${process.env.BACKEND_URL}/bookings`, bookingData)
      .then(response => {
        alert('Booking successful!');
        setHotelName('');
        setFrom('');
        setTo('');
        setCustomerName('');
      })
      .catch(error => console.error('Error creating booking:', error));
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayDate = getTodayDate();

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-white-600 to-red-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 max-w-lg mx-auto rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 text-blue">
          Hotel Booking Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Hotel Name</label>
            <select
              className="w-full border-2 border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
              id="hotelName"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              required
            >
              <option value="" disabled>Select a hotel</option>
              {hotels.map((hotel, index) => (
                <option key={index} value={hotel.hotelName}>{hotel.hotelName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">From</label>
            <input
              type="date"
              id="from"
              value={from}
              min={todayDate}
              onChange={(e) => setFrom(e.target.value)}
              required
              className="w-full border-2 border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">To</label>
            <input
              type="date"
              id="to"
              value={to}
              min={from || todayDate}
              onChange={(e) => setTo(e.target.value)}
              required
              className="w-full border-2 border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Customer Name</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full border-2 border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
              placeholder="Enter your name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-gradient-to-l focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;