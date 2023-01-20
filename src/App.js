import styles from "./App.module.css";
import { MainPage } from "./module/MainPage/MainPage";
import { BrowserRouter } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <MainPage />
      </div>
    </BrowserRouter>
  );
};
