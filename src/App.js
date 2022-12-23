import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Button } from "./components/Button/Button";
import { NavBar } from "./module/components/NavBar/NavBar";
import { ReactComponent as MenuIcon } from "./icons/menu.svg";
import { ReactComponent as Cart } from "./icons/cart.svg";
import { ReactComponent as User } from "./icons/user.svg";
import { ReactComponent as SearchIcon } from "./icons/search.svg";
import { ReactComponent as Catalog } from "./icons/catalog.svg";
import { ReactComponent as DeleteIcon } from "./icons/x-large.svg";
import { ReactComponent as ArrowRight } from "./icons/arrow-right.svg";
import { ReactComponent as CpuIcon } from "./icons/cpu.svg";
import { ReactComponent as Display } from "./icons/display.svg";
import { ReactComponent as Laptop } from "./icons/laptop.svg";
import { ReactComponent as Router } from "./icons/router.svg";
import { ReactComponent as PlayStation } from "./icons/playstation.svg";
import { PageHeader } from "./module/components/PageHeader/PageHeader";
import { ReactComponent as LikeIcon } from "./icons/heart.svg";
import { ReactComponent as ScalesIcon } from "./icons/scales.svg";
import { Input } from "./components/Input/Input";
import { MenuCategories } from "./module/components/MenuCategories/MenuCategories";
import { Banner } from "./module/components/Banner/Banner";
import { Card } from "./module/components/Card/Card";
import { PageFooter } from "./module/components/PageFooter/PageFooter";
import { MenuCategoryItem } from "./module/components/MenuCategoryItem/MenuCategoryItem";
import { Link } from "./module/components/Link/Link";

export const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await axios.get("http://localhost:3004/goods");
    setProducts(response.data);
  }
  const [value, setValue] = useState("");

  return (
    <div className={styles.App}>
      <NavBar className={styles.navbar}>
        <div className={styles.navItem}>
          <Button
            className={styles.navBtn}
            size="large"
            color="transparent"
            icon={MenuIcon}
          />
        </div>
        <div className={styles.navItem}>
          <div className={styles.navLogo}>E-SHOP</div>
        </div>
        <div className={styles.navItem}>
          <Button
            className={styles.navBtn}
            size="large"
            color="transparent"
            icon={User}
          />
        </div>
      </NavBar>
      <PageHeader className={styles.header}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>E-SHOP</div>
          <Button size="medium" color="primary" icon={Catalog}>
            КАТАЛОГ ТОВАРОВ
          </Button>
        </div>
        <div className={styles.inputWrapper}>
          <Input
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            iconRight={DeleteIcon}
            className={styles.searchInput}
            placeholder="Поиск..."
          />
          <Button
            className={styles.searchBtn}
            size="large"
            color="secondary"
            largeIcon={SearchIcon}
          />
        </div>
        <div className={styles.headBtnWrapper}>
          <div className={styles.btnWrapper}>
            <Button
              className={styles.headBtn}
              size="large"
              color="tertiary"
              largeIcon={ScalesIcon}
            />
            <div className={styles.compareQty}>15</div>
          </div>
          <div className={styles.btnWrapper}>
            <Button
              className={styles.headBtn}
              size="large"
              color="tertiary"
              largeIcon={LikeIcon}
            />
            <div className={styles.favQty}>2</div>
          </div>
          <div className={styles.btnWrapper}>
            <Button
              className={styles.headBtn}
              size="large"
              color="tertiary"
              largeIcon={Cart}
            />
            <div className={styles.cartQty}>15</div>
          </div>
        </div>
      </PageHeader>
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
          <div className={styles.banner}>
            <Banner className={styles.bannerImg}>
              <div className={styles.bannerText}>
                <span className={styles.bannerTitle}>TEXT BANNER</span>
                <span className={styles.bannerDiscription}>
                  BANNER DISCRIPTION SMALL TEXT
                </span>
                <Button size="medium" color="red">
                  BANNER BUTTON
                </Button>
              </div>
            </Banner>
          </div>
        </div>
        <div className={styles.productBlockWrapper}>
          <h2 className={styles.productTitle}>Топ продаж</h2>
          <div className={styles.productContainer}>
            <div className={styles.productBlock}>
              {products
                .map((product) => (
                  <Card
                    className={styles.product}
                    product={product}
                    key={product.id}
                    alt={product.alt}
                    src={product.src}
                    price={product.price}
                  />
                ))
                .slice(0, 6)}
            </div>
            <Link
              className={styles.link}
              href="http://localhost:3004/goods"
              color="primary"
              icon={ArrowRight}
            >
              Смотреть все товары
            </Link>
          </div>
          <div className={styles.productContainer}>
            <div className={styles.productBlock}>
              {products
                .map((product) => (
                  <Card
                    className={styles.product}
                    product={product}
                    key={product.id}
                    alt={product.alt}
                    src={product.src}
                    price={product.price}
                  />
                ))
                .slice(-6)}
            </div>
            <Link
              className={styles.link}
              href="http://localhost:3004/goods"
              color="primary"
              icon={ArrowRight}
            >
              Смотреть все товары
            </Link>
          </div>
        </div>
        <div className={styles.gameZoneContainer}>
          <div className={styles.gameZoneHeader}>
            <hr className={styles.gameZoneLine}></hr>
            <span className={styles.gameZoneText}>GAME ZONE</span>
            <hr className={styles.gameZoneLine}></hr>
          </div>
          <div className={styles.bgImg} />
          <div className={styles.gameProductBlock}>
            {products
              .map((product) => (
                <Card
                  className={styles.gameProduct}
                  product={product}
                  key={product.id}
                  alt={product.alt}
                  src={product.src}
                  price={product.price}
                />
              ))
              .slice(11, 17)}
          </div>
          <Link
            className={styles.link}
            href="http://localhost:3004/goods"
            color="secondary"
            icon={ArrowRight}
          >
            Смотреть все товары
          </Link>
          <span className={styles.headCategoryText}>
            Категории для геймеров
          </span>
          <div className={styles.categoryForGamer}>
            <div className={styles.categoryItem}>
              <div className={styles.itemBg}>
                <img
                  className={styles.itemImg}
                  src="image/card-image/keyboard.png"
                />
              </div>
              <span className={styles.itemTitle}>Клавиатуры</span>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.itemBg}>
                <img
                  className={styles.itemImg}
                  src="image/card-image/mouse.png"
                />
              </div>
              <span className={styles.itemTitle}>Мыши</span>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.itemBg}>
                <img
                  className={styles.itemImg}
                  src="image/card-image/wheel.png"
                />
              </div>
              <span className={styles.itemTitle}>Аксесуары</span>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.itemBg}>
                <img
                  className={styles.itemImg}
                  src="image/card-image/laptop.png"
                />
              </div>
              <span className={styles.itemTitle}>Игровые ноутбуки</span>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.itemBg}>
                <img
                  className={styles.itemImg}
                  src="image/card-image/gpu-desktop.png"
                />
              </div>
              <span className={styles.itemTitle}>Видеокарты</span>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.itemBg}>
                <img
                  className={styles.itemImg}
                  src="image/card-image/monitor.png"
                />
              </div>
              <span className={styles.itemTitle}>Мониторы</span>
            </div>
          </div>
        </div>
      </div>

      <PageFooter></PageFooter>
    </div>
  );
};
