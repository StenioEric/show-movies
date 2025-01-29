import StarRating from "@/StarRating"; // Componente de avaliação por estrelas
import { Movie } from "@/type/movie";
import "./index.scss";
import Link from "next/link"; // Link interno do Next.js para páginas dinâmicas

// Declaração das propriedades do componente
export interface Props {
  movie: Movie;
}

export default function MovieCard(props: Props) {
  // Desestruturação para acessar o objeto movie
  const movie = props.movie;

  return (
    // Li que representa o cartão do filme
    <li key={movie.id} className="movie-card">
      {/* Poster do filme */}
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      {/* Informações sobre o filme */}
      <div className="movie-infos">
        <p className="movie-title">{movie.title}</p>

        {/* Exibe a avaliação por estrelas caso o filme tenha nota */}
        {movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}

        {/* Conteúdo adicional oculto que exibe um link */}
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
