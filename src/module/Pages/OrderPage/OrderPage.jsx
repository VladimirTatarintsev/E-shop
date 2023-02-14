import { useGetCartQuery } from "store/services/goodsApi";
import { Button, ControlLabel, Input } from "components";
import { useNavigate } from "react-router-dom";
import styles from "./OrderPage.module.css";
import { Radio } from "components/Radio/Radio";

export const OrderPage = () => {
  const { data: products = [] } = useGetCartQuery();
  const getSum = (price, qty) => {
    return price * qty;
  };
  const currentProductQty = products?.reduce(
    (acc, currentVal) => acc + currentVal.qty,
    0
  );
  const getCorrectWard = (qty) => {
    let str = "";
    if (qty === "1") {
      str += "товар";
    } else if (qty > 1 && qty < 5) {
      str += "товара";
    } else str += "товаров";
    return str;
  };
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>Оформление заказа</div>
      <div className={styles.order}>
        <div className={styles.containerTitle}>Ваш заказ</div>
        <div className={styles.orderContainer}>
          <div className={styles.productBlock}>
            {products.map((product) => (
              <div
                className={styles.product}
                product={product}
                key={product.id}
              >
                <div className={styles.productCellWrap}>
                  <div className={styles.imgWrap}>
                    <img
                      className={styles.productImg}
                      alt=""
                      src={product.src}
                    />
                  </div>
                  <div className={styles.productTitle}>{product.title}</div>
                </div>
                <div className={styles.productCellWrap}>
                  <div className={styles.cell}>
                    <span className={styles.cellTitle}>Количество</span>
                    <span className={styles.cellValue}>{product.qty}</span>
                  </div>
                  <div className={styles.cell}>
                    <span className={styles.cellTitle}>Цена</span>
                    <span className={styles.cellValue}>
                      {`${product.price} руб.`}
                    </span>
                  </div>
                  <div className={styles.cell}>
                    <span className={styles.cellTitle}>Сумма</span>
                    <span className={styles.cellValue}>
                      {`${getSum(product.price, product.qty)} руб.`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.orderConfirmation}>
            <div className={styles.orderConfirmationHeader}>Итого</div>
            <div className={styles.orderInfo}>
              <div className={styles.orderInfoCell}>
                <div className={styles.orderCellTitle}>
                  {`${currentProductQty} ${getCorrectWard(
                    currentProductQty
                  )} на сумму`}
                </div>
                <div className={styles.orderCellValue}>
                  {`${products?.reduce(
                    (acc, { price, qty }) => acc + qty * price,
                    0
                  )} руб.`}
                </div>
              </div>
              <div className={styles.orderInfoCell}>
                <div className={styles.orderCellTitle}>Стоимость доставки</div>
                <div className={styles.orderCellValue}>Бесплатно</div>
              </div>
              <div className={styles.orderInfoCell}>
                <div className={styles.orderCellTitle}>Итого к оплате</div>
                <div className={styles.orderCellValue}>
                  {`${products?.reduce(
                    (acc, { price, qty }) => acc + qty * price,
                    0
                  )} руб.`}
                </div>
              </div>
              <Button
                className={styles.confirmBtn}
                color="primary"
                size="medium"
              >
                ПОДТВЕРДИТЬ ЗАКАЗ
              </Button>
              <Button
                className={styles.goBackBtn}
                size="medium"
                color="tertiary"
                onClick={() => goBack()}
              >
                ВЕРНУТЬСЯ В КОРЗИНУ
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contactFormContainer}>
        <div className={styles.containerTitle}>Ваши контактные данные</div>
        <div className={styles.formBlock}>
          <Input
            className={styles.formInput}
            placeholder="Имя"
            name="firstName"
          />
          <Input
            className={styles.formInput}
            placeholder="Фамилия"
            name="lastName"
          />
        </div>
        <div className={styles.formBlock}>
          <Input
            className={styles.formInput}
            placeholder="Email"
            name="email"
          />
          <Input
            className={styles.formInput}
            placeholder="Номер телефона"
            name="phone"
          />
        </div>
      </div>
      <div className={styles.deliveryContainer}>
        <div className={styles.containerTitle}>Способ доставки</div>
        <div className={styles.deliveryMethods}>
          <div className={styles.methodsWrap}>
            <ControlLabel
              className={styles.radioBtn}
              label="Доставка Курьером"
              control={<Radio />}
            />
          </div>
          <div className={styles.methodsWrap}>
            <ControlLabel
              className={styles.radioBtn}
              label="Доставка Почтой России"
              control={<Radio />}
            />
          </div>
          <div className={styles.methodsWrap}>
            <ControlLabel
              className={styles.radioBtn}
              label='Партнерская доставка "Boxberry"'
              control={<Radio />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
