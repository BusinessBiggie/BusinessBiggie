function PokemonImage({ sprite, name }) {
    return (
      <div className="pokemon-image-container">
        <img src={sprite} alt={name} className="pokemon-image" />
      </div>
    );
  }
  
  export default PokemonImage;
  