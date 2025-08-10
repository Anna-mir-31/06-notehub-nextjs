// components/Pagination/Pagination.tsx
'use client';

import React from 'react';
import css from './Pagination.module.css';

type Props = {
  pageCount: number;
  forcePage: number; // 0-based
  onPageChange: (arg: { selected: number }) => void;
};

const Pagination: React.FC<Props> = ({ pageCount, forcePage, onPageChange }) => {
  const pages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <ul className={css.pagination}>
      {pages.map((p) => {
        const active = p === forcePage;
        return (
          <li
            key={p}
            className={active ? css.active : undefined}
            onClick={() => onPageChange({ selected: p })}
            aria-current={active ? 'page' : undefined}
          >
            <a>{p + 1}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
