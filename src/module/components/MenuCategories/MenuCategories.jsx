import cx from "classnames";
import styles from "./MenuCategories.module.css";

export const MenuCategories = ({ className, children }) => {
  const menuCategoriesClass = cx(styles.menuCat, className);
  return <div className={menuCategoriesClass}>{children}</div>;
};
