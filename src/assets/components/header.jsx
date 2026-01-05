export const Header = ({ score, moves }) => {
  return (<div className="game-header"> <h1>Memory Card Game</h1>
  <div className="stat">
  <div className="stat-item"><span className="label">Score: </span>{" "}<span className="value">{score}</span></div>
  <div className="stat-item"></div>
  <div className="stat-item"><span className="label">Moves:</span>{" "}<span className="value">{moves}</span>
  </div>
  </div>
  </div>
  );
}