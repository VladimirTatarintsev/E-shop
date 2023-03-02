import {
  MainPage,
  CartPage,
  Layout,
  ProductListPage,
  ProductPage,
  OrderingPage,
  EndingOrderPage,
  CatalogPage,
  SearchPage,
  WishListPage,
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
          <Route path="wishlist" element={<WishListPage />} />
          <Route path="cart/ordering" element={<OrderingPage />} />
          <Route
            path="cart/ordering/order-ending"
            element={<EndingOrderPage />}
          />
          <Route path="products" element={<ProductListPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:categorySlug" element={<ProductListPage />} />
          <Route path="search/:value" element={<SearchPage />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </div>
  );
};
