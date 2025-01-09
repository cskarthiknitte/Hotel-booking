import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Home = () => {
  const [Hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}/hotels`);
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-background"></div>

      {/* Navigation Bar */}
      <nav className="bg-blue-600 p-4 shadow-md z-10 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-semibold text-white">My Hotel Finder</Link>
          <div className="space-x-6">
            <Link to="/" className="text-white hover:text-blue-200">Home</Link>
            <Link to="/about" className="text-white hover:text-blue-200">About</Link>
            <Link to="/blog" className="text-white hover:text-blue-200">Blog</Link>
            <Link to="/contact" className="text-white hover:text-blue-200">Contact Us</Link>
            <Link to="/BookingForm" className="text-white hover:text-blue-200">Book a Hotel</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-20">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
          Welcome to My Hotel Finder
        </h1>

        {/* Hotels Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Hotels</h2>

        {/* Grid of Hotel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Hotels.map((hotel, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={`${process.env.IMAGE_URL}/${hotel.hotelImage}`}
                alt={hotel.hotelName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="text-xl font-semibold text-gray-700">{hotel.hotelName}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Button */}
        <div className="text-center mt-8">
          <Link
            to="/BookingForm"
            className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-3 rounded-lg transition duration-300"
          >
            Book a Hotel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;