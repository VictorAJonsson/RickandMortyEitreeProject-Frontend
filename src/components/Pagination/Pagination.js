// components/Pagination/Pagination.js
import React, { useState } from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagesToShow = 5;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    onPageChange(page);

  };

  const getPageNumbers = () => {
    const halfPages = Math.floor(pagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfPages);
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="pagination">
      <button onClick={prevPage} disabled={currentPage === 1}>
        <svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 1L1 10.5L10 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
        </svg>
      </button>
      <span className='pagesnumebers'>
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}>
            {pageNumber}
          </button>
        ))}
      </span>
      <button className='next' onClick={nextPage} disabled={currentPage === totalPages}>
        <svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.999999 20L10 10.5L1 0.999998" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
