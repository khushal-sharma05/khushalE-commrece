import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
<Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-28'>
  <img
    className="w-full md:max-w-[480px]"
    src={assets.contact_img}
    alt="Contact"
  />
  <div className='flex flex-col justify-center items-start gap-6'>
    <p className='font-semibold text-xl text-gray-400'>Our Store</p>
    <p>
      54709 Willms Station<br />
      Suite 350, Washington, USA
    </p>
    <p>
      Tel: (91)18-00-9094<br />
      Email: admin@forever.com
    </p>
    <p className='font-semibold'>Careers at Forever</p>
    <p>Learn more about our teams and job openings.</p>
    <button className='bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all'>
      Explore Job
    </button>
  </div>
</div>
<NewsLetter />
    </div>
  )
}

export default Contact
