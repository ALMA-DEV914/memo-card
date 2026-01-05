export const Leaderboard = ({ players, title }) =>{
  return (
    <div className="leaderboard-column">
      <h3>{title}</h3>
      {players.length === 0 ? (
        <p className="no-players">No players yet</p>
      ) : (
        players.map((player, index) => (
          <div className="leaderboard-card" key={index}>
            <span className="rank">
              {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
            </span>
            <div className="player-info">
              <span className="player-name">{player.name}</span>
              <span className="player-score">
                Score: {player.score} | Moves: {player.moves}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
