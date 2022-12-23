import cx from "classnames";
import { capitalize } from "../../helpers/helpers";
import styles from "./Button.module.css";

export const Button = ({
  size,
  color,
  icon: Icon,
  iconLabel: IconLabel,
  largeIcon: LargeIcon,
  onClick,
  children,
  className,
}) => {
  const buttonClass = cx(styles.button, className, {
    [styles[`color${capitalize(color)}`]]: true,
    [styles[`size${capitalize(size)}`]]: true,
    [styles.iconOnly]: !children,
  });
  return (
    <button className={buttonClass} onClick={onClick}>
      {Icon && <Icon className={styles.icon} />}
      {IconLabel && <IconLabel className={styles.iconLabel} />}
      {LargeIcon && <LargeIcon className={styles.largeIcon} />}
      {children && <span className={styles.text}>{children}</span>}
    </button>
  );
};
