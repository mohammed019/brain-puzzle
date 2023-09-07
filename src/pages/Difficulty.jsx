import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Difficulty() {
  const navigateTo = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
      className={`max-w-5xl flex h-[78vh] max-sm:flex-col max-sm:space-y-6 justify-center items-center sm:space-x-4 mx-auto ${
        i18n.language === "ku" ? "sm:space-x-reverse" : ""
      }`}
    >
      {/* Difficulty buttons */}
      <button
        onClick={() => navigateTo("difficulty/easy")}
        className={`bg-green-500  transition-all duration-200 ease-in-out shadow-md hover:shadow-lg hover:bg-green-600 focus:bg-green-700 active:bg-green-800 px-6 py-4 text-2xl rounded-md`}
      >
        {t("Easy")}
      </button>
      <button
        onClick={() => navigateTo("difficulty/medium")}
        className={`bg-yellow-500 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg hover:bg-yellow-600 focus:bg-yellow-700 active:bg-yellow-800 px-6 py-4 text-2xl rounded-md`}
      >
        {t("Medium")}
      </button>
      <button
        onClick={() => navigateTo("difficulty/hard")}
        className={` bg-red-500 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg hover:bg-red-600 focus:bg-red-700 active:bg-red-800 px-6 py-4 text-2xl rounded-md`}
      >
        {t("Hard")}
      </button>
    </div>
  );
}

export default Difficulty;
