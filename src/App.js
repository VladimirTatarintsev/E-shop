import styles from "./App.module.css";
import { MainPage } from "./module/MainPage/MainPage";

export const App = () => {
  return (
    <div className={styles.App}>
      <MainPage />
    </div>
  );
};
