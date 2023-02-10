import cx from "classnames";
import styles from "./MyLink.module.css";
import { capitalize } from "utils/utils";

export const MyLink = ({
  className,
  children,
  href,
  icon: Icon,
  iconRight: IconRight,
  color,
  onClick,
}) => {
  const linkClass = cx(styles.link, className, {
    [styles[`color${capitalize(color)}`]]: true,
    [styles.iconOnly]: !children,
  });
  return (
    <a href={href} className={linkClass} onClick={onClick}>
      {Icon && <Icon className={styles.icon} />}
      {children && <span className={styles.text}>{children}</span>}
      {IconRight && <IconRight className={styles.iconRight} />}
    </a>
  );
};
