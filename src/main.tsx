import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "./reset.css";

import Homepage from "@/pages";
import ErrorPage from "@/error";
import HangmanPage from "@/pages/games/hangman.tsx";
import GamesPage from "@/pages/games";
import GamesPageLayout from "./pages/games/layout";

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
