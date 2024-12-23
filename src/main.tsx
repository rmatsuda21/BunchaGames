import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "./reset.css";

import Homepage from "@/pages";
import ErrorPage from "@/error";
import HangmanPage from "@/pages/games/hangman/hangman";
import GamesPage from "@/pages/games";
import GamesPageLayout from "@/pages/games/layout";
import FT10Page from "@/pages/games/ft10/ft10";
import StartGGPage from "@/pages/startgg";
import SuperTicTacToePage from "./pages/games/supertictactoe/supertictactoe";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "/games",
        element: <GamesPage />,
      },
      {
        path: "/games",
        element: <GamesPageLayout />,
        children: [
          {
            path: "hangman",
            element: <HangmanPage />,
          },
          {
            path: "supertictactoe",
            element: <SuperTicTacToePage />,
          },
        ],
      },
      {
        path: "ft10",
        element: <FT10Page />,
      },
      {
        path: "startgg",
        element: <StartGGPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
