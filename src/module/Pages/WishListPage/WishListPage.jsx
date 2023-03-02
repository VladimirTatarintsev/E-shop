import { ReactComponent as CartIcon } from "icons/cart.svg";
import { ReactComponent as Checkmark } from "icons/checkmark.svg";
import { ReactComponent as Delete } from "icons/bin.svg";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, ControlLabel } from "components";
import {
  useGetWishListQuery,
  useGetCartQuery,
  useAddProductInCartMutation,
  useDeleteFromWishListMutation,
} from "store/services/goodsApi";
import { isIn } from "utils/utils";
import styles from "./WishListPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedProducts } from "store/selectors/selectedProductsSelector";
import {
  setIsAllSelected,
  setSelectedAllproduct,
  setSelectedProduct,
} from "store/slices/selectedProductsSlice";
import { useEffect } from "react";

export const WishListPage = () => {
  const dispatch = useDispatch();
  const { data: wishList = [] } = useGetWishListQuery();
  const { data: cart = [] } = useGetCartQuery();
  const [addInCart] = useAddProductInCartMutation();
  const [deleteProduct] = useDeleteFromWishListMutation();
  const navigate = useNavigate();
  const { selectedProducts } = useSelector(getSelectedProducts);
  const { isAllSelected } = useSelector(getSelectedProducts);

  useEffect(() => {
    if (selectedProducts.length === wishList.length) {
      dispatch(setSelectedAllproduct(true));
    } else dispatch(setSelectedAllproduct(false));
  }, [selectedProducts, wishList]);
  const handleSetIsChecked = ({ target: { value } }) => {
    dispatch(setSelectedProduct(value));
  };
  const handleSetIsAllChecked = () => {
    dispatch(setSelectedAllproduct(!isAllSelected));
    dispatch(
      setIsAllSelected(wishList.map((product) => product.id.toString()))
    );
  };
  const handleClickOnMainBtn = () => {
    navigate("/");
  };
  const handleClickOnCatalogBtn = () => {
    navigate("/catalog");
  };
  const handleAddInCart = (product) => {
    addInCart({
      id: product.id,
      title: product.title,
      slugTitle: product.slugTitle,
      price: product.price,
      src: product.src,
      qty: 1,
    });
  };
  const handleDeleteProduct = () => {
    selectedProducts.forEach((id) => {
      deleteProduct(id);
    });
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Избранное</h2>
      {wishList.length ? (
        <div className={styles.productBlock}>
          <div className={styles.productBlockHeader}>
            <div className={styles.checkboxWrap}>
              <ControlLabel
                label="Выбрать все"
                control={
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSetIsAllChecked}
                    value="all"
                    withIcon
                  />
                }
              />
            </div>
            {selectedProducts.length !== 0 && (
              <Button
                className={styles.deleteBtn}
                size="small"
                color="red"
                icon={Delete}
                onClick={() => handleDeleteProduct()}
              />
            )}
          </div>
          {wishList?.map((product) => (
            <div className={styles.product} key={product.id}>
              <div className={styles.productSection}>
                <div className={styles.selectProduct}>
                  <ControlLabel
                    control={
                      <Checkbox
                        checked={selectedProducts.includes(
                          product.id.toString()
                        )}
                        onChange={handleSetIsChecked}
                        value={product.id}
                        withIcon
                      />
                    }
                  />
                </div>
                <div className={styles.imgWrap}>
                  <img className={styles.img} alt="" src={product.src} />
                </div>
                <div className={styles.productTitle}>{product.title}</div>
              </div>
              <div className={styles.productPrice}>
                <span className={styles.price}>{`${product.price} руб.`}</span>
                {isIn(cart, product.id) ? (
                  <Button
                    className={styles.buyBtn}
                    color="secondary"
                    size="large"
                    icon={Checkmark}
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    В КОРЗИНЕ
                  </Button>
                ) : (
                  <Button
                    className={styles.buyBtn}
                    color="primary"
                    size="large"
                    icon={CartIcon}
                    onClick={() => handleAddInCart(product)}
                  >
                    КУПИТЬ
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyWishList}>
          <span className={styles.emptyWishListText}>
            В списке пока нет ни одного избранного товара
          </span>
          <div className={styles.btnWrap}>
            <Button
              className={styles.btn}
              color="tertiary"
              size="medium"
              onClick={() => handleClickOnMainBtn()}
            >
              НА ГЛАВНУЮ
            </Button>
            <Button
              className={styles.btn}
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
