// components/Pagination/Pagination.tsx
'use client';

import React from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  forcePage: number; // 0-based
  onPageChange: (arg: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, forcePage, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={onPageChange}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      containerClassName={css.pagination}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={css.previous}
      nextClassName={css.next}
      previousLinkClassName={css.previousLink}
      nextLinkClassName={css.nextLink}
      disabledClassName={css.disabled}
      breakClassName={css.break}
      breakLinkClassName={css.breakLink}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
    />
  );
};

export default Pagination;
