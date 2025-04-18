import React from 'react'
import NotFound from '../assets/Images/404.gif'
const Error = () => {
  return (
    <div className='flex relative  justify-center items-center text-3xl text-white w-screen h-[100vh] '>
       <div className=' absolute  text-4xl font-semibold'> Error 404 Not Found </div>
      <img src={NotFound} className=' h-screen w-screen opacity-20'></img>
    </div>
  )
}

export default Error