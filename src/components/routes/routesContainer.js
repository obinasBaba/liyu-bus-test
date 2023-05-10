import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../scenes/HomePage';
import Booking from '../../pages/Booking';

const RoutesContainer = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/booking" element={<Booking />} />
      {/*<Route path="/requestBook" element={<BookingRequestPage />} />*/}
      {/*<Route path="/travels" element={<Travels />} />*/}
      {/*<Route path="/signIn" element={<SignIn />} />*/}
      {/*<Route path="/signUp" element={<SignUp />} />*/}
    </Routes>
  );
};

export default RoutesContainer;
