import React, { useContext } from "react";
import { BannerItem } from "../BannerItem/BannerItem";
import { BannerSliderContext } from "../BannerSlider";
import styles from "./BannersList.module.css";

export const BannersList = () => {
  const { slideNumber, banners } = useContext(BannerSliderContext);

  return (
    <div
      className={styles.bannersList}
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {banners.map((banner) => (
        <BannerItem
          data={banner}
          key={banner.id}
          title={banner.title}
          description={banner.description}
          src={banner.src}
        />
      ))}
    </div>
  );
};
