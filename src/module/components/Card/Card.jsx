import cx from "classnames";
import { Button } from "components/Button/Button";
import { ReactComponent as LikeIcon } from "icons/heart.svg";
import { ReactComponent as ScalesIcon } from "icons/scales.svg";
import { ReactComponent as StarIcon } from "icons/star.svg";
import { ReactComponent as CartIcon } from "icons/cart.svg";
import { ReactComponent as Checkmark } from "icons/checkmark.svg";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const isInCart = isIn(cart, id);
  const isInWishList = isIn(wishList, id);
  const isInCompare = isIn(compare, id);

  return (
    <Link to={`/product/${id}`} className={styles.cardWrap}>
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
        <span className={styles.title}>{title}</span>
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
            <Button
              className={styles.goToCartBtn}
              color="secondary"
              size="large"
              icon={Checkmark}
              onClick={(e) => {
                navigate("/cart");
                e.preventDefault();
              }}
            >
              В КОРЗИНЕ
            </Button>
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
    </Link>
  );
};
