import cx from "classnames";
import { Button } from "../../../components/Button/Button";
import styles from "./Card.module.css";
import { ReactComponent as LikeIcon } from "../../../icons/heart.svg";
import { ReactComponent as ScalesIcon } from "../../../icons/scales.svg";
import { ReactComponent as StarIcon } from "../../../icons/star.svg";
import { ReactComponent as CartIcon } from "../../../icons/cart.svg";

export const Card = ({ id, alt, price, src, className }) => {
  const cardClass = cx(styles.card, className);
  return (
    <div className={cardClass} id={id}>
      <div className={styles.label}>
        <Button
          className={styles.btn}
          size="small"
          color="tertiary"
          iconLabel={ScalesIcon}
        />
        <Button size="small" color="tertiary" iconLabel={LikeIcon} />
      </div>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={src} alt={alt} />
      </div>
      <div className={styles.title}>{alt}</div>
      <div className={styles.reviewBlock}>
        <div className={styles.rating}>
          <StarIcon className={styles.ratingStar} />
          <StarIcon className={styles.ratingStar} />
          <StarIcon className={styles.ratingStar} />
          <StarIcon className={styles.ratingStar} />
          <StarIcon className={styles.ratingStar} />
        </div>
        <span>
          Отзывов:<span className={styles.reviewQty}>4</span>
        </span>
      </div>
      <div className={styles.wrapper}>
        <span className={styles.price}>
          {price}
          <p>руб.</p>
        </span>
        <Button
          className={styles.buyBtn}
          color="primary"
          size="large"
          icon={CartIcon}
        >
          КУПИТЬ
        </Button>
      </div>
    </div>
  );
};
