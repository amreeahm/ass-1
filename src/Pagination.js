import React from "react";
import "./Pagination.css";

function Pagination({ prevPage, nextPage, handlePrevPage, handleNextPage }) {
  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={!prevPage}>
        Previous
      </button>
      <button onClick={handleNextPage} disabled={!nextPage}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
