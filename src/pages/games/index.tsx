import { Link } from "react-router-dom";

import styles from "./index.module.scss";

const GamesPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Games</h1>
      <Link to="/games/hangman">Hangman</Link>
    </div>
  );
};

export default GamesPage;
