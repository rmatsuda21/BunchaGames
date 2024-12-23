import { useMemo, useRef, useState } from "react";
import { cloneDeep } from "lodash";
import cn from "classnames";

import styles from "./supertictactoe.module.scss";

import Board from "@/components/supertictactoe/Board";
import {
  checkGameWin,
  getMainGameState,
  isBoardEmpty,
  resetAllStyles,
} from "@/utils/supertictactoe";

// import MOCK_GAME from "@/assets/supertictactoc/mockGame.json";

export type CellState = null | 1 | 2 | -1;

const DEFAULT_BOARD_STATE: Array<Array<CellState>> = Array.from(
  { length: 3 },
  () => Array.from({ length: 3 }, () => null)
);

const DEFAULT_GAME_STATE = Array.from({ length: 3 }, () =>
  Array.from({ length: 3 }, () => cloneDeep(DEFAULT_BOARD_STATE))
);

const Cell = ({
  subGameState,
  playerTurn,
  isSelected,
  boardState,
  handleCellClick,
  handleCellMouseEnter,
  handleCellMouseLeave,
}: {
  subGameState: CellState;
  playerTurn: CellState;
  isSelected: boolean;
  boardState: CellState[][];
  handleCellClick: (row: number, col: number) => void;
  handleCellMouseEnter: (row: number, col: number) => void;
  handleCellMouseLeave: (row: number, col: number) => void;
}) => {
  if (subGameState !== null) {
    return subGameState === 1 ? (
      <div className={cn(styles.p1, styles.boardWin)}>X</div>
    ) : (
      <div className={cn(styles.p2, styles.boardWin)}>O</div>
    );
  }

  return (
    <Board
      playerTurn={playerTurn}
      boardState={boardState}
      isSelected={isSelected}
      handleCellClick={handleCellClick}
      handleCellMouseEnter={handleCellMouseEnter}
      handleCellMouseLeave={handleCellMouseLeave}
    />
  );
};

const SuperTicTacToePage = () => {
  const [gameState, setGameState] = useState(DEFAULT_GAME_STATE);
  const [selectedBoard, setSelectedBoard] = useState<[number, number] | null>(
    null
  );
  const [playerTurn, setPlayerTurn] = useState<CellState>(1);

  const boardRef = useRef<HTMLDivElement>(null);
  const mainGameState = useMemo(() => getMainGameState(gameState), [gameState]);
  const gameWinner = useMemo(() => checkGameWin(gameState), [gameState]);

  const handleCellClick = (row: number, col: number) => {
    const selectedBoardState = mainGameState[row][col];

    setSelectedBoard(selectedBoardState === null ? [row, col] : null);
    setGameState((prevGameState) => {
      const newGameState = cloneDeep(prevGameState);
      newGameState[selectedBoard![0]][selectedBoard![1]][row][col] = playerTurn;
      return newGameState;
    });
    setPlayerTurn(playerTurn === 1 ? 2 : 1);

    resetAllStyles(boardRef);
  };

  const handleCellMouseEnter = (row: number, col: number) => {
    const cell = boardRef.current?.children[row * 3 + col] as HTMLDivElement;
    cell.classList.add(styles.hover, playerTurn === 1 ? styles.p2 : styles.p1);
  };

  const handleCellMouseLeave = (row: number, col: number) => {
    const cell = boardRef.current?.children[row * 3 + col] as HTMLDivElement;
    cell.classList.remove(styles.hover, styles.p1, styles.p2);
  };

  return (
    <div className={styles.wrapper}>
      {gameWinner !== null && (
        <div className={styles.winner}>
          {gameWinner === 1 ? "Player 1 wins!" : "Player 2 wins!"}
        </div>
      )}
      <div
        className={cn(styles.board, {
          [styles.noSelected]: !selectedBoard,
        })}
        ref={boardRef}
      >
        {gameState.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected =
              selectedBoard?.[0] === rowIndex &&
              selectedBoard?.[1] === colIndex;

            const subGameWin = mainGameState[rowIndex][colIndex] !== null;

            return (
              <div
                className={cn(styles.cell, {
                  [styles.selected]: isSelected,
                  [styles.filled]: subGameWin,
                })}
                role="button"
                key={`main_${rowIndex}_${colIndex}`}
                onClick={() => {
                  if (selectedBoard === null && !subGameWin)
                    setSelectedBoard([rowIndex, colIndex]);
                }}
              >
                {(isSelected || !isBoardEmpty(cell)) && (
                  <Cell
                    boardState={cell}
                    subGameState={mainGameState[rowIndex][colIndex]}
                    playerTurn={playerTurn}
                    isSelected={isSelected}
                    handleCellClick={(row, col) => {
                      if (isSelected) handleCellClick(row, col);
                    }}
                    handleCellMouseEnter={handleCellMouseEnter}
                    handleCellMouseLeave={handleCellMouseLeave}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SuperTicTacToePage;
