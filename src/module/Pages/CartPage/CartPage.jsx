import { useNavigate, Link } from "react-router-dom";
import {
  useChangeProductQtyMutation,
  useDeleteProductFromCartMutation,
  useGetCartQuery,
} from "store/services/goodsApi";
import cx from "classnames";
import { Button } from "components";
import { ReactComponent as Plus } from "icons/plus.svg";
import { ReactComponent as Minus } from "icons/minus.svg";
import { ReactComponent as Delete } from "icons/bin.svg";
import styles from "./CartPage.module.css";

export const CartPage = ({ className }) => {
  const cart = cx(styles.cart, className);
  const navigate = useNavigate();
  const { data = [] } = useGetCartQuery();
  const [deleteProduct] = useDeleteProductFromCartMutation();
  const [changeQty] = useChangeProductQtyMutation();

  const handleClickOnMainBtn = () => {
    navigate("/");
  };
  const handleClickOnCatalogBtn = () => {
    navigate("/catalog");
  };
  const handleDeleteProduct = (id) => {
    deleteProduct(id);
  };

  const handleAddProduct = (id, qty) => {
    changeQty({
      id: id,
      qty: qty + 1,
    });
  };
  const handleRemoveProduct = (id, qty) => {
    qty > 1
      ? changeQty({
          id: id,
          qty: qty - 1,
        })
      : deleteProduct(id);
  };

  return (
    <div className={cart}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>Корзина</span>
      </div>
      <div className={styles.productBlock}>
        {data.length ? (
          data.map(({ id, title, price, src, qty }) => (
            <div className={styles.product} key={id}>
              <div className={styles.descriptionContainer}>
                <div className={styles.imgContainer}>
                  <img className={styles.img} src={src} alt={title} />
                </div>
                <Link to={`/product/${id}`} className={styles.title}>
                  <span className={styles.titleText}>{title}</span>
                </Link>
              </div>
              <div className={styles.priceContainer}>
                <div className={styles.countContainer}>
                  <button
                    className={styles.countBtn}
                    onClick={() => {
                      handleRemoveProduct(id, qty);
                    }}
                  >
                    <Minus />
                  </button>
                  <span className={styles.count}>{qty}</span>
                  <button
                    className={styles.countBtn}
                    onClick={() => {
                      handleAddProduct(id, qty);
                    }}
                  >
                    <Plus />
                  </button>
                </div>
                <div className={styles.price}>
                  {price}
                  <p>руб.</p>
                </div>
                <Button
                  className={styles.deleteBtn}
                  size="small"
                  color="transparent"
                  icon={Delete}
                  onClick={() => {
                    handleDeleteProduct(id);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyCart}>
            <h2>Ваша корзина пуста</h2>
            <div className={styles.btnWrap}>
              <Button
                className={styles.errBtn}
                color="tertiary"
                size="medium"
                onClick={() => handleClickOnMainBtn()}
              >
                НА ГЛАВНУЮ
              </Button>
              <Button
                className={styles.errBtn}
                color="primary"
                size="medium"
                onClick={() => handleClickOnCatalogBtn()}
              >
                В КАТАЛОГ
              </Button>
            </div>
          </div>
        )}
      </div>
      {data.length ? (
        <div className={styles.cartFooter}>
          <Link to="/products" className={styles.linkToBuy}>
            <Button
              className={styles.continueBtn}
              size="medium"
              color="tertiary"
            >
              ПРОДОЛЖИТЬ ПОКУПКИ
            </Button>
          </Link>
          <div className={styles.confirmOrder}>
            <div className={styles.totalPriceContainer}>
              <span className={styles.totalPriceText}>Итого:</span>
              <span className={styles.totalPrice}>
                {data.reduce((acc, { price, qty }) => acc + price * qty, 0)}
                <p>руб.</p>
              </span>
            </div>
            <Link to="/cart/ordering" className={styles.linkToBuy}>
              <Button
                className={styles.confirmBtn}
                color="primary"
                size="medium"
              >
                ОФОРМИТЬ ЗАКАЗ
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
