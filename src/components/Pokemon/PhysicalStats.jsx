function PhysicalStats({ height, weight, abilities }) {
    return (
      <div className="pokemon-physical-stats">
        <div className="physical-attribute"><strong>Height:</strong> {height / 10} m</div>
        <div className="physical-attribute"><strong>Weight:</strong> {weight / 10} kg</div>
        <div className="physical-attribute">
          <strong>Abilities:</strong>{" "}
          {abilities.map((a, index) => (
            <span key={a.ability.name}>
              {a.ability.name}
              {a.is_hidden && " (Hidden Ability)"}
              {index !== abilities.length - 1 && ", "}
            </span>
          ))}
        </div>
      </div>
    );
  }
  
  export default PhysicalStats;
  