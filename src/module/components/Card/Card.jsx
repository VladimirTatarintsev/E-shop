import cx from "classnames";
import { Button } from "components/Button/Button";
import { ReactComponent as LikeIcon } from "icons/heart.svg";
import { ReactComponent as ScalesIcon } from "icons/scales.svg";
import { ReactComponent as StarIcon } from "icons/star.svg";
import { ReactComponent as CartIcon } from "icons/cart.svg";
import { ReactComponent as Checkmark } from "icons/checkmark.svg";
import { Link } from "react-router-dom";
import { isIn } from "utils/utils";
import styles from "./Card.module.css";

export const Card = ({
  id,
  title,
  price,
  src,
  className,
  onClick,
  onWishListClick,
  onCompareClick,
  cart,
  wishList,
  compare,
}) => {
  const cardClass = cx(styles.card, className);

  const isInCart = isIn(cart, id);
  const isInWishList = isIn(wishList, id);
  const isInCompare = isIn(compare, id);

  return (
    <div className={cardClass} id={id}>
      <div className={styles.label}>
        <button
          className={`${styles.labelBtn} ${
            isInCompare ? [styles.labelBtnActive] : ""
          }`}
          onClick={onCompareClick}
        >
          <ScalesIcon className={styles.icon} />
        </button>
        <button
          className={`${styles.labelBtn} ${
            isInWishList ? [styles.labelBtnActive] : ""
          }`}
          onClick={onWishListClick}
        >
          <LikeIcon className={styles.icon} />
        </button>
      </div>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={src} alt={title} />
      </div>
      <Link to={`/products/${id}`} className={styles.title}>
        <span className={styles.titleText}>{title}</span>
      </Link>
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
        {isInCart ? (
          <Link to="/cart" className={styles.goToCart}>
            <Button
              className={styles.goToCartBtn}
              color="secondary"
              size="large"
              icon={Checkmark}
            >
              В КОРЗИНЕ
            </Button>
          </Link>
        ) : (
          <Button
            className={styles.buyBtn}
            color="primary"
            size="large"
            icon={CartIcon}
            onClick={onClick}
          >
            КУПИТЬ
          </Button>
        )}
      </div>
    </div>
  );
};
