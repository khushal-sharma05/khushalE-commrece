import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/order`);
      setOrders(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">📦 All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center flex-wrap gap-3 mb-2">
                <div>
                  <p className="text-gray-700">
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-lg font-semibold text-green-600">
                  {currency}{order.totalPrice}
                </p>
              </div>

              <div className="text-sm text-gray-600 mb-2">
                <strong>Customer:</strong> {order.customerName || 'N/A'} <br />
                <strong>Email:</strong> {order.customerEmail || 'N/A'}
              </div>

              <div className="mt-3">
                <strong className="text-gray-700">Items:</strong>
                <ul className="list-disc ml-6 mt-1 text-gray-700">
                  {order.items?.map((item, i) => (
                    <li key={i}>
                      {item.name} (x{item.quantity}) - {currency}{item.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex gap-3 text-sm">
                <span className={`px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

