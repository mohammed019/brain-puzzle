import { useState, useEffect } from "react";
import GameCard from "../components/game/GameCard";
import { getUsername, isLoggedIn } from "../hooks/auth";

const cardImages = [
  { src: "/src/assets/helmet-1.png", matched: false },
  { src: "/src/assets/potion-1.png", matched: false },
  { src: "/src/assets/ring-1.png", matched: false },
  { src: "/src/assets/scroll-1.png", matched: false },
  { src: "/src/assets/shield-1.png", matched: false },
  { src: "/src/assets/sword-1.png", matched: false },
];

function Game() {
  const [cards, setCards] = useState([]);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(50);
  const [user, setUser] = useState("");

  // shuffle cards
  const shuffleCards = () => {
    // duplicate cards
    const shuffledCards = [
      ...cardImages,
      ...cardImages,
      ...cardImages,
      ...cardImages,
    ]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
  };

  // start new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        cardScore(true);
        resetTurn();
      } else {
        setTimeout(() => {
          cardScore();
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const cardScore = (match) => {
    // Check if two cards are matched
    if (match) {
      // Increase the score if cards are matched
      setScore(score + 10);
    } else {
      // Deduct points for each turn
      setScore(score - 5);
    }
  };

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    const username = getUsername();
    setUser(username?.username);
  }, []);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  return (
    <div className="max-w-4xl max-md:max-w-[92%] flex flex-col justify-center items-center my-10 mx-auto ">
      <div className="flex justify-center items-center w-full space-x-12">
        <button
          onClick={shuffleCards}
          className="bg-none inline-block border-2 text-center transition-all duration-200 ease-in-out py-[6px] px-[12px] rounded-[4px] dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer font-sans hover:bg-primary-light-500 dark:hover:bg-primary-light-700 border-primary-light-600 text-text-light-500 font-bold text-base"
        >
          New Game
        </button>
        {isLoggedIn && (
          <p className="bg-none font-bold text-base inline-block border-2 text-center transition-all duration-200 ease-in-out border-primary-light-600 py-[6px] px-[12px] rounded-[4px] dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer font-sans hover:bg-primary-light-500 dark:hover:bg-primary-light-700 ">
            {`${user}'s score: ${score}`}
          </p>
        )}
      </div>

      <div className="mt-10 grid grid-cols-6 max-sm:grid-cols-4 gap-5">
        {cards.map((card) => (
          <GameCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            choiceOne={choiceOne}
            choiceTwo={choiceTwo}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
