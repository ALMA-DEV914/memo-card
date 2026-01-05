import { useState, useEffect } from "react";
import { Card } from "./assets/components/Card";
import { Header } from "./assets/components/header";

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

  // Initialize / Reset
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

  // Handle card click
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

  // Check match
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

  // Auto-start
  useEffect(() => {
    initializeCards();
  }, []);

  return (
    <div className="App">
      <Header score={score} moves={moves} />

      <button className="start-game-button" onClick={initializeCards}>
        Start Game
      </button>

      {gameWon && (
        <div className="win-message">
          🎉 You won in {moves} moves!
        </div>
      )}

      <div className="card-grid">
        {cards.map(card => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}
