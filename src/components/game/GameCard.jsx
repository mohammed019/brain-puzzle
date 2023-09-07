/* eslint-disable react/prop-types */
import cover from "../../assets/cover.png";
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
        <img
          className="front p-[6px] sm:p-3 bg-accent-700 border-2 border-bg-light-700"
          src={card.img}
          alt="card front"
        />
        <img
          className="back"
          src={cover}
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default GameCard;
