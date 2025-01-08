import axios from "axios";
import React, { useEffect, useState } from "react";

const Admin = () => {
  const [bookings, setbookings] = useState([]);
  const [hotelName, sethotelName] = useState([]);
  const [hotelImage, sethotelImage] = useState(null);
  const [Hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchHotels();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/bookings"
      );
      setbookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hotelName", hotelName);
    formData.append("hotelImage", hotelImage);

    try {
      await axios.post("http://localhost:5000/api/hotels", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchHotels();
      sethotelName('');
      sethotelImage(null);
    } catch (error) {
      console.error("error adding hotels:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/hotels/${id}`);
      fetchHotels();
    } catch (error) {
      console.error("Error deleting hotels:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Booking Details Section */}
      <h1 className="text-2xl text-red-600 mb-4">Booking Details</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left bg-gray-100">Hotel Name</th>
            <th className="px-4 py-2 text-left bg-gray-100">Start Date</th>
            <th className="px-4 py-2 text-left bg-gray-100">End Date</th>
            <th className="px-4 py-2 text-left bg-gray-100">Customer Name</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2">{booking.hotelName}</td>
              <td className="px-4 py-2">{new Date(booking.to).toLocaleDateString()}</td>
              <td className="px-4 py-2">{new Date(booking.from).toLocaleDateString()}</td>
              <td className="px-4 py-2">{booking.customerName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="my-6" />

      {/* Manage Hotels Section */}
      <h1 className="text-2xl text-red-600 mb-4">Manage Hotels</h1>
      <form onSubmit={handleHotelSubmit} className="space-y-4">
        <div>
          <label htmlFor="hotelName" className="block font-medium">Hotel Name:</label>
          <input
            type="text"
            id="hotelName"
            value={hotelName}
            onChange={(e) => sethotelName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="hotelImage" className="block font-medium">Hotel Image:</label>
          <input
            type="file"
            id="hotelImage"
            onChange={(e) => sethotelImage(e.target.files[0])}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button className="bg-blue-400 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-500 transition duration-200">
          Add Hotel
        </button>
      </form>

      <hr className="my-6" />

      {/* Hotel List Section */}
      <h2 className="text-2xl text-red-600 mb-4">Hotel List</h2>
      <ul className="space-y-6">
        {Hotels.map((hotel, index) => (
          <li key={index} className="flex items-center space-x-4 bg-white p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <img
              src={`http://localhost:5000/uploads/${hotel.hotelImage}`}
              alt={hotel.hotelImage}
              className="w-32 h-32 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{hotel.hotelName}</h3>
              <button
                onClick={() => handleDelete(hotel._id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;