import cx from "classnames";
import styles from "./MenuCategoryItem.module.css";
import { ReactComponent as ChevronRight } from "../../../icons/chevron-right.svg";

export const MenuCategoryItem = ({
  className,
  children,
  icon: Icon,
  onClick,
  ...props
}) => {
  const menuCategoryItemClass = cx(styles.menuItem, className);
  return (
    <div className={menuCategoryItemClass} onClick={onClick} {...props}>
      <div className={styles.itemTitle}>
        <Icon className={styles.primaryIcon} />
        <span className={styles.itemText}>{children}</span>
      </div>
      <ChevronRight className={styles.secondaryIcon} />
    </div>
  );
};
