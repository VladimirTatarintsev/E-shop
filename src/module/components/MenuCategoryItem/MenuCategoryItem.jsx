import cx from "classnames";
import styles from "./MenuCategoryItem.module.css";
import { ReactComponent as ChevronRight } from "../../../icons/chevron-right.svg";

export const MenuCategoryItem = ({ className, children, icon: Icon }) => {
  const menuCategoryItemClass = cx(styles.menuItem, className);
  return (
    <div className={menuCategoryItemClass}>
      <div className={styles.itemTitle}>
        <Icon className={styles.primaryIcon} />
        <span className={styles.itemText}>{children}</span>
      </div>
      <ChevronRight className={styles.secondaryIcon} />
    </div>
  );
};
