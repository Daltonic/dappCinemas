import { useState } from 'react'
import { addMovie } from '../services/blockchain'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Addmovie = () => {
  const navigate = useNavigate()
  const [movie, setMovie] = useState({
    imageUrl: '',
    name: '',
    genre: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!movie.imageUrl || !movie.name || !movie.genre || !movie.description)
      return

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await addMovie(movie)
          .then((tx) => {
            navigate('/')
            resolve(tx)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Approve transaction...',
        success: 'Movie created successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div className="flex justify-center items-center py-12 m-auto w-full ">
      <div className="block rounded-lg justify-center items-center m-auto shadow-lg shadow-gray-400 w-3/5">
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mb-4">
            <h2>Add Movies</h2>
          </div>
          <div className="mb-6 w-full">
            <input
              type="url"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
              bg-white bg-clip-padding rounded-lg outline-none lg:w-full focus:border-red-700
              focus:outline-none focus:ring-0"
              placeholder="Image URL"
              name="imageUrl"
              value={movie.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
              bg-white bg-clip-padding rounded-lg outline-none lg:w-full focus:border-red-700
              focus:outline-none focus:ring-0"
              placeholder="Movie Name"
              name="name"
              value={movie.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
              bg-white bg-clip-padding rounded-lg outline-none lg:w-full focus:border-red-700
              focus:outline-none focus:ring-0"
              placeholder="e.g. hilarious, action, comedy..."
              name="genre"
              value={movie.genre}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <textarea
              className="form-control block w-full h-32 resize-none px-3 py-1.5 text-base font-normal text-gray-700
              bg-white bg-clip-padding rounded-lg outline-none lg:w-full focus:border-red-700
              focus:outline-none focus:ring-0"
              placeholder="Movie Description"
              name="description"
              value={movie.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-42 px-6 py-2.5 bg-transparent text-black font-medium text-xs leading-tight focus:ring-0 focus:outline-none uppercase rounded-full shadow-md border-2 border-red-700 hover:bg-gradient-to-r from-cyan-500 to-red-500 hover:text-white hover:border-white"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Addmovie
