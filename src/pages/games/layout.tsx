import { Link, Outlet } from "react-router-dom";

import styles from "./layout.module.scss";

const GamesPageLayout = () => {
  return (
    <div>
      <div className={styles.header}>
        <Link to="/games">Home</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default GamesPageLayout;
