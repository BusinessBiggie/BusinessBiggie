import { Link } from 'react-router-dom';
import '../../css/PokemonCard.css'; 

function PokemonCard({ id, name, image, types }) {
  return (
    <Link to={`/pokemon/${id}`} className="pokemon-card">
      <div className="card-inner">
        <img src={image} alt={name} className="pokemon-image" />
        <h3 className="pokemon-name">{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
        <div className="type-badges">
          {types.map((type) => (
            <span key={type} className={`type-badge ${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;
