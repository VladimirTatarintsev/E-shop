import { useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import cx from "classnames";
import { ReactComponent as Dot } from "icons/dot.svg";
import styles from "./BannerSlider.module.css";
import { BannersList } from "./BannersList/BannersList";

export const BannerSliderContext = createContext();

export const BannerSlider = ({ className, autoPlay, autoPlayTime }) => {
  const [banners, setBanners] = useState([]);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    fetchBanners();
  }, []);
  async function fetchBanners() {
    const response = await axios.get("http://localhost:3004/banners");
    setBanners(response.data);
  }

  const goToSlide = (number) => {
    setSlide(number % banners.length);
  };
  const bannerSlider = cx(styles.banner, className);

  useEffect(() => {
    if (!autoPlay) return;
    const changeBannerSlide = (direction = 1) => {
      let slideNumber = 0;
      if (slide + direction < 0) {
        slideNumber = banners.length - 1;
      } else {
        slideNumber = (slide + direction) % banners.length;
      }
      setSlide(slideNumber);
    };
    const interval = setInterval(() => {
      changeBannerSlide(1);
    }, autoPlayTime);
    return () => {
      clearInterval(interval);
    };
  }, [banners.length, slide, autoPlay, autoPlayTime]);

  return (
    <div className={bannerSlider}>
      <BannerSliderContext.Provider
        value={{
          slideNumber: slide,
          banners,
        }}
      >
        <BannersList />
        <div className={styles.dots}>
          {banners.map((banner) => (
            <div
              className={`${
                slide === banner.id ? [styles.selectedDot] : [styles.dot]
              }`}
              key={banner.id}
              onClick={() => goToSlide(banner.id)}
            >
              <Dot className={styles.dotIcon} />
            </div>
          ))}
        </div>
      </BannerSliderContext.Provider>
    </div>
  );
};
BannerSlider.propTypes = {
  autoPlay: PropTypes.bool,
  autoPlayTime: PropTypes.number,
};

BannerSlider.defaultProps = {
  autoPlay: true,
  autoPlayTime: 5000,
};
