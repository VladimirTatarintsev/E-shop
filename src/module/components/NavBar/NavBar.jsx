import cx from "classnames";
import styles from "./NavBar.module.css";

export const NavBar = ({ children, className }) => {
  const navbarClass = cx(styles.navbar, className);
  return <nav className={navbarClass}>{children}</nav>;
};
