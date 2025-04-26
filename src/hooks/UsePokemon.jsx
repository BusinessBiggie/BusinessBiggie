// usePokemon.js
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getPokemonById, getPokemonSpecies } from '../services/PokemonService';

export function usePokemon(id) {
  const queryClient = useQueryClient();

  const {
    data: pokemon,
    isLoading: isPokemonLoading,
    error: pokemonError,
  } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonById(id),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const {
    data: species,
    isLoading: isSpeciesLoading,
  } = useQuery({
    queryKey: ['pokemonSpecies', pokemon?.species?.url],
    queryFn: () => getPokemonSpecies(pokemon.species.url),
    enabled: !!pokemon?.species?.url,
    staleTime: 1000 * 60 * 60,
  });

  const prevId = pokemon && pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon ? pokemon.id + 1 : null;

  const { data: prevPokemon } = useQuery({
    queryKey: ['pokemon', prevId],
    queryFn: () => getPokemonById(prevId),
    enabled: !!prevId,
    staleTime: 1000 * 60 * 60,
  });

  const { data: nextPokemon } = useQuery({
    queryKey: ['pokemon', nextId],
    queryFn: () => getPokemonById(nextId),
    enabled: !!nextId,
    staleTime: 1000 * 60 * 60,
  });

  return {
    pokemon,
    species,
    isLoading: isPokemonLoading || isSpeciesLoading,
    error: pokemonError,
    prevId,
    nextId,
    prevPokemon,
    nextPokemon,
  };
}
