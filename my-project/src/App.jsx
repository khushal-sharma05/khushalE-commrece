import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PalceOrder from "./pages/PalceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import DeliveryInformation from "./pages/DeliveryInformation";
import BottomNavbar from "./components/BottomNavbar"; // 👈 import kiya

import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className="relative min-h-screen pb-16"> {/* 👈 bottom padding so navbar won't overlap */}
      <ToastContainer />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Navbar />
        <SearchBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PalceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/delivery" element={<DeliveryInformation />} />
        </Routes>

        <Footer />
      </div>

      <BottomNavbar /> {/* 👈 add kiya fixed bottom navbar */}
    </div>
  );
};

export default App;
