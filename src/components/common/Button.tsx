import React from "react";

/* eslint-disable react/prop-types */
const Button = ({ title, className, disabled = false, handleClick }) => {
  return (
    <button
      type="button"
      className={`px-6 pb-2 pt-2.5 text-xs shadow rounded font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0 bg-transparent border-2 border-primary-light-500 hover:bg-primary-light-500 hover:text-text-dark-500 text-text-light-500 dark:text-text-dark-500 hover:shadow-lg focus:bg-primary-light-600  active:bg-primary-light-700 focus:dark:bg-primary-dark-600 active:dark:bg-primary-dark-700  ${className}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
