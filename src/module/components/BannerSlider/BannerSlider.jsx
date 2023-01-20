import { useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import cx from "classnames";
import { ReactComponent as Dot } from "icons/dot.svg";
import styles from "./BannerSlider.module.css";
import { BannerItem } from "./BannerItem/BannerItem";

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

  const preloadImages = () => {
    const prevItemIndex = slide - 1 < 0 ? banners.length - 1 : slide - 1;
    const nextItemIndex = (slide + 1) % banners.length;

    new Image().src = banners[slide].src;
    new Image().src = banners[prevItemIndex].src;
    new Image().src = banners[nextItemIndex].src;
  };

  useEffect(() => {
    if (banners.length) {
      preloadImages();
    }
  }, [slide, banners]);

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
        {banners.length ? <BannerItem data={banners[slide]} /> : null}
        <div className={styles.dots}>
          {banners.map((banner, index) => (
            <div
              className={`${[styles.dot]} ${
                slide === index ? [styles.selectedDot] : ""
              }`}
              key={banner.id}
              onClick={() => goToSlide(index)}
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
