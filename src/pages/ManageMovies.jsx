import { useGlobalState } from '../store'
import MoviesTable from '../components/MoviesTable'
import { Link } from 'react-router-dom'

const ManageMovies = () => {
  const [movies] = useGlobalState('movies')

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
      </div>
    </div>
  )
}

export default ManageMovies
