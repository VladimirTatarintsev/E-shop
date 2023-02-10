import cx from "classnames";
import { Label, Input } from "components";
import { ReactComponent as DeleteIcon } from "icons/x-medium.svg";
import styles from "./PriceFilter.module.css";

export const PriceFilter = ({
  children,
  className,
  onChangePriceFrom,
  onChangePriceTo,
  priceFrom,
  priceTo,
}) => {
  const filterPriceClass = cx(styles.filterContainer, className);
  return (
    <div className={filterPriceClass}>
      <div className={styles.area}>
        <Label className={styles.label} htmlFor="price">
          {children}
        </Label>
        <div className={styles.inputContainer}>
          <Input
            className={styles.priceInput}
            name="priceFrom"
            iconRight={DeleteIcon}
            id="price"
            placeholder="₽"
            onChange={onChangePriceFrom}
            value={priceFrom}
          />
          <span>-</span>
          <Input
            className={styles.priceInput}
            name="priceTo"
            iconRight={DeleteIcon}
            placeholder="₽"
            onChange={onChangePriceTo}
            value={priceTo}
          />
        </div>
      </div>
    </div>
  );
};
