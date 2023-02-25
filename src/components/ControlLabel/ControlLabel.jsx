import cx from "classnames";
import styles from "./ControlLabel.module.css";

export const ControlLabel = ({ control, label, className }) => {
  const controlLabelClass = cx(styles.controlLabel, className, {
    [styles.checked]: control.props.checked,
    [styles.withOutIcon]: !control.props.withIcon,
  });
  return (
    <label className={styles.label}>
      {control}
      <span className={controlLabelClass}>{label}</span>
    </label>
  );
};
