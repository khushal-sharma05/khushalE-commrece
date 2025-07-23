import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='w-full px-4 md:px-20'>
  {/* Grid Footer Content */}
  <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
    {/* Logo & Description */}
    <div>
      <img src={assets.logo} className='mb-5 w-32' />
      <p className='w-full md:w-2/3 text-gray-600'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, quia! Earum porro error quaerat excepturi eveniet voluptatum molestias impedit eos rerum recusandae nemo dolores accusamus, officiis et laborum ex nobis?
      </p>
    </div>

    {/* Company Links */}
    <div>
      <p className='text-xl font-medium mb-5'>COMPANY</p>
      <ul className='flex flex-col gap-1 text-gray-600'>
        <li>Home</li>
        <li>About Us</li>
        <li>Delivery</li>
        <li>Privacy Policy</li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
      <ul className='flex flex-col gap-1 text-gray-600'>
        <li>+92-80-0327-5977</li>
        <li>Khushal90@gmail.com</li>
      </ul>
    </div>
  </div>

  {/* Bottom Copyright */}
  <div className='w-full'>
    <hr className='my-4' />
    <p className='py-8 text-sm text-center text-gray-500'>
      © 2025 Khushal Sharma. All rights reserved.
    </p>
  </div>
</div>

    
  )
}

export default Footer
