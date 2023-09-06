import { useState, useEffect } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

import GameCard from "../components/game/GameCard";
import { getUsername } from "../hooks/auth";

const cardImages = [
  { src: "/src/assets/Burger_Final.png", matched: false },
  { src: "/src/assets//Donut.png", matched: false },
  { src: "/src/assets/Drumstick.png", matched: false },
  { src: "/src/assets/Fries.png", matched: false },
  { src: "/src/assets/Glass_Drink.png", matched: false },
  { src: "/src/assets/Hot Dog.png", matched: false },
  { src: "/src/assets/Soda_Can.png", matched: false },
  { src: "/src/assets/Soda_Cup.png", matched: false },
  { src: "/src/assets/Sandwich.png", matched: false },
];

function Game() {
  // card data
  const [cards, setCards] = useState([]);

  // choices
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  // disabled to make another cards disabled when user have two choice selected
  const [disabled, setDisabled] = useState(false);
  // user data
  const [user, setUser] = useState("");

  const { load } = useGlobalAudioPlayer();

  const [remainingTime, setRemainingTime] = useState(60); // Start from 60 seconds (1 minute)
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [allMatched, setAllMatched] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    // duplicate cards
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setIsGameComplete(false);
    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
  };
  // start new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (allMatched) {
      // if all the matched true with map then setIsGame to true
      const allMatched = cards.every((card) => card.matched === true);

      if (allMatched) {
        setIsGameComplete(true);
        load("/src/components/game/Win.mp3", {
          autoplay: true,
        });
      }
    }

    if (!isGameComplete && remainingTime === 0) {
      // Time is up sound
      load("/src/components/game/Wasted.mp3", {
        autoplay: true,
      });
    }
  }, [remainingTime]);

  const resetGame = () => {
    shuffleCards();
    location.reload();
  };

  useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isStarted, remainingTime]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) => {
          const updateCard = prev.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
          setAllMatched(updateCard);
          return updateCard;
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

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

  const handleStart = () => {
    setIsStarted(true);
  };

  return (
    <div className="max-w-4xl max-md:max-w-[92%] flex flex-col justify-center items-center my-10 mx-auto ">
      <div className="flex justify-center items-center w-full space-x-12">
        <button
          onClick={resetGame}
          className="bg-none max-xs:w-full inline-block border-2 text-center transition-all duration-200 ease-in-out py-[6px] px-[12px] rounded-[4px] dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer font-sans hover:bg-primary-light-500 dark:hover:bg-primary-light-700 border-primary-light-600 text-text-light-500 font-bold text-base"
        >
          New Game
        </button>

        {!isStarted ? (
          <button
            className="bg-none max-xs:w-full inline-block border-2 text-center transition-all duration-200 ease-in-out py-[6px] px-6 rounded-[4px] dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer font-sans hover:bg-primary-light-500 dark:hover:bg-primary-light-700 border-primary-light-600 text-text-light-500 font-bold text-base"
            onClick={handleStart}
          >
            Start
          </button>
        ) : remainingTime <= 0 && !isGameComplete ? (
          <p
            className="bg-none font-bold text-base inline-block border-2 text-center transition-all duration-200 ease-in-out border-primary-light-600 py-[6px] px-[12px] rounded-[4px] dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer font-sans hover:bg-primary-light-500 dark:hover:bg-primary-light-700"
            onClick={resetGame}
          >
            Oops! Time&#8217;s up, {user}.
          </p>
        ) : isGameComplete ? (
          <p
            className="bg-none font-bold text-base inline-block border-2 text-center transition-all duration-200 ease-in-out border-primary-light-600 py-[6px] px-[12px] rounded-[4px] dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer font-sans hover:bg-primary-light-500 dark:hover:bg-primary-light-700"
            onClick={resetGame}
          >
            Yay! You won, {user}! 🎉
          </p>
        ) : (
          <p className="bg-none font-bold text-base inline-block border-2 text-center transition-all duration-200 ease-in-out border-primary-light-600 py-[6px] px-[12px] rounded-[4px] dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer font-sans hover:bg-primary-light-500 dark:hover:bg-primary-light-700">
            {remainingTime} secs left! Go, Mohammed! 💪
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
