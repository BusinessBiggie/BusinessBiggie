import { useParams, Link } from 'react-router-dom';
import { usePokemon } from '../hooks/UsePokemon';
import '../PokemonDetail.css';

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

  const getEnglishFlavorText = () => {
    if (!species) return 'No description available.';
    const entry = species.flavor_text_entries.find(
      (e) => e.language.name === 'en'
    );
    return entry ? entry.flavor_text.replace(/\f/g, ' ') : 'No description available.';
  };

  if (isLoading) return <div>Loading Pokémon...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!pokemon) return <div>Pokémon not found</div>;

  return (
    <div className="pokemon-detail-page">
      {/* Top navigation with images and numbers */}
      <div className="pagination-controls detailed-pagination">
        {prevPokemon && (
          <Link to={`/pokemon/${prevPokemon.id}`} className="pagination-button detailed-button">
            <img src={prevPokemon.sprites.front_default} alt={prevPokemon.name} className="nav-sprite" />
            <div className="nav-text">
              <div>#{String(prevPokemon.id).padStart(3, '0')}</div>
              <div>{prevPokemon.name}</div>
            </div>
          </Link>
        )}
        <Link to="/" className="pagination-button detailed-button">
          Back to List
        </Link>
        {nextPokemon && (
          <Link to={`/pokemon/${nextPokemon.id}`} className="pagination-button detailed-button">
            <div className="nav-text">
              <div>#{String(nextPokemon.id).padStart(3, '0')}</div>
              <div>{nextPokemon.name}</div>
            </div>
            <img src={nextPokemon.sprites.front_default} alt={nextPokemon.name} className="nav-sprite" />
          </Link>
        )}
      </div>

      {/* Pokémon Detail Card */}
      <div className={`pokemon-detail-card ${pokemon.types[0].type.name}`}>
        <div className="pokemon-info-container">
          {/* Text Info */}
          <div className="pokemon-text-content">
            <h1 className="pokemon-name">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              <span className="pokemon-number">#{String(pokemon.id).padStart(3, '0')}</span>
            </h1>

            <p className="pokemon-description">{getEnglishFlavorText()}</p>

            {/* Types */}
            <div className="pokemon-types">
              {pokemon.types.map((typeInfo) => (
                <span key={typeInfo.type.name} className={`type-badge type-${typeInfo.type.name}`}>
                  {typeInfo.type.name}
                </span>
              ))}
            </div>

            {/* Physical Stats */}
            <div className="pokemon-physical-stats">
              <div className="physical-attribute">
                <strong>Height:</strong> {pokemon.height / 10} m
              </div>
              <div className="physical-attribute">
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </div>
              <div className="physical-attribute">
                <strong>Abilities:</strong>{" "}
                {pokemon.abilities.map((a, index) => (
                  <span key={a.ability.name}>
                    {a.ability.name}
                    {a.is_hidden && " (Hidden Ability)"}
                    {index !== pokemon.abilities.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>

            {/* Base Stats */}
            <div className="pokemon-stats">
              <h2>Base Stats</h2>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="stat-row">
                  <span className="stat-name">{stat.stat.name.replace('-', ' ')}</span>
                  <span className="stat-value">{stat.base_stat}</span>
                  <div className="stat-bar-background">
                    <div
                      className="stat-bar-fill"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pokémon Image */}
          <div className="pokemon-image-container">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
