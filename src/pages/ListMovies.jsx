import { useGlobalState } from '../store'
import MovieCard from '../components/MovieCard'
import Banner from '../components/Banner'

const ListMovies = () => {
  const [movies] = useGlobalState('movies')

  return (
    <div className="flex flex-col w-full p-4">
      <Banner />
      <div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold p-4">Movies</h2>

          {movies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {movies.map((movie, i) => (
                <MovieCard key={i} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="mt-10">No movies yet</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListMovies
