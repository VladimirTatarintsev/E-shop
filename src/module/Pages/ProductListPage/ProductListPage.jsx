import { useAddProductInCartMutation } from "store/services/goodsApi";
import { Card, Select } from "module/components";
import { useGetGoodsQuery } from "store/services/goodsApi";
import { useSelector } from "react-redux";
import { getPagesCount } from "helpers/helpers";
import styles from "./ProductListPage.module.css";
import { Pagination } from "module/components/Pagination/Pagination";

export const ProductListPage = () => {
  const selectedSortValue = useSelector((state) => state.selectedSort.value);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const pageLimit = useSelector((state) => state.pagination.limit);
  const { products, totalCount } = useGetGoodsQuery(
    { sort: selectedSortValue, limit: pageLimit, page: currentPage },
    {
      selectFromResult: ({ data }) => ({
        products: data?.response,
        totalCount: data?.totalCount,
      }),
    }
  );

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
        <div className={styles.filters}>Фильтры</div>
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
          {totalPages >= 1 ? (
            <Pagination className={styles.pagination} totalPages={totalPages} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
