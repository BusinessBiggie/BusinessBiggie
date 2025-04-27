import PokemonCard from './PokemonCard';

function PokemonGrid({ pokemons }) {
  if (!pokemons?.length) {
    return <p className="status-text">No Pokémon found.</p>;
  }

  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites?.other?.['official-artwork']?.front_default}
          types={pokemon.types.map((t) => t.type.name)}
        />
      ))}
    </div>
  );
}

export default PokemonGrid;
