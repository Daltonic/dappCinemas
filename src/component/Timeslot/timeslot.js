import React from 'react'
import data from '../../constants/data'

function timeslot() {
  return (
    <div className="flex justify-center items-center m-auto w-full px-16 py-12 lg:py-12 ">
      <div className="block rounded-lg  justify-center items-center m-auto shadow-lg shadow-gray-400">
        <form className="p-6">
          <div className="flex items-center justify-center mb-4">
            <h2>Time Slot</h2>
          </div>
          <div className="flex justify-center">
            <div className="mb-3 w-full">
              <label>Start Time</label>
              <select
                data-te-select-init
                className="form-control block
      w-full
      mt-2
       px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
     
      rounded-lg
    outline-none
    
   lg:w-[400px] focus:border-red-700  focus:outline-none focus:ring-0"
              >
                {data.StartTime.map((items) => (
                  <option key={items.id} value={items.id}>
                    {items.time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="mb-3 w-full">
              <label>End Time</label>
              <select
                data-te-select-init
                className="form-control block
      w-full
      mt-2
       px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
     
      rounded-lg
    outline-none
    
   lg:w-[400px] focus:border-red-700  focus:outline-none focus:ring-0"
              >
                {data.EndTime.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.time}
                  </option>
                ))}
              </select>
            </div>
          </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-2 mt-2'>

                  <div className="flex flex-col bg-gray-300 rounded-full ">
            <div className="flex space-x-4 justify-center p-2">
              <p>0xe23....12df</p>
            
            </div>
          </div>
          <div className="flex flex-col bg-gray-300 rounded-full ">
            <div className="flex space-x-4 justify-center p-2">
              <p>0xe23....12df</p>
            
            </div>
          </div>
          <div className="flex flex-col bg-gray-300 rounded-full ">
            <div className="flex space-x-4 justify-center p-2">
              <p>0xe23....12df</p>
            
            </div>
          </div>
          <div className="flex flex-col bg-gray-300 rounded-full ">
            <div className="flex space-x-4 justify-center p-2">
              <p>0xe23....12df</p>
            
            </div>
          </div>

                  </div>
          <div
            className="flex
    justify-end "
          >
            <button
              type="submit"
              className="
    w-42
    
    px-6
    py-2.5
    bg-transparent
    text-black
    font-medium
    text-xs
    leading-tight
    uppercase
    rounded-full
    shadow-md
    border-2 border-red-700
    hover:bg-gradient-to-r from-cyan-500 to-red-500 hover:text-white hover:border-white"
            >
              Add to List
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default timeslot
