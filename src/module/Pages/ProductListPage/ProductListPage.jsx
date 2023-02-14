import {
  useAddProductInCartMutation,
  useGetFilteredAndSortedGoodsQuery,
  useGetGoodsQuery,
} from "store/services/goodsApi";
import {
  Card,
  Select,
  Pagination,
  ProductFilter,
  PriceFilter,
} from "module/components";
import { Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredBrandsToString, getPagesCount, xor } from "utils/utils";
import {
  setSelectedFilters,
  setFilterPriceFrom,
  setFilterPriceTo,
  setClearAllFilters,
} from "store/slices/productFilterSlice";
import { getSort } from "store/selectors/sortSelector";
import { getPagination } from "store/selectors/paginationSelector";
import { getProductsFilter } from "store/selectors/productFilterSelector";
import { useState } from "react";
import { ReactComponent as FilterIcon } from "icons/filter.svg";
import { ReactComponent as CloseIcon } from "icons/x-large.svg";
import styles from "./ProductListPage.module.css";
import { setCurrentPage, setTotalPages } from "store/slices/paginationSlice";

export const ProductListPage = () => {
  const dispatch = useDispatch();
  const { selectedValue } = useSelector(getSort);
  const { currentPage, limit, totalPages } = useSelector(getPagination);
  const { selectedBrands, selectedPriceFrom, selectedPriceTo } =
    useSelector(getProductsFilter);

  const [priceFiltersOnClick, setPriceFilterOnClick] = useState({
    priceFrom: "",
    priceTo: "",
  });
  const [isChecked, setIsChecked] = useState([]);
  const [activeMobileFilters, setActiveMobileFilters] = useState(false);

  const brandFilters = getFilteredBrandsToString(selectedBrands);
  const { data = [] } = useGetGoodsQuery();
  const { products, totalCount } = useGetFilteredAndSortedGoodsQuery(
    {
      sort: selectedValue,
      limit: limit,
      page: currentPage,
      brand: brandFilters,
      priceFrom: selectedPriceFrom,
      priceTo: selectedPriceTo,
    },
    {
      selectFromResult: ({ data }) => ({
        products: data?.response,
        totalCount: data?.totalCount,
      }),
    }
  );
  const handleSetActiveMobileFilters = () => {
    setActiveMobileFilters(!activeMobileFilters);
  };
  const handleSetSelectedBrands = ({ target: { value } }) => {
    setIsChecked(xor(isChecked, value));
  };
  const handleChangePriceFrom = ({ target: { value } }) => {
    setPriceFilterOnClick({ ...priceFiltersOnClick, priceFrom: value });
  };
  const handleChangePriceTo = ({ target: { value } }) => {
    setPriceFilterOnClick({ ...priceFiltersOnClick, priceTo: value });
  };
  const handleSetAllFilters = () => {
    dispatch(setFilterPriceFrom(priceFiltersOnClick.priceFrom));
    dispatch(setFilterPriceTo(priceFiltersOnClick.priceTo));
    dispatch(setSelectedFilters(isChecked));
    dispatch(setCurrentPage(1));
    setActiveMobileFilters(false);
  };
  const handleClearAllFilter = () => {
    setPriceFilterOnClick({ priceFrom: "", priceTo: "" });
    setIsChecked([]);
    dispatch(setClearAllFilters());
  };
  dispatch(setTotalPages(getPagesCount(totalCount, limit)));

  const [addProduct] = useAddProductInCartMutation();

  const handleAddProduct = (product) => {
    addProduct({
      id: product.id,
      title: product.title,
      price: product.price,
      src: product.src,
      qty: 1,
    });
  };
  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Все товары</h2>
      <div className={styles.productContainer}>
        <div
          className={`${
            activeMobileFilters
              ? [styles.activeFilterPanel]
              : [styles.filterPanel]
          }`}
        >
          <div className={styles.filtersHeader}>
            <span className={styles.filtersTitle}>Фильтры</span>
            <button
              className={styles.closeBtn}
              onClick={() => setActiveMobileFilters(false)}
            >
              <CloseIcon className={styles.closeBtnIcon} />
            </button>
          </div>
          <PriceFilter
            priceFrom={priceFiltersOnClick.priceFrom}
            priceTo={priceFiltersOnClick.priceTo}
            onChangePriceFrom={handleChangePriceFrom}
            onChangePriceTo={handleChangePriceTo}
          >
            По цене
          </PriceFilter>
          <ProductFilter
            products={data}
            selectedFilter={isChecked}
            onCheckboxClick={handleSetSelectedBrands}
          >
            По производителю
          </ProductFilter>
          <div className={styles.filterBtns}>
            <Button
              className={styles.cancelBtn}
              color="tertiary"
              size="small"
              onClick={handleClearAllFilter}
            >
              Сбросить
            </Button>
            <Button
              className={styles.confirmBtn}
              color="secondary"
              size="small"
              onClick={handleSetAllFilters}
            >
              Применить
            </Button>
          </div>
        </div>
        <div className={styles.productBlockWrap}>
          <div className={styles.sortContainer}>
            <Button
              className={styles.mobileFilterBtn}
              color="secondary"
              size="medium"
              icon={FilterIcon}
              onClick={handleSetActiveMobileFilters}
            />
            <Select
              className={styles.sortProduct}
              options={[
                { value: "price", name: "по цене" },
                { value: "title", name: "по наименованию" },
                { value: "category", name: "по категориям" },
              ]}
            />
          </div>
          <div className={styles.productBlock}>
            {products?.map((product) => (
              <Card
                className={styles.product}
                key={product.id}
                id={product.id}
                title={product.title}
                src={product.src}
                price={product.price}
                onClick={() => {
                  handleAddProduct(product);
                }}
              />
            ))}
          </div>
          {totalPages > 1 ? (
            <Pagination className={styles.pagination} totalPages={totalPages} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
