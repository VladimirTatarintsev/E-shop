import cx from "classnames";
import styles from "./Radio.module.css";

export const Radio = ({
  className,
  name = "",
  checked = false,
  onChange = () => {},
  value,
  withIcon = true,
}) => {
  const radioClass = cx(styles.radioWrapper, className);
  return (
    <div className={radioClass}>
      <label className={styles.label}>
        <input
          className={styles.radio}
          type="radio"
          name={name}
          checked={checked}
          value={value}
          onChange={onChange}
        />
        {withIcon && <span className={styles.customRadio} />}
      </label>
    </div>
  );
};
