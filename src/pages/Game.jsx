import { useState, useEffect } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useTranslation } from "react-i18next";

import GameCard from "../components/game/GameCard";
import { getUsername } from "../hooks/auth";
import { useNavigate, useParams } from "react-router-dom";

import { IoArrowBack } from "react-icons/io5";

// images
import burger from "../assets/Burger_Final.png";
import donut from "../assets/Donut.png";
import drumstick from "../assets/Drumstick.png";
import fries from "../assets/Fries.png";
import Glass_Drink from "../assets/Glass_Drink.png";
import dog from "../assets/Hot Dog.png";
import soda_can from "../assets/Soda_Can.png";
import soda_cup from "../assets/Soda_Cup.png";
import sandwich from "../assets/Sandwich.png";

const cardImages = [
  { src: "../assets/Burger_Final.png", img: burger, matched: false },
  { src: "../assets/Donut.png", img: donut, matched: false },
  { src: "../assets/Drumstick.png", img: drumstick, matched: false },
  { src: "../assets/Fries.png", img: fries, matched: false },
  { src: "../assets/Glass_Drink.png", img: Glass_Drink, matched: false },
  { src: "../assets/Hot Dog.png", img: dog, matched: false },
  { src: "../assets/Soda_Can.png", img: soda_can, matched: false },
  { src: "../assets/Soda_Cup.png", img: soda_cup, matched: false },
  { src: "../assets/Sandwich.png", img: sandwich, matched: false },
];

const Game = () => {
  const { t, i18n } = useTranslation();
  const { gameDifficulty } = useParams();

  const navigateTo = useNavigate();
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

  const [remainingTime, setRemainingTime] = useState(
    gameDifficulty === "easy"
      ? 120
      : gameDifficulty === "medium"
      ? 60
      : gameDifficulty === "hard"
      ? 40
      : 120
  ); // Start from 60 seconds (1 minute)
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isAllMatched, setIsAllMatched] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [winSound, setWinSound] = useState(false);

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
    if (isAllMatched) {
      // if all the matched true with map then setIsGame to true
      const allMatched = cards.every((card) => card.matched === true);

      if (allMatched) {
        setIsGameComplete(true);

        if (!winSound) {
          load("/src/components/game/Win.mp3", {
            autoplay: true,
          });

          setWinSound(true);
        }
      }
    }

    if (!isGameComplete && remainingTime === 0) {
      // Time is up sound
      setDisabled(true);
      load("/src/components/game/Wasted.mp3", {
        autoplay: true,
      });
    }
  }, [remainingTime, isAllMatched, load, isGameComplete, cards]);

  useEffect(() => {
    if (isStarted) {
      setDisabled(false);
    } else if (!isStarted) {
      setDisabled(true);
    }
  }, [isStarted]);

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
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        setCards((prev) => {
          const updateCard = prev.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
          setIsAllMatched(updateCard);
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

  useEffect(() => {
    const username = getUsername();
    setUser(username?.username);
  }, []);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  const resetGame = () => {
    shuffleCards();
    location.reload();
  };

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  return (
    <div
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
      className="max-w-4xl max-md:max-w-[92%] flex flex-col justify-center items-center my-10 mx-auto "
    >
      <div className="flex justify-between max-sm:flex-col max-sm:space-y-6 sm:items-center w-full">
        <IoArrowBack
          className={`h-8 w-8 cursor-pointer transition-all duration-200 ease-in-out hover:text-gray-400 ${
            i18n.language === "ku" ? "scale-x-[-1]" : ""
          }`}
          onClick={() => navigateTo("/")}
        />

        <div className="max-sm:flex max-sm:justify-between sm:space-x-6 rtl:space-x-reverse">
          {!isStarted ? (
            <button
              className="bg-none inline-block border-2 text-center transition-all duration-200 ease-in-out py-[6px] px-6 rounded-[4px] dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer hover:bg-primary-light-500 dark:hover:bg-primary-light-700 border-primary-light-600 text-text-light-500 font-bold text-base"
              onClick={handleStart}
            >
              {t("Start")}
            </button>
          ) : remainingTime <= 0 && !isGameComplete ? (
            <p
              className="bg-none font-bold text-base inline-block border-2 text-center transition-all duration-200 ease-in-out border-primary-light-600 py-[6px] px-[12px] rounded-[4px] dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer hover:bg-primary-light-500 dark:hover:bg-primary-light-700"
              onClick={resetGame}
            >
              {t("Oops! Time's up, {{user}}!", { user })}
            </p>
          ) : isGameComplete ? (
            <p
              className="bg-none font-bold text-base inline-block border-2 text-center transition-all duration-200 ease-in-out border-primary-light-600 py-[6px] px-[12px] rounded-[4px] dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer hover:bg-primary-light-500 dark:hover:bg-primary-light-700"
              onClick={resetGame}
            >
              {t("Yay! You won, {{user}}! 🎉", { user })}
            </p>
          ) : (
            <p className="bg-none font-bold text-base inline-block border-2 text-center transition-all duration-200 ease-in-out border-primary-light-600 py-[6px] px-[12px] rounded-[4px] dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer hover:bg-primary-light-500 dark:hover:bg-primary-light-700">
              {t("{{remainingTime}} secs left! Go, {{user}}! 💪", {
                remainingTime,
                user,
              })}
            </p>
          )}
          <button
            onClick={resetGame}
            className="bg-none inline-block border-2 text-center transition-all duration-200 ease-in-out py-[6px] px-[12px] rounded-[4px] dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer hover:bg-primary-light-500 dark:hover:bg-primary-light-700 border-primary-light-600 text-text-light-500 font-bold text-base"
          >
            {t("New Game")}
          </button>
        </div>
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
};

export default Game;
