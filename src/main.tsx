import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./index.css";
import "./reset.css";

import Homepage from "@/pages";
import ErrorPage from "@/error";
import HangmanPage from "@/pages/games/hangman.tsx";
import GamesPage from "@/pages/games";
import GamesPageLayout from "@/pages/games/layout";
import FT10Page from "@/pages/games/ft10";

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
      {
        path: "ft10",
        element: <FT10Page />,
      },
    ],
  },
]);

const client = new ApolloClient({
  uri: "https://api.start.gg/gql/alpha",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_START_GG_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
