import { Link } from "react-router-dom";
import { useGetGoodsQuery } from "store/services/goodsApi";
import { ReactComponent as ChevronRight } from "../../../icons/chevron-right.svg";
import styles from "./CatalogPage.module.css";

export const CatalogPage = () => {
  const { data: products = [] } = useGetGoodsQuery();
  const categories = [];
  products?.forEach((product) => {
    categories.push({
      category: product.category,
      img: product.categoryImg,
      categorySlug: product.categorySlug,
    });
  });
  const uniqeCategories = categories.filter(
    (
      (el) => (f) =>
        !el.has(f.category) && el.add(f.category)
    )(new Set())
  );
  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Каталог товаров</h2>
      <div className={styles.categoriesContainer}>
        {uniqeCategories?.map(({ category, categorySlug, img }) => (
          <Link
            to={`/catalog/${categorySlug}`}
            key={category}
            className={styles.categoryLink}
          >
            <div className={styles.categoryItem}>
              <div className={styles.imgWrap}>
                <img className={styles.categoryImg} alt="" src={img} />
              </div>
              <div className={styles.categoryTitle}>
                <span className={styles.titleText}>{category}</span>
                <ChevronRight className={styles.titleIcon} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
