"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import SearchResults from "@/components/MovieForm"; // Importando o SearchResults
import { Movie } from "@/type/movie"; // Importando o tipo Movie
import "./index.scss";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para armazenar o valor da pesquisa
  const [resultMovies, setResultMovies] = useState<Movie[]>([]); // Estado para armazenar os resultados da pesquisa
  const [loading, setLoading] = useState(false); // Estado para controle de carregamento
  const router = useRouter();

  // Efeito que realiza a pesquisa sempre que o searchQuery for atualizado
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResultMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true); // Inicia o carregamento
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: "4e1ab5dc8540ca07b5002ed46eb494e7",
              query: searchQuery,
              language: "pt-BR",
            },
          }
        );

        setResultMovies(response.data.results); // Armazena os resultados da pesquisa
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setResultMovies([]);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchMovies();
  }, [searchQuery]);

  // Função que trata a busca de filmes ao enviar o formulário
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchQuery.trim()) return;

    // Navega para a página de resultados passando a query
    router.push(`/MovieForm?query=${searchQuery}`);
  };

  // Função para limpar o filtro de pesquisa ao clicar no botão Home
  const handleHomeClick = () => {
    setSearchQuery(""); // Limpa a pesquisa
    setResultMovies([]); // Limpa os resultados
  };

  return (
    <nav className="navbar">
      <h1 className="page-title">ShowFilmes</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Pesquisar filme..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn-default">Pesquisar</button>
      </form>

      <div className="home-link">
        <Link href="/" onClick={handleHomeClick} className="btn-home">
          <span>Home</span>
        </Link>
      </div>

      {searchQuery && <SearchResults movies={resultMovies} loading={loading} />}
    </nav>
  );
}
