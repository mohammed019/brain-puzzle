import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  ku: {
    translation: {
      "Sup, memory game peeps! Ready to get your brain juices flowin’ and show off your mad skills? Log in and let’s get this party started!":
        "بەخێرێی زۆر کات مەکووژە دەی چاوەکەم، ئەوە یاریە نازانم بە کوردی ناوی چیە بۆخۆت ناوێکی بۆ دابنێ، ناوت بنووسە و مێشکی خۆت تاقی بکەرەوە بزانین زیرەکی.",

      Kurdish: "کوردی",
      English: "ئینگلیزی",

      Logout: "بڕۆ دەرەوە",

      "New Game": "یاری نوێ",
      Start: "دەستپێکردن",
      "Brain Puzzle": "مەتەڵی مێشک",

      Easy: "ئاسان",
      Medium: "مامناوەند",
      Hard: "قوڕس",

      "Enter Your Name": "ناوت بنووسە",
      Enter: "بڕۆ ژوورەوە",

      "Oops! Time's up, {{user}}!": "ببوورە کات تەواو بوو, {{user}}!",
      "Yay! You won, {{user}}! 🎉": "بژی سەرکەوتوبوویت, {{user}}! 🎉",
      "{{remainingTime}} secs left! Go, {{user}}! 💪":
        "{{remainingTime}} چرکە کاتت ماووە! بەردەوام بە, {{user}}! 💪",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
