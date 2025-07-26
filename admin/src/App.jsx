import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import Deshborde from "./pages/Deshborde";
import ProductView from "./pages/ProductView";     // ✅ Add this
import ProductEdit from "./pages/ProductEdit";     // ✅ Add this

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '₹';

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("admin-token") || "");

  const handleSetToken = (token) => {
    setToken(token);
    localStorage.setItem("admin-token", token);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("admin-token");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      {token === "" ? (
        <Login setToken={handleSetToken} />
      ) : (
        <>
          <Navbar onLogout={handleLogout} />
          <hr />
          <div className="flex w-full">
            <Sidebar onLogout={handleLogout} />
            <div className="w-full ml-[max(5vw,25px)] my-8 text-gray-600">
              <Routes>
                <Route path="/Deshborde" element={<Deshborde />} />
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />

                {/* ✅ New Routes Added */}
                <Route path="/product/view/:id" element={<ProductView />} />
                <Route path="/product/edit/:id" element={<ProductEdit />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
