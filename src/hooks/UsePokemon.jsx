import { useQuery } from '@tanstack/react-query';
import { getPokemonById, getPokemonSpecies } from '../services/PokemonService';

export function usePokemon(id) {

  const ONE_HOUR = 1000 * 60 * 60;

  const { //defines that everything is a const after useQuery is run
    data: pokemon, //data (e.g. the returned data) is renamed to "pokemon"
    isLoading: isPokemonLoading, //isLoading is a flag set so if its still fetching the developer knows not to display it
    error: pokemonError, //if any errors occured it gets renamed to pokemonError
  } = useQuery({ //A react hook that performs an action, just like fetch in traditional JS
    queryKey: ['pokemon', id], //a cache key, so when I need to lookup the specific pokemon again it knows wheter to make a HTTP call or just fetch it from its cache
    queryFn: () => getPokemonById(id), //What functions to run to retrieve the data (this functions takes an ID and appends it to a URL to retrieve information about the specific pokemon ID)
    staleTime: ONE_HOUR, // 1 hour, how long the cache is active?
  });

  const { //Same as above, just with specie information (Lore based)
    data: species,
    isLoading: isSpeciesLoading,
  } = useQuery({
    queryKey: ['pokemonSpecies', pokemon?.species?.url],
    queryFn: () => getPokemonSpecies(pokemon.species.url),
    enabled: !!pokemon?.species?.url,
    staleTime: ONE_HOUR,
  });

  //Used for prevous and next buttons to click through them
  const prevId = pokemon && pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon ? pokemon.id + 1 : null;

  //Fetch previous pokemon
  const { data: prevPokemon } = useQuery({
    queryKey: ['pokemon', prevId],
    queryFn: () => getPokemonById(prevId),
    enabled: !!prevId,
    staleTime: ONE_HOUR,
  });
  //Fetch next pokemon
  const { data: nextPokemon } = useQuery({
    queryKey: ['pokemon', nextId],
    queryFn: () => getPokemonById(nextId),
    enabled: !!nextId,
    staleTime: ONE_HOUR,
  });
//Puts next pokemon in cache, so it wont take too long to load when changing pages
  const { data: nextNextPokemon } = useQuery({
    queryKey: ['pokemon', nextId + 1],
    queryFn: () => getPokemonById(nextId + 1),
    enabled: !!nextId,
    staleTime: ONE_HOUR,
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
