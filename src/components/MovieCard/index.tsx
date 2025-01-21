import { Movie } from "@/type";

export interface Props{
  movie: Movie;
}

export default function MovieCard(props: Props) {
  const movie = props.movie;
  return (
    <li key={movie.id} className="movie-card">
      <p>{movie.title}</p>
      <p className="description">{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt=""
      />
      <p>{movie.vote_average}</p>
    </li>
  );
}
