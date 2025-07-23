// import React, { useEffect, useState, createContext } from 'react'
// import { products } from '../assets/assets'
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'

// export const ShopContext = createContext()

// const ShopContextProvider = (props) => {
//   const currency = '₹'
//   const delivery_fee = '50'
//   const [search, setSearch] = useState('')
//   const [showSearch, setShowSearch] = useState(false)
//   const [cartItems, setCartItem] = useState({})
//   const navigate=useNavigate()

//   const addToCart = async (itemId, size) => {
//     if (!size) {
//       toast.error('select products size')
//       return
//     }

//     let cartData = structuredClone(cartItems)
//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1
//       } else {
//         cartData[itemId][size] = 1
//       }
//     } else {
//       cartData[itemId] = {}
//       cartData[itemId][size] = 1
//     }
//     setCartItem(cartData)
//   }

//   const gitCartCount = () => {
//     let totalCount = 0
//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0)
//             totalCount += cartItems[items][item]
//         } catch (error) {}
//       }
//     }
//     return totalCount
//   }

//   const updateQuatity = async (itemId, size, quantity) => {
//     let cartData = structuredClone(cartItems)
//     cartData[itemId][size] = quantity
//     setCartItem(cartData)
//   }

  
//   const getTotalCartItems = () => {
//     let total = 0
//     for (const productId in cartItems) {
//       for (const size in cartItems[productId]) {
//         total += cartItems[productId][size]
//       }
//     }
//     return total
//   }

 
//   const getTotalCartAmount = () => {
//     let total = 0
//     for (const productId in cartItems) {
//       for (const size in cartItems[productId]) {
//         const product = products.find((p) => p._id === productId)
//         if (product) {
//           total += product.price * cartItems[productId][size]
//         }
//       }
//     }
//     return total
//   }

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     addToCart,
//     gitCartCount,
//     updateQuatity,
//     getTotalCartItems,    
//     getTotalCartAmount,
//     navigate    
//   }

//   return (
//     <ShopContext.Provider value={value}>
//       {props.children}
//     </ShopContext.Provider>
//   )
// }

// export default ShopContextProvider

import React, { useEffect, useState, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
  const currency = '₹'
  const delivery_fee = '50'
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItem] = useState({})
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/product/list`)
        setProducts(response.data.data)
        console.log(response.data.data)
      } catch (err) {
        console.error("Failed to fetch products:", err)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select product size')
      return
    }

    let cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      } else {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }
    setCartItem(cartData)
  }

  const gitCartCount = () => {
    let totalCount = 0
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item]
        }
      }
    }
    return totalCount
  }

  const updateQuatity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity
    setCartItem(cartData)
  }

  const getTotalCartItems = () => {
    let total = 0
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        total += cartItems[productId][size]
      }
    }
    return total
  }

  const getTotalCartAmount = () => {
    let total = 0
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const product = products.find((p) => p._id === productId)
        if (product) {
          total += product.price * cartItems[productId][size]
        }
      }
    }
    return total
  }

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem('token')      // remove token
    toast.success('Logged out successfully')
    navigate('/login')                    // redirect to login
  }

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    gitCartCount,
    updateQuatity,
    getTotalCartItems,
    getTotalCartAmount,
    logout,               // ✅ Export logout
    navigate,
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
