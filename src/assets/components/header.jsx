export const Header = ({ score, moves }) => {
  return (
    <header className="game-header">
      <h1 className="game-title">Memory Card Game</h1>
      <div className="stats">
        <div className="stat-item">
          <span className="label">Score</span>
          <span className="value">{score}</span>
        </div>
        <div className="stat-item">
          <span className="label">Moves</span>
          <span className="value">{moves}</span>
        </div>
      </div>
    </header>
  );
};
