import { createPages } from "utils/utils";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "store/slices/paginationSlice";
import { getPagination } from "store/selectors/paginationSelector";
import { ReactComponent as LeftArrow } from "icons/chevron-left.svg";
import { ReactComponent as RightArrow } from "icons/chevron-right.svg";
import cx from "classnames";
import styles from "./Pagination.module.css";

export const Pagination = ({ totalPages, className }) => {
  const pages = [];
  const { currentPage } = useSelector(getPagination);
  const dispatch = useDispatch();
  const handleSetCurrentPage = (page) => dispatch(setCurrentPage(page));
  const handleSetNextPage = (currentPage, pages) => {
    if (currentPage !== pages.length) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };
  const handleSetPrevPage = (currentPage) => {
    if (currentPage !== 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  useMemo(() => {
    createPages(pages, totalPages);
  }, [pages]);

  const paginationClass = cx(styles.pagination, className);
  return (
    <div className={paginationClass}>
      <div
        className={styles.prevPage}
        onClick={() => handleSetPrevPage(currentPage, pages)}
      >
        <LeftArrow className={styles.arrowsBtn} />
      </div>
      {pages?.map((page, index) => (
        <span
          className={`${[styles.pageNum]} ${
            currentPage === page ? [styles.currentPage] : ""
          }`}
          key={index}
          onClick={() => handleSetCurrentPage(page)}
        >
          {page}
        </span>
      ))}
      <div
        className={styles.nextPage}
        onClick={() => handleSetNextPage(currentPage, pages)}
      >
        <RightArrow className={styles.arrowsBtn} />
      </div>
    </div>
  );
};
