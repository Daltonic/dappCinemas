import { RiErrorWarningFill } from 'react-icons/ri'
import { useGlobalState, setGlobalState } from '../store'
import { toast } from 'react-toastify'
import { deleteMovie } from '../services/blockchain'
import { FaTimes } from 'react-icons/fa'

const DeleteMovie = () => {
  const [deleteMovieModal] = useGlobalState('deleteMovieModal')
  const [movie] = useGlobalState('movie')

  const closeModal = () => {
    setGlobalState('deleteMovieModal', 'scale-0')
    setGlobalState('movie', null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await deleteMovie(movie.id)
          .then((res) => {
            closeModal()
            resolve(res)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      }),
      {
        pending: 'Approve transaction...',
        success: 'Movie deleted successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${deleteMovieModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Delete Movie</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={closeModal}
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl mt-5 mb-5">
            <RiErrorWarningFill className="text-6xl text-red-700 " />
            <p className="p-2">
              Are you sure you want to delete{' '}
              <span className="italic">"{movie?.name}"</span>
            </p>
          </div>

          <button
            className="flex flex-row justify-center items-center w-full text-white text-md
            bg-red-500 py-2 px-5 rounded-full drop-shadow-xl border border-transparent
            hover:bg-transparent hover:border-red-500 hover:text-red-500 focus:outline-none mt-5"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  )
}

export default DeleteMovie
