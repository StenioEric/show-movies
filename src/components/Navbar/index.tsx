"use client"; // Necessário para habilitar o modo client-side no Next.js

import { useState, useEffect } from "react"; // Importa os hooks useState e useEffect do React
import { useRouter } from "next/navigation"; // Hook para controle de navegação no Next.js
import axios from "axios"; // Biblioteca para realizar requisições HTTP
import Link from "next/link"; // Componente para navegação com links internos no Next.js
import SearchResults from "@/components/MovieForm"; // Componente responsável por exibir os resultados da pesquisa
import { Movie } from "@/type/movie"; // Tipagem para os objetos de filme
import "./index.scss"; // Importa o arquivo de estilos SCSS

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para armazenar o valor da pesquisa
  const [resultMovies, setResultMovies] = useState<Movie[]>([]); // Estado para armazenar os resultados da pesquisa
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento da pesquisa
  const router = useRouter(); // Hook para manipular a navegação

  // Efeito que realiza a pesquisa sempre que o valor de searchQuery é atualizado
  useEffect(() => {
    if (!searchQuery.trim()) {
      // Verifica se a query é válida (não vazia)
      setResultMovies([]); // Limpa os resultados se a query estiver vazia
      return;
    }

    const fetchMovies = async () => {
      setLoading(true); // Ativa o estado de carregamento
      try {
        // Faz a requisição para a API do TMDB com os parâmetros necessários
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: "4e1ab5dc8540ca07b5002ed46eb494e7", // Chave da API TMDB
              query: searchQuery, // Termo de pesquisa digitado pelo usuário
              language: "pt-BR", // Linguagem dos resultados
            },
          }
        );

        setResultMovies(response.data.results); // Atualiza o estado com os resultados obtidos
      } catch (error) {
        console.error("Erro ao buscar filmes:", error); // Exibe o erro caso a requisição falhe
        setResultMovies([]); // Limpa os resultados em caso de erro
      } finally {
        setLoading(false); // Desativa o estado de carregamento
      }
    };

    fetchMovies(); // Executa a função para buscar os filmes
  }, [searchQuery]); // Executa o efeito sempre que searchQuery mudar

  // Função que trata a busca de filmes ao enviar o formulário
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

    if (!searchQuery.trim()) return; // Impede a pesquisa se a query estiver vazia

    // Navega para a página de resultados passando a query como parâmetro na URL
    router.push(`/MovieForm?query=${searchQuery}`);
  };

  // Função para limpar o filtro de pesquisa ao clicar no botão Home
  const handleHomeClick = () => {
    setSearchQuery(""); // Limpa o campo de pesquisa
    setResultMovies([]); // Limpa os resultados
  };

  return (
    <nav className="navbar">
      <h1 className="page-title">ShowFilmes</h1> {/* Título da Navbar */}
      <div className="button">
        {/* Formulário de pesquisa de filmes */}
        <div className="divform">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Pesquisar filme..." // Texto de placeholder do campo de pesquisa
              value={searchQuery} // Valor atual do campo de pesquisa
              onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o estado ao digitar
              className="search-input" // Classe CSS para estilização
            />
            <button type="submit" className="btn-default">
              Pesquisar {/* Botão para acionar a pesquisa */}
            </button>
          </form>
        </div>

        {/* Link para retornar à página inicial */}
        <div className="home-link">
          <Link 
            href="/" 
            onClick={handleHomeClick} 
            className="btn-home">
            <span>Home</span>
          </Link>
        </div>

        {/* Link para ir ao repositório no GitHub */}
        <div className="home-link">
          <Link
            href="https://github.com/StenioEric/show-movies"
            className="btn-home"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Sobre o Projeto</span>
          </Link>
        </div>
      </div>
      {/* Renderiza os resultados da pesquisa caso existam */}
      {searchQuery && <SearchResults movies={resultMovies} loading={loading} />}
    </nav>
  );
}
