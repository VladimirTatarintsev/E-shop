import cx from "classnames";
import { Checkbox, ControlLabel } from "components";
import { MyLink } from "../..";
import { ReactComponent as FilterIcon } from "icons/chevron-down.svg";
import styles from "./ProductFilter.module.css";
import { useState } from "react";

export const ProductFilter = ({
  products,
  selectedFilter,
  onCheckboxClick,
  className,
  children,
}) => {
  const [showFilter, setShowFilter] = useState(true);
  const [showAllItem, setShowAllItem] = useState(false);

  let searchQueryArr = [];

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  const handleShowAllItem = () => {
    setShowAllItem(!showAllItem);
  };
  products?.forEach((product) =>
    searchQueryArr.push({ brand: product.brand, category: product.category })
  );

  const uniqeProducts = searchQueryArr
    .filter(
      (
        (el) => (p) =>
          !el.has(p.brand) && el.add(p.brand)
      )(new Set())
    )
    .sort((a, b) => {
      const brandA = a.brand;
      const brandB = b.brand;
      if (brandA > brandB) {
        return 1;
      }
      if (brandA < brandB) {
        return -1;
      }
      return 0;
    });
  return (
    <div className={cx(styles.filter, className)}>
      <span className={styles.filterTitle} onClick={handleShowFilter}>
        {children}
        <FilterIcon
          className={`${showFilter ? [styles.reverseIcon] : [styles.icon]}`}
        />
      </span>
      <div
        className={`${
          showFilter ? [styles.showFilterContainer] : [styles.filterContainer]
        }`}
      >
        <div
          className={`${
            showAllItem ? [styles.showFiltersBlock] : [styles.filtersBlock]
          }`}
        >
          {uniqeProducts?.map((product) => (
            <ControlLabel
              className={styles.item}
              key={product.brand}
              control={
                <Checkbox
                  checked={selectedFilter.includes(product.brand)}
                  onChange={onCheckboxClick}
                  value={product.brand}
                  withIcon
                />
              }
              label={product.brand}
            ></ControlLabel>
          ))}
        </div>
        {uniqeProducts.length > 4 && (
          <div className={styles.toggleBtnWrap}>
            {!showAllItem ? (
              <MyLink
                className={styles.toggleBtn}
                color="secondary"
                onClick={handleShowAllItem}
              >
                Показать все
              </MyLink>
            ) : (
              <MyLink
                className={styles.toggleBtn}
                color="secondary"
                onClick={handleShowAllItem}
              >
                Скрыть
              </MyLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
