import styles from "./Keyboard.module.scss";

const KEYBOARD_KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

interface KeyProps {
  letter: string;
  disabled?: boolean;
  answer?: boolean;
  onKeyClick: (letter: string) => void;
  isGameEnded?: boolean;
}

interface KeyboardProps {
  word: string;
  guessedLetters: Set<string>;
  onKeyClick: (letter: string) => void;
  isGameEnded: boolean;
}

const Key = ({
  letter,
  disabled = false,
  answer,
  onKeyClick,
  isGameEnded = false,
}: KeyProps) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.key} ${disabled && answer ? styles.answer : ""} ${
        isGameEnded ? styles.noClick : ""
      }`}
      onClick={() => onKeyClick(letter)}
    >
      {letter}
    </button>
  );
};

const Keyboard = ({
  word,
  guessedLetters,
  onKeyClick,
  isGameEnded,
}: KeyboardProps) => {
  return (
    <div className={styles.keyboard}>
      {KEYBOARD_KEYS.map((row) => (
        <div key={`keyboard_row_${row[0]}`}>
          {row.map((key) => (
            <Key
              answer={word.includes(key)}
              disabled={guessedLetters.has(key)}
              key={`keyboard_${key}`}
              letter={key}
              onKeyClick={onKeyClick}
              isGameEnded={isGameEnded}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
