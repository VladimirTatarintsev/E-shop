import cx from "classnames";
import { capitalize } from "../../utils/utils";
import styles from "./Button.module.css";

export const Button = ({
  size,
  color,
  icon: Icon,
  largeIcon: LargeIcon,
  onClick,
  children,
  className,
  disabled = false,
  ...props
}) => {
  const buttonClass = cx(styles.button, className, {
    [styles[`color${capitalize(color)}`]]: true,
    [styles[`size${capitalize(size)}`]]: true,
    [styles.iconOnly]: !children,
  });
  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className={styles.icon} />}
      {LargeIcon && <LargeIcon className={styles.largeIcon} />}
      {children && <span className={styles.text}>{children}</span>}
    </button>
  );
};
