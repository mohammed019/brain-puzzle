import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

const cardImages = [
  { src: "/src/assets/helmet-1.png" },
  { src: "/src/assets/potion-1.png" },
  { src: "/src/assets/ring-1.png" },
  { src: "/src/assets/scroll-1.png" },
  { src: "/src/assets/shield-1.png" },
  { src: "/src/assets/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // shuffle cards
  const shuffleCards = () => {
    // duplicate cards
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  console.log(cards, turns);
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card card={card} key={card.id} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
