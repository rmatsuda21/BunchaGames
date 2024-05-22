import { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import cn from "classnames";

import Keyboard from "@/components/hangman/Keyboard";
import { words } from "@/assets/hangman/english_1k.json";

import styles from "./hangman.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

const MAX_INCORRECT_GUESSES = 6;
const WORDLIST = words.filter((word) => word.length >= 5 && word.length <= 10);

const getRandomWord = () =>
  WORDLIST[Math.floor(Math.random() * WORDLIST.length)].toUpperCase();

const HangmanPage = () => {
  const [word, setWord] = useState<string>(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());

  const wordSet = useMemo(() => new Set(word.split("")), [word]);

  const correctLetters = Array.from(guessedLetters).filter((letter) =>
    wordSet.has(letter)
  );
  const incorrectLetters = guessedLetters.size - correctLetters.length;
  const isGameWon = correctLetters.length === wordSet.size;
  const isGameLost = incorrectLetters >= MAX_INCORRECT_GUESSES;

  useEffect(() => {
    const shapes = [
      confetti.shapeFromText({ text: isGameWon ? "🎉" : "😢", scalar: 100 }),
    ];
    if (isGameWon || isGameLost) {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.9 },
        shapes,
        scalar: 2,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.9 },
        shapes,
        scalar: 2,
      });
    }
  }, [isGameWon, isGameLost]);

  const onPlayAgain = () => {
    setWord(getRandomWord());
    setGuessedLetters(new Set());
  };

  const onKeyClick = (letter: string) => {
    setGuessedLetters((prev) => new Set([...prev, letter]));
  };

  const Hearts = () => {
    const hearts = Array.from({ length: MAX_INCORRECT_GUESSES }, (_, index) => {
      const isLost = index < incorrectLetters;
      const icon = isLost ? faHeartBroken : faHeart;
      const className = cn({
        [`${styles.broken}`]: isLost,
      });
      return <FontAwesomeIcon className={className} icon={icon} />;
    });
    return <div className={styles.lifeDisplay}>{hearts}</div>;
  };

  return (
    <div className={styles.wrapper}>
      <h1>Hangman</h1>
      {<Hearts />}
      {isGameLost && <div>You Lose!</div>}
      {isGameWon && <div>You Win!</div>}
      <div className={styles.wordDisplay}>
        {Array.from(word).map((letter, index) => (
          <span key={`letter_${index}`}>
            {isGameLost || guessedLetters.has(letter) ? letter : "_"}
          </span>
        ))}
      </div>
      <Keyboard
        word={word}
        guessedLetters={guessedLetters}
        onKeyClick={onKeyClick}
        isGameEnded={isGameWon || isGameLost}
      />
      {(isGameLost || isGameWon) && (
        <button className={styles.playAgain} onClick={onPlayAgain}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default HangmanPage;
