import { useState } from "react";
import { Card } from "./assets/components/Card";
import { Header } from "./assets/components/header";
import { useEffect } from "react";

const cardValues = [
  "🥹",
  "😍",
  "🥰",
  "😘",
  "😋",
  "😛",
  "😝",
  "😜",
  "🥹",
  "😍",
  "🥰",
  "😘",
  "😋",
  "😛",
  "😝",
  "😜",
];

function App() {
  const [cards, setCards] = useState([]);

  const initializeCards = () => {
    const finalCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(finalCards);
  };

  useEffect(() => {}, []);

  const handleCardClick = (clickedCard) => {
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    setCards((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );
  };

  return (
    <div className="App">
      <Header score={0} moves={0} />
      <button className="start-game-button" onClick={initializeCards}>
        Start Game
      </button>
      <div className="card-grid">
        {cards.map((card, index) => (
          <Card key={index} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}
export default App;
