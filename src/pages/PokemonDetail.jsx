import { useParams } from 'react-router-dom';
import { usePokemon } from '../hooks/UsePokemon';
import PokemonNavigation from '../components/Pokemon/PokemonNavigation';
import FlavorText from '../components/Pokemon/FlavorText';
import TypeBadges from '../components/Pokemon/TypeBadges';
import PhysicalStats from '../components/Pokemon/PhysicalStats';
import BaseStats from '../components/Pokemon/BaseStats';
import PokemonImage from '../components/Pokemon/PokemonImage';
import '../css/PokemonDetail.css';

function PokemonDetail() {
  const { id } = useParams();
  const {
    pokemon,
    species,
    isLoading,
    error,
    prevId,
    nextId,
    prevPokemon,
    nextPokemon,
  } = usePokemon(id);

  if (isLoading) return <div>Loading Pokémon...</div>;
  if (error) return <div>Error: {error?.message || 'Something went wrong.'}</div>;
  if (!pokemon) return <div>Pokémon not found</div>;

  return (
    <div className="pokemon-detail-page">
      <PokemonNavigation prevPokemon={prevPokemon} nextPokemon={nextPokemon} curPokemon={pokemon} />

      <div className={`pokemon-detail-card ${pokemon.types[0].type.name}`}>
        <div className="pokemon-info-container">
          <div className="pokemon-text-content">
            <h1 className="pokemon-name">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              <span className="pokemon-number">#{String(pokemon.id).padStart(3, '0')}</span>
            </h1>

            <FlavorText species={species} />
            <TypeBadges types={pokemon.types} />
            <PhysicalStats height={pokemon.height} weight={pokemon.weight} abilities={pokemon.abilities} />
            <BaseStats stats={pokemon.stats} />
          </div>

          <PokemonImage sprite={pokemon.sprites.other['official-artwork'].front_default} name={pokemon.name} />
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
