import { ReactComponent as ShapeIcon } from "icons/shape.svg";
import { useSelector } from "react-redux";
import { getOrder } from "store/selectors/orderSelector";
import { useNavigate } from "react-router-dom";
import styles from "./EndingOrderPage.module.css";
import { useEffect } from "react";

export const EndingOrderPage = () => {
  const {
    orderInfo: { id },
  } = useSelector(getOrder);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrap}>
        <div className={styles.imgWrap}>
          <ShapeIcon className={styles.img} />
        </div>
        <div className={styles.title}>Благодарим за заказ!</div>
        <div className={styles.orderId}>
          ВАШ ЗАКАЗ
          <p>№{id}</p>
        </div>
        <span className={styles.text}>
          Ваш заказ был успешно оформлен. Письмо с подтверждением покупки
          выслано на вашу электронную почту.
        </span>
      </div>
    </div>
  );
};
