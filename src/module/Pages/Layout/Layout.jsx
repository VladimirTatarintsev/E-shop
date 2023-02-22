import {
  NavBar,
  PageHeader,
  PageFooter,
  MyLink,
  MobileMenu,
} from "module/components";
import { Button, Input } from "components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetCartQuery,
  useGetCompareQuery,
  useGetWishListQuery,
} from "store/services/goodsApi";
import { setMobileMenu } from "store/slices/mobileMenuSlice";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ReactComponent as MenuIcon } from "icons/menu.svg";
import { ReactComponent as Cart } from "icons/cart.svg";
import { ReactComponent as User } from "icons/user.svg";
import { ReactComponent as SearchIcon } from "icons/search.svg";
import { ReactComponent as Catalog } from "icons/catalog.svg";
import { ReactComponent as DeleteIcon } from "icons/x-large.svg";
import { ReactComponent as HeartIcon } from "icons/heart.svg";
import { ReactComponent as ScalesIcon } from "icons/scales.svg";
import styles from "./Layout.module.css";
import { setSearchQuery } from "store/slices/searchSlice";

export const Layout = () => {
  const dispatch = useDispatch();
  const { data: products = [] } = useGetCartQuery();
  const { data: wishList = [] } = useGetWishListQuery();
  const { data: compare = [] } = useGetCompareQuery();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearchQuery = ({ target: { value } }) => {
    setSearchValue(value);
  };
  const hahdleClearSearchQuery = () => {
    setSearchValue("");
  };
  const handleSetSearchQuery = () => {
    dispatch(setSearchQuery(searchValue));
    if (searchValue === "") {
      navigate(`/products`);
    } else navigate(`/search/products/${searchValue}`);
  };

  return (
    <div className={styles.layout}>
      <NavBar className={styles.navbar}>
        <div className={styles.navItem}>
          <Button
            onClick={() => dispatch(setMobileMenu(true))}
            className={styles.navBtnMenu}
            size="large"
            color="transparent"
            icon={MenuIcon}
          />
          <MyLink className={styles.navMenuLink} color="primary">
            Акции
          </MyLink>
          <MyLink className={styles.navMenuLink} color="primary">
            Кредит
          </MyLink>
          <MyLink className={styles.navMenuLink} color="primary">
            Помощь
          </MyLink>
          <MyLink className={styles.navMenuLink} color="primary">
            Контакты
          </MyLink>
        </div>
        <div className={styles.navItem}>
          <div className={styles.navLogo}>E-SHOP</div>
        </div>
        <div className={styles.navItem}>
          <Button
            className={styles.navBtn}
            size="large"
            color="transparent"
            icon={User}
          />
        </div>
      </NavBar>
      <MobileMenu
        header={"E-SHOP"}
        data={{ cart: products, compare: compare, wishList: wishList }}
      />
      <PageHeader className={styles.header}>
        <div className={styles.logoWrapper}>
          <Link to="/" className={styles.logo}>
            E-SHOP
          </Link>
          <Button
            className={styles.catalogBtn}
            size="medium"
            color="primary"
            icon={Catalog}
            onClick={() => navigate("/catalog")}
          >
            КАТАЛОГ ТОВАРОВ
          </Button>
        </div>
        <div className={styles.inputWrapper}>
          <Input
            value={searchValue}
            onChange={handleChangeSearchQuery}
            iconRight={DeleteIcon}
            className={styles.searchInput}
            placeholder="Поиск..."
            onClick={() => hahdleClearSearchQuery()}
          />
          <Button
            className={styles.searchBtn}
            size="large"
            color="secondary"
            largeIcon={SearchIcon}
            onClick={() => handleSetSearchQuery()}
          />
        </div>
        <div className={styles.headBtnWrapper}>
          <div className={styles.btnWrapper}>
            <Link to="/" className={styles.headBtn}>
              <ScalesIcon className={styles.linkIcon} />
              {compare.length ? (
                <div className={styles.linkCounter}>{compare.length}</div>
              ) : (
                ""
              )}
            </Link>
          </div>
          <div className={styles.btnWrapper}>
            <Link to="/" className={styles.headBtn}>
              <HeartIcon className={styles.linkIcon} />
              {wishList.length ? (
                <div className={styles.linkCounter}>{wishList.length}</div>
              ) : (
                ""
              )}
            </Link>
          </div>
          <div className={styles.btnWrapper}>
            <Link to="/cart" className={styles.headBtn}>
              <Cart className={styles.linkIcon} />
              {products.length ? (
                <div className={styles.linkCounter}>{products.length}</div>
              ) : (
                ""
              )}
            </Link>
          </div>
        </div>
      </PageHeader>

      <Outlet />

      <PageFooter />
    </div>
  );
};
