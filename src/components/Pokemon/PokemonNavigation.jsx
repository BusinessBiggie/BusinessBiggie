import { Link } from 'react-router-dom';

function PokemonNavigation({ prevPokemon, nextPokemon, curPokemon}) {
  return (
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
      {/* To find the correct page for the pokemon, the current ID is retrieved and divided by 20 (as there is 20 per page) and then round UP to nearest integer */}
      <Link to={`/${Math.ceil(curPokemon.id/20)}`} className="pagination-button detailed-button">
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
  );
}

export default PokemonNavigation;
