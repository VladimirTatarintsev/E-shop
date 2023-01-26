import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import { Button } from "components";
import { ReactComponent as Plus } from "icons/plus.svg";
import { ReactComponent as Minus } from "icons/minus.svg";
import { ReactComponent as Delete } from "icons/bin.svg";
import styles from "./CartPage.module.css";

export const CartPage = ({ className }) => {
  const cart = cx(styles.cart, className);

  const [productsCart, setProductsCart] = useState([]);

  async function fetchCart() {
    const resp = await axios.get("http://localhost:3001/cart");
    setProductsCart(resp.data);
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className={cart}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>Корзина</span>
      </div>
      <div className={styles.productBlock}>
        {productsCart ? (
          productsCart.map(({ id, title, price, src, qty }) => (
            <div className={styles.product} key={id}>
              <div className={styles.descriptionContainer}>
                <div className={styles.imgContainer}>
                  <img className={styles.img} src={src} alt={title} />
                </div>
                <span className={styles.title}>{title}</span>
              </div>
              <div className={styles.priceContainer}>
                <div className={styles.countContainer}>
                  <button className={styles.countBtn}>
                    <Minus />
                  </button>
                  <span className={styles.count}>{qty}</span>
                  <button className={styles.countBtn}>
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
        <Link to="/" className={styles.linkToMain}>
          <Button className={styles.continueBtn} size="medium" color="tertiary">
            Продолжить покупки
          </Button>
        </Link>
        <div className={styles.confirmOrder}>
          <div className={styles.totalPriceContainer}>
            <span className={styles.totalPriceText}>Итого:</span>
            <span className={styles.totalPrice}>
              {productsCart.reduce(
                (acc, { price, qty }) => acc + price * qty,
                0
              )}
              <p>руб.</p>
            </span>
          </div>
          <Button className={styles.confirmBtn} color="primary" size="medium">
            ОФОРМИТЬ ЗАКАЗ
          </Button>
        </div>
      </div>
    </div>
  );
};
