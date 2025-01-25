"use client";

import MovieCard from "@/components/MovieCard"; // Importando o MovieCard
import { Movie } from "@/type/movie"; // Importando o tipo Movie
import "./index.scss";

interface SearchResultsProps {
  movies: Movie[];
  loading: boolean;
}

const SearchResults = ({ movies, loading }: SearchResultsProps) => {
  return (
    <div className="search-results">
      {loading && <div className="loading">Carregando...</div>}

      {!loading && movies.length === 0 && <p>Nenhum filme encontrado.</p>}

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
