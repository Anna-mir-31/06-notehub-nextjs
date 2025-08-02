'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import css from './NotesPage.module.css';

export default function Notes() {
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery<Note[], Error>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  return (
    <section className={css.section}>
      <h1 className={css.title}>My Notes</h1>
      <NoteForm />
      <SearchBox />
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error.message} />}
      {notes && <NoteList items={notes} />}
    </section>
  );
}
