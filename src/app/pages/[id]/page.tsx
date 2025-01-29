import axios from "axios"; // Importa o Axios para fazer a requisição
import { Movie } from "@/type/movie"; // Importa tipagem do filme
import StarRating from "@/StarRating"; // Componente de avaliação por estrelas
import "./index.scss";

interface MovieDetailsProps {
  params: {
    id: string; // Identificador único do filme
  };
}

// Função para buscar os detalhes do filme na API TMDB usando Axios
async function getMovieDetails(id: string): Promise<Movie> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: "4e1ab5dc8540ca07b5002ed46eb494e7",
          language: "pt-BR",
        },
      }
    );
    return response.data as Movie;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    throw new Error("Filme não encontrado.");
  }
}

export default async function MovieDetails({ params }: MovieDetailsProps) {
  // Busca os detalhes do filme com base no ID recebido
  let movie: Movie;
  try {
    movie = await getMovieDetails(params.id);
  } catch {
    return <div className="error-message">Filme não encontrado.</div>;
  }

  return (
    <main className="main-container">
      <div className="ola">
        {/* Exibição do pôster do filme */}
        <div className="poster">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        {/* Informações sobre o filme */}
        <div className="description">
          <h1 className="title">{movie.title}</h1>

          <div className="details">
            <p className="overview">{movie.overview}</p>

            {/* Exibição da avaliação por estrelas */}
            <div className="star">
              <p>Avaliação:</p>
              <StarRating rating={movie.vote_average} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
