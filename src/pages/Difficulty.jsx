import { useNavigate } from "react-router-dom";

function Difficulty() {
  const navigateTo = useNavigate();
  return (
    <div>
      <div className="flex justify-center items-center space-x-4">
        {/* Difficulty buttons */}
        <button
          onClick={() => navigateTo("difficulty/easy")}
          className={`bg-green-400 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg hover:bg-green-600 focus:bg-green-700 active:bg-green-800 px-4 py-2 rounded-md`}
        >
          Easy
        </button>
        <button
          onClick={() => navigateTo("difficulty/medium")}
          className={`bg-yellow-400 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg hover:bg-yellow-600 focus:bg-yellow-700 active:bg-yellow-800 px-4 py-2 rounded-md`}
        >
          Medium
        </button>
        <button
          onClick={() => navigateTo("difficulty/hard")}
          className={` bg-red-400 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg hover:bg-red-600 focus:bg-red-700 active:bg-red-800 px-4 py-2 rounded-md`}
        >
          Hard
        </button>
      </div>
    </div>
  );
}

export default Difficulty;
