import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Input } from "components";
import { ReactComponent as MenuIcon } from "icons/menu.svg";
import { ReactComponent as Cart } from "icons/cart.svg";
import { ReactComponent as User } from "icons/user.svg";
import { ReactComponent as SearchIcon } from "icons/search.svg";
import { ReactComponent as Catalog } from "icons/catalog.svg";
import { ReactComponent as DeleteIcon } from "icons/x-large.svg";
import { ReactComponent as ArrowRight } from "icons/arrow-right.svg";
import { ReactComponent as ArrowDown } from "icons/arrow-down.svg";
import { ReactComponent as CpuIcon } from "icons/cpu.svg";
import { ReactComponent as Display } from "icons/display.svg";
import { ReactComponent as Laptop } from "icons/laptop.svg";
import { ReactComponent as Router } from "icons/router.svg";
import { ReactComponent as PlayStation } from "icons/playstation.svg";
import { ReactComponent as HeartIcon } from "icons/heart.svg";
import { ReactComponent as ScalesIcon } from "icons/scales.svg";
import {
  MenuCategories,
  Card,
  PageHeader,
  PageFooter,
  MenuCategoryItem,
  MyLink,
  NavBar,
  BurgerMenu,
  BannerSlider,
} from "module/components";
import { CartPage } from "module/CartPage/CartPage";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await axios.get("http://localhost:3004/goods");
    setProducts(response.data);
  }

  const [value, setValue] = useState("");

  return (
    <div className={styles.mainPage}>
      <NavBar className={styles.navbar}>
        <div className={styles.navItem}>
          <Button
            onClick={() => setMenuActive(!menuActive)}
            className={styles.navBtnMenu}
            size="large"
            color="transparent"
            icon={MenuIcon}
          />
          <MyLink className={styles.navMenuLink} color="primary">
            Акции
          </MyLink>
          <MyLink className={styles.navMenuLink} color="primary">
            Кредит
          </MyLink>
          <MyLink className={styles.navMenuLink} color="primary">
            Помощь
          </MyLink>
          <MyLink className={styles.navMenuLink} color="primary">
            Контакты
          </MyLink>
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
      <BurgerMenu
        active={menuActive}
        setActive={setMenuActive}
        header={"E-SHOP"}
      />
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
            <div className={styles.productQty}>15</div>
          </div>
          <div className={styles.btnWrapper}>
            <Button
              className={styles.headBtn}
              size="large"
              color="tertiary"
              largeIcon={HeartIcon}
            />
            <div className={styles.productQty}>2</div>
          </div>
          <div className={styles.btnWrapper}>
            <Button
              className={styles.headBtn}
              size="large"
              color="tertiary"
              largeIcon={Cart}
            />
            <div className={styles.productQty}>15</div>
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
          <BannerSlider />
        </div>
        <div className={styles.productContainer}>
          <h2 className={styles.productTitle}>Топ продаж</h2>
          <div className={styles.productBlockWrapper}>
            <div className={styles.productBlock}>
              {products
                .map((product) => (
                  <Card
                    className={styles.product}
                    product={product}
                    key={product.id}
                    title={product.title}
                    src={product.src}
                    price={product.price}
                  />
                ))
                .slice(0, 6)}
            </div>
            <div className={styles.myLinks}>
              <MyLink color="secondary" iconRight={ArrowDown}>
                Еще товары
              </MyLink>
              <MyLink
                href="http://localhost:3004/goods"
                color="secondary"
                iconRight={ArrowRight}
              >
                Смотреть все товары
              </MyLink>
            </div>
          </div>
          <h2 className={styles.productTitle}>Топ продаж</h2>
          <div className={styles.productBlockWrapper}>
            <div className={styles.productBlock}>
              {products
                .map((product) => (
                  <Card
                    className={styles.product}
                    product={product}
                    key={product.id}
                    title={product.title}
                    src={product.src}
                    price={product.price}
                  />
                ))
                .slice(-6)}
            </div>
            <div className={styles.myLinks}>
              <MyLink color="secondary" iconRight={ArrowDown}>
                Скрыть
              </MyLink>
              <MyLink
                href="http://localhost:3004/goods"
                color="secondary"
                iconRight={ArrowRight}
              >
                Смотреть все товары
              </MyLink>
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
            {products
              .map((product) => (
                <Card
                  className={styles.product}
                  product={product}
                  key={product.id}
                  title={product.title}
                  src={product.src}
                  price={product.price}
                />
              ))
              .slice(11, 17)}
          </div>
          <div className={styles.myLinks}>
            <MyLink color="primary" iconRight={ArrowDown}>
              Еще товары
            </MyLink>
            <MyLink
              href="http://localhost:3004/goods"
              color="primary"
              iconRight={ArrowRight}
            >
              Смотреть все товары
            </MyLink>
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
      <CartPage />
      <PageFooter></PageFooter>
    </div>
  );
};
