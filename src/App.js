import {
  MainPage,
  CartPage,
  Layout,
  ProductListPage,
  ProductPage,
  OrderPage,
} from "module/Pages";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";

export const App = () => {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="cart/order" element={<OrderPage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </div>
  );
};
