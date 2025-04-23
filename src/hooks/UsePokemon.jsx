import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getPokemonById, getPokemonSpecies } from '../services/PokemonService';

export const usePokemon = (id) => {
  const queryClient = useQueryClient();

  // Fetch the main Pokémon data
  const {
    data: pokemon,
    isLoading: isPokemonLoading,
    error: pokemonError
  } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonById(id),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch species info (dependent query)
  const {
    data: species,
    isLoading: isSpeciesLoading,
  } = useQuery({
    queryKey: ['pokemonSpecies', pokemon?.species?.url],
    queryFn: () => getPokemonSpecies(pokemon.species.url),
    enabled: !!pokemon?.species?.url,
    staleTime: 1000 * 60 * 60,
  });

  // Prefetch next/previous Pokémon
  const prevId = pokemon && pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon ? pokemon.id + 1 : null;

  useEffect(() => {
    if (pokemon) {
      if (prevId) {
        queryClient.prefetchQuery({
          queryKey: ['pokemon', prevId.toString()],
          queryFn: () => getPokemonById(prevId),
        });
      }
      if (nextId) {
        queryClient.prefetchQuery({
          queryKey: ['pokemon', nextId.toString()],
          queryFn: () => getPokemonById(nextId),
        });
      }
    }
  }, [pokemon, prevId, nextId, queryClient]);

  return {
    pokemon,
    species,
    isLoading: isPokemonLoading || isSpeciesLoading,
    error: pokemonError,
    prevId,
    nextId,
  };
};
