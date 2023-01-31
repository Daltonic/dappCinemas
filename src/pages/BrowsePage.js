import React from 'react'
import heroimage from '../asset/heroimage.jpg'

function BrowsePage() {
  return (
    <div className="flex flex-col w-full p-6">
      <div
        style={{ backgroundImage: 'url(' + heroimage + ')' }}
        className="w-full h-80 rounded-3xl bg-no-repeat bg-cover bg-center mb-4"
      >
        <div className="p-16 text-white flex flex-col space-y-16">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">AVATAR</h3>
            <p className="text-xl font-medium">THE WAY OF THE WATER</p>
          </div>
          <div>
            <button class="bg-transparent font-bold border-2 border-red-600 py-2 px-8 hover:bg-red-600  font-bold  rounded-full hover:border-white ">
              Watch
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className='flex space-x-8 items-center'>
        <h2>Parties</h2>
        <input
            id="customRange1"
            class="form-range "
            type="range"
            value="100" min="10" 
                    max="1000" 
/>
        </div>
      
      </div>
    </div>
  )
}

export default BrowsePage
