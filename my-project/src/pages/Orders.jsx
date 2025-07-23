import React from 'react'

const Orders = () => {
  // 🧪 Sample Orders (later fetch from backend or context)
  const orders = [
    {
      id: 'ORD123456',
      date: '2025-07-10',
      name: 'Khushal Sharma',
      address: 'Jaipur, Rajasthan, India',
      total: 1099,
      paymentMethod: 'Razorpay',
      status: 'Pending'
    },
    {
      id: 'ORD123457',
      date: '2025-07-09',
      name: 'Aman Verma',
      address: 'Delhi, India',
      total: 799,
      paymentMethod: 'Cash on Delivery',
      status: 'Delivered'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">Date: {order.date}</p>
              <p className="text-sm text-gray-600">Customer: {order.name}</p>
              <p className="text-sm text-gray-600">Address: {order.address}</p>
              <p className="text-sm text-gray-600">Payment: {order.paymentMethod}</p>
              <p className="text-sm font-semibold mt-2">Total: ₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders

