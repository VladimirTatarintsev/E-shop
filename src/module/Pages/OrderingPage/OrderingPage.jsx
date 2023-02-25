import {
  useAddOrderMutation,
  useDeleteProductFromCartMutation,
  useGetCartQuery,
} from "store/services/goodsApi";
import { Button, ControlLabel, Input } from "components";
import { useNavigate } from "react-router-dom";
import { Radio } from "components/Radio/Radio";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "store/selectors/orderSelector";
import {
  setClearActiveInput,
  setClearOrder,
  setDelivery,
  setOrderInfo,
  setUserContacts,
} from "store/slices/orderSlice";
import { getSum, getCorrectWord } from "utils/utils";
import { ReactComponent as DeleteIcon } from "icons/x-medium.svg";
import styles from "./OrderingPage.module.css";

export const OrderingPage = () => {
  const { data: products = [] } = useGetCartQuery();
  const [confirmOrder] = useAddOrderMutation();
  const [clearCart] = useDeleteProductFromCartMutation();

  const {
    userContacts: { firstName, lastName, email, phone },
    delivery: { method, sum },
  } = useSelector(getOrder);
  const dispatch = useDispatch();

  const handleSetUserContacts = ({ target: { name, value } }) => {
    dispatch(setUserContacts({ name, value }));
  };
  const handleClearActiveInput = ({ target: { name } }) => {
    dispatch(setClearActiveInput({ name }));
  };
  const handleSetDelivery = ({
    target: {
      value,
      dataset: { price },
    },
  }) => {
    dispatch(setDelivery({ value, price }));
  };
  const orderId = Date.now();

  const handleConfirmOrder = () => {
    confirmOrder({
      id: orderId,
      userContacts: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      },
      selectedDelivery: method,
      orderSum: totalPrice,
      orderSpec: products,
    });
    for (let product of products) {
      clearCart(product.id);
    }
    dispatch(setOrderInfo(orderId));
    dispatch(setClearOrder());
    navigate("/cart/ordering/order-ending");
  };
  const currentProductQty = products?.reduce(
    (acc, currentVal) => acc + currentVal.qty,
    0
  );

  const getTotalPrice = (products, deliveryPrice) => {
    if (deliveryPrice !== "Бесплатно") {
      return products?.reduce(
        (acc, product) =>
          acc + product.qty * product.price + Number(deliveryPrice),
        0
      );
    } else {
      return products?.reduce(
        (acc, product) => acc + product.qty * product.price,
        0
      );
    }
  };
  const totalPrice = getTotalPrice(products, sum);
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
              <div className={styles.product} key={product.id}>
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
                  {`${currentProductQty} ${getCorrectWord(
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
                <div className={styles.orderCellValue}>
                  {method
                    ? `${sum !== "Бесплатно" ? sum + " руб." : sum}`
                    : "Доставка не выбрана"}
                </div>
              </div>
              <div className={styles.orderInfoCell}>
                <div className={styles.orderCellTitle}>Итого к оплате</div>
                <div className={styles.orderCellValue}>
                  {`${totalPrice} руб.`}
                </div>
              </div>
              <Button
                className={styles.confirmBtn}
                color="primary"
                size="medium"
                onClick={handleConfirmOrder}
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
            value={firstName}
            onChange={handleSetUserContacts}
            iconRight={DeleteIcon}
            onClick={handleClearActiveInput}
          />
          <Input
            className={styles.formInput}
            placeholder="Фамилия"
            name="lastName"
            value={lastName}
            onChange={handleSetUserContacts}
            iconRight={DeleteIcon}
            onClick={handleClearActiveInput}
          />
        </div>
        <div className={styles.formBlock}>
          <Input
            className={styles.formInput}
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleSetUserContacts}
            iconRight={DeleteIcon}
            onClick={handleClearActiveInput}
          />
          <Input
            className={styles.formInput}
            placeholder="Номер телефона"
            name="phone"
            value={phone}
            onChange={handleSetUserContacts}
            iconRight={DeleteIcon}
            onClick={handleClearActiveInput}
          />
        </div>
      </div>
      <div className={styles.deliveryContainer}>
        <div className={styles.containerTitle}>Способ доставки</div>
        <div className={styles.deliveryMethods}>
          <div className={styles.methodsWrap}>
            <ControlLabel
              className={styles.radioLabel}
              label="Доставка Курьером"
              control={
                <Radio
                  className={styles.radioBtn}
                  checked={method === "courier"}
                  onChange={handleSetDelivery}
                  name="deliveryRadio"
                  value="courier"
                  data-price="800"
                />
              }
            />
          </div>
          <div className={styles.methodsWrap}>
            <ControlLabel
              className={styles.radioLabel}
              label="Доставка Почтой России"
              control={
                <Radio
                  className={styles.radioBtn}
                  checked={method === "russianPost"}
                  onChange={handleSetDelivery}
                  name="deliveryRadio"
                  value="russianPost"
                  data-price="2500"
                />
              }
            />
          </div>
          <div className={styles.methodsWrap}>
            <ControlLabel
              className={styles.radioLabel}
              label='Партнерская доставка "Boxberry"'
              control={
                <Radio
                  className={styles.radioBtn}
                  checked={method === "boxberry"}
                  onChange={handleSetDelivery}
                  name="deliveryRadio"
                  value="boxberry"
                  data-price="Бесплатно"
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
