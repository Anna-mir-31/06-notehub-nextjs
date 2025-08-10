import React from 'react';
import css from './Pagination.module.css';

type Props = {
  pageCount: number;
  forcePage: number; // 0-based
  onPageChange: (arg: { selected: number }) => void;
};

export default function Pagination({ pageCount, forcePage, onPageChange }: Props) {
  if (pageCount <= 1) return null;

  const goto = (idx: number) => () => onPageChange({ selected: idx });
  const pages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <ul className={css.pagination} aria-label="Pagination">
      <li onClick={forcePage > 0 ? goto(forcePage - 1) : undefined}>
        <a aria-label="Previous page">←</a>
      </li>

      {pages.map((i) => (
        <li
          key={i}
          className={i === forcePage ? css.active : undefined}
          onClick={goto(i)}
          aria-current={i === forcePage ? 'page' : undefined}
        >
          <a>{i + 1}</a>
        </li>
      ))}

      <li onClick={forcePage < pageCount - 1 ? goto(forcePage + 1) : undefined}>
        <a aria-label="Next page">→</a>
      </li>
    </ul>
  );
}
