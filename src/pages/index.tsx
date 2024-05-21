import LinkButton from "@/components/shared/LinkButton";

import styles from "./index.module.scss";

const Homepage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Welcome to Buncha Games!</h1>
      <h3>
        This a place where I create many classic games as part of practice and
        for fun, enjoy :D
      </h3>

      <LinkButton to="/games" classNames={styles.button}>
        Go to Games
      </LinkButton>
    </div>
  );
};

export default Homepage;
