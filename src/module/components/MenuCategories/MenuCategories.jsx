import cx from "classnames";
import { MenuCategoryItem } from "module/components";
import { ReactComponent as CpuIcon } from "icons/cpu.svg";
import { ReactComponent as Display } from "icons/display.svg";
import { ReactComponent as Laptop } from "icons/laptop.svg";
import { ReactComponent as Router } from "icons/router.svg";
import { ReactComponent as PlayStation } from "icons/playstation.svg";
import styles from "./MenuCategories.module.css";
import { useNavigate } from "react-router-dom";

export const MenuCategories = ({ className }) => {
  const menuCategoriesClass = cx(styles.menuCat, className);
  const navigate = useNavigate();

  const handleSelectCategory = (event) => {
    navigate(`/catalog/${event.target.dataset?.name}`);
  };
  return (
    <div className={menuCategoriesClass}>
      <div className={styles.categoriesBlock}>
        <div className={styles.categories}>
          <MenuCategoryItem
            icon={CpuIcon}
            onClick={handleSelectCategory}
            data-name="komplektuyushhie-dlya-pk"
          >
            Комплектующие ПК
          </MenuCategoryItem>
          <MenuCategoryItem
            icon={Display}
            onClick={handleSelectCategory}
            data-name="monitory"
          >
            Мониторы
          </MenuCategoryItem>
          <MenuCategoryItem
            icon={Laptop}
            onClick={handleSelectCategory}
            data-name="noutbuki"
          >
            Ноутбуки
          </MenuCategoryItem>
          <MenuCategoryItem
            icon={PlayStation}
            onClick={handleSelectCategory}
            data-name="konsoli"
          >
            Игровые консоли
          </MenuCategoryItem>
          <MenuCategoryItem
            icon={Router}
            onClick={handleSelectCategory}
            data-name="setevoe-oborudovanie"
          >
            Сетевое оборудование
          </MenuCategoryItem>
        </div>
      </div>
    </div>
  );
};
