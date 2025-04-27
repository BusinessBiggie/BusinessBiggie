function BaseStats({ stats }) {
    return (
      <div className="pokemon-stats">
        <h2>Base Stats</h2>
        {stats.map((stat) => (
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
    );
  }
  
  export default BaseStats;
  