import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const DeliveryPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
    paymentMethod: 'cod'
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Order placed successfully!\nPayment Method: ${formData.paymentMethod}`)
    console.log(formData)
  }
  const {navigate}=useContext(ShopContext)

  const subtotal = 0
  const shippingFee = 10
  const total = subtotal + shippingFee

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* LEFT SIDE FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-indigo-700 border-b pb-2">DELIVERY <span className="text-black">INFORMATION</span></h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} className="border p-2 rounded" required />
        </div>

        <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" required />

        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} className="w-full border p-2 rounded" required />

        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="border p-2 rounded" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="zipcode" placeholder="Zipcode" value={formData.zipcode} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="border p-2 rounded" required />
        </div>

        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" required />
      </form>

    
      <div className="bg-gray-50 p-6 rounded-lg border space-y-6">
        <h3 className="text-xl font-bold border-b pb-2">CART <span className="text-black">TOTALS</span></h3>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>${shippingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div>
          <h4 className="text-md font-semibold border-b pb-1 mb-3">PAYMENT METHOD</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="paymentMethod" value="stripe" checked={formData.paymentMethod === 'stripe'} onChange={handleChange} />
              <span className="text-blue-600 font-semibold">Stripe</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="paymentMethod" value="razorpay" checked={formData.paymentMethod === 'razorpay'} onChange={handleChange} />
              <span className="text-blue-800 font-semibold">Razorpay</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
              <span className="text-green-700 font-semibold">Cash on Delivery</span>
            </label>
          </div>
        </div>

        <button onClick={()=>navigate('/orders')} className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition">
          PLACE ORDER
        </button>
      </div>
    </div>
  )
}

export default DeliveryPage
