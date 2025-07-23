import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
  const { getTotalCartAmount, getTotalCartItems, currency,navigate } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount()
  const totalItems = getTotalCartItems()

  return (
    <div className='border-t mt-8 pt-4 px-4 sm:px-8'>
      <div className='flex justify-between text-lg sm:text-xl font-medium text-gray-800 mb-2'>
        <span>Total Items</span>
        <span>{totalItems}</span>
      </div>
      <div className='flex justify-between text-lg sm:text-xl font-semibold text-gray-900 mb-4'>
        <span>Total Amount</span>
        <span>{currency} {totalAmount.toFixed(2)}</span>
      </div>
      <button onClick={()=>navigate('/delivery')} className='bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition'>
        Proceed to Checkout
      </button>
    </div>
  )
}

export default CartTotal
