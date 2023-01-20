import cx from "classnames";
import styles from "./Link.module.css";
import { capitalize } from "helpers/helpers";

export const MyLink = ({
  className,
  children,
  href,
  icon: Icon,
  iconRight: IconRight,
  color,
}) => {
  const linkClass = cx(styles.link, className, {
    [styles[`color${capitalize(color)}`]]: true,
    [styles.iconOnly]: !children,
  });
  return (
    <a href={href} className={linkClass}>
      {Icon && <Icon className={styles.icon} />}
      {children && <span className={styles.text}>{children}</span>}
      {IconRight && <IconRight className={styles.iconRight} />}
    </a>
  );
};
