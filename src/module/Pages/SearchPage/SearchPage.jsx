import {
  useAddProductInCartMutation,
  useAddInWishListMutation,
  useAddInCompareMutation,
  useGetFilteredAndSortedGoodsQuery,
  useGetGoodsQuery,
  useGetCartQuery,
  useGetWishListQuery,
  useGetCompareQuery,
  useDeleteFromWishListMutation,
  useDeleteFromCompareMutation,
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
import { isIn } from "utils/utils";
import { getSort } from "store/selectors/sortSelector";
import { getPagination } from "store/selectors/paginationSelector";
import { getProductsFilter } from "store/selectors/productFilterSelector";
import { getSearchQuery } from "store/selectors/searchSelector";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as FilterIcon } from "icons/filter.svg";
import { ReactComponent as CloseIcon } from "icons/x-large.svg";
import { setCurrentPage, setTotalPages } from "store/slices/paginationSlice";
import { setClearSearchInput, setSearchQuery } from "store/slices/searchSlice";
import styles from "./SearchPage.module.css";

export const SearchPage = () => {
  const { value } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedValue } = useSelector(getSort);
  const { searchQuery } = useSelector(getSearchQuery);
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
  const { data: cart = [] } = useGetCartQuery();
  const { data: wishList = [] } = useGetWishListQuery();
  const { data: compare = [] } = useGetCompareQuery();
  const { products, totalCount } = useGetFilteredAndSortedGoodsQuery(
    {
      search: searchQuery ? searchQuery : value,
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
  const handleChangePriceFilter = ({ target: { name, value } }) => {
    setPriceFilterOnClick({ ...priceFiltersOnClick, [name]: value });
  };
  const handleClearPriceFilter = ({ target: { name } }) => {
    setPriceFilterOnClick({ ...priceFiltersOnClick, [name]: "" });
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
    dispatch(setClearSearchInput());
  };

  const [addInCart] = useAddProductInCartMutation();
  const [addInWishList] = useAddInWishListMutation();
  const [addInCompare] = useAddInCompareMutation();
  const [deleteFromWishList] = useDeleteFromWishListMutation();
  const [deleteFromCompare] = useDeleteFromCompareMutation();

  const handleAddInCart = (product, e) => {
    addInCart({
      id: product.id,
      title: product.title,
      slugTitle: product.slugTitle,
      price: product.price,
      src: product.src,
      qty: 1,
    });
    e.preventDefault();
  };
  const handleClickOnWishList = (product, e) => {
    const isInWishList = isIn(wishList, product.id);
    isInWishList
      ? deleteFromWishList(product.id)
      : addInWishList({
          id: product.id,
          title: product.title,
          price: product.price,
          src: product.src,
        });
    e.preventDefault();
  };
  const handleClickOnCompare = (product, e) => {
    const isInCompare = isIn(compare, product.id);
    isInCompare
      ? deleteFromCompare(product.id)
      : addInCompare({
          id: product.id,
          title: product.title,
          price: product.price,
          src: product.src,
          category: product.category,
        });
    e.preventDefault();
  };
  const handleClickOnMainBtn = () => {
    dispatch(setSearchQuery(""));
    navigate("/");
  };
  const handleClickOnCatalogBtn = () => {
    dispatch(setSearchQuery(""));
    navigate("/catalog");
  };

  useEffect(() => {
    dispatch(setTotalPages(getPagesCount(totalCount, limit)));
  }, [totalCount, limit]);

  return (
    <div className={styles.pageContainer}>
      {searchQuery || value ? (
        <h2 className={styles.pageTitle}>{`Результаты поиска по запросу "${
          searchQuery || value
        }"`}</h2>
      ) : (
        <h2 className={styles.pageTitle}>Все товары</h2>
      )}
      {products?.length ? (
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
              onChangePriceFrom={handleChangePriceFilter}
              onChangePriceTo={handleChangePriceFilter}
              onClearPriceFrom={handleClearPriceFilter}
              onClearPriceTo={handleClearPriceFilter}
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
                  product={product}
                  cart={cart}
                  wishList={wishList}
                  compare={compare}
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  src={product.src}
                  price={product.price}
                  onClick={(e) => {
                    handleAddInCart(product, e);
                  }}
                  onWishListClick={(e) => handleClickOnWishList(product, e)}
                  onCompareClick={(e) => handleClickOnCompare(product, e)}
                />
              ))}
            </div>
            {totalPages > 1 ? (
              <Pagination
                className={styles.pagination}
                totalPages={totalPages}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className={styles.errorBlock}>
          <h2 className={styles.errorTitle}>{`Странно, но по запросу "${
            searchQuery || value
          }" ничего не найдено`}</h2>
          <span className={styles.errorText}>
            Попробуйте изменить критерии запроса.
          </span>
          <div className={styles.btnWrap}>
            <Button
              className={styles.errBtn}
              color="tertiary"
              size="medium"
              onClick={() => handleClickOnMainBtn()}
            >
              НА ГЛАВНУЮ
            </Button>
            <Button
              className={styles.errBtn}
              color="primary"
              size="medium"
              onClick={() => handleClickOnCatalogBtn()}
            >
              В КАТАЛОГ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
