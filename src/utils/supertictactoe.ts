import { range } from "lodash";

import { CellState } from "@/pages/games/supertictactoe/supertictactoe";

import styles from "@/pages/games/supertictactoe/supertictactoe.module.scss";

export const isBoardEmpty = (board: CellState[][]) => {
  for (const row of board) {
    for (const cell of row) {
      if (cell !== null) return false;
    }
  }

  return true;
};

export const resetAllStyles = (boardRef: React.RefObject<HTMLDivElement>) => {
  const allCells = boardRef.current?.children;
  for (const cell of allCells!) {
    (cell as HTMLDivElement).classList.remove(
      styles.hover,
      styles.p1,
      styles.p2
    );
  }
};

export const getMainGameState = (gameState: CellState[][][][]) => {
  const mainGameState = gameState.map((row) =>
    row.map((row) => checkBoardWin(row))
  );

  return mainGameState;
};

export const checkGameWin = (gameState: CellState[][][][]) => {
  return checkBoardWin(getMainGameState(gameState));
};

const checkBoardWin = (board: CellState[][]): CellState => {
  for (const i in range(3)) {
    if (
      board[i][0] !== null &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    )
      return board[i][0];

    if (
      board[0][i] !== null &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    )
      return board[0][i];
  }

  if (
    board[0][0] !== null &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  )
    return board[0][0];

  if (
    board[0][2] !== null &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  )
    return board[0][2];

  return null;
};
