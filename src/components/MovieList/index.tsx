"use client";

import { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";
import { Movie } from "@/type/movie";
import MovieCard from "../MovieCard"; // Importa componente de exibição de um cartão de filme

export default function MovieList() {
  // Estado para armazenar a lista de filmes
  const [movies, setMovies] = useState<Movie[]>([]);

  // Efeito que chama a função para obter os filmes ao montar o componente
  useEffect(() => {
    getMovies();
  }, []);

  // Função para buscar filmes da API do TMDB
  const getMovies = () => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: "4e1ab5dc8540ca07b5002ed46eb494e7",
        language: "pt-BR", // Idioma dos dados retornados
      },
    })
      .then((response) => {
        // Atualiza o estado com os filmes recebidos
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
      });
  };

  return (
    // Renderiza a lista de filmes utilizando o componente MovieCard
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
