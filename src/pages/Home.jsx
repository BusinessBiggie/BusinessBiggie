import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getPokemonList, getPokemonDetailsFromList } from '../services/PokemonService';
import Loading from '../components/UI/Loading';
import ErrorMessage from '../components/UI/ErrorMessage';
import PaginationControls from '../components/UI/PaginationControls';
import PokemonGrid from '../components/Pokemon/PokemonGrid';
import '../css/Home.css';
import SearchBar from '../components/SearchBar';

const PAGE_LIMIT = 20;
const ONE_HOUR = 1000 * 60 * 60;

function Home() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(pageId ? Number(pageId) : 1);

  const updatePage = (updater) => {
    const newPage = updater(page);
    setPage(newPage);
    navigate(`/${newPage}`);
  }

  const { data: listData, isLoading: isListLoading, error: listError } = useQuery({
    queryKey: ['pokemonList', page],
    queryFn: () => getPokemonList(page, PAGE_LIMIT),
    staleTime: ONE_HOUR,
  });

  const { data: detailedData, isLoading: isDetailsLoading, error: detailsError } = useQuery({
    queryKey: ['pokemonDetails', page],
    queryFn: () => getPokemonDetailsFromList(listData?.results || []),
    enabled: !!listData?.results?.length,
    staleTime: ONE_HOUR,
  });

  const isLoading = isListLoading || isDetailsLoading;
  const error = listError || detailsError;

  const hasMore = !!listData?.next; 
  if(!isLoading && detailedData === undefined){
    updatePage(() => 1);
  }

  return (
    <div className="home-page">
      <h1 className="pokedex-title">Pokédex</h1>

      {isLoading && <Loading />}
      {error && <ErrorMessage error={error} />}
      <SearchBar/>

      <PokemonGrid pokemons={detailedData} />

      <PaginationControls page={page} setPage={updatePage} hasMore={hasMore} />
    </div>
  );
}

export default Home;
