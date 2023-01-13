import cx from "classnames";
import styles from "./Link.module.css";
import { capitalize } from "helpers/helpers";

export const Link = ({ className, children, href, icon: Icon, color }) => {
  const linkClass = cx(styles.link, className, {
    [styles[`color${capitalize(color)}`]]: true,
  });
  return (
    <a href={href} className={linkClass}>
      <span className={styles.text}>{children}</span>
      {Icon && <Icon className={styles.icon} />}
    </a>
  );
};
