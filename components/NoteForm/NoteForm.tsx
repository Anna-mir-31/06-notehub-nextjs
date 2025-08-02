'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { addNote } from '@/lib/api';
import { NewNote } from '@/types/note';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const mutation = useMutation({
    mutationFn: (newNote: NewNote) => addNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setTitle('');
      setContent('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    mutation.mutate({ title, content });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        placeholder="Note title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        className={css.textarea}
        placeholder="Note content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <button className={css.button} type="submit">
        Add note
      </button>
    </form>
  );
}
