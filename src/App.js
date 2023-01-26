import { MainPage, CartPage, Layout, ProductListPage } from "module/Pages";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";

export const App = () => {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="products" element={<ProductListPage />} />
        </Route>
      </Routes>
    </div>
  );
};
