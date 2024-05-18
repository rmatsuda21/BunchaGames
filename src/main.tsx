import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "./reset.css";

import Homepage from "@/pages";
import HangmanPage from "@/pages/games/hangman.tsx";
import GamesPage from "@/pages/games";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "games",
        children: [
          {
            path: "",
            element: <GamesPage />,
          },
          {
            path: "hangman",
            element: <HangmanPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
