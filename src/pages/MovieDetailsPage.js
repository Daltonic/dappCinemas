import React from 'react'
import Emancipation from '../asset/emancipation.jpg'

function MovieDetailsPage() {
  return (
    <div className='flex flex-col w-full p-4 space-y-4'>
            <div className='flex w-full '>
                <img src={Emancipation} className='h-80 w-full object-cover'/>
            </div>
            <div className='flex flex-col space-y-2'>
                <h3 className='font-black text-2xl'>Emmancipation</h3>
                <p className='text-gray-700'>Crime,Drama,Thrill</p>
                <p className='text-gray-700'>Runtime: 2h 2min</p>
            </div>
    </div>
  )
} 

export default MovieDetailsPage