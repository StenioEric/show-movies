
import { Movie } from "@/type/movie";
import StarRating from "@/StarRating";
import "./index.scss";

interface MovieDetailsProps {
  params: {
    id: string;
  };
}

// Função para buscar os dados do filme com base no ID
async function getMovieDetails(id: string): Promise<Movie> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=4e1ab5dc8540ca07b5002ed46eb494e7&language=pt-BR`
  ).then((res) => res.json());

  const movie: Movie = res;
  return movie;
}

export default async function MovieDetails({ params }: MovieDetailsProps) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    return <div className="error-message">Filme não encontrado.</div>;
  }

  return (
    <main className="main-container">
      <div className="ola">
        <div className="poster">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div className="description">
          <h1 className="title">{movie.title}</h1>

          <div className="details">
            <p className="overview">{movie.overview}</p>

            <div className="star">
              <p> Avaliação:</p>
              <StarRating rating={movie.vote_average} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
