import { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

type Props = {
  value: string;
  onSearch: (value: string) => void;
};

export default function SearchBox({ value, onSearch }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
      aria-label="Search notes"
    />
  );
}
