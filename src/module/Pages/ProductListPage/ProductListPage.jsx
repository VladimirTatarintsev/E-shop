import { useAddProductInCartMutation } from "store/services/goodsApi";
import { Card } from "module/components";
import { useGetGoodsQuery } from "store/services/goodsApi";
import styles from "./ProductListPage.module.css";

export const ProductListPage = () => {
  const { data = [] } = useGetGoodsQuery();
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
          <div className={styles.productBlock}>
            {data.map((product) => (
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
