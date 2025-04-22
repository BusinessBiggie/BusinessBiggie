import { useParams, Link } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';

function PokemonDetail() {
  const { id } = useParams();
  const {
    pokemon,
    species,
    isLoading,
    error,
    prevId,
    nextId,
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
    <div>
      <h1>{pokemon.name}</h1>
      <p>{getEnglishFlavorText()}</p>
      {/* The rest of your component like image, types, stats, etc. */}
      <div>
        {prevId && <Link to={`/pokemon/${prevId}`}>← Prev</Link>}
        <Link to="/">Back</Link>
        {nextId && <Link to={`/pokemon/${nextId}`}>Next →</Link>}
      </div>
    </div>
  );
}
