import { useState } from "react";
import { FaBrain } from "react-icons/fa";

import { login } from "../hooks/auth";

const Login = () => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    // Create a user object
    const user = {
      username,
    };
    login(user);
  };

  return (
    <div className="flex justify-center items-center h-[88vh] mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 bg-bg-light-500 dark:bg-bg-dark-500 space-x-8">
      <div className="mx-auto max-w-2xl grid grid-cols-2 max-sm:grid-cols-1 items-center gap-16">
        <div className="max-sm:mt-4 w-full ">
          <div className="flex justify-center items-center">
            <FaBrain className="mr-2 h-8 w-8" />
            <h1 className="text-center font-bold text-text-light-500 dark:text-text-dark-500 sm:text-3xl">
              Brain Puzzle
            </h1>
          </div>

          <p className="mx-auto mt-4 max-w-md text-center text-text-light-500 dark:text-text-dark-500">
            Sup, memory game peeps! Ready to get your brain juices flowin’ and
            show off your mad skills? Log in and let’s get this party started!
          </p>
        </div>

        <div className="mb-0 mt-6 space-y-4 transition-all duration-300 ease-in-out p-4 shadow-[0_0_10px_1px_rgba(71,85,95,0.08)] hover:shadow-[0_0_12px_2px_rgba(71,85,95,0.20)] sm:p-6 lg:p-8">
          <div>
            <div className="relative">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                className="w-full rounded-lg transition-all duration-150 ease-in-out border border-primary-light-500 dark:border-primary-dark-500 p-4 pe-12 text-sm shadow-sm bg-bg-light-500 focus:border-primary-light-600 dark:focus:border-primary-dark-600 dark:bg-bg-dark-500 ring-0 outline-none"
                placeholder="Enter Your Name"
              />
            </div>
          </div>

          <button
            type="submit"
            onClick={handleLogin}
            className="block w-full rounded-lg transition duration-200 ease-in-out bg-primary-light-500 dark:bg-primary-dark-500 hover:bg-primary-light-600 dark:hover:bg-primary-dark-600 focus:bg-primary-light-600 dark:focus:bg-primary-dark-600 active:bg-primary-light-700 dark:active:bg-primary-dark-700 border-none px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
