import cx from "classnames";
import { Link } from "react-router-dom";
import { Button } from "components/Button/Button";
import { ReactComponent as CartIcon } from "icons/cart.svg";
import { ReactComponent as Checkmark } from "icons/checkmark.svg";
import { useParams } from "react-router-dom";
import {
  useGetGoodQuery,
  useGetCartQuery,
  useAddProductInCartMutation,
} from "store/services/goodsApi";
import styles from "./ProductPage.module.css";

export const ProductPage = ({ className }) => {
  const { id } = useParams();
  const ProductPageClass = cx(styles.pageContainer, className);
  const { data: product = {} } = useGetGoodQuery(id);
  const { data = [] } = useGetCartQuery();
  const { title, brand, src, price, characteristics, description } = product;
  const isInCart = data.map((product) => product.id).includes(Number(id));
  console.log(isInCart);

  const [addProduct] = useAddProductInCartMutation();

  const handleAddProduct = (product) => {
    addProduct({
      id: product.id,
      title: product.title,
      price: product.price,
      src: product.src,
      qty: 1,
    });
  };

  return (
    <div className={ProductPageClass}>
      <h2 className={styles.header}>{title}</h2>
      <div className={styles.productContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.productImg} alt="" src={src} />
        </div>
        <div className={styles.characteristics}>
          <div className={styles.priceBlock}>
            <span className={styles.price}>
              <p>{price}</p> руб.
            </span>
            {isInCart ? (
              <Link to="/cart" className={styles.goToCart}>
                <Button
                  className={styles.goToCartBtn}
                  color="secondary"
                  size="medium"
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
                onClick={() => handleAddProduct(product)}
              >
                КУПИТЬ
              </Button>
            )}
          </div>
          <span className={styles.characteristicsHeader}>
            Характеристики {title}
          </span>
          <div className={styles.characteristicsBlock}>
            <div className={styles.characteristicsSpec}>
              <div className={styles.characteristicsSpecTitle}>
                Производитель
              </div>
              <div className={styles.characteristicsSpecValue}>{brand}</div>
            </div>
            <div className={styles.characteristicsSpec}>
              <div className={styles.characteristicsSpecTitle}>Модель</div>
              <div className={styles.characteristicsSpecValue}>
                {characteristics?.model}
              </div>
            </div>
            <div className={styles.characteristicsSpec}>
              <div className={styles.characteristicsSpecTitle}>
                Объем видеопамяти
              </div>
              <div className={styles.characteristicsSpecValue}>
                {characteristics?.memory}
              </div>
            </div>
            <div className={styles.characteristicsSpec}>
              <div className={styles.characteristicsSpecTitle}>Тип памяти</div>
              <div className={styles.characteristicsSpecValue}>
                {characteristics?.memoryType}
              </div>
            </div>
            <div className={styles.characteristicsSpec}>
              <div className={styles.characteristicsSpecTitle}>
                Разрядность шины
              </div>
              <div className={styles.characteristicsSpecValue}>
                {characteristics?.memoryBusWidth}
              </div>
            </div>
            <div className={styles.characteristicsSpec}>
              <div className={styles.characteristicsSpecTitle}>
                Эффективная частота памяти
              </div>
              <div className={styles.characteristicsSpecValue}>
                {characteristics?.memoryFrequency}
              </div>
            </div>
            <div className={styles.characteristicsSpec}>
              <div className={styles.characteristicsSpecTitle}>
                Микроархитектура
              </div>
              <div className={styles.characteristicsSpecValue}>
                {characteristics?.microArchitect}
              </div>
            </div>
            <div className={styles.characteristicsSpec}>
              <div className={styles.characteristicsSpecTitle}>Техпроцесс</div>
              <div className={styles.characteristicsSpecValue}>
                {characteristics?.techProcess}
              </div>
            </div>
            <div className={styles.characteristicsSpec}>
              <div className={styles.characteristicsSpecTitle}>
                Тип процессора
              </div>
              <div className={styles.characteristicsSpecValue}>
                {characteristics?.cpu}
              </div>
            </div>
            <div className={styles.characteristicsSpec}>
              <div className={styles.characteristicsSpecTitle}>Охлаждение</div>
              <div className={styles.characteristicsSpecValue}>
                {characteristics?.cooling}
              </div>
            </div>
            <div className={styles.characteristicsSpec}>
              <div className={styles.characteristicsSpecTitle}>
                Максимальное разрешение
              </div>
              <div className={styles.characteristicsSpecValue}>
                {characteristics?.maxResolution}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <span className={styles.descriptionTitle}>Описание товара</span>
          {description}
        </div>
      </div>
    </div>
  );
};
