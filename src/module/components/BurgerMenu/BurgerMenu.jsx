import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBurgerMenu } from "store/slices/burgerMenuSlice";
import { Button } from "components";
import { MyLink } from "..";
import { ReactComponent as Cart } from "icons/cart.svg";
import { ReactComponent as User } from "icons/user.svg";
import { ReactComponent as Catalog } from "icons/catalog.svg";
import { ReactComponent as HeartIcon } from "icons/heart.svg";
import { ReactComponent as ScalesIcon } from "icons/scales.svg";
import { ReactComponent as Instagram } from "icons/instagram.svg";
import { ReactComponent as Telegram } from "icons/telegram-white.svg";
import { ReactComponent as LinkedIn } from "icons/linkedIn.svg";
import { ReactComponent as Viber } from "icons/viber.svg";
import { ReactComponent as YouTube } from "icons/youTube.svg";
import { ReactComponent as CloseIcon } from "icons/x-large.svg";
import styles from "./BurgerMenu.module.css";

export const BurgerMenu = ({ header }) => {
  const menuActive = useSelector((state) => state.burgerMenu.active);
  const dispatch = useDispatch();
  const handleHideMenu = () => {
    dispatch(setBurgerMenu(false));
  };
  return (
    <div
      className={`${[styles.menu]} ${
        menuActive === true ? [styles.menuActive] : ""
      }`}
      onClick={handleHideMenu}
    >
      <div className={styles.blur} />
      <div className={styles.menuContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.header} onClick={handleHideMenu}>
            {header}
          </Link>
          <Button
            color="transparent"
            size="medium"
            icon={CloseIcon}
            onClick={handleHideMenu}
          />
        </div>
        <Link className={styles.menuItem} to="/signIn" onClick={handleHideMenu}>
          <User className={styles.linkIcon} />
          <span className={styles.linkText}>Вход | Регистрация</span>
        </Link>
        <Link className={styles.menuItem} to="/goods" onClick={handleHideMenu}>
          <Catalog className={styles.linkIcon} />
          <span className={styles.linkText}>Каталог товаров</span>
        </Link>
        <Link className={styles.menuItem} to="/cart" onClick={handleHideMenu}>
          <Cart className={styles.linkIcon} />
          <span className={styles.linkText}>Корзина</span>
        </Link>
        <Link
          className={styles.menuItem}
          to="/compare"
          onClick={handleHideMenu}
        >
          <ScalesIcon className={styles.linkIcon} />
          <span className={styles.linkText}>Сравнение</span>
        </Link>
        <Link
          className={styles.menuItem}
          to="/wishList"
          onClick={handleHideMenu}
        >
          <HeartIcon className={styles.linkIcon} />
          <span className={styles.linkText}>Избранное</span>
        </Link>
        <div className={styles.followUs}>
          <span className={styles.title}>Следите за нами</span>
          <div className={styles.socials}>
            <MyLink
              className={styles.social}
              href="https://www.instagram.com/"
              color="primary"
              icon={Instagram}
            />
            <MyLink
              className={styles.social}
              href="https://www.viber.com"
              color="primary"
              icon={Viber}
            />
            <MyLink
              className={styles.social}
              href="https://web.telegram.org/"
              color="primary"
              icon={Telegram}
            />
            <MyLink
              className={styles.social}
              href="https://www.youtube.com"
              color="primary"
              icon={YouTube}
            />
            <MyLink
              className={styles.social}
              href="https://ru.linkedin.com/"
              color="primary"
              icon={LinkedIn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
