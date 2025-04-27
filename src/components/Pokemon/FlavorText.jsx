function FlavorText({ species }) {
  if (!species) return <p>No description available.</p>;

  const allowedVersionsInOrder = [
    'scarlet', 'violet',      
    'sword', 'shield',         
    'sun', 'moon', 'ultra-sun', 'ultra-moon', 
    'x', 'y',                  
    'black-2', 'white-2', 'black', 'white', 
    'heartgold', 'soulsilver', 'diamond', 'pearl', 'platinum', 
    'fire-red', 'leaf-green',  
    'ruby', 'sapphire', 'emerald', 
    'gold', 'silver', 'crystal',
    'red', 'blue', 'yellow',  
  ];

  const validEntries = species.flavor_text_entries.filter(
    (e) => e.language.name === 'en' && allowedVersionsInOrder.includes(e.version.name)
  );

  const entry = allowedVersionsInOrder
    .map(version => validEntries.find(e => e.version.name === version))
    .find(e => e); 

  const flavor = entry
    ? entry.flavor_text.replace(/[\f\n]/g, ' ')
    : 'No description available.';

  return <p className="pokemon-description">{flavor}</p>;
}

export default FlavorText;