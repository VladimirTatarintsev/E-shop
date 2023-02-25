import cx from "classnames";
import styles from "./BannerItem.module.css";
import { Button } from "components";

export const BannerItem = ({
  className,
  data: { src, title, description },
}) => {
  const bannerItemClass = cx(styles.bannerItem, className);
  return (
    <div className={bannerItemClass}>
      <img className={styles.itemImg} src={src} alt={title} />
      <div className={styles.itemText}>
        <span className={styles.itemTitle}>{title}</span>
        <span className={styles.itemDescription}>{description}</span>
        <Button className={styles.itemBtn} size="medium" color="red">
          BANNER BUTTON
        </Button>
      </div>
    </div>
  );
};
