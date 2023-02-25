import cx from "classnames";
import styles from "./Input.module.css";

export const Input = ({
  id,
  type = "text",
  placeholder = "Введите",
  value,
  className,
  name = "",
  isError = false,
  iconInput: IconInput,
  iconRight: IconRight,
  onChange,
  onClick,
}) => {
  const inputClass = cx(styles.field, {
    [styles.iconInput]: IconInput,
    [styles.fieldIncorrect]: isError,
  });
  return (
    <div className={cx(styles.inputWrap, className)}>
      <div className={styles.input}>
        <input
          className={inputClass}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {IconInput && <IconInput className={styles.searchIconInput} />}
        {value && (
          <button onClick={onClick} className={styles.button} name={name}>
            <IconRight className={styles.buttonIcon} />
          </button>
        )}
      </div>
    </div>
  );
};
