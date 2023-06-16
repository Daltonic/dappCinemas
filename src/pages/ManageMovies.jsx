import { useState, useEffect } from 'react'
import MovieWithDetails from '../components/MovieWithDetails'
import UpdateMovie from '../components/UpdateMovie'
import DeleteMovie from '../components/DeleteMovie'
import AddSlot from '../components/AddSlot'
import { getMovies } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const ManageMovies = () => {
  const [loaded, setLoaded] = useState(false)
  const [movies] = useGlobalState('movies')
  const [singleMovie] = useGlobalState('singleMovie')

  useEffect(() => {
    const fetchMovies = async () => {
      await getMovies()
      setLoaded(true)
    }

    fetchMovies()
  }, [])

  return loaded ? (
    <div className="w-full min-h-[89vh] ">
      <h3 className="my-3 p-3 text-3xl font-bold">Manage movies</h3>
      <div className="mt-9 px-3">
        {movies.length > 0 ? (
          movies.map((movie, index) =>
            !movie.deleted ? (
              <MovieWithDetails key={index} movie={movie} />
            ) : null
          )
        ) : (
          <div className="text-lg">No movies found</div>
        )}
      </div>
      {singleMovie ? (
        <>
          <UpdateMovie />
          <DeleteMovie />
          <AddSlot />
        </>
      ) : null}
    </div>
  ) : null
}

export default ManageMovies
