import { useState } from "react";
import { addMovie,getMovies } from "../services/Blockchain.services";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Addmovie = () => {
  const [imageUrl,setImageUrl] = useState('')
  const [name,setName] = useState('')
  const [genre,setGenre] = useState('')
  const [description,setDescription] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e)=> {
      e.preventDefault()
      if(!imageUrl || !name || !genre || !description) return
      const params = {
         name,
         imageUrl,
         genre,
         description
      }
      await toast.promise(
        new Promise(async (resolve, reject) => {
          await addMovie(params)
            .then(async () => {
              resetForm();
              getMovies()
              navigate('/')
              resolve();
            })
            .catch(() => reject());
        }),
        {
          pending: "Approve transaction...",
          success: "movie created successfully 👌",
          error: "Encountered error 🤯",
        }
      );
  }

  const resetForm = () => {
    setName('')
    setImageUrl('')
    setGenre('')
    setDescription('')
  }

  return (
    <div className="flex justify-center items-center py-12 m-auto w-full ">
      <div className="block rounded-lg justify-center items-center m-auto shadow-lg shadow-gray-400 w-3/5">
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mb-4">
            <h2>Add Movies</h2>
          </div>
          <div className="form-group mb-6 w-full">
            <input
              type="url"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded-lg outline-none lg:w-full focus:border-red-700  focus:outline-none focus:ring-0"
              id="exampleInput7"
              placeholder="Image Url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
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
            
              lg:w-full focus:border-red-700  focus:outline-none focus:ring-0"
              id="exampleInput7"
              placeholder="Movie Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            
              lg:w-full focus:border-red-700  focus:outline-none focus:ring-0"
              id="exampleInput8"
              placeholder="eg: hilarious, action, comedy..."
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
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
            
            lg:w-full focus:border-red-700  focus:outline-none focus:ring-0 "
              id="exampleFormControlTextarea13"
              rows="3"
              placeholder="Movie Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end ">
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
                focus:ring-0
                focus:outline-none
                uppercase
                rounded-full
                shadow-md
                border-2 border-red-700
                hover:bg-gradient-to-r 
                from-cyan-500 
                to-red-500 hover:text-white 
                hover:border-white"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default Addmovie;
