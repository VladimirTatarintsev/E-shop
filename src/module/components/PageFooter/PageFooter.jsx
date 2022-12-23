import cx from "classnames";
import styles from "./PageFooter.module.css";
import { ReactComponent as Visa } from "../../../icons/visa.svg";
import { ReactComponent as Mastercard } from "../../../icons/mastercard.svg";
import { ReactComponent as Telegram } from "../../../icons/telegram.svg";
import { Input } from "../../../components/Input/Input";
import { Label } from "../../../components/Lable/Lable";

export const PageFooter = ({ className }) => {
  const footerClass = cx(styles.footer, className);
  return (
    <div className={footerClass}>
      <div className={styles.inputContainer}>
        <Label htmlFor="discont">Подписывайтесь на скидки</Label>
        <Input
          className={styles.input}
          placeholder="Укажите ваш e-mail..."
          id="discont"
          iconInput={Telegram}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.logo}>E-SHOP</div>
          <span className={styles.text}>
            Интернет-магазин e-shop.ru Все права защищены.
          </span>
        </div>

        <div className={styles.item}>
          <Mastercard className={styles.icon} />
          <Visa className={styles.icon} />
        </div>
      </div>
    </div>
  );
};
