import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/SearchBar.css';
import { getPokemonByName } from '../services/PokemonService';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const search = async () => {
    if(searchValue === "") return;
    try{
      const pokemonValue = await getPokemonByName(searchValue)
      navigate(`/pokemon/${pokemonValue.id}`)
    }catch{
      alert("No pokemon is named that!")
    }
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={search}>Search</button>
    </div>
  );
}

export default SearchBar;