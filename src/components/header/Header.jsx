import { Outlet } from "react-router-dom";
import Switcher from "../darkMode/Switcher";
import Button from "../common/Button";
import { isLoggedIn, logout } from "../../hooks/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

const Header = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  const isLogged = isLoggedIn();

  const [dropDown, setDropDown] = useState(false);

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div
        dir={i18n.language === "ku" ? "rtl" : "ltr"}
        className="max-w-5xl mx-auto flex justify-between items-center p-4 z-40 bg-bg-light-500 dark:bg-bg-dark-500 text-text-light-500 dark:text-text-dark-500 font-semibold"
      >
        <a href="/" className="text-2xl font-semibold max-sm:text-lg">
          {t("Brain Puzzle")}
        </a>

        <div
          className={`flex justify-between items-center space-x-6 max-sm:hidden rtl:space-x-reverse`}
        >
          {isLogged && (
            <Button
              title="Logout"
              className="!font-bold"
              handleClick={handleLogout}
            />
          )}

          <div className="relative mx-4">
            <button
              className="max-sm:inline-flex  items-center p-2 text-sm font-medium text-center transition-all duration-200 ease-in-out text-white bg-secondary-light-500 rounded-lg hover:bg-secondary-light-600 focus:ring-0 focus:outline-none dark:text-secondary-light-500 dark:bg-primary-light-500 dark:hover:bg-primary-light-600"
              type="button"
              onClick={() => setDropDown((prev) => !prev)}
            >
              <MdLanguage className="text-text-light-500 dark:text-text-dark-500 h-6 w-6" />
            </button>
            <div
              className={`z-10 absolute top-12 right-0 rtl:top-12 rtl:-right-[8.5rem] ${
                dropDown ? "" : "hidden"
              } bg-bg-light-500 divide-y divide-bg-light-600 rounded-lg shadow w-44 dark:bg-primary-light-500 dark:divide-primary-light-700`}
            >
              <ul className="py-2 text-sm text-text-light-500 dark:text-text-dark-500">
                <li>
                  <a
                    className="px-4 py-2 hover:bg-bg-light-600 dark:hover:bg-primary-light-700 dark:hover:text-white cursor-pointer flex justify-center items-center"
                    onClick={() => {
                      setDropDown((prev) => !prev);
                      handleLanguageChange("ku");
                    }}
                  >
                    {t("Kurdish")}
                  </a>
                </li>
              </ul>
              <ul className="py-2 text-sm text-text-light-500 dark:text-text-dark-500">
                <li>
                  <a
                    className="px-4 py-2 hover:bg-bg-light-600 dark:hover:bg-primary-light-700 dark:hover:text-white cursor-pointer flex justify-center items-center"
                    onClick={() => {
                      setDropDown((prev) => !prev);
                      handleLanguageChange("en");
                    }}
                  >
                    {t("English")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Switcher />
        </div>
        <div className="relative sm:hidden">
          <button
            className="max-sm:inline-flex hidden items-center p-2 text-sm font-medium text-center transition-all duration-200 ease-in-out text-primary-light-500 bg-secondary-light-500 rounded-lg hover:bg-secondary-light-600 focus:ring-0 focus:outline-none dark:text-secondary-light-500  dark:bg-primary-light-500 dark:hover:bg-primary-light-600"
            type="button"
            onClick={() => setDropDown((prev) => !prev)}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 4 15"
            >
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>
          <div
            className={`z-10 absolute top-12 right-0 rtl:top-12 rtl:-right-[8.5rem] ${
              dropDown ? "" : "hidden"
            } bg-bg-light-500 divide-y divide-bg-light-600 rounded-lg shadow w-44 dark:bg-primary-light-500 dark:divide-primary-light-700`}
          >
            <ul className="py-2 text-sm text-text-light-500 dark:text-text-dark-500">
              <li>
                <a className="px-4 py-2 hover:bg-bg-light-600 dark:hover:bg-primary-light-700 dark:hover:text-white flex justify-center items-center">
                  <Switcher />
                </a>
              </li>
            </ul>
            <ul className="py-2 text-sm text-text-light-500 dark:text-text-dark-500">
              <li>
                <a
                  className="px-4 py-2 hover:bg-bg-light-600 dark:hover:bg-primary-light-700 dark:hover:text-white cursor-pointer flex justify-center items-center"
                  onClick={() => handleLanguageChange("ku")}
                >
                  {t("Kurdish")}
                </a>
              </li>
            </ul>
            <ul className="py-2 text-sm text-text-light-500 dark:text-text-dark-500">
              <li>
                <a
                  className="px-4 py-2 hover:bg-bg-light-600 dark:hover:bg-primary-light-700 dark:hover:text-white cursor-pointer flex justify-center items-center"
                  onClick={() => handleLanguageChange("en")}
                >
                  {t("English")}
                </a>
              </li>
            </ul>
            {isLogged && (
              <div className="py-2">
                <a
                  onClick={handleLogout}
                  className="cursor-pointer px-4 py-2 text-sm text-text-light-500  dark:text-text-dark-500 hover:bg-bg-light-600 dark:hover:bg-primary-light-700 dark:hover:text-white flex justify-center items-center"
                >
                  {t("Logout")}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
      <div className="flex justify-center items-center">
        <a
          href="https://mohammedd.com"
          target="_blank"
          className="inline-block mb-4 bg-none font-bold text-sm border-2 transition-all duration-200 ease-in-out border-primary-light-600 py-[4px] px-[6px] rounded-xl dark:text-text-dark-500 hover:text-text-dark-500 cursor-pointer font-sans hover:bg-primary-light-500 dark:hover:bg-primary-light-700"
        >
          &copy; 2023 - Mohammed Jabbar
        </a>
      </div>
    </>
  );
};

export default Header;
