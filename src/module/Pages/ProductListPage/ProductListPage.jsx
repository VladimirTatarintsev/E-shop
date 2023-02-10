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
import { useState } from "react";
import styles from "./ProductListPage.module.css";

export const ProductListPage = () => {
  const dispatch = useDispatch();
  const selectedSortValue = useSelector(({ sort: { value } }) => value);
  const currentPage = useSelector(
    ({ pagination: { currentPage } }) => currentPage
  );
  const pageLimit = useSelector(({ pagination: { limit } }) => limit);
  const selectedFilters = useSelector(
    ({ productFilters: { brands } }) => brands
  );
  const PriceFrom = useSelector(
    ({ productFilters: { priceFrom } }) => priceFrom
  );
  const PriceTo = useSelector(({ productFilters: { priceTo } }) => priceTo);

  const [priceFiltersOnClick, setPriceFilterOnClick] = useState({
    priceFrom: "",
    priceTo: "",
  });
  const [isChecked, setIsChecked] = useState([]);

  const brandFilters = getFilteredBrandsToString(selectedFilters);
  const { data = [] } = useGetGoodsQuery();
  const { products, totalCount } = useGetFilteredAndSortedGoodsQuery(
    {
      sort: selectedSortValue,
      limit: pageLimit,
      page: currentPage,
      brand: brandFilters,
      priceFrom: PriceFrom,
      priceTo: PriceTo,
    },
    {
      selectFromResult: ({ data }) => ({
        products: data?.response,
        totalCount: data?.totalCount,
      }),
    }
  );
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
  };
  const handleClearAllFilter = () => {
    setPriceFilterOnClick({ priceFrom: "", priceTo: "" });
    setIsChecked([]);
    dispatch(setClearAllFilters());
  };

  const totalPages = getPagesCount(totalCount, pageLimit);

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
        <div className={styles.filterPanel}>
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
          <Select
            className={styles.sortProduct}
            options={[
              { value: "price", name: "по цене" },
              { value: "title", name: "по наименованию" },
              { value: "category", name: "по категориям" },
            ]}
          />
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
