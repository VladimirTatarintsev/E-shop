import { createPages } from "utils/utils";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "store/slices/paginationSlice";
import cx from "classnames";
import styles from "./Pagination.module.css";

export const Pagination = ({ totalPages, className }) => {
  const pages = [];
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const dispatch = useDispatch();
  const handleSetCurrentPage = (page) => dispatch(setCurrentPage(page));

  useMemo(() => {
    createPages(pages, totalPages);
  }, [pages]);

  const paginationClass = cx(styles.pagination, className);
  return (
    <div className={paginationClass}>
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
    </div>
  );
};
