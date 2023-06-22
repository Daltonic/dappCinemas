import { setGlobalState, useGlobalState } from '../store'
import MoviesTable from '../components/MoviesTable'
import { Link } from 'react-router-dom'
import { FaEthereum } from 'react-icons/fa'

const ManageMovies = () => {
  const [movies] = useGlobalState('movies')
  const [balance] = useGlobalState('balance')

  return (
    <div className="w-full min-h-[89vh] p-3 space-y-6">
      <h3 className="my-3 text-3xl font-bold">Manage Movies</h3>

      <MoviesTable movies={movies} />
      <div className="flex space-x-2">
        <Link
          to="/add/movies"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Movie
        </Link>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white
        font-bold py-2 px-4 rounded flex justify-center items-center"
        onClick={() => setGlobalState('withdrwalModal', 'scale-100')}
        >
          <span>Withdraw</span>
          <FaEthereum />
          <span>{balance}</span>
        </button>
      </div>
    </div>
  )
}

export default ManageMovies
