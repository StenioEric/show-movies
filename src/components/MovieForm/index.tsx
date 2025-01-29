"use client";

import MovieCard from "@/components/MovieCard"; // Componente para exibição de cartões de filmes
import { Movie } from "@/type/movie"; // Tipagem do filme
import "./index.scss";

interface SearchResultsProps {
  movies: Movie[]; // Lista de filmes a serem exibidos
  loading: boolean; // Estado de carregamento
}

const SearchResults = ({ movies, loading }: SearchResultsProps) => {
  return (
    <div className="search-results">
      {/* Exibição de mensagem de carregamento */}
      {loading && <div className="loading">Carregando...</div>}

      {/* Exibe mensagem caso nenhum filme seja encontrado */}
      {!loading && movies.length === 0 && <p>Nenhum filme encontrado.</p>}

      {/* Renderiza a lista de filmes quando há resultados */}
      {!loading && movies.length > 0 && (
        <ul className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
