import { Link } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as ArrowRight } from "icons/arrow-right.svg";
import { ReactComponent as ArrowUp } from "icons/arrow-up.svg";
import { ReactComponent as ArrowDown } from "icons/arrow-down.svg";
import { isIn } from "utils/utils";
import {
  useGetGoodsQuery,
  useGetCartQuery,
  useGetWishListQuery,
  useGetCompareQuery,
  useAddProductInCartMutation,
  useAddInWishListMutation,
  useAddInCompareMutation,
  useDeleteFromWishListMutation,
  useDeleteFromCompareMutation,
} from "store/services/goodsApi";
import { MenuCategories, Card, MyLink, BannerSlider } from "module/components";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  const { data: products = [] } = useGetGoodsQuery();
  const { data: cart = [] } = useGetCartQuery();
  const { data: wishList = [] } = useGetWishListQuery();
  const { data: compare = [] } = useGetCompareQuery();
  const [addInCart] = useAddProductInCartMutation();
  const [addInWishList] = useAddInWishListMutation();
  const [addInCompare] = useAddInCompareMutation();
  const [deleteFromWishList] = useDeleteFromWishListMutation();
  const [deleteFromCompare] = useDeleteFromCompareMutation();

  const [showMoreBestSeller, setShowMoreBestSeller] = useState(false);
  const [showMoreTopSeller, setShowMoreTopSeller] = useState(true);
  const [showMoreGameBestSeller, setShowMoreGameBestSeller] = useState(false);

  const handleAddInCart = (product, e) => {
    addInCart({
      id: product.id,
      title: product.title,
      price: product.price,
      src: product.src,
      qty: 1,
    });
    e.preventDefault();
  };
  const handleClickOnWishList = (product, e) => {
    const isInWishList = isIn(wishList, product.id);
    isInWishList
      ? deleteFromWishList(product.id)
      : addInWishList({
          id: product.id,
          title: product.title,
          price: product.price,
          src: product.src,
        });
    e.preventDefault();
  };
  const handleClickOnCompare = (product, e) => {
    const isInCompare = isIn(compare, product.id);
    isInCompare
      ? deleteFromCompare(product.id)
      : addInCompare({
          id: product.id,
          title: product.title,
          price: product.price,
          src: product.src,
          category: product.category,
        });
    e.preventDefault();
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.pageContainer}>
        <div className={styles.menuWrapper}>
          <MenuCategories />
          <BannerSlider />
        </div>
        <div className={styles.productContainer}>
          <h2 className={styles.productTitle}>Топ продаж</h2>
          <div className={styles.productBlockWrapper}>
            <div
              className={`${styles.productBlock} ${
                showMoreBestSeller ? [styles.productBlockFullHeight] : ""
              }`}
            >
              {products
                ?.map((product) => (
                  <Card
                    className={styles.product}
                    product={product}
                    cart={cart}
                    wishList={wishList}
                    compare={compare}
                    id={product.id}
                    key={product.id}
                    title={product.title}
                    src={product.src}
                    price={product.price}
                    onClick={(e) => {
                      handleAddInCart(product, e);
                    }}
                    onWishListClick={(e) => handleClickOnWishList(product, e)}
                    onCompareClick={(e) => handleClickOnCompare(product, e)}
                  />
                ))
                .slice(0, 6)}
            </div>
            <div className={styles.myLinks}>
              {!showMoreBestSeller ? (
                <MyLink
                  className={styles.secondLink}
                  color="secondary"
                  iconRight={ArrowDown}
                  onClick={() => setShowMoreBestSeller(!showMoreBestSeller)}
                >
                  Еще товары
                </MyLink>
              ) : (
                <MyLink
                  className={styles.secondLink}
                  color="secondary"
                  iconRight={ArrowUp}
                  onClick={() => setShowMoreBestSeller(!showMoreBestSeller)}
                >
                  Скрыть
                </MyLink>
              )}
              <Link to="products" className={styles.productLink}>
                <span className={styles.linkText}>Смотреть все товары</span>
                <ArrowRight className={styles.linkIcon} />
              </Link>
            </div>
          </div>
          <h2 className={styles.productTitle}>Топ продаж</h2>
          <div className={styles.productBlockWrapper}>
            <div
              className={`${styles.productBlock} ${
                showMoreTopSeller ? [styles.productBlockFullHeight] : ""
              }`}
            >
              {products
                ?.map((product) => (
                  <Card
                    className={styles.product}
                    product={product}
                    cart={cart}
                    wishList={wishList}
                    compare={compare}
                    id={product.id}
                    key={product.id}
                    title={product.title}
                    src={product.src}
                    price={product.price}
                    onClick={(e) => {
                      handleAddInCart(product, e);
                    }}
                    onWishListClick={(e) => handleClickOnWishList(product, e)}
                    onCompareClick={(e) => handleClickOnCompare(product, e)}
                  />
                ))
                .slice(-6)}
            </div>
            <div className={styles.myLinks}>
              {!showMoreTopSeller ? (
                <MyLink
                  className={styles.secondLink}
                  color="secondary"
                  iconRight={ArrowDown}
                  onClick={() => setShowMoreTopSeller(!showMoreTopSeller)}
                >
                  Еще товары
                </MyLink>
              ) : (
                <MyLink
                  className={styles.secondLink}
                  color="secondary"
                  iconRight={ArrowUp}
                  onClick={() => setShowMoreTopSeller(!showMoreTopSeller)}
                >
                  Скрыть
                </MyLink>
              )}
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
          <div
            className={`${styles.productBlock} ${
              showMoreGameBestSeller ? [styles.productBlockFullHeight] : ""
            }`}
          >
            {products
              ?.map((product) => (
                <Card
                  className={styles.product}
                  product={product}
                  cart={cart}
                  wishList={wishList}
                  compare={compare}
                  id={product.id}
                  key={product.id}
                  title={product.title}
                  src={product.src}
                  price={product.price}
                  onClick={(e) => {
                    handleAddInCart(product, e);
                  }}
                  onWishListClick={(e) => handleClickOnWishList(product, e)}
                  onCompareClick={(e) => handleClickOnCompare(product, e)}
                />
              ))
              .slice(11, 17)}
          </div>
          <div className={styles.myLinks}>
            {!showMoreGameBestSeller ? (
              <MyLink
                className={styles.secondLink}
                color="primary"
                iconRight={ArrowDown}
                onClick={() =>
                  setShowMoreGameBestSeller(!showMoreGameBestSeller)
                }
              >
                Еще товары
              </MyLink>
            ) : (
              <MyLink
                className={styles.secondLink}
                color="primary"
                iconRight={ArrowUp}
                onClick={() =>
                  setShowMoreGameBestSeller(!showMoreGameBestSeller)
                }
              >
                Скрыть
              </MyLink>
            )}
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
