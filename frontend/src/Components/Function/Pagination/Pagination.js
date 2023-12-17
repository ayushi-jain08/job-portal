import React from "react";
import "./Pagination.css";

const Pagination = ({ totalPage, onClick, currentPage }) => {
  return (
    <>
      {Array.from({ length: totalPage }).map((_, index) => (
        <button
          key={index}
          onClick={() => onClick(index + 1)}
          className={currentPage === index + 1 ? "cur-active" : "current"}
        >
          {index + 1}
        </button>
      ))}
    </>
  );
};

export default Pagination;
