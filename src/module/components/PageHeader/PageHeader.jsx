import cx from "classnames";
import styles from "./PageHeader.module.css";

export const PageHeader = ({ className, children }) => {
  const headerClass = cx(styles.header, className);
  return <div className={headerClass}>{children}</div>;
};
