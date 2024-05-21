import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import styles from "./LinkButton.module.scss";

interface Props {
  to: string;
  classNames?: string;
}

const LinkButton = ({ to, classNames, children }: PropsWithChildren<Props>) => {
  return (
    <Link to={to} className={cn(classNames, styles.button)}>
      {children}
    </Link>
  );
};

export default LinkButton;
