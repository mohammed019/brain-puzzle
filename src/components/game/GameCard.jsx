/* eslint-disable react/prop-types */
import cover from "../../assets/cover.png";
import "./GameCard.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const GameCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <LazyLoadImage
          className="front p-[6px] sm:p-3 bg-accent-700 border-2 border-bg-light-700"
          src={card.img}
          effect="opacity"
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
