import { Link, Outlet } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import styles from "./layout.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GamesPageLayout = () => {
  return (
    <div>
      <div className={styles.header}>
        <Link to="/games">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default GamesPageLayout;
