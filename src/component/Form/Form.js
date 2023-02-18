import React from 'react'

const Form = () => {
  return (
    <div className="flex justify-center items-center py-12 m-auto w-full  ">
      <div className="block rounded-lg  justify-center items-center m-auto shadow-lg shadow-gray-400">
        <form className='p-6'>
          <div className='flex items-center justify-center mb-4'><h2>Add Movies</h2></div>
          <div className="form-group mb-6 w-full">
            <input
              type="url"
              className="form-control block
        w-full
         px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
       
        rounded-lg
      outline-none
      
     lg:w-[400px] focus:border-red-700  focus:outline-none focus:ring-0"
              id="exampleInput7"
              placeholder="Image Url"
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
              w-full
               px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
             
              rounded-lg
            outline-none
            
           lg:w-[400px] focus:border-red-700  focus:outline-none focus:ring-0"
              id="exampleInput7"
              placeholder="Movie Name"
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
              w-full
               px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
             
              rounded-lg
            outline-none
            
           lg:w-[400px] focus:border-red-700  focus:outline-none focus:ring-0"
              id="exampleInput8"
              placeholder="Movie Genre"
            />
          </div>
          <div className="form-group mb-6">
            <textarea
              className="
              form-control block
              w-full
              h-32
              resize-none
               px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
             
              rounded-lg
            outline-none
            
           lg:w-[400px] focus:border-red-700  focus:outline-none focus:ring-0
      "
              id="exampleFormControlTextarea13"
              rows="3"
              placeholder="Movie Description"
            ></textarea>
          </div>

<div className='flex
      justify-end '>
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
            Add Movie
          </button>
</div>
         
        </form>
      </div>
    </div>
  )
}

export default Form
