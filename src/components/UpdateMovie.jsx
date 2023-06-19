import { useEffect, useState } from 'react'
import { useGlobalState, setGlobalState } from '../store'
import { FaTimes } from 'react-icons/fa'
import { updateMovie } from '../services/blockchain'
import { toast } from 'react-toastify'

const UpdateMovie = () => {
  const [updateMovieModal] = useGlobalState('updateMovieModal')
  const [movieData] = useGlobalState('movie')

  const [movie, setMovie] = useState({
    imageUrl: '',
    name: '',
    genre: '',
    description: '',
  })

  useEffect(() => {
    if (movieData) {
      setMovie({
        imageUrl: movieData.imageUrl,
        name: movieData.name,
        genre: movieData.genre,
        description: movieData.description,
      })
    }
  }, [movieData])

  const closeModal = () => {
    setGlobalState('updateMovieModal', 'scale-0')
    setMovie({
      imageUrl: '',
      name: '',
      genre: '',
      description: '',
    })
    setGlobalState('movie', null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!movie.imageUrl || !movie.name || !movie.genre || !movie.description)
      return
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await updateMovie({ ...movie, id: movieData.id })
          .then(async () => {
            closeModal()
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      }),
      {
        pending: 'Approve transaction...',
        success: 'Movie updated successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }))
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${updateMovieModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Edit Movie</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={closeModal}
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl mt-5 mb-5">
            <div className="flex justify-center items-center rounded-full overflow-hidden h-10 w-64 shadow-md shadow-slate-300 p-4">
              <p className="text-slate-700">
                {' '}
                Dapp <span className="text-red-700">Cinemas</span>
              </p>
            </div>
          </div>
          <div
            className="flex flex-row justify-between items-center
          bg-gray-300 rounded-xl mt-5 p-2"
          >
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="url"
              name="image_url"
              placeholder="image url"
              value={movie.imageUrl}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5 p-2">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="text"
              name="name"
              placeholder="movie name"
              value={movie.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5 p-2">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="text"
              name="genre"
              placeholder="separate genre with commas, eg. hilarious, action, thrilling"
              value={movie.genre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5 p-2">
            <textarea
              className="block w-full text-sm resize-none text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="description."
              value={movie.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="flex flex-row justify-center items-center w-full text-white text-md
            bg-gradient-to-r from-cyan-500 to-red-500 py-2 px-5 rounded-full drop-shadow-xl border border-transparent
            hover:bg-transparent hover:border hover:border-blue-400
            focus:outline-none focus:ring mt-5"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateMovie
