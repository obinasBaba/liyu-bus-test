import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TopNavBar from './layout/TopNavBar';
import { useLocations } from './actions/locations';
import Footer from './components/footer/footer';
import Booking from './pages/Booking';
import React from 'react';
import NotFound from './pages/NotFound';
import TicketsPage from './pages/TicketsPage';
import HomePage from './pages/Home';
import AboutUsPage from './pages/about-us';
import FAQPage from './pages/faq';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import FixedLayer from './layout/FixedLayer';
import appRoutes from './utils/routes';
import PaymentPage from './pages/PaymentPage';

export const getTodos = () => {};

function App() {
  useLocations();

  return (
    <BrowserRouter>
      <>
        <FixedLayer />
        <TopNavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path={appRoutes.PAYMENT} element={<PaymentPage />} />
          <Route path={appRoutes.TICKETS} element={<TicketsPage />} />
          <Route path="*" element={<NotFound />} />
          {/*<Route path="/travels" element={<Travels />} />*/}
          {/*<Route path="/signIn" element={<SignIn />} />*/}
          {/*<Route path="/signUp" element={<SignUp />} />*/}
        </Routes>

        <Footer />

        <ToastContainer position={'top-right'} />
      </>
    </BrowserRouter>
  );
}

export default App;
