import axios from "axios";
import { useState } from "react";
import styles from "./App.module.css";
import { Button } from "./components/Button/Button";
import { NavBar } from "./module/components/NavBar/NavBar";
import { ReactComponent as List } from "./icons/list.svg";
import { ReactComponent as Cart } from "./icons/cart.svg";
import { ReactComponent as User } from "./icons/user.svg";
import { ReactComponent as SearchIcon } from "./icons/search.svg";
import { ReactComponent as Catalog } from "./icons/catalog.svg";
import { ReactComponent as DeleteIcon } from "./icons/x-medium.svg";
import { PageHeader } from "./module/components/PageHeader/PageHeader";
import { Input } from "./components/Input/Input";

export const App = () => {
  // const [products, setProducts] = useState([]);

  // async function fetchProducts () {
  // 	const response = await axios.get('http://localhost:3004/goods');
  // setProducts(response.data)
  // }
  const [value, setValue] = useState("");

  return (
    <div className={styles.App}>
      <NavBar className={styles.navbar}>
        <Button size="large" color="transparent" icon={List} />
        <Button color="transparent" size="small" icon={User}>
          Войти
        </Button>
      </NavBar>
      <PageHeader>
        <div className={styles.title}>E-SHOP</div>
        <Button size="medium" color="primary" icon={Catalog}>
          Каталог товаров
        </Button>
        <div className={styles.inputWrapper}>
          <Input
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            iconRight={DeleteIcon}
            className={styles.searchInput}
            placeholder="Поиск..."
          />
          <Button
            className={styles.searchBtn}
            size="large"
            color="secondary"
            icon={SearchIcon}
          />
        </div>
        <div></div>
        <div className={styles.btnWrapper}>
          <Button size="large" color="tertiary" icon={Cart} />
        </div>
      </PageHeader>
    </div>
  );
};
