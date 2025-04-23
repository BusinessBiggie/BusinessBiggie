import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  getPokemonList,
  getPokemonDetailsFromList,
} from '../services/PokemonService';
import PokemonCard from '../components/Pokemon/PokemonCard';
import '../Home.css'; // Add this line if not already

const PAGE_LIMIT = 20;

function Home() {
  const [page, setPage] = useState(1);

  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
  } = useQuery({
    queryKey: ['pokemonList', page],
    queryFn: () => getPokemonList(page, PAGE_LIMIT),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: detailedData,
    isLoading: isDetailsLoading,
    error: detailsError,
  } = useQuery({
    queryKey: ['pokemonDetails', page],
    queryFn: () => getPokemonDetailsFromList(listData?.results || []),
    enabled: !!listData,
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = isListLoading || isDetailsLoading;
  const error = listError || detailsError;

  return (
    <div className="home-page">
      <h1 className="pokedex-title">Pokédex</h1>

      {isLoading && <p className="status-text">Loading Pokémon...</p>}
      {error && <p className="status-text error">Error: {error.message}</p>}

      <div className="pokemon-grid">
        {detailedData?.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.other['official-artwork'].front_default}
            types={pokemon.types.map((t) => t.type.name)}
          />
        ))}
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          ← Prev
        </button>
        <span className="page-number">Page {page}</span>
        <button
          className="pagination-button"
          onClick={() => setPage((p) => p + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Home;
