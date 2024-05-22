import { useEffect, useState } from "react";
import cn from "classnames";
import confetti from "canvas-confetti";

import styles from "./ft10.module.scss";

const FT10Page = () => {
  const [maxScore] = useState(10);
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);

  const handleP1Click = () => {
    setP1Score((prev) => Math.min(maxScore, prev + 1));
  };

  const handleP1Subtract: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setP1Score((prev) => Math.max(0, prev - 1));
  };

  const handleP2Click = () => {
    setP2Score((prev) => Math.min(maxScore, prev + 1));
  };

  const handleP2Subtract: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setP2Score((prev) => Math.max(0, prev - 1));
  };

  const p1Win = p1Score === maxScore;
  const p2Win = p2Score === maxScore;

  useEffect(() => {
    if (p1Win) {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 90,
        origin: { x: 0, y: 0.9 },
        scalar: 2,
      });
    }
  }, [p1Win]);

  useEffect(() => {
    if (p2Win) {
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 90,
        origin: { x: 1, y: 0.9 },
        scalar: 2,
      });
    }
  }, [p2Win]);

  return (
    <div className={styles.wrapper}>
      <div
        className={cn({ [`${styles.p1}`]: true, [`${styles.winner}`]: p1Win })}
        onClick={handleP1Click}
      >
        {p1Score}
        <div className={styles.subtract} onClick={handleP1Subtract}>
          -
        </div>
      </div>
      <div
        className={cn({ [`${styles.p2}`]: true, [`${styles.winner}`]: p2Win })}
        onClick={handleP2Click}
      >
        {p2Score}
        <div className={styles.subtract} onClick={handleP2Subtract}>
          -
        </div>
      </div>
    </div>
  );
};

export default FT10Page;
