import { useAddProductInCartMutation } from "store/services/goodsApi";
import { Card, Select } from "module/components";
import { useGetGoodsQuery } from "store/services/goodsApi";
import styles from "./ProductListPage.module.css";
import { useSelector } from "react-redux";

export const ProductListPage = () => {
  const selectedSortValue = useSelector((state) => state.selectedSort.value);
  const { data: products = [] } = useGetGoodsQuery(selectedSortValue);
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
            {products.map((product) => (
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
        </div>
      </div>
    </div>
  );
};
