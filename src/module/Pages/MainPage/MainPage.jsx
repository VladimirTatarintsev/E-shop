import { Link } from "react-router-dom";
import { ReactComponent as ArrowRight } from "icons/arrow-right.svg";
import { ReactComponent as ArrowDown } from "icons/arrow-down.svg";
import { ReactComponent as CpuIcon } from "icons/cpu.svg";
import { ReactComponent as Display } from "icons/display.svg";
import { ReactComponent as Laptop } from "icons/laptop.svg";
import { ReactComponent as Router } from "icons/router.svg";
import { ReactComponent as PlayStation } from "icons/playstation.svg";
import {
  useGetGoodsQuery,
  useAddProductInCartMutation,
} from "store/services/goodsApi";
import {
  MenuCategories,
  Card,
  MenuCategoryItem,
  MyLink,
  BannerSlider,
} from "module/components";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  const { data = [] } = useGetGoodsQuery();
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
    <div className={styles.mainPage}>
      <div className={styles.pageContainer}>
        <div className={styles.menuWrapper}>
          <MenuCategories>
            <MenuCategoryItem icon={CpuIcon}>Комплектующие ПК</MenuCategoryItem>
            <MenuCategoryItem icon={Display}>Мониторы</MenuCategoryItem>
            <MenuCategoryItem icon={Laptop}>Ноутбуки</MenuCategoryItem>
            <MenuCategoryItem icon={PlayStation}>
              Игровые консоли
            </MenuCategoryItem>
            <MenuCategoryItem icon={Router}>
              Сетевое оборудование
            </MenuCategoryItem>
          </MenuCategories>
          <BannerSlider />
        </div>
        <div className={styles.productContainer}>
          <h2 className={styles.productTitle}>Топ продаж</h2>
          <div className={styles.productBlockWrapper}>
            <div className={styles.productBlock}>
              {data
                .map((product) => (
                  <Card
                    className={styles.product}
                    product={product}
                    id={product.id}
                    key={product.id}
                    title={product.title}
                    src={product.src}
                    price={product.price}
                    onClick={() => {
                      handleAddProduct(product);
                    }}
                  />
                ))
                .slice(0, 6)}
            </div>
            <div className={styles.myLinks}>
              <MyLink
                className={styles.secondLink}
                color="secondary"
                iconRight={ArrowDown}
              >
                Еще товары
              </MyLink>
              <Link to="products" className={styles.productLink}>
                <span className={styles.linkText}>Смотреть все товары</span>
                <ArrowRight className={styles.linkIcon} />
              </Link>
            </div>
          </div>
          <h2 className={styles.productTitle}>Топ продаж</h2>
          <div className={styles.productBlockWrapper}>
            <div className={styles.productBlock}>
              {data
                .map((product) => (
                  <Card
                    className={styles.product}
                    product={product}
                    id={product.id}
                    key={product.id}
                    title={product.title}
                    src={product.src}
                    price={product.price}
                    onClick={() => {
                      handleAddProduct(product);
                    }}
                  />
                ))
                .slice(-6)}
            </div>
            <div className={styles.myLinks}>
              <MyLink
                className={styles.secondLink}
                color="secondary"
                iconRight={ArrowDown}
              >
                Скрыть
              </MyLink>
              <Link to="products" className={styles.productLink}>
                <span className={styles.linkText}>Смотреть все товары</span>
                <ArrowRight className={styles.linkIcon} />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.gameZoneContainer}>
          <div className={styles.gameZoneHeader}>
            <hr className={styles.gameZoneLine}></hr>
            <span className={styles.gameZoneText}>GAME ZONE</span>
            <hr className={styles.gameZoneLine}></hr>
          </div>
          <div className={styles.bgImg} />
          <div className={styles.productBlock}>
            {data
              .map((product) => (
                <Card
                  className={styles.product}
                  product={product}
                  id={product.id}
                  key={product.id}
                  title={product.title}
                  src={product.src}
                  price={product.price}
                  onClick={() => {
                    handleAddProduct(product);
                  }}
                />
              ))
              .slice(11, 17)}
          </div>
          <div className={styles.myLinks}>
            <MyLink
              className={styles.secondLink}
              color="primary"
              iconRight={ArrowDown}
            >
              Еще товары
            </MyLink>
            <Link to="products" className={styles.productLink}>
              <span className={styles.linkText}>Смотреть все товары</span>
              <ArrowRight className={styles.linkIcon} />
            </Link>
          </div>
          <span className={styles.headCategoryText}>
            Категории для геймеров
          </span>
          <div className={styles.categoryForGamer}>
            <div className={styles.categoryItem}>
              <div className={styles.itemBg}>
                <img
                  className={styles.itemImg}
                  src="image/card-image/keyboard.png"
                  alt=""
                />
              </div>
              <span className={styles.itemTitle}>Клавиатуры</span>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.itemBg}>
                <img
                  className={styles.itemImg}
                  src="image/card-image/mouse.png"
                  alt=""
                />
              </div>
              <span className={styles.itemTitle}>Мыши</span>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.itemBg}>
                <img
                  className={styles.itemImg}
                  src="image/card-image/wheel.png"
                  alt=""
                />
              </div>
              <span className={styles.itemTitle}>Аксесуары</span>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.itemBg}>
                <img
                  className={styles.itemImg}
                  src="image/card-image/laptop.png"
                  alt=""
                />
              </div>
              <span className={styles.itemTitle}>Игровые ноутбуки</span>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.itemBg}>
                <img
                  className={styles.itemImg}
                  src="image/card-image/gpu-desktop.png"
                  alt=""
                />
              </div>
              <span className={styles.itemTitle}>Видеокарты</span>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.itemBg}>
                <img
                  className={styles.itemImg}
                  src="image/card-image/monitor.png"
                  alt=""
                />
              </div>
              <span className={styles.itemTitle}>Мониторы</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
