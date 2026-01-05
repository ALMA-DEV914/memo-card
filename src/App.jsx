import { useState, useEffect } from "react";
import { Card } from "./assets/components/Card";
import { Header } from "./assets/components/header";
import { Leaderboard } from "./assets/components/Leaderboard";

const cardValues = [
  "🥹","😍","🥰","😘",
  "😋","😛","😝","😜",
  "🥹","😍","🥰","😘",
  "😋","😛","😝","😜",
];

export default function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");

  const initializeCards = () => {
    const shuffledCards = [...cardValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setGameWon(false);
  };

  const handleCardClick = (clickedCard) => {
    if (isChecking) return;
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    if (flippedCards.length === 2) return;

    setCards(prev =>
      prev.map(card =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards(prev => [...prev, clickedCard]);
  };

  useEffect(() => {
    if (flippedCards.length !== 2) return;
    setIsChecking(true);

    const [first, second] = flippedCards;
    setMoves(prev => prev + 1);

    if (first.value === second.value) {
      setCards(prev =>
        prev.map(card =>
          card.value === first.value ? { ...card, isMatched: true } : card
        )
      );

      setScore(prev => {
        const newScore = prev + 1;
        if (newScore === cardValues.length / 2) setGameWon(true);
        return newScore;
      });

      setFlippedCards([]);
      setIsChecking(false);
    } else {
      setTimeout(() => {
        setCards(prev =>
          prev.map(card =>
            card.id === first.id || card.id === second.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setFlippedCards([]);
        setIsChecking(false);
      }, 800);
    }
  }, [flippedCards]);

  useEffect(() => {
    initializeCards();
  }, []);

  // Update leaderboard when player wins
  useEffect(() => {
    if (gameWon && playerName.trim() !== "") {
      const newPlayer = { name: playerName, score, moves };
      setPlayers(prev => {
        const updated = [...prev, newPlayer]
          .sort((a, b) => b.score - a.score || a.moves - b.moves)
          .slice(0, 10);
        return updated;
      });
    }
  }, [gameWon]);

  return (
    <div className="App">
      <Header score={score} moves={moves} />

      <div className="game-wrapper">
  {/* Left Leaderboard (Top 1-5) */}
  <div className="leaderboard-side">
    <Leaderboard players={players.slice(0, 5)} title="Top 1-5" />
  </div>

  {/* Card grid in the center */}
  <div className="card-area">
    <div className="player-input">
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
    </div>

    <button className="start-game-button" onClick={initializeCards}>
      Start Game
    </button>

    {gameWon && (
      <div className="win-message">🎉 You won in {moves} moves!</div>
    )}

    <div className="card-grid">
      {cards.map(card => (
        <Card key={card.id} card={card} onClick={handleCardClick} />
      ))}
    </div>
  </div>

  {/* Right Leaderboard (Top 6-10) */}
  <div className="leaderboard-side">
    <Leaderboard players={players.slice(5, 10)} title="Top 6-10" />
  </div>
</div>
    </div>
  );
}
