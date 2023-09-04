import { Outlet } from "react-router-dom";
import Switcher from "../darkMode/Switcher";

const Header = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto flex justify-between p-4 z-40 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark font-semibold">
        Brain Puzzle <Switcher />
      </div>
      <Outlet />
    </>
  );
};

export default Header;
