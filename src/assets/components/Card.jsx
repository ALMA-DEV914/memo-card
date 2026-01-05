export const Card = ({ card, onClick }) => {
  return (
    <div
      className={`card ${card.isFlipped || card.isMatched ? "flipped" : ""}`}
      onClick={() => onClick(card)}
    >
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{card.value}</div>
      </div>
    </div>
  );
};
