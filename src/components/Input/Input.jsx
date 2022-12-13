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
  text = "",
  ...props
}) => {
  const inputClass = cx(styles.field, className, {
    [styles.iconInput]: IconInput,
    [styles.textInput]: text,
    [styles.fieldIncorrect]: isError,
  });
  return (
    <div className={styles.input}>
      <input
        className={inputClass}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {IconInput && <IconInput className={styles.searchIconInput} />}

      {value && (
        <button onClick={onClick} className={styles.button} name={name}>
          <IconRight className={styles.buttonIcon} />
        </button>
      )}
    </div>
  );
};
