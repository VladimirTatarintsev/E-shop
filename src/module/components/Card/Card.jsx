import cx from "classnames";
import { Button } from "components/Button/Button";
import { ReactComponent as LikeIcon } from "icons/heart.svg";
import { ReactComponent as ScalesIcon } from "icons/scales.svg";
import { ReactComponent as StarIcon } from "icons/star.svg";
import { ReactComponent as CartIcon } from "icons/cart.svg";
import { ReactComponent as Checkmark } from "icons/checkmark.svg";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export const Card = ({
  id,
  title,
  price,
  src,
  className,
  buyBtn,
  goToCart,
}) => {
  const cardClass = cx(styles.card, className);
  return (
    <div className={cardClass} id={id}>
      <div className={styles.label}>
        <button className={styles.labelBtn}>
          <ScalesIcon className={styles.icon} />
        </button>
        <button className={styles.labelBtn}>
          <LikeIcon className={styles.icon} />
        </button>
      </div>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={src} alt={title} />
      </div>
      <div className={styles.title}>{title}</div>
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
        {buyBtn && (
          <Button
            className={styles.buyBtn}
            color="primary"
            size="large"
            icon={CartIcon}
          >
            КУПИТЬ
          </Button>
        )}
        {goToCart && (
          <Link to="cart">
            <Button
              className={styles.buyBtn}
              color="secondary"
              size="large"
              icon={Checkmark}
            >
              В КОРЗИНУ
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
