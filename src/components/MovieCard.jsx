import { Link } from "react-router-dom"
import { truncate } from "../store"

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="flex justify-start flex-row space-x-8  sm:space-x-0
        sm:flex-col p-3 space-y-2 shadow-lg w-auto rounded-lg border-2 border-gray-200"
    >
      <div className="flex h-full w-auto">
        <img
          src={movie.imageUrl}
          className="rounded-lg object-cover h-64 w-full"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold md:text-lg my-2">{movie.name}</h3>
        <p className="text-gray-600 font-light text-md">
          {truncate(movie.description, 74, 0, 77)}
        </p>
      </div>
    </Link>
  )
}

export default MovieCard
