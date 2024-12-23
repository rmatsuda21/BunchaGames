import cn from "classnames";

import styles from "./Board.module.scss";

import { CellState } from "@/pages/games/supertictactoe/supertictactoe";

interface Props {
  playerTurn: CellState;
  boardState: CellState[][];
  isSelected: boolean;
  handleCellClick?: (row: number, col: number) => void;
  handleCellMouseEnter?: (row: number, col: number) => void;
  handleCellMouseLeave?: (row: number, col: number) => void;
}

const Board = ({
  playerTurn,
  boardState,
  isSelected,
  handleCellClick,
  handleCellMouseEnter,
  handleCellMouseLeave,
}: Props) => {
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.p1]: playerTurn === 1,
        [styles.p2]: playerTurn === 2,
      })}
    >
      {boardState.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            className={cn(styles.cell, {
              [styles.taken]: cell !== null,
              [styles.selected]: isSelected,
              [styles.p1]: cell === 1,
              [styles.p2]: cell === 2,
            })}
            role="button"
            key={`sub_${rowIndex}_${colIndex}`}
            onClick={() => {
              if (cell === null && handleCellClick)
                handleCellClick?.(rowIndex, colIndex);
            }}
            onMouseEnter={() => {
              if (cell === null && isSelected && handleCellMouseEnter)
                handleCellMouseEnter?.(rowIndex, colIndex);
            }}
            onMouseLeave={() => {
              if (cell === null && isSelected && handleCellMouseLeave)
                handleCellMouseLeave?.(rowIndex, colIndex);
            }}
          >
            {cell === 1 ? "X" : cell === 2 ? "O" : ""}
          </div>
        ))
      )}
    </div>
  );
};

export default Board;
