import { MyLink } from "..";
import { Button } from "components";
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

export const BurgerMenu = ({ header, active, setActive }) => {
  return (
    <div
      className={`${[styles.menu]} ${active ? [styles.menuActive] : ""}`}
      onClick={() => setActive(false)}
    >
      <div className={styles.blur} />
      <div className={styles.menuContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>{header}</div>
          <Button
            color="transparent"
            size="medium"
            icon={CloseIcon}
            onClick={() => setActive()}
          />
        </div>
        <MyLink
          className={styles.item}
          href="/signIn"
          color="primary"
          icon={User}
        >
          Вход | Регистрация
        </MyLink>
        <MyLink
          className={styles.item}
          href="/goods"
          color="primary"
          icon={Catalog}
        >
          Каталог товаров
        </MyLink>
        <MyLink
          className={styles.item}
          href="/cart"
          color="primary"
          icon={Cart}
        >
          Корзина
        </MyLink>
        <MyLink
          className={styles.item}
          href="/compare"
          color="primary"
          icon={ScalesIcon}
        >
          Сравнение
        </MyLink>
        <MyLink
          className={styles.item}
          href="/wishList"
          color="primary"
          icon={HeartIcon}
        >
          Избранное
        </MyLink>
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
