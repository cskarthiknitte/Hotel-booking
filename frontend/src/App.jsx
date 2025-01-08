import React from 'react';
import BookingForm from './Pages/BookingForm';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Admin from './Pages/Admin';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/BookingForm' element={<BookingForm/>}/>
        <Route path='/Admin' element={<Admin/>}/>
      </Routes>

    </div>
  )
}

export default App

