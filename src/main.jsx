import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Header from "./components/header/Header.jsx";
import Game from "./pages/Game.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";
import { isLoggedIn } from "./hooks/auth.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <h1>404 sorry this page is not available</h1>,
    children: [
      {
        index: true,
        element: isLoggedIn() ? <Game /> : <Login />,
        errorElement: <h1>404 sorry this page is not available</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
