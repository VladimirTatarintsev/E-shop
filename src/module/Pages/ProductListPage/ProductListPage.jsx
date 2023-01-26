import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "module/components";
import styles from "./ProductListPage.module.css";

export const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await axios.get("http://localhost:3004/goods");
    setProducts(response.data);
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Страница товаров</h2>
      <div className={styles.productContainer}>
        <div className={styles.filters}>Фильтры</div>
        <div className={styles.productBlock}>
          {products.map(({ id, title, src, price }) => (
            <Card
              className={styles.product}
              key={id}
              title={title}
              src={src}
              price={price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
