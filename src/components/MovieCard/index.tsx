import StarRating from "@/StarRating";
import { Movie } from "@/type/movie";
import "./index.scss";
import Link from "next/link";

export interface Props {
  movie: Movie;
}

export default function MovieCard(props: Props) {
  const movie = props.movie;
  return (
    <li key={movie.id} className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="movie-infos">
        <p className="movie-title">{movie.title}</p>
        {movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}
        <div className="hidden-content">
          <Link href={`/pages/${movie.id}`} className="btn-default">
            <ul>
              <li>Ver mais</li>
            </ul>
          </Link>
        </div>
      </div>
    </li>
  );
}
