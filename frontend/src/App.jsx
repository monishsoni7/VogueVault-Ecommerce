import React from 'react';
import ShopContextProvider from './context/shopContext';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import PlaceOrder from './pages/PlaceOrder';
import Login from './pages/Login';
import About from './pages/About';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
      <ShopContextProvider>
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white dark:bg-gray-900 min-h-screen'>
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productID' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
        <Footer />
        </div>
      </ShopContextProvider>

  );
};

export default App;
