function TypeBadges({ types }) {
    return (
      <div className="pokemon-types">
        {types.map((typeInfo) => (
          <span key={typeInfo.type.name} className={`type-badge type-${typeInfo.type.name}`}>
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    );
  }
  
  export default TypeBadges;
  