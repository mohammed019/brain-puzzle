/* eslint-disable react/prop-types */

import "./GameCard.css";

const GameCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/src/assets/cover.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default GameCard;
