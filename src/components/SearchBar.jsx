import './SearchBar.css';

function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
