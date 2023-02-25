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
  products?.forEach((product) => searchQueryArr.push(product.brand));

  let uniqeBrands = [...new Set(searchQueryArr)].sort();

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
          {uniqeBrands?.map((brand) => (
            <ControlLabel
              className={styles.item}
              key={brand}
              control={
                <Checkbox
                  checked={selectedFilter.includes(brand)}
                  onChange={onCheckboxClick}
                  value={brand}
                  withIcon
                />
              }
              label={brand}
            ></ControlLabel>
          ))}
        </div>
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
    </div>
  );
};
