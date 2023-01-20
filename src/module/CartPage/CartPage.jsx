import axios from "axios";
import { useState, useEffect } from "react";
import cx from "classnames";
import { Button } from "components";
import { ReactComponent as Plus } from "icons/plus.svg";
import { ReactComponent as Minus } from "icons/minus.svg";
import { ReactComponent as Delete } from "icons/bin.svg";
import styles from "./CartPage.module.css";

export const CartPage = ({ className }) => {
  const cart = cx(styles.cart, className);

  const [productsCart, setProductsCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    const resp = await axios.get("http://localhost:3004/cart");
    setProductsCart(resp.data);
  }

  return (
    <div className={cart}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>Корзина</span>
      </div>
      <div className={styles.productBlock}>
        {productsCart ? (
          productsCart.map((product) => (
            <div className={styles.product} key={product.id}>
              <div className={styles.wrapperDescription}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.img}
                    src={product.src}
                    alt={product.title}
                  />
                </div>
                <span className={styles.title}>{product.title}</span>
              </div>
              <div className={styles.wrapperPrice}>
                <div className={styles.qtyContainer}>
                  <button className={styles.countBtn}>
                    <Minus />
                  </button>
                  <span className={styles.qty}>{product.qty}</span>
                  <button className={styles.countBtn}>
                    <Plus />
                  </button>
                </div>
                <div className={styles.price}>
                  {product.price}
                  <p>руб.</p>
                </div>
                <Button
                  className={styles.deleteBtn}
                  size="small"
                  color="transparent"
                  icon={Delete}
                />
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyCart}>
            <h2>Ваша корзина пуста</h2>
          </div>
        )}
      </div>
      <div className={styles.cartFooter}>
        <Button className={styles.continueBtn} size="medium" color="tertiary">
          Продолжить покупки
        </Button>
        <div className={styles.confirmOrder}>
          <span className={styles.totalPrice}>
            {productsCart.reduce(
              (acc, product) => acc + product.price * product.qty,
              0
            )}
            <p>руб.</p>
          </span>
          <Button className={styles.confirmBtn} color="primary" size="medium">
            ОФОРМИТЬ ЗАКАЗ
          </Button>
        </div>
      </div>
    </div>
  );
};
