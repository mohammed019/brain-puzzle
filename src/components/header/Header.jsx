import { Outlet } from "react-router-dom";
import Switcher from "../darkMode/Switcher";
import Button from "../common/Button";
import { isLoggedIn, logout } from "../../hooks/auth";
import { useState } from "react";

const Header = () => {
  const isLogged = isLoggedIn();

  const [dropDown, setDropDown] = useState(false);

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4 z-40 bg-bg-light-500 dark:bg-bg-dark-500 text-text-light-500 dark:text-text-dark-500 font-semibold">
        <div className="text-2xl font-semibold">Brain Puzzle</div>

        <div className="flex justify-center items-center space-x-6 max-sm:hidden">
          {isLogged && <Button title="Logout" handleClick={handleLogout} />}

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
            className={`z-10 absolute top-12 right-0 ${
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
            {isLogged && (
              <div className="py-2">
                <a
                  onClick={handleLogout}
                  className="block cursor-pointer px-4 py-2 text-sm text-text-light-500  dark:text-text-dark-500 hover:bg-bg-light-600 dark:hover:bg-primary-light-700 dark:hover:text-white"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
