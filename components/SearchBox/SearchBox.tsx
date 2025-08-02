'use client';

import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { searchNotes, fetchNotes } from '@/lib/api';
import css from './SearchBox.module.css';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (keyword: string) => {
      return keyword.trim() === '' ? fetchNotes() : searchNotes(keyword);
    },
    onSuccess: data => {
      queryClient.setQueryData(['notes'], data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(query);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes by keyword"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
