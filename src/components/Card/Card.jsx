import cx from "classnames";
import { Button } from "../Button/Button";
import styles from "./Card.module.css";

export const Card = ({ id, alt, children, src, className }) => {
  const cardClass = cx(styles.card, className);
  return (
    <div className={cardClass} id={id}>
      <img className={styles.img} src={src} alt={alt} />
      <div className={styles.title}>{alt}</div>
      <div className={styles.wrapper}>
        <span className={styles.price}>{children}</span>
        <Button color="primary" size="large">
          Купить
        </Button>
      </div>
    </div>
  );
};
